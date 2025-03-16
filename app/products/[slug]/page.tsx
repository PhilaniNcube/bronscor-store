import Link from "next/link";
import Image from 'next/image'
import { getProductBySlug } from "@/lib/products";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ProductDetails from "./ProductDetails";
import type { Metadata } from "next";
import { headers } from "next/headers";

type PageProps = {
  params: {
    slug: string;
  }
}

// Generate dynamic metadata for each product
export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(slug);
  
  return {
    title: `${product.name} | Bronscor`,
    description: product.short_description || product.description?.substring(0, 160) || "Quality product by Bronscor",
    openGraph: {
      title: product.name,
      description: product.short_description || product.description?.substring(0, 160) || "Quality product by Bronscor",
      images: [product.image],
      // Using 'website' as the type since 'product' isn't a valid value for OpenGraph
      type: 'website',
    },
  };
}

const page = async({ params: { slug } }: PageProps) => {
  const product = await getProductBySlug(slug);
  const headersList = headers();
  const host = headersList.get("host") || "store.bronscorcc.co.za";
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  const productUrl = `https://${host}/products/${slug}`;

  // Generate JSON-LD schema for the product
  // Using a type assertion to allow dynamic property addition
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "sku": product.item_id,
    "brand": {
      "@type": "Brand",
      "name": product.brand_id?.name || "Bronscor"
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "ZAR",
      "price": product.price,
      "availability": product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  // Add dimensions to JSON-LD if available
  if (product.dimensions) {
    jsonLd.width = {
      "@type": "QuantitativeValue",
      "value": product.dimensions.width,
      "unitCode": "CMT"
    };
    jsonLd.height = {
      "@type": "QuantitativeValue",
      "value": product.dimensions.height,
      "unitCode": "CMT"
    };
    jsonLd.depth = {
      "@type": "QuantitativeValue",
      "value": product.dimensions.depth,
      "unitCode": "CMT"
    };
    jsonLd.weight = {
      "@type": "QuantitativeValue",
      "value": product.dimensions.weight,
      "unitCode": "GRM"
    };
  }

  return (
    <main className="container my-6">
      {/* Add JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <ProductDetails product={product} />
    </main>
  );
};

export default page;
