"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, CreditCard, Landmark, Wallet } from "lucide-react"
import { toast } from "sonner"
export default function DonateForm({ initialProjectId, projectDetails = null }) {
  const [selectedProject] = useState(initialProjectId)
  const [donationAmount, setDonationAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Set donation amount when a preset button is clicked
  const handleAmountClick = (amount) => {
    setDonationAmount(amount)
    setCustomAmount("")
  }

  // Handle custom amount input
  const handleCustomAmountChange = (e) => {
    const value = e.target.value
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setCustomAmount(value)
      setDonationAmount("custom")
    }
  }

  const [donorInfo, setDonorInfo] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" })
  const [isRecurring, setIsRecurring] = useState(false)

  const handleDonorChange = (e) => setDonorInfo((prev) => ({ ...prev, [e.target.id.replace("-", "")]: e.target.value }))

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const amount = donationAmount === "custom" ? customAmount : donationAmount
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...donorInfo,
          amount: parseFloat(amount),
          isRecurring,
          projectId: selectedProject || null,
          paymentMethod,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to process donation.")
      toast.success("Thank you for your donation!", {
        description: "You will receive a receipt via email shortly.",
      })
    } catch (err) {
      toast.error("Donation failed.", { description: err.message })
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">Your Donation</h2>

            <form onSubmit={handleSubmit}>
              {/* Project Information */}
              <div className="mb-8">
                {projectDetails ? (
                  <div className="p-4 bg-[#4db6ac]/10 rounded-lg">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative h-32 w-full md:w-48 rounded-lg overflow-hidden">
                        <Image
                          src={projectDetails.image || "/placeholder.svg"}
                          alt={projectDetails.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-[#3d3d3d] mb-2">{projectDetails.title}</h3>
                        <p className="text-[#5a5a5a] mb-3">{projectDetails.description}</p>
                        <Link
                          href={`/projects/${projectDetails.id}`}
                          className="text-[#4db6ac] hover:underline text-sm"
                        >
                          Learn more about this project
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#4db6ac]/10 rounded-lg">
                    <h3 className="text-lg font-medium text-[#3d3d3d] mb-2">General Donation</h3>
                    <p className="text-[#5a5a5a]">
                      Your donation will support all our projects and initiatives. We'll allocate your contribution
                      where it's needed most to help orphaned children around the world.
                    </p>
                  </div>
                )}
              </div>

              {/* Step 2: Choose Amount */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-[#3d3d3d] mb-4">2. Select donation amount</h3>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {["25", "50", "100", "250", "500", "custom"].map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={donationAmount === amount ? "default" : "outline"}
                      className={
                        donationAmount === amount
                          ? "bg-[#4db6ac] hover:bg-[#3d9d93] text-white"
                          : "border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white"
                      }
                      onClick={() => handleAmountClick(amount)}
                    >
                      {amount === "custom" ? "Custom" : `$${amount}`}
                    </Button>
                  ))}
                </div>

                {donationAmount === "custom" && (
                  <div className="mb-4">
                    <Label htmlFor="custom-amount" className="mb-2 block">
                      Enter custom amount:
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5a5a]">$</span>
                      <Input
                        id="custom-amount"
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="0.00"
                        className="pl-8"
                        required={donationAmount === "custom"}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3 mt-4">
                  <input type="checkbox" id="recurring" className="mt-1" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />
                  <Label htmlFor="recurring" className="flex-1 cursor-pointer">
                    <div className="font-medium text-[#3d3d3d]">Make this a monthly donation</div>
                    <div className="text-sm text-[#5a5a5a]">
                      Your recurring donation helps us plan and sustain our programs for the long term.
                    </div>
                  </Label>
                </div>
              </div>

              {/* Step 3: Personal Information */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-[#3d3d3d] mb-4">3. Your information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="first-name" className="mb-2 block">First Name</Label>
                    <Input id="first-name" value={donorInfo.firstName} onChange={handleDonorChange} required />
                  </div>
                  <div>
                    <Label htmlFor="last-name" className="mb-2 block">Last Name</Label>
                    <Input id="last-name" value={donorInfo.lastName} onChange={handleDonorChange} required />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block">Email</Label>
                    <Input id="email" type="email" value={donorInfo.email} onChange={handleDonorChange} required />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2 block">Phone (optional)</Label>
                    <Input id="phone" type="tel" value={donorInfo.phone} onChange={handleDonorChange} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="mb-2 block">Message (optional)</Label>
                  <Textarea
                    id="message"
                    value={donorInfo.message}
                    onChange={handleDonorChange}
                    placeholder="Share why you're donating or any special instructions"
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              {/* Step 4: Payment Method */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-[#3d3d3d] mb-4">4. Payment method</h3>

                <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="credit-card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Credit Card</span>
                    </TabsTrigger>
                    <TabsTrigger value="bank-transfer" className="flex items-center gap-2">
                      <Landmark className="h-4 w-4" />
                      <span>Bank Transfer</span>
                    </TabsTrigger>
                    <TabsTrigger value="paypal" className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      <span>PayPal</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="credit-card">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="card-number" className="mb-2 block">
                          Card Number
                        </Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div>
                        <Label htmlFor="expiry" className="mb-2 block">
                          Expiry Date
                        </Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="mb-2 block">
                          CVV
                        </Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="card-name" className="mb-2 block">
                          Name on Card
                        </Label>
                        <Input id="card-name" required />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="bank-transfer">
                    <div className="p-4 bg-[#4db6ac]/10 rounded-lg mb-4">
                      <h4 className="font-medium text-[#3d3d3d] mb-2">Bank Transfer Information</h4>
                      <p className="text-[#5a5a5a] mb-4">
                        Please use the following details to make your bank transfer. Include your name and "Donation" in
                        the reference.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">Bank Name:</span>
                          <span>Mother Ayesha Foundation Bank</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Account Name:</span>
                          <span>Mother Ayesha Foundation</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Account Number:</span>
                          <span>1234567890</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Routing Number:</span>
                          <span>987654321</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">SWIFT/BIC:</span>
                          <span>MAFBANKXXX</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="transfer-reference" className="mb-2 block">
                        Transfer Reference
                      </Label>
                      <Input id="transfer-reference" placeholder="Your Name - Donation" required />
                    </div>
                  </TabsContent>

                  <TabsContent value="paypal">
                    <div className="text-center p-6">
                      <p className="text-[#5a5a5a] mb-4">
                        You will be redirected to PayPal to complete your donation after clicking the "Donate Now"
                        button.
                      </p>
                      <Image
                        src="/placeholder.svg?height=60&width=200&text=PayPal"
                        alt="PayPal"
                        width={200}
                        height={60}
                        className="mx-auto"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Donation Summary */}
              <div className="mb-8 p-4 bg-[#4db6ac]/10 rounded-lg">
                <h3 className="text-lg font-medium text-[#3d3d3d] mb-2">Donation Summary</h3>
                <div className="flex justify-between mb-2">
                  <span>Donation Amount:</span>
                  <span className="font-medium">
                    ${donationAmount === "custom" ? customAmount || "0.00" : donationAmount || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Donation Type:</span>
                  <span className="font-medium">
                    {projectDetails ? `Project: ${projectDetails.title}` : "General Donation"}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-lg border-t border-[#4db6ac]/30 pt-2 mt-2">
                  <span>Total:</span>
                  <span>${donationAmount === "custom" ? customAmount || "0.00" : donationAmount || "0.00"}</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#4db6ac] hover:bg-[#3d9d93] text-white text-lg py-6"
                disabled={isSubmitting || !donationAmount || (donationAmount === "custom" && !customAmount)}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Heart className="mr-2 h-5 w-5" />
                    Donate Now
                  </span>
                )}
              </Button>

              <p className="text-center text-sm text-[#5a5a5a] mt-4">
                Your donation is tax-deductible. You will receive a receipt via email.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

