"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-lg text-gray-600 mb-10">
          Simple and transparent pricing. Get 1,000,000 characters for just $7.
        </p>

        <Card className="p-6 shadow-xl rounded-2xl bg-white">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-3xl font-semibold">1,000,000 Credits</h2>
              <p className="text-gray-500">Only $7</p>
              <ul className="text-left space-y-2 mt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 w-4 h-4" />
                  Use for Text-to-Speech generation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 w-4 h-4" />
                  No expiration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 w-4 h-4" />
                  Instant access
                </li>
              </ul>
              <Button className="mt-6 w-full max-w-xs" size="lg">
                Buy Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
