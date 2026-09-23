import { Navbar } from "@/components/landing/components/navbar";
import { HeroSection } from "@/components/landing/components/hero-section";
import { FeaturesSection } from "@/components/landing/components/feature-section";
import { PricingSection } from "@/components/landing/components/pricing-section";
import { Footer } from "@/components/landing/components/footer";
import { FaqsSection } from "@/components/landing/components/faq-section";
import { TestimonialGrid } from "@/components/landing/components/testimonial-grid";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl p-4 space-y-16">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialGrid   />
        <FaqsSection />
      </main>
      <Footer />
    </div>
  );
}
