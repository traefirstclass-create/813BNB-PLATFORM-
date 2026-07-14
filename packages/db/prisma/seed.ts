import { PrismaClient, PropertyType, RateType, BookingStatus, PaymentMethod, PaymentStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Demo-only password for all seeded portal accounts. Change immediately for
// any real account before launch.
const DEMO_PASSWORD_HASH = bcrypt.hashSync("Demo1234!", 10);

// Sample/demo images are marked isPlaceholder: true and use Unsplash source
// URLs as visibly-generic stand-ins. Replace with real photography before
// launch — tracked in CONTENT-TODO.md.
const placeholderImage = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

async function main() {
  const owner = await prisma.user.upsert({
    where: { email: "owner@813bnb.com" },
    update: {},
    create: {
      email: "owner@813bnb.com",
      name: "Rasheen Castell",
      role: "OWNER",
      passwordHash: DEMO_PASSWORD_HASH,
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: "staff@813bnb.com" },
    update: {},
    create: {
      email: "staff@813bnb.com",
      name: "813BNB Staff",
      role: "STAFF",
      passwordHash: DEMO_PASSWORD_HASH,
    },
  });

  const guest = await prisma.user.upsert({
    where: { email: "guest@example.com" },
    update: {},
    create: {
      email: "guest@example.com",
      name: "Demo Guest",
      role: "GUEST",
      passwordHash: DEMO_PASSWORD_HASH,
    },
  });

  // Real, bookable listing.
  const oldWest = await prisma.property.upsert({
    where: { slug: "old-west-studio-lofts" },
    update: {},
    create: {
      slug: "old-west-studio-lofts",
      name: "Old West Studio Lofts",
      propertyType: PropertyType.STUDIO,
      neighborhood: "West Tampa",
      addressLine1: "2004 N Howard Ave",
      city: "Tampa",
      state: "FL",
      zip: "33607",
      description:
        "A boutique studio loft in the heart of West Tampa, minutes from Hyde Park, Downtown, and Midtown. Fully furnished with a modern kitchenette, in-unit workspace, and flexible nightly, weekly, and monthly terms.",
      amenities: [
        "Wifi",
        "Full Kitchen",
        "In-unit Workspace",
        "Smart TV",
        "Washer/Dryer Access",
        "Self Check-in",
      ],
      isDowntown: false,
      isSampleData: false, // this is a real listing, not demo data
      isPublished: true,
      ownerId: owner.id,
      images: {
        create: [
          {
            url: placeholderImage("photo-1522708323590-d24dbb6b0267"),
            alt: "Old West Studio Lofts — sample interior photo",
            sortOrder: 0,
            isPlaceholder: true,
          },
          {
            url: placeholderImage("photo-1502672260266-1c1ef2d93688"),
            alt: "Old West Studio Lofts — sample kitchenette photo",
            sortOrder: 1,
            isPlaceholder: true,
          },
        ],
      },
      units: {
        create: [
          {
            name: "Studio",
            bedrooms: 0,
            bathrooms: 1,
            maxGuests: 2,
            sizeSqft: 420,
            nightlyRate: 129,
            weeklyRate: 749,
            monthlyRate: 2199,
            cleaningFee: 75,
            minNights: 2,
            instantBook: true,
            isPublished: true,
          },
        ],
      },
    },
  });

  // Sample/demo listings — clearly flagged isSampleData: true until real
  // inventory is loaded.
  const sampleListings = [
    {
      slug: "sample-hyde-park-1br",
      name: "Hyde Park Charm 1BR (Sample)",
      propertyType: PropertyType.ONE_BEDROOM,
      neighborhood: "Hyde Park",
      addressLine1: "{{ADDRESS_PLACEHOLDER}}",
      zip: "33606",
      nightlyRate: 159,
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 3,
      isLuxury: false,
      isPetFriendly: true,
    },
    {
      slug: "sample-davis-islands-waterfront",
      name: "Davis Islands Waterfront 2BR (Sample)",
      propertyType: PropertyType.TWO_BEDROOM,
      neighborhood: "Davis Islands",
      addressLine1: "{{ADDRESS_PLACEHOLDER}}",
      zip: "33606",
      nightlyRate: 289,
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 5,
      isWaterfront: true,
      isLuxury: true,
    },
    {
      slug: "sample-ybor-city-loft",
      name: "Ybor City Historic Loft (Sample)",
      propertyType: PropertyType.ONE_BEDROOM,
      neighborhood: "Ybor City",
      addressLine1: "{{ADDRESS_PLACEHOLDER}}",
      zip: "33605",
      nightlyRate: 139,
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      isDowntown: true,
    },
    {
      slug: "sample-channelside-highrise",
      name: "Channelside High-Rise 2BR (Sample)",
      propertyType: PropertyType.TWO_BEDROOM,
      neighborhood: "Channelside",
      addressLine1: "{{ADDRESS_PLACEHOLDER}}",
      zip: "33602",
      nightlyRate: 249,
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
      isDowntown: true,
      isLuxury: true,
    },
    {
      slug: "sample-seminole-heights-house",
      name: "Seminole Heights Bungalow House (Sample)",
      propertyType: PropertyType.HOUSE,
      neighborhood: "Seminole Heights",
      addressLine1: "{{ADDRESS_PLACEHOLDER}}",
      zip: "33603",
      nightlyRate: 219,
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      isPetFriendly: true,
    },
    {
      slug: "sample-south-tampa-3br",
      name: "South Tampa Family 3BR (Sample)",
      propertyType: PropertyType.THREE_BEDROOM,
      neighborhood: "South Tampa",
      addressLine1: "{{ADDRESS_PLACEHOLDER}}",
      zip: "33611",
      nightlyRate: 259,
      bedrooms: 3,
      bathrooms: 2.5,
      maxGuests: 7,
    },
    {
      slug: "sample-downtown-studio",
      name: "Downtown Tampa Studio (Sample)",
      propertyType: PropertyType.STUDIO,
      neighborhood: "Downtown",
      addressLine1: "{{ADDRESS_PLACEHOLDER}}",
      zip: "33602",
      nightlyRate: 119,
      bedrooms: 0,
      bathrooms: 1,
      maxGuests: 2,
      isDowntown: true,
    },
  ] as const;

  for (const [i, listing] of sampleListings.entries()) {
    await prisma.property.upsert({
      where: { slug: listing.slug },
      update: {},
      create: {
        slug: listing.slug,
        name: listing.name,
        propertyType: listing.propertyType,
        neighborhood: listing.neighborhood,
        addressLine1: listing.addressLine1,
        city: "Tampa",
        state: "FL",
        zip: listing.zip,
        description:
          "Sample listing for demo purposes — not a real bookable property. Replace with verified inventory before launch.",
        amenities: ["Wifi", "Full Kitchen", "Smart TV"],
        isWaterfront: "isWaterfront" in listing ? listing.isWaterfront : false,
        isPetFriendly: "isPetFriendly" in listing ? listing.isPetFriendly : false,
        isLuxury: "isLuxury" in listing ? listing.isLuxury : false,
        isDowntown: "isDowntown" in listing ? listing.isDowntown : false,
        isSampleData: true,
        isPublished: true,
        ownerId: owner.id,
        images: {
          create: [
            {
              url: placeholderImage(
                ["photo-1502672260266-1c1ef2d93688", "photo-1522708323590-d24dbb6b0267", "photo-1560448204-e02f11c3d0e2"][
                  i % 3
                ]!,
              ),
              alt: `${listing.name} — sample photo`,
              sortOrder: 0,
              isPlaceholder: true,
            },
          ],
        },
        units: {
          create: [
            {
              name: "Main Unit",
              bedrooms: listing.bedrooms,
              bathrooms: listing.bathrooms,
              maxGuests: listing.maxGuests,
              nightlyRate: listing.nightlyRate,
              weeklyRate: Math.round(listing.nightlyRate * 6.2),
              monthlyRate: Math.round(listing.nightlyRate * 22),
              cleaningFee: 60,
              minNights: 1,
              instantBook: true,
              isPublished: true,
            },
          ],
        },
      },
    });
  }

  // A demo booking on Old West Studio Lofts for the Client/Owner Portal test flows.
  const oldWestUnit = await prisma.unit.findFirstOrThrow({
    where: { propertyId: oldWest.id },
  });

  await prisma.booking.upsert({
    where: { confirmationCode: "813BNB-DEMO01" },
    update: {},
    create: {
      confirmationCode: "813BNB-DEMO01",
      unitId: oldWestUnit.id,
      guestId: guest.id,
      checkIn: new Date(Date.UTC(2026, 7, 10)),
      checkOut: new Date(Date.UTC(2026, 7, 14)),
      guestCount: 2,
      rateType: RateType.NIGHTLY,
      subtotal: 516,
      cleaningFee: 75,
      taxes: 41.28,
      totalAmount: 632.28,
      status: BookingStatus.CONFIRMED,
      payments: {
        create: [
          {
            method: PaymentMethod.CARD,
            status: PaymentStatus.SUCCEEDED,
            amount: 632.28,
            stripePaymentIntentId: "pi_demo_seed_0001",
          },
        ],
      },
    },
  });

  console.log("Seed complete:", {
    owner: owner.email,
    staff: staff.email,
    guest: guest.email,
    realListing: oldWest.slug,
    sampleListings: sampleListings.length,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
