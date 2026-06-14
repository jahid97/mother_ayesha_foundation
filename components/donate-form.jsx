"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Heart, CreditCard, Building2, Wallet, Smartphone, ChevronRight, Lock } from "lucide-react"

const PRESET_AMOUNTS = [500, 1000, 2000, 5000, 10000]

const PAYMENT_METHODS = [
  { id: "online",     label: "Online Banking",      sub: "bKash · Nagad · Rocket", Icon: Smartphone, color: "#4db6ac" },
  { id: "card",       label: "Debit / Credit Card", sub: "Visa · Mastercard",       Icon: CreditCard, color: "#3d7fc1" },
  { id: "netbanking", label: "Internet Banking",    sub: "All BD banks",             Icon: Building2,  color: "#6366f1" },
]

export default function DonateForm({ initialProjectId, projectDetails = null }) {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [info, setInfo] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const finalAmount = amount === "custom" ? customAmount : amount

  const handleInfoChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!finalAmount || parseFloat(finalAmount) <= 0) { setError("Please select or enter a donation amount."); return }
    if (!paymentMethod) { setError("Please select a payment method."); return }
    if (!info.firstName || !info.lastName || !info.email || !info.phone) { setError("Please fill in all required fields."); return }
    setError("")
    setSubmitting(true)

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...info,
          amount: parseFloat(finalAmount),
          paymentMethod,
          projectId: initialProjectId || null,
          currency: "BDT",
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong.")

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        router.push("/donate/success")
      }
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">

            {/* Project context */}
            {projectDetails && (
              <div className="mb-8 p-4 rounded-xl bg-[#4db6ac]/10 border border-[#4db6ac]/20 flex items-center gap-4">
                {projectDetails.image && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={projectDetails.image} alt={projectDetails.title} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="text-xs text-[#4db6ac] font-semibold uppercase tracking-wide mb-0.5">Donating to</p>
                  <p className="font-bold text-[#3d3d3d]">{projectDetails.title}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* ── Step 1: Amount ── */}
              <div>
                <h3 className="text-base font-semibold text-[#3d3d3d] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4db6ac] text-white text-xs font-bold flex items-center justify-center">1</span>
                  Select Donation Amount
                </h3>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                  {PRESET_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { setAmount(String(a)); setCustomAmount("") }}
                      className={`py-2.5 rounded-lg text-sm font-bold border-2 transition-all ${
                        amount === String(a)
                          ? "border-[#4db6ac] bg-[#4db6ac] text-white"
                          : "border-gray-200 text-[#3d3d3d] hover:border-[#4db6ac] hover:text-[#4db6ac]"
                      }`}
                    >
                      ৳{a.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className={`flex items-center border-2 rounded-lg px-3 py-2.5 transition-all ${amount === "custom" ? "border-[#4db6ac]" : "border-gray-200"}`}>
                  <span className="text-[#5a5a5a] font-semibold mr-2 text-sm">৳</span>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setAmount("custom") }}
                    placeholder="Custom amount"
                    className="flex-1 outline-none text-sm text-[#3d3d3d] bg-transparent"
                  />
                </div>
              </div>

              {/* ── Step 2: Payment Method ── */}
              <div>
                <h3 className="text-base font-semibold text-[#3d3d3d] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4db6ac] text-white text-xs font-bold flex items-center justify-center">2</span>
                  Payment Method
                </h3>

                <div className="flex gap-2 mb-3">
                  {PAYMENT_METHODS.map(({ id, label, Icon, color }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPaymentMethod(id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-full border text-xs font-semibold transition-all ${
                        paymentMethod === id
                          ? "border-[#4db6ac] bg-[#4db6ac] text-white"
                          : "border-gray-200 text-gray-500 hover:border-[#4db6ac] hover:text-[#4db6ac] bg-white"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{label}</span>
                    </button>
                  ))}
                </div>

                <p className="text-xs text-[#5a5a5a] flex items-center gap-1.5">
                  <Lock className="w-3 h-3 flex-shrink-0" />
                  You'll be redirected to AamarPay's secure checkout to complete your payment.
                </p>
              </div>

              {/* ── Step 3: Your Details ── */}
              <div>
                <h3 className="text-base font-semibold text-[#3d3d3d] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4db6ac] text-white text-xs font-bold flex items-center justify-center">3</span>
                  Your Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#3d3d3d] mb-1">First Name <span className="text-red-500">*</span></label>
                    <input name="firstName" value={info.firstName} onChange={handleInfoChange} required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#3d3d3d] mb-1">Last Name <span className="text-red-500">*</span></label>
                    <input name="lastName" value={info.lastName} onChange={handleInfoChange} required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#3d3d3d] mb-1">Email <span className="text-red-500">*</span></label>
                    <input name="email" type="email" value={info.email} onChange={handleInfoChange} required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#3d3d3d] mb-1">Phone <span className="text-red-500">*</span></label>
                    <input name="phone" type="tel" value={info.phone} onChange={handleInfoChange} required placeholder="01XXXXXXXXX"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#3d3d3d] mb-1">Message <span className="text-gray-400 font-normal">(optional)</span></label>
                    <textarea name="message" value={info.message} onChange={handleInfoChange} rows={2}
                      placeholder="Share why you're donating..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac]" />
                  </div>
                </div>
              </div>

              {/* ── Summary ── */}
              {finalAmount && parseFloat(finalAmount) > 0 && (
                <div className="bg-[#faf6ed] border border-[#4db6ac]/20 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-[#5a5a5a] uppercase tracking-wide mb-3">Donation Summary</h4>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[#5a5a5a]">Donation to</span>
                    <span className="font-medium text-[#3d3d3d]">{projectDetails?.title || "General Fund"}</span>
                  </div>
                  {paymentMethod && (
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-[#5a5a5a]">Payment via</span>
                      <span className="font-medium text-[#3d3d3d]">{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label}</span>
                    </div>
                  )}
                  <div className="border-t border-[#4db6ac]/20 mt-2 pt-2 flex justify-between items-center">
                    <span className="font-semibold text-[#3d3d3d]">Total</span>
                    <span className="text-xl font-bold text-[#4db6ac]">৳{parseFloat(finalAmount).toLocaleString()}</span>
                  </div>
                </div>
              )}

              {error && (
                <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>
              )}

              {/* ── Submit ── */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#4db6ac] hover:bg-[#3d9d93] disabled:opacity-60 text-white font-bold py-4 rounded-xl text-base transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Redirecting to payment…
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4" />
                    Proceed to Payment
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-[#5a5a5a] flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" />
                Secured by AamarPay · bKash · Nagad · Rocket · Card · Net Banking
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
