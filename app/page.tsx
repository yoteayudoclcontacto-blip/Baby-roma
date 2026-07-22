import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { StickyMobileCta } from "@/components/home/sticky-mobile-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <FeaturedProducts />
      <Testimonials />
      <Faq />
      <FinalCta />
      <StickyMobileCta />
      <div className="h-16 md:hidden" aria-hidden />
    </>
  );
}
