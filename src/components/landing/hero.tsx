"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm text-blue-300">AI-Powered Analytics for Retail</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Understand Your Store&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Performance
            </span>
            <br />
            In Plain English
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Store.AI transforms your sales data into actionable insights. No spreadsheets, no
            complicated charts — just clear recommendations to grow your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white/20 hover:bg-white/20">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>

        <div className="mt-16 lg:mt-24">
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-3xl opacity-20" />
            <div className="relative bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
              <div className="flex items-center px-4 py-3 bg-gray-900 border-b border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-gray-400 ml-4">Store.AI Dashboard</span>
              </div>
              <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Today's Revenue", value: "$2,847", change: "+12.5%" },
                    { label: "Transactions", value: "156", change: "+8.3%" },
                    { label: "Avg. Ticket", value: "$18.25", change: "+4.2%" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-700/50 rounded-lg p-4">
                      <p className="text-sm text-gray-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                      <p className="text-sm text-green-400 mt-1">{stat.change}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-600/20 rounded-lg p-4 border border-blue-500/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">AI Insight</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Your morning coffee rush (7-9 AM) is generating 40% of daily revenue. Consider
                    adding a pastry bundle deal to increase average ticket size during this window.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
