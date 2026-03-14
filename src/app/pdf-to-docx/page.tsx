import { constructMetadata } from "@/lib/seo";
import { JSONLDSchema } from "@/components/schema";
import PdfToDocxClient from "./pdf-to-docx-client";

export const metadata = constructMetadata({
  title: "Convert PDF to Word Free | Editable DOCX - PDFly",
  description: "Stop retyping documents. Accurately convert PDF files back into editable Word (DOCX) documents in seconds online for free.",
});

export default function PdfToDocxPage() {
  return (
    <>
      <JSONLDSchema
        type="SoftwareApplication"
        data={{
          name: "PDFly PDF to Word Converter",
          applicationCategory: "DocumentConversionApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description: "Free online tool to convert PDF documents into editable Microsoft Word (.docx) files.",
        }}
      />
      <PdfToDocxClient />
    </>
  );
}
