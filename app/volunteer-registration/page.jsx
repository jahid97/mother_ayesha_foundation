/**
 * Volunteer Registration Page Component
 *
 * This page allows users to register as volunteers for the Mother Aysha Foundation.
 * It includes:
 * - A multi-step registration form
 * - Information about volunteer benefits
 * - Available volunteer opportunities
 * - Testimonials from current volunteers
 * - Frequently asked questions
 *
 * The form collects personal information, skills, experience, and availability
 * to match volunteers with appropriate opportunities.
 */
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import { Calendar, Clock, Heart, Users, CheckCircle2, Loader2 } from "lucide-react"

export default function VolunteerRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Application submitted",
        description: "Thank you for your interest in volunteering with us!",
      })
      router.push("/volunteer-registration/thank-you")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[#3d3d3d] py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Volunteer</h1>
                <p className="text-gray-300 text-lg">
                  Join our team of dedicated volunteers and make a real difference in the lives of orphaned children
                  around the world. Your time and skills can help us create lasting change.
                </p>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Volunteer+With+Us"
                  alt="Volunteer with us"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Benefits */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#3d3d3d] text-center mb-12">Why Volunteer With Us?</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#4db6ac]/20 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-[#4db6ac]" />
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Make a Real Impact</h3>
                <p className="text-[#5a5a5a]">
                  Your time and skills directly contribute to improving the lives of orphaned children in need.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#4db6ac]/20 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-[#4db6ac]" />
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Join a Community</h3>
                <p className="text-[#5a5a5a]">
                  Become part of a global network of compassionate individuals dedicated to making a difference.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#4db6ac]/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-[#4db6ac]" />
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Develop New Skills</h3>
                <p className="text-[#5a5a5a]">
                  Gain valuable experience and develop new skills while contributing to a meaningful cause.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">Volunteer Registration</h2>

                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex justify-between">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step >= 1 ? "bg-[#4db6ac] text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        1
                      </div>
                      <span className="text-xs mt-1">Personal Info</span>
                    </div>
                    <div className="flex-1 flex items-center mx-2">
                      <div className={`h-1 w-full ${step >= 2 ? "bg-[#4db6ac]" : "bg-gray-200"}`}></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step >= 2 ? "bg-[#4db6ac] text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        2
                      </div>
                      <span className="text-xs mt-1">Skills & Experience</span>
                    </div>
                    <div className="flex-1 flex items-center mx-2">
                      <div className={`h-1 w-full ${step >= 3 ? "bg-[#4db6ac]" : "bg-gray-200"}`}></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step >= 3 ? "bg-[#4db6ac] text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        3
                      </div>
                      <span className="text-xs mt-1">Availability</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-[#3d3d3d] mb-4">Personal Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" type="tel" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Input id="address" required />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input id="city" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province *</Label>
                          <Input id="state" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">Zip/Postal Code *</Label>
                          <Input id="zip" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth *</Label>
                        <Input id="dob" type="date" required />
                      </div>

                      <div className="flex justify-end">
                        <Button type="button" onClick={nextStep} className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Skills and Experience */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-[#3d3d3d] mb-4">Skills and Experience</h3>

                      <div className="space-y-2">
                        <Label>Areas of Interest (Select all that apply) *</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="education" />
                            <Label htmlFor="education" className="cursor-pointer">
                              Education
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="healthcare" />
                            <Label htmlFor="healthcare" className="cursor-pointer">
                              Healthcare
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="construction" />
                            <Label htmlFor="construction" className="cursor-pointer">
                              Construction
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="fundraising" />
                            <Label htmlFor="fundraising" className="cursor-pointer">
                              Fundraising
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="administration" />
                            <Label htmlFor="administration" className="cursor-pointer">
                              Administration
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="marketing" />
                            <Label htmlFor="marketing" className="cursor-pointer">
                              Marketing/Communications
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="it" />
                            <Label htmlFor="it" className="cursor-pointer">
                              IT/Technology
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="mentoring" />
                            <Label htmlFor="mentoring" className="cursor-pointer">
                              Mentoring
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="skills">Special Skills or Qualifications</Label>
                        <Textarea
                          id="skills"
                          placeholder="Please list any special skills, qualifications, or certifications you have that may be helpful in your volunteer work."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Previous Volunteer Experience</Label>
                        <Textarea
                          id="experience"
                          placeholder="Please describe your previous volunteer experience, if any."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="languages">Languages Spoken</Label>
                        <Input id="languages" placeholder="e.g., English, Spanish, Arabic" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="motivation">Motivation for Volunteering *</Label>
                        <Textarea
                          id="motivation"
                          placeholder="Please tell us why you want to volunteer with Mother Aysha Foundation."
                          className="min-h-[100px]"
                          required
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white"
                        >
                          Previous Step
                        </Button>
                        <Button type="button" onClick={nextStep} className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white">
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Availability and References */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-[#3d3d3d] mb-4">Availability and References</h3>

                      <div className="space-y-2">
                        <Label>Volunteer Type *</Label>
                        <RadioGroup defaultValue="regular" className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="regular" id="regular" />
                            <Label htmlFor="regular" className="cursor-pointer">
                              Regular (weekly commitment)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="occasional" id="occasional" />
                            <Label htmlFor="occasional" className="cursor-pointer">
                              Occasional (monthly or as needed)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="one-time" id="one-time" />
                            <Label htmlFor="one-time" className="cursor-pointer">
                              One-time event
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="remote" id="remote" />
                            <Label htmlFor="remote" className="cursor-pointer">
                              Remote/Virtual
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>Availability (Select all that apply) *</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="weekday-morning" />
                            <Label htmlFor="weekday-morning" className="cursor-pointer">
                              Weekday Mornings
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="weekday-afternoon" />
                            <Label htmlFor="weekday-afternoon" className="cursor-pointer">
                              Weekday Afternoons
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="weekday-evening" />
                            <Label htmlFor="weekday-evening" className="cursor-pointer">
                              Weekday Evenings
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="weekend-morning" />
                            <Label htmlFor="weekend-morning" className="cursor-pointer">
                              Weekend Mornings
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="weekend-afternoon" />
                            <Label htmlFor="weekend-afternoon" className="cursor-pointer">
                              Weekend Afternoons
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="weekend-evening" />
                            <Label htmlFor="weekend-evening" className="cursor-pointer">
                              Weekend Evenings
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hours">Hours Available Per Week</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select hours" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-5">1-5 hours</SelectItem>
                            <SelectItem value="5-10">5-10 hours</SelectItem>
                            <SelectItem value="10-20">10-20 hours</SelectItem>
                            <SelectItem value="20+">20+ hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="start-date">When can you start? *</Label>
                        <Input id="start-date" type="date" required />
                      </div>

                      <div className="space-y-2">
                        <Label>Are you willing to undergo a background check? *</Label>
                        <RadioGroup defaultValue="yes" className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="bg-check-yes" />
                            <Label htmlFor="bg-check-yes" className="cursor-pointer">
                              Yes
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="bg-check-no" />
                            <Label htmlFor="bg-check-no" className="cursor-pointer">
                              No
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>Emergency Contact Information</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <Input placeholder="Name" />
                          <Input placeholder="Relationship" />
                          <Input placeholder="Phone Number" type="tel" />
                          <Input placeholder="Email" type="email" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>References</Label>
                        <p className="text-sm text-[#5a5a5a] mb-2">
                          Please provide two references who can speak to your character and abilities.
                        </p>

                        <div className="p-4 bg-gray-50 rounded-lg mb-4">
                          <h4 className="font-medium text-[#3d3d3d] mb-2">Reference 1</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input placeholder="Name" />
                            <Input placeholder="Relationship" />
                            <Input placeholder="Phone Number" type="tel" />
                            <Input placeholder="Email" type="email" />
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-[#3d3d3d] mb-2">Reference 2</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input placeholder="Name" />
                            <Input placeholder="Relationship" />
                            <Input placeholder="Phone Number" type="tel" />
                            <Input placeholder="Email" type="email" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 mt-6">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm cursor-pointer">
                          I agree to the volunteer terms and conditions, and I understand that my application will be
                          reviewed by the Mother Aysha Foundation team. *
                        </Label>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="border-[#4db6ac] text-[#4db6ac] hover:bg-[#4db6ac] hover:text-white"
                        >
                          Previous Step
                        </Button>
                        <Button
                          type="submit"
                          className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#3d3d3d] text-center mb-12">Volunteer Opportunities</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#faf6ed] rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 rounded-full bg-[#4db6ac]/20 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-[#4db6ac]" />
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Event Volunteer</h3>
                <p className="text-[#5a5a5a] mb-4">
                  Help organize and run fundraising events, awareness campaigns, and community outreach programs.
                </p>
                <ul className="text-sm text-[#5a5a5a] space-y-1 mb-4">
                  <li>• Event planning and coordination</li>
                  <li>• Guest registration and management</li>
                  <li>• Setting up and breaking down events</li>
                </ul>
                <p className="text-sm text-[#4db6ac] font-medium">Time Commitment: Flexible, event-based</p>
              </div>

              <div className="bg-[#faf6ed] rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 rounded-full bg-[#4db6ac]/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#4db6ac]" />
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Mentorship Program</h3>
                <p className="text-[#5a5a5a] mb-4">
                  Provide guidance, support, and friendship to orphaned children through our mentorship program.
                </p>
                <ul className="text-sm text-[#5a5a5a] space-y-1 mb-4">
                  <li>• One-on-one mentoring sessions</li>
                  <li>• Educational support and tutoring</li>
                  <li>• Recreational activities and outings</li>
                </ul>
                <p className="text-sm text-[#4db6ac] font-medium">
                  Time Commitment: 4-8 hours per month, 6-month minimum
                </p>
              </div>

              <div className="bg-[#faf6ed] rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 rounded-full bg-[#4db6ac]/20 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-[#4db6ac]" />
                </div>
                <h3 className="text-xl font-bold text-[#3d3d3d] mb-2">Administrative Support</h3>
                <p className="text-[#5a5a5a] mb-4">
                  Assist with office tasks, data entry, correspondence, and other administrative duties.
                </p>
                <ul className="text-sm text-[#5a5a5a] space-y-1 mb-4">
                  <li>• Database management</li>
                  <li>• Donor correspondence</li>
                  <li>• General office support</li>
                </ul>
                <p className="text-sm text-[#4db6ac] font-medium">
                  Time Commitment: 3-10 hours per week, flexible schedule
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#3d3d3d] text-center mb-12">Volunteer Testimonials</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/placeholder.svg?height=48&width=48&text=JD"
                      alt="John Doe"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3d3d3d]">John Doe</h3>
                    <p className="text-sm text-[#4db6ac]">Event Volunteer</p>
                  </div>
                </div>
                <p className="text-[#5a5a5a] italic">
                  "Volunteering with Mother Aysha Foundation has been one of the most rewarding experiences of my life.
                  Seeing the direct impact of our work on children's lives is incredibly fulfilling."
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/placeholder.svg?height=48&width=48&text=JS"
                      alt="Jane Smith"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3d3d3d]">Jane Smith</h3>
                    <p className="text-sm text-[#4db6ac]">Mentor</p>
                  </div>
                </div>
                <p className="text-[#5a5a5a] italic">
                  "Being a mentor has changed my perspective on life. The children I work with have taught me so much
                  about resilience and joy. I started as a volunteer to give back, but I've received so much more in
                  return."
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/placeholder.svg?height=48&width=48&text=MJ"
                      alt="Michael Johnson"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3d3d3d]">Michael Johnson</h3>
                    <p className="text-sm text-[#4db6ac]">Administrative Volunteer</p>
                  </div>
                </div>
                <p className="text-[#5a5a5a] italic">
                  "Even though I work behind the scenes, I know that my contribution helps the foundation run smoothly.
                  It's gratifying to use my skills to support such an important cause."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#3d3d3d] text-center mb-12">Frequently Asked Questions</h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-[#faf6ed] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#3d3d3d] mb-2">
                  What skills or qualifications do I need to volunteer?
                </h3>
                <p className="text-[#5a5a5a]">
                  We welcome volunteers with a wide range of skills and experience levels. The most important
                  qualifications are compassion, reliability, and a genuine desire to help. Specific opportunities may
                  require certain skills or background checks, especially when working directly with children.
                </p>
              </div>

              <div className="bg-[#faf6ed] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#3d3d3d] mb-2">How much time do I need to commit?</h3>
                <p className="text-[#5a5a5a]">
                  Time commitments vary depending on the volunteer role. We offer opportunities ranging from one-time
                  events to regular weekly commitments. We're flexible and appreciate any time you can give.
                </p>
              </div>

              <div className="bg-[#faf6ed] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#3d3d3d] mb-2">Can I volunteer remotely?</h3>
                <p className="text-[#5a5a5a]">
                  Yes! We offer several remote volunteer opportunities, including administrative support, social media
                  management, grant writing, and virtual mentoring. These roles allow you to make an impact from
                  anywhere in the world.
                </p>
              </div>

              <div className="bg-[#faf6ed] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[#3d3d3d] mb-2">What training will I receive?</h3>
                <p className="text-[#5a5a5a]">
                  All volunteers receive an orientation to our organization and specific training for their role. For
                  specialized positions, particularly those working directly with children, we provide comprehensive
                  training to ensure you feel prepared and confident.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-[#3d3d3d] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our team of dedicated volunteers and help us create lasting change in the lives of orphaned children
              around the world. Your time and skills can make a real difference.
            </p>
            <Button
              className="bg-[#4db6ac] hover:bg-[#3d9d93] text-white px-8 py-6 text-lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Apply Now
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

