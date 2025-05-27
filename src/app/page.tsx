"use client"

import MealPlannerForm from "@/components/home/MealPlannerForm"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">AI-Powered Meal Plan Generator</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create personalized, nutritionally balanced meal plans tailored to your dietary preferences and health goals.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-6">Your Preferences</h2>
            <MealPlannerForm />
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-6">Your Meal Plan</h2>
            {/* <MealPlanOutput /> */}
          </div>
        </div>
      </div>
    </main>
  )
}
