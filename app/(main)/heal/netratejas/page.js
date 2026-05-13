import NetraTejasHero from "@/components/NetraTejas/NetraTejasHero";
import NetraTejasOverview from "@/components/NetraTejas/NetraTejasOverview";
import NetraTejasSupport from "@/components/NetraTejas/NetraTejasSupport";
import NetraTejasTherapies from "@/components/NetraTejas/NetraTejasTherapies";
import NetraTejasLocations from "@/components/NetraTejas/NetraTejasLocations";
import TestimoniesSection from "@/components/Main/TestimoniesSection";
import NetraTejasExercises from "@/components/NetraTejas/NetraTejasExercises";
import {
  featuredDoctor,
  heroContent,
  overviewCard,
  overviewHighlights,
  testimonials,
  therapies,
  youngEyesFactors,
  eyeExercises,
  eyeDisorders,
} from "@/components/NetraTejas/netraTejasData";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return getPageMetadata("netra-tejas", {
    title: "Sri Sri Netra Tejas | Ayurvedic Eye Care | Sri Sri Wellbeing Chennai",
    description:
      "Discover Sri Sri Netra Tejas - natural Ayurvedic eye care therapies for holistic vision health. Treatments for eye strain, retinal support, and visual wellbeing at Sri Sri Wellbeing Chennai.",
  });
}

export default function NetraTejasPage() {
  return (
    <>
      <NetraTejasHero content={heroContent} />
      <NetraTejasOverview card={overviewCard} highlights={overviewHighlights} />
      <NetraTejasTherapies therapies={therapies} />
      <NetraTejasExercises data={eyeExercises} />
      <NetraTejasSupport youngEyesFactors={youngEyesFactors} eyeDisorders={eyeDisorders} />
      <NetraTejasLocations featuredDoctor={featuredDoctor} />
      <TestimoniesSection data={testimonials} />
    </>
  );
}
