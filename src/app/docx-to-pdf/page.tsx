import { constructMetadata } from "@/lib/seo";
import { JSONLDSchema } from "@/components/schema";
import DocxToPdfClient from "./docx-to-pdf-client";

export const metadata = constructMetadata({
  title: "Convert Word to PDF | DOCX to PDF Free - PDFly",
  description: "Make DOCX files easy to read by converting them to PDF. Secure, fast, and free online Word to PDF converter.",
});

export default function DocxToPdfPage() {
  return (
    <>
      <JSONLDSchema
        type="SoftwareApplication"
        data={{
          name: "PDFly Word to PDF Converter",
          applicationCategory: "DocumentConversionApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description: "Free online tool to securely convert Microsoft Word (.docx) files into PDF documents.",
        }}
      />
      <DocxToPdfClient />
    </>
  );
}
