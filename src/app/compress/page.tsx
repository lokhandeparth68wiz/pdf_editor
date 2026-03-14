import { constructMetadata } from "@/lib/seo";
import { JSONLDSchema } from "@/components/schema";
import CompressClient from "./compress-client";

export const metadata = constructMetadata({
  title: "Compress PDF Online | Reduce PDF File Size Free - PDFly",
  description: "Easily compress PDF files online without losing quality. Reduce PDF file size to 100kb or less securely for free. Try our PDF compressor.",
});

export default function CompressPage() {
  return (
    <>
      <JSONLDSchema
        type="SoftwareApplication"
        data={{
          name: "PDFly PDF Compressor",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description: "Free online tool to significantly reduce PDF file size while maintaining maximum quality.",
        }}
      />
      <CompressClient />
    </>
  );
}
