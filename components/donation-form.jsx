// Donation form component - Allows users to enter a donation amount and submit
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DonationForm() {
  const [donationAmount, setDonationAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Add your form submission logic here
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Make a Donation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="amount">Donation Amount</Label>
          <Input
            type="number"
            id="amount"
            placeholder="Enter amount"
            className="border-gray-300 focus:border-[#4db6ac]"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-[#4db6ac] text-white hover:bg-[#3d9d93]" disabled={isSubmitting}>
          {isSubmitting ? "Donating..." : "Donate Now"}
        </Button>
      </form>
    </div>
  )
}

