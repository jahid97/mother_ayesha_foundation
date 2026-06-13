import SiteHeader from "@/components/site-header"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { siteConfig } from "@/lib/siteConfig"

export default function CookiePolicyPage() {
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
            <h1 className="text-3xl font-bold text-[#3d3d3d] mb-6">Cookie Policy</h1>
            <p className="text-[#5a5a5a] mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">1. Introduction</h2>
                <p className="text-[#5a5a5a] mb-3">
                  This Cookie Policy explains how Mother Ayesha Foundation ("we," "our," or "us") uses cookies and
                  similar technologies on our website (the "Website"). This policy is designed to help you understand
                  what cookies are, how we use them, and the choices you have regarding their use.
                </p>
              </section>

              {/* What Are Cookies */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">2. What Are Cookies?</h2>
                <p className="text-[#5a5a5a] mb-3">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you
                  visit a website. They are widely used to make websites work more efficiently, provide a better user
                  experience, and give website owners information about how their site is being used.
                </p>
                <p className="text-[#5a5a5a]">
                  Cookies allow a website to recognize your device and remember certain information about your visit,
                  such as your preferences and settings. They are not harmful and do not contain personal information
                  like your name or credit card details.
                </p>
              </section>

              {/* Types of Cookies We Use */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">3. Types of Cookies We Use</h2>
                <p className="text-[#5a5a5a] mb-3">
                  We use different types of cookies for various purposes. These include:
                </p>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">3.1 Essential Cookies</h3>
                <p className="text-[#5a5a5a] mb-3">
                  These cookies are necessary for the Website to function properly. They enable basic functions like
                  page navigation and access to secure areas of the Website. The Website cannot function properly
                  without these cookies.
                </p>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">3.2 Performance Cookies</h3>
                <p className="text-[#5a5a5a] mb-3">
                  These cookies help us understand how visitors interact with our Website by collecting and reporting
                  information anonymously. They help us improve the way our Website works by, for example, ensuring that
                  users are finding what they are looking for easily.
                </p>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">3.3 Functionality Cookies</h3>
                <p className="text-[#5a5a5a] mb-3">
                  These cookies allow the Website to remember choices you make (such as your username, language, or the
                  region you are in) and provide enhanced, more personal features. They may also be used to provide
                  services you have asked for, such as watching a video or commenting on a blog.
                </p>

                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">3.4 Targeting/Advertising Cookies</h3>
                <p className="text-[#5a5a5a]">
                  These cookies are used to deliver advertisements more relevant to you and your interests. They are
                  also used to limit the number of times you see an advertisement as well as help measure the
                  effectiveness of an advertising campaign.
                </p>
              </section>

              {/* Third-Party Cookies */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">4. Third-Party Cookies</h2>
                <p className="text-[#5a5a5a] mb-3">
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics
                  of the Website, deliver advertisements on and through the Website, and so on.
                </p>
                <p className="text-[#5a5a5a]">
                  These third-party services place cookies on your device to help us provide our services, analyze how
                  our Website is used, and show you relevant advertising. These cookies may track your online activities
                  over time and across different websites.
                </p>
              </section>

              {/* Managing Cookies */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">5. Managing Cookies</h2>
                <p className="text-[#5a5a5a] mb-3">
                  Most web browsers allow you to control cookies through their settings preferences. However, if you
                  limit the ability of websites to set cookies, you may worsen your overall user experience, since it
                  will no longer be personalized to you.
                </p>
                <p className="text-[#5a5a5a] mb-3">
                  You can manage your cookie preferences through your browser settings. Here's how to do it in some
                  popular browsers:
                </p>
                <ul className="list-disc pl-6 text-[#5a5a5a] mb-3 space-y-1">
                  <li>
                    <strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                  </li>
                  <li>
                    <strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
                  </li>
                  <li>
                    <strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Cookies and site data
                  </li>
                </ul>
                <p className="text-[#5a5a5a]">
                  Please note that disabling certain cookies may impact the functionality of our Website.
                </p>
              </section>

              {/* Changes to This Cookie Policy */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">6. Changes to This Cookie Policy</h2>
                <p className="text-[#5a5a5a] mb-3">
                  We may update our Cookie Policy from time to time. We will notify you of any changes by posting the
                  new Cookie Policy on this page and updating the "Last Updated" date at the top of this page.
                </p>
                <p className="text-[#5a5a5a]">
                  We encourage you to review this Cookie Policy periodically for any changes. Your continued use of our
                  Website after we post changes to the Cookie Policy will constitute your acknowledgment of the changes
                  and your consent to abide by and be bound by the modified Cookie Policy.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-3">7. Contact Us</h2>
                <p className="text-[#5a5a5a] mb-3">
                  If you have any questions or concerns about this Cookie Policy or our use of cookies, please contact
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

