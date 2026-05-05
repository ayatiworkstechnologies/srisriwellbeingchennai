import PageHero from "@/components/layouts/PageHero";
import ProductGrid from "@/components/Products/ProductGrid";

export const metadata = {
  title: "Products | Sri Sri Wellbeing Chennai",
  description:
    "Explore our curated wellness formulations at Sri Sri Wellbeing Chennai.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        heroImage="/banner/product-mob.png"
        mobileImage="/banner/product-web.png"
        heroImageAlt="Products at Sri Sri Wellbeing"
      />
      <ProductGrid />
    </>
  );
}
