import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Code, LineChart, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-mono">
      {/* Navigation */}
      <nav className="border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex gap-8">
          <Link href="/" className="opacity-80 hover:opacity-100">
            [h] Home
          </Link>
          <Link href="/api/docs" className="opacity-80 hover:opacity-100">
            [d] Docs
          </Link>
          <Link href="/dashboard" className="opacity-80 hover:opacity-100">
            [a] Analytics
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Lumens</h1>
          <p className="text-lg opacity-80 max-w-2xl leading-relaxed">
            A lightweight, privacy-focused analytics platform for modern web
            applications. Get powerful insights into your website traffic with
            minimal setup.
          </p>
          <div className="mt-10 flex gap-4">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white"
            >
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/5">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 opacity-70" />
                <h3 className="font-bold">Real-time Analytics</h3>
              </div>
              <p className="opacity-70 pl-8">
                Monitor your traffic as it happens with live updates
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 opacity-70" />
                <h3 className="font-bold">Simple Integration</h3>
              </div>
              <p className="opacity-70 pl-8">One line of code to get started</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <LineChart className="w-5 h-5 opacity-70" />
                <h3 className="font-bold">Detailed Metrics</h3>
              </div>
              <p className="opacity-70 pl-8">
                Comprehensive traffic and user behavior analysis
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 opacity-70" />
                <h3 className="font-bold">Lightning Fast</h3>
              </div>
              <p className="opacity-70 pl-8">
                Zero impact on your site&apos;s performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
              <p className="opacity-70">
                Set up analytics in less than 5 minutes.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white"
            >
              Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
