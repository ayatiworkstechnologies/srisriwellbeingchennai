import PageHero from "@/components/layouts/PageHero";
import { heroContent } from "@/components/NetraTejas/netraTejasData";

export default function NetraTejasHero({ content }) {
  return (
    <PageHero
      heroImage={content.image}
      mobileImage={content.mobimage}
      heroImageAlt={content.title}
    />
  );
}
