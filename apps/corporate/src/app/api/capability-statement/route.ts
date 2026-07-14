import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

/**
 * Generates a placeholder capability statement PDF on the fly. The
 * structure (sections, headers) is real; the content within each section
 * is marked as a placeholder pending real figures/certifications from
 * Rasheen — see CONTENT-TODO.md. Replace this generator with a designed
 * template once final copy/branding is ready.
 */
export async function GET() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]); // US Letter
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const body = await doc.embedFont(StandardFonts.Helvetica);

  const teal = rgb(0.173, 0.431, 0.498); // #2C6E7F
  const charcoal = rgb(0.106, 0.094, 0.082);

  let y = 740;
  const drawHeading = (text: string, size = 18) => {
    page.drawText(text, { x: 50, y, size, font, color: teal });
    y -= size + 10;
  };
  const drawLabel = (text: string) => {
    page.drawText(text, { x: 50, y, size: 12, font, color: charcoal });
    y -= 18;
  };
  const drawBody = (text: string) => {
    page.drawText(text, { x: 50, y, size: 10, font: body, color: charcoal });
    y -= 16;
  };
  const spacer = (n = 10) => (y -= n);

  drawHeading("Tampa Bay Lodging Corporation", 22);
  drawBody("Capability Statement — Furnished Government & Agency Housing");
  spacer(20);

  drawLabel("Company Overview");
  drawBody("Tampa Bay Lodging Corporation provides turnkey furnished housing for government agencies,");
  drawBody("insurers, healthcare systems, and nonprofits across the Tampa Bay area.");
  spacer(16);

  drawLabel("Core Capabilities");
  ["Turnkey furnished units with utilities and Wi-Fi included", "Flexible lease terms matched to program timelines", "Single point of contact per program", "Consolidated invoice billing", "Fast placement for emergency and transitional needs"].forEach(
    (line) => drawBody(`•  ${line}`),
  );
  spacer(16);

  drawLabel("Company Data");
  drawBody(`DUNS / UEI: {{UEI_NUMBER}}    NAICS: {{NAICS_CODES}}    Cage Code: {{CAGE_CODE}}`);
  drawBody(`Certifications: {{CERTIFICATIONS}}`);
  spacer(16);

  drawLabel("Past Performance");
  drawBody("{{PAST_PERFORMANCE_SUMMARY}} — pending verified references from Rasheen.");
  spacer(24);

  drawLabel("Contact");
  drawBody("Rasheen \"Cuir\" Castell — Tampa Bay Lodging Corporation");
  drawBody("Phone: {{PHONE_NUMBER}}   Email: {{CONTACT_EMAIL}}");

  const bytes = await doc.save();
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="tampa-bay-lodging-capability-statement.pdf"',
    },
  });
}
