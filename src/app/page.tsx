import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <section className="py-24 bg-gray-50" id="about">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Built for Independent Retailers
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Store.AI was created specifically for independent retail stores with $500K-$5M in
            annual revenue. We understand the unique challenges faced by coffee shops, boutiques,
            convenience stores, and restaurants. Our AI-powered platform gives you the same
            analytical capabilities as the big chains, at a fraction of the cost.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <p className="text-4xl font-bold text-blue-600">1,000+</p>
              <p className="text-gray-600 mt-2">Stores Using Store.AI</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">$50M+</p>
              <p className="text-gray-600 mt-2">Revenue Analyzed Monthly</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-600">15%</p>
              <p className="text-gray-600 mt-2">Avg. Revenue Increase</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
