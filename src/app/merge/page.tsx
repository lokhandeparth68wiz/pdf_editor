import { constructMetadata } from "@/lib/seo";
import { JSONLDSchema } from "@/components/schema";
import MergeClient from "./merge-client";

export const metadata = constructMetadata({
  title: "Merge PDF Online Free | Combine PDF Files - PDFly",
  description: "Merge multiple PDF files into one document online for free. Drag and drop to reorder pages. No software installation needed.",
});

export default function MergePage() {
  return (
    <>
      <JSONLDSchema
        type="SoftwareApplication"
        data={{
          name: "PDFly PDF Merger",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          description: "Free online tool to merge multiple PDF files into one document securely.",
        }}
      />
      <MergeClient />
    </>
  );
}
