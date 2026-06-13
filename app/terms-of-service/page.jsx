import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { siteConfig } from "@/lib/siteConfig"

export default function TermsOfServicePage() {
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
            <h1 className="text-3xl font-bold text-[#3d3d3d] mb-6">Terms of Service</h1>
            <p className="text-[#5a5a5a] mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">1. Introduction</h2>
                <p className="text-[#5a5a5a] mb-3">
                  Welcome to the Mother Ayesha Foundation website. These Terms of Service ("Terms") govern your use of
                  our website located at www.motherayesha.org (the "Website") and all related services offered by Mother
                  Aysha Foundation ("we," "our," or "us").
                </p>
                <p className="text-[#5a5a5a]">
                  By accessing or using our Website, you agree to be bound by these Terms. If you disagree with any part
                  of the Terms, you may not access the Website.
                </p>
              </section>

              {/* Use of Website */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">2. Use of Website</h2>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">2.1 Eligibility</h3>
                <p className="text-[#5a5a5a] mb-3">
                  You must be at least 13 years old to use our Website. By using our Website, you represent and warrant
                  that you meet this requirement.
                </p>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">2.2 Acceptable Use</h3>
                <p className="text-[#5a5a5a] mb-3">
                  You agree to use our Website only for lawful purposes and in accordance with these Terms. You agree
                  not to use our Website:
                </p>
                <ul className="list-disc pl-6 text-[#5a5a5a] mb-3 space-y-1">
                  <li>
                    In any way that violates any applicable federal, state, local, or international law or regulation
                  </li>
                  <li>
                    To transmit, or procure the sending of, any advertising or promotional material, including any "junk
                    mail," "chain letter," "spam," or any other similar solicitation
                  </li>
                  <li>
                    To impersonate or attempt to impersonate the Foundation, a Foundation employee, another user, or any
                    other person or entity
                  </li>
                  <li>
                    To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website,
                    or which may harm the Foundation or users of the Website
                  </li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">3. Intellectual Property</h2>
                <p className="text-[#5a5a5a] mb-3">
                  The Website and its entire contents, features, and functionality (including but not limited to all
                  information, software, text, displays, images, video, and audio, and the design, selection, and
                  arrangement thereof) are owned by the Mother Ayesha Foundation, its licensors, or other providers of
                  such material and are protected by United States and international copyright, trademark, patent, trade
                  secret, and other intellectual property or proprietary rights laws.
                </p>
                <p className="text-[#5a5a5a]">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly
                  perform, republish, download, store, or transmit any of the material on our Website without our prior
                  written consent.
                </p>
              </section>

              {/* User Contributions */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">4. User Contributions</h2>
                <p className="text-[#5a5a5a] mb-3">
                  Our Website may contain message boards, chat rooms, personal web pages or profiles, forums, bulletin
                  boards, and other interactive features that allow users to post, submit, publish, display, or transmit
                  content or materials.
                </p>
                <p className="text-[#5a5a5a] mb-3">
                  Any content you post to the Website will be considered non-confidential and non-proprietary. By
                  providing any content on the Website, you grant us and our affiliates and service providers, and each
                  of their and our respective licensees, successors, and assigns the right to use, reproduce, modify,
                  perform, display, distribute, and otherwise disclose to third parties any such material.
                </p>
                <p className="text-[#5a5a5a]">
                  You represent and warrant that all of your content complies with these Terms and that you own or have
                  the necessary rights to all content you submit.
                </p>
              </section>

              {/* Donations */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">5. Donations</h2>
                <p className="text-[#5a5a5a] mb-3">
                  When you make a donation through our Website, you agree to provide accurate and complete information.
                  You represent and warrant that you have the legal right to use any payment method you provide.
                </p>
                <p className="text-[#5a5a5a] mb-3">
                  All donations are final and non-refundable. If you believe an error has occurred in your donation,
                  please contact us immediately.
                </p>
                <p className="text-[#5a5a5a]">
                  We use industry-standard security measures to protect your payment information. However, we cannot
                  guarantee that these measures will prevent unauthorized access to your information.
                </p>
              </section>

              {/* Links to Other Websites */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">6. Links to Other Websites</h2>
                <p className="text-[#5a5a5a] mb-3">
                  Our Website may contain links to third-party websites or services that are not owned or controlled by
                  the Mother Ayesha Foundation.
                </p>
                <p className="text-[#5a5a5a]">
                  The Mother Ayesha Foundation has no control over, and assumes no responsibility for, the content,
                  privacy policies, or practices of any third-party websites or services. We do not warrant the
                  offerings of any of these entities/individuals or their websites. You acknowledge and agree that the
                  Mother Ayesha Foundation shall not be responsible or liable, directly or indirectly, for any damage or
                  loss caused or alleged to be caused by or in connection with the use of or reliance on any such
                  content, goods, or services available on or through any such third-party websites or services.
                </p>
              </section>

              {/* Disclaimer of Warranties */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">7. Disclaimer of Warranties</h2>
                <p className="text-[#5a5a5a] mb-3">
                  Your use of our Website is at your sole risk. The Website is provided on an "AS IS" and "AS AVAILABLE"
                  basis. The Mother Ayesha Foundation expressly disclaims all warranties of any kind, whether express or
                  implied, including but not limited to the implied warranties of merchantability, fitness for a
                  particular purpose, and non-infringement.
                </p>
                <p className="text-[#5a5a5a]">
                  We do not guarantee that the Website will meet your requirements, be available on an uninterrupted,
                  timely, secure, or error-free basis, or that the results that may be obtained from the use of the
                  Website will be accurate or reliable.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">8. Limitation of Liability</h2>
                <p className="text-[#5a5a5a] mb-3">
                  In no event shall the Mother Ayesha Foundation, its directors, employees, partners, agents, suppliers,
                  or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages,
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                  resulting from:
                </p>
                <ul className="list-disc pl-6 text-[#5a5a5a] mb-3 space-y-1">
                  <li>Your access to or use of or inability to access or use the Website</li>
                  <li>Any conduct or content of any third party on the Website</li>
                  <li>Any content obtained from the Website</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                </ul>
              </section>

              {/* Indemnification */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">9. Indemnification</h2>
                <p className="text-[#5a5a5a]">
                  You agree to defend, indemnify, and hold harmless the Mother Ayesha Foundation, its directors,
                  employees, partners, agents, suppliers, and affiliates from and against any claims, liabilities,
                  damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees)
                  arising out of or relating to your violation of these Terms or your use of the Website.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">10. Governing Law</h2>
                <p className="text-[#5a5a5a]">
                  These Terms shall be governed and construed in accordance with the laws of the State of New York,
                  without regard to its conflict of law provisions. Our failure to enforce any right or provision of
                  these Terms will not be considered a waiver of those rights.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">11. Changes to Terms</h2>
                <p className="text-[#5a5a5a] mb-3">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will
                  provide notice of any changes by posting the new Terms on this page and updating the "Last Updated"
                  date.
                </p>
                <p className="text-[#5a5a5a]">
                  Your continued use of our Website after any such changes constitutes your acceptance of the new Terms.
                  If you do not agree to the new Terms, you are no longer authorized to use the Website.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">12. Contact Us</h2>
                <p className="text-[#5a5a5a] mb-3">
                  If you have any questions about these Terms, please contact us at:
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

