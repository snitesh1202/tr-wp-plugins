import Hero from "@/components/home/Hero";
import PainPoints from "@/components/home/PainPoints";
import { VideoTestimonials, WrittenReviews } from "@/components/home/Testimonials";
import ValueProps from "@/components/home/ValueProps";
import Differentiators from "@/components/home/Differentiators";
import HowItWorks from "@/components/home/HowItWorks";
import Stats from "@/components/home/Stats";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <PainPoints />
      <VideoTestimonials />
      <ValueProps />
      <WrittenReviews />
      <Differentiators />
      <HowItWorks />
      <Stats />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
