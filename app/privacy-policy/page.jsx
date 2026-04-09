import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { siteConfig } from "@/lib/siteConfig"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf6ed]">
      <SiteHeader />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-[#4db6ac] hover:text-[#3d9d93] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h1 className="text-3xl font-bold text-[#3d3d3d] mb-6">Privacy Policy</h1>
            <p className="text-[#5a5a5a] mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">1. Introduction</h2>
                <p className="text-[#5a5a5a] mb-3">
                  Mother Aysha Foundation ("we," "our," or "us") is committed to protecting your privacy. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                  website, use our services, or interact with us in any way.
                </p>
                <p className="text-[#5a5a5a]">
                  We value your trust and strive to be transparent about our data practices. Please read this policy
                  carefully to understand our practices regarding your personal information and how we will treat it.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">2. Information We Collect</h2>
                <p className="text-[#5a5a5a] mb-3">
                  We may collect several types of information from and about users of our website, including:
                </p>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">2.1 Personal Information</h3>
                <p className="text-[#5a5a5a] mb-3">
                  Personal information is data that can be used to identify you individually. This may include:
                </p>
                <ul className="list-disc pl-6 text-[#5a5a5a] mb-3 space-y-1">
                  <li>Name, email address, postal address, and phone number</li>
                  <li>Payment information when you make a donation</li>
                  <li>Information provided when registering for events or volunteer opportunities</li>
                  <li>Information provided in communications with us</li>
                </ul>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">2.2 Non-Personal Information</h3>
                <p className="text-[#5a5a5a] mb-3">
                  We may also collect non-personal information about your interaction with our website, including:
                </p>
                <ul className="list-disc pl-6 text-[#5a5a5a] mb-3 space-y-1">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>IP address</li>
                  <li>Pages visited and time spent on those pages</li>
                  <li>Referring website addresses</li>
                </ul>
              </section>

              {/* How We Collect Information */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">3. How We Collect Information</h2>
                <p className="text-[#5a5a5a] mb-3">We collect information in the following ways:</p>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">3.1 Direct Collection</h3>
                <p className="text-[#5a5a5a] mb-3">Information you provide to us directly when you:</p>
                <ul className="list-disc pl-6 text-[#5a5a5a] mb-3 space-y-1">
                  <li>Fill out forms on our website</li>
                  <li>Make a donation</li>
                  <li>Register for events or volunteer opportunities</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us via email, phone, or other means</li>
                </ul>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">3.2 Automated Collection</h3>
                <p className="text-[#5a5a5a] mb-3">
                  As you navigate through our website, we may use automatic data collection technologies such as:
                </p>
                <ul className="list-disc pl-6 text-[#5a5a5a] mb-3 space-y-1">
                  <li>Cookies (see our Cookie Policy section for more details)</li>
                  <li>Web beacons</li>
                  <li>Analytics tools</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">4. How We Use Your Information</h2>
                <p className="text-[#5a5a5a] mb-3">
                  We use the information we collect for various purposes, including to:
                </p>
                <ul className="list-disc pl-6 text-[#5a5a5a] mb-3 space-y-1">
                  <li>Process donations and provide receipts</li>
                  <li>Respond to your inquiries and provide customer service</li>
                  <li>Send you newsletters and updates about our work (if you've opted in)</li>
                  <li>Coordinate volunteer activities and events</li>
                  <li>Improve our website and services</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraudulent activity and enhance security</li>
                </ul>
              </section>

              {/* Sharing Your Information */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">5. Sharing Your Information</h2>
                <p className="text-[#5a5a5a] mb-3">
                  We respect your privacy and are committed to protecting your personal information. We do not sell,
                  trade, or rent your personal information to third parties. However, we may share your information in
                  the following circumstances:
                </p>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">5.1 Service Providers</h3>
                <p className="text-[#5a5a5a] mb-3">
                  We may share your information with trusted third-party service providers who assist us in operating
                  our website, conducting our business, or providing services to you. These service providers have
                  access to your personal information only to perform specific tasks on our behalf and are obligated to
                  maintain its confidentiality.
                </p>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">5.2 Legal Requirements</h3>
                <p className="text-[#5a5a5a] mb-3">
                  We may disclose your information if required to do so by law or in response to valid requests by
                  public authorities (e.g., a court or government agency).
                </p>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">5.3 Protection of Rights</h3>
                <p className="text-[#5a5a5a] mb-3">
                  We may disclose your information to protect our rights, privacy, safety, or property, and that of our
                  donors, beneficiaries, or the public.
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">6. Data Security</h2>
                <p className="text-[#5a5a5a] mb-3">
                  We implement appropriate security measures to protect your personal information from unauthorized
                  access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 text-[#5a5a5a] mb-3 space-y-1">
                  <li>Secure Socket Layer (SSL) technology for secure data transmission</li>
                  <li>Encryption of sensitive information</li>
                  <li>Regular security assessments</li>
                  <li>Limited access to personal information by authorized personnel only</li>
                </ul>
                <p className="text-[#5a5a5a]">
                  However, please be aware that no method of transmission over the internet or electronic storage is
                  100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              {/* Cookies and Tracking Technologies */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">7. Cookies and Tracking Technologies</h2>
                <p className="text-[#5a5a5a] mb-3">
                  Our website uses cookies and similar tracking technologies to enhance your browsing experience,
                  analyze website traffic, and personalize content.
                </p>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">7.1 What Are Cookies?</h3>
                <p className="text-[#5a5a5a] mb-3">
                  Cookies are small text files that are stored on your device when you visit a website. They help us
                  recognize your device and remember certain information about your visit.
                </p>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">7.2 Types of Cookies We Use</h3>
                <ul className="list-disc pl-6 text-[#5a5a5a] mb-3 space-y-1">
                  <li>
                    <strong>Essential Cookies:</strong> Necessary for the website to function properly
                  </li>
                  <li>
                    <strong>Analytical/Performance Cookies:</strong> Help us understand how visitors interact with our
                    website
                  </li>
                  <li>
                    <strong>Functionality Cookies:</strong> Allow the website to remember choices you make
                  </li>
                  <li>
                    <strong>Targeting Cookies:</strong> Record your visit to our website, the pages you visit, and the
                    links you follow
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">7.3 Managing Cookies</h3>
                <p className="text-[#5a5a5a]">
                  Most web browsers allow you to control cookies through their settings. You can usually find these
                  settings in the "Options" or "Preferences" menu of your browser. However, if you disable cookies, some
                  features of our website may not function properly.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">8. Your Rights</h2>
                <p className="text-[#5a5a5a] mb-3">
                  Depending on your location, you may have certain rights regarding your personal information,
                  including:
                </p>
                <ul className="list-disc pl-6 text-[#5a5a5a] mb-3 space-y-1">
                  <li>The right to access your personal information</li>
                  <li>The right to correct inaccurate or incomplete information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to restrict or object to processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time (where processing is based on consent)</li>
                </ul>
                <p className="text-[#5a5a5a]">
                  To exercise any of these rights, please contact us using the information provided in the "Contact Us"
                  section below.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">9. Children's Privacy</h2>
                <p className="text-[#5a5a5a] mb-3">
                  Our website is not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If you are a parent or guardian and believe that your child has
                  provided us with personal information, please contact us, and we will take steps to remove that
                  information from our systems.
                </p>
              </section>

              {/* Changes to This Privacy Policy */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">10. Changes to This Privacy Policy</h2>
                <p className="text-[#5a5a5a] mb-3">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last Updated" date at the top of this page.
                </p>
                <p className="text-[#5a5a5a]">
                  We encourage you to review this Privacy Policy periodically for any changes. Your continued use of our
                  website after we post changes to the Privacy Policy will constitute your acknowledgment of the changes
                  and your consent to abide by and be bound by the modified Privacy Policy.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">11. Contact Us</h2>
                <p className="text-[#5a5a5a] mb-3">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact
                  us at:
                </p>
                <div className="bg-[#faf6ed] p-4 rounded-lg">
                  <p className="text-[#3d3d3d] font-medium">{siteConfig.name}</p>
                  <p className="text-[#5a5a5a]">{siteConfig.contact.address.line1}</p>
                  <p className="text-[#5a5a5a]">{siteConfig.contact.address.line2}</p>
                  <p className="text-[#5a5a5a]">{siteConfig.contact.address.line3}</p>
                  <p className="text-[#5a5a5a]">Email: {siteConfig.contact.email}</p>
                  <p className="text-[#5a5a5a]">Phone: {siteConfig.contact.phone}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

