import PageHero from "@/components/layouts/PageHero";
import ProductGrid from "@/components/Products/ProductGrid";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getPageMetadata("products", {
    title: "Products | Sri Sri Wellbeing Chennai",
    description:
      "Explore our curated wellness formulations at Sri Sri Wellbeing Chennai.",
  });
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        heroImage="/banner/product-web.png"
        mobileImage="/banner/product-mob.png"
        heroImageAlt="Products at Sri Sri Wellbeing"
      />
      <ProductGrid />
    </>
  );
}
