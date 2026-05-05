import PageHero from "@/components/layouts/PageHero";
import ProductGrid from "@/components/Products/ProductGrid";

export const metadata = {
  title: "Healing Collection | Products | Sri Sri Wellbeing Chennai",
  description: "A refined selection of Ayurvedic formulations crafted to complement your wellness journey, designed for daily balance, vitality, and sustained inner harmony.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Curated Wellness Formulations"
        subtitle="The Healing Collection"
        heroImage="/images/pro.jpg"
        mobileImage="/images/pro-mob.jpg"
        heroImageAlt="Products at Sri Sri Wellbeing"
        paragraphs={[
          "A refined selection of Ayurvedic formulations crafted to complement your wellness journey, designed for daily balance, vitality, and sustained inner harmony.",
        ]}
        bgColor="#3b2218"
      />
      <ProductGrid />
    </>
  );
}
