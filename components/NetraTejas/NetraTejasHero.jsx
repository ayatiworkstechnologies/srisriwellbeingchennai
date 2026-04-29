import PageHero from "@/components/layouts/PageHero";

export default function NetraTejasHero({ content }) {
  return (
    <PageHero
      title={content.title}
      subtitle={content.subtitle}
      heroImage={content.image}
      heroImageAlt={content.title}
      paragraphs={[content.description]}
      primaryButton={{ label: content.ctaLabel, href: content.ctaHref }}
      bgColor="#3b2218"
    />
  );
}
