"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Heart, ChevronRight, Lock, User, Mail, Phone, MessageSquare } from "lucide-react"

const PRESET_AMOUNTS = [500, 1000, 2000, 5000, 10000]

export default function DonateForm({ initialProjectId, projectDetails = null }) {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [info, setInfo] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const finalAmount = amount === "custom" ? customAmount : amount

  const handleInfoChange = (e) =>
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      setError("Please select or enter a donation amount.")
      return
    }
    if (!info.firstName || !info.lastName || !info.email || !info.phone) {
      setError("Please fill in all required fields.")
      return
    }
    setError("")
    setSubmitting(true)

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...info,
          amount: parseFloat(finalAmount),
          paymentMethod: "aamarpay",
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
        <div className="max-w-xl mx-auto">

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-[#3d3d3d] to-[#4db6ac] px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">Make a Donation</h2>
                  <p className="text-white/70 text-xs">Secure payment via AamarPay</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-7">

              {/* Project badge */}
              {projectDetails && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#4db6ac]/10 border border-[#4db6ac]/20">
                  {projectDetails.image && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={projectDetails.image} alt={projectDetails.title} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] text-[#4db6ac] font-bold uppercase tracking-widest">Donating to</p>
                    <p className="font-semibold text-[#3d3d3d] text-sm">{projectDetails.title}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-7">

                {/* ── Amount ── */}
                <div>
                  <p className="text-xs font-bold text-[#3d3d3d] uppercase tracking-widest mb-3">Select Amount (BDT)</p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                    {PRESET_AMOUNTS.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => { setAmount(String(a)); setCustomAmount("") }}
                        className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                          amount === String(a)
                            ? "border-[#4db6ac] bg-[#4db6ac] text-white shadow-md"
                            : "border-gray-200 text-[#3d3d3d] hover:border-[#4db6ac] hover:text-[#4db6ac]"
                        }`}
                      >
                        ৳{a.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all ${amount === "custom" ? "border-[#4db6ac] bg-[#4db6ac]/5" : "border-gray-200"}`}>
                    <span className="text-[#4db6ac] font-bold mr-2">৳</span>
                    <input
                      type="number"
                      min="1"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setAmount("custom") }}
                      placeholder="Enter custom amount"
                      className="flex-1 outline-none text-sm text-[#3d3d3d] bg-transparent placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* ── Your Info ── */}
                <div>
                  <p className="text-xs font-bold text-[#3d3d3d] uppercase tracking-widest mb-3">Your Information</p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="firstName"
                          value={info.firstName}
                          onChange={handleInfoChange}
                          placeholder="First name"
                          required
                          className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac] focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          name="lastName"
                          value={info.lastName}
                          onChange={handleInfoChange}
                          placeholder="Last name"
                          required
                          className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        name="email"
                        type="email"
                        value={info.email}
                        onChange={handleInfoChange}
                        placeholder="Email address"
                        required
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac] focus:border-transparent"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        name="phone"
                        type="tel"
                        value={info.phone}
                        onChange={handleInfoChange}
                        placeholder="Phone number (01XXXXXXXXX)"
                        required
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac] focus:border-transparent"
                      />
                    </div>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <textarea
                        name="message"
                        value={info.message}
                        onChange={handleInfoChange}
                        placeholder="Message (optional)"
                        rows={2}
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4db6ac] focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* ── Summary ── */}
                {finalAmount && parseFloat(finalAmount) > 0 && (
                  <div className="bg-[#faf6ed] border border-[#4db6ac]/20 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-[#5a5a5a]">Donating to</p>
                      <p className="font-semibold text-[#3d3d3d] text-sm">{projectDetails?.title || "General Fund"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#5a5a5a]">Total</p>
                      <p className="text-2xl font-bold text-[#4db6ac]">৳{parseFloat(finalAmount).toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {error && (
                  <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
                )}

                {/* ── Submit ── */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#4db6ac] hover:bg-[#3d9d93] disabled:opacity-60 text-white font-bold py-4 rounded-xl text-base transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Redirecting to AamarPay…
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 fill-white" />
                      Proceed to Payment
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                {/* ── Accepted payments ── */}
                <div className="text-center">
                  <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1 mb-2">
                    <Lock className="w-3 h-3" /> Secured by AamarPay
                  </p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {["bKash", "Nagad", "Rocket", "Visa", "Mastercard", "DBBL"].map((m) => (
                      <span key={m} className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
