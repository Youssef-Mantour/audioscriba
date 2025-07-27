"use client";

import { CheckCircle } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Pricing</h1>
        <p className="text-lg text-gray-600 mb-10">
          Simple and transparent pricing. Get 1,000,000 characters for just $7.
        </p>

        <div className="bg-white shadow-xl rounded-2xl p-6">
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
            <button className="mt-6 w-full max-w-xs bg-black text-white py-2 px-4 rounded-lg text-lg font-medium hover:bg-gray-900 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
