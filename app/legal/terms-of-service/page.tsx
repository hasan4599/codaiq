"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";

const LegalPage = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-gray-100 font-poppins overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[2%] -z-10" />

      {/* Main Content */}
      <div className="relative z-10 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="py-20 max-w-5xl mx-auto">
          {/* Glassmorphism container */}
          <div className="backdrop-blur-xl bg-slate-900/40 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/10 ring-1 ring-white/5">
            <div className="prose prose-invert max-w-none">
              {/* Header Section */}
              <div className="text-center mb-8 sm:mb-12">
                <div className="inline-block mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent mb-6 leading-tight">
                  Codaiq · Terms of Service
                </h1>
                <div className="inline-block bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <p className="text-indigo-200 text-sm sm:text-base font-medium">
                    <strong>Webdesignoo Ltd. – Effective 26 May 2025</strong>
                  </p>
                </div>
              </div>

              {/* Plain English Note */}
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/20 border border-blue-400/30 rounded-2xl p-6 mb-8 sm:mb-12 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center text-blue-300 text-2xl backdrop-blur-sm">
                    💡
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent mb-3">
                      Plain-English Note
                    </h3>
                    <p className="text-blue-200 text-base leading-relaxed">
                      These Terms form a legally binding contract between you
                      and Webdesignoo Ltd. ("Codaiq," "we," "us"). By accessing
                      or using any Codaiq product—including the web-builder,
                      APIs, templates, or the codaiq.com website—you agree to
                      everything below and to all documents referenced herein
                      (Privacy Policy, Cookie/GDPR Policy, Refund & Cancellation
                      Policy, Acceptable Use Policy, DMCA Policy, and, if
                      applicable, the Data Processing Addendum and Service Level
                      Agreement).{" "}
                      <strong>
                        If you do not agree, do not use the Service.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="bg-gradient-to-r from-slate-800/40 to-indigo-800/20 border border-indigo-500/30 rounded-2xl p-6 mb-8 sm:mb-12 backdrop-blur-sm">
                <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <span className="text-indigo-400">🧭</span>
                  Quick Navigation
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    { name: "Definitions", id: "definitions" },
                    { name: "Eligibility", id: "eligibility" },
                    { name: "Billing & Taxes", id: "billing" },
                    { name: "License", id: "license" },
                    { name: "Your Content", id: "content" },
                    { name: "Acceptable Use", id: "acceptable-use" },
                    { name: "Third-Party Services", id: "third-party" },
                    { name: "Service Availability", id: "availability" },
                    { name: "Termination", id: "termination" },
                    { name: "Warranties", id: "warranties" },
                    { name: "Liability", id: "liability" },
                    { name: "Indemnification", id: "indemnification" },
                    { name: "Governing Law", id: "governing-law" },
                    { name: "Changes", id: "changes" },
                    { name: "Miscellaneous", id: "miscellaneous" },
                    { name: "Contact", id: "contact" },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-sm text-indigo-300 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 rounded-xl px-3 py-2 transition-all duration-300 border border-transparent hover:border-indigo-400/30"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <section id="definitions">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    1
                  </span>
                  Definitions
                </h2>
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-blue-300 text-2xl backdrop-blur-sm">
                      📖
                    </div>
                    <div className="flex-1">
                      <div className="text-blue-200 text-base leading-relaxed space-y-3">
                        <p>
                          <strong>"Service"</strong> – All online software,
                          sites and mobile/desktop applications branded
                          "Codaiq."
                        </p>
                        <p>
                          <strong>"User" / "you"</strong> – Any natural or legal
                          person who accesses or uses the Service.
                        </p>
                        <p>
                          <strong>"Content"</strong> – All data, code, text,
                          images, video, audio, files or links uploaded, posted
                          or otherwise processed through the Service.
                        </p>
                        <p>
                          <strong>"Subscription"</strong> – A paid plan granting
                          time-limited access to premium features.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="eligibility">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    2
                  </span>
                  Eligibility & Account Registration
                </h2>
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center text-green-300 text-2xl backdrop-blur-sm">
                      👤
                    </div>
                    <div className="flex-1">
                      <div className="text-green-200 text-base leading-relaxed space-y-3">
                        <p>
                          You must be ≥ 18 years old (or the age of majority in
                          your jurisdiction) and legally able to enter
                          contracts.
                        </p>
                        <p>
                          If you register on behalf of a company, you confirm
                          you are authorised to bind that entity.
                        </p>
                        <p>
                          You must provide accurate information and keep it
                          current. You are solely responsible for all activity
                          under your credentials and must safeguard passwords
                          and API keys.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="billing">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    3
                  </span>
                  Plans, Billing & Taxes
                </h2>
                <div className="space-y-6 mb-8">
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-purple-300 text-2xl backdrop-blur-sm">
                        💰
                      </div>
                      <div className="flex-1">
                        <div className="text-purple-200 text-base leading-relaxed space-y-3">
                          <p>
                            <strong>Pricing & Features</strong> – Current tiers
                            are shown at codaiq.com/pricing. We may change
                            prices or features on 30 days' notice.
                          </p>
                          <p>
                            <strong>Automatic Renewal</strong> – Subscriptions
                            renew for successive terms unless cancelled
                            (Dashboard → Billing → Cancel Plan).
                          </p>
                          <p>
                            <strong>Payment Method</strong> – You authorise
                            Codaiq's payment processor (e.g., Stripe, PayPal) to
                            store and charge your payment instrument.
                          </p>
                          <p>
                            <strong>Refunds / Cooling-Off</strong> – Governed by
                            the Refund & Cancellation Policy (EU/UK consumers:
                            14-day statutory right).
                          </p>
                          <p>
                            <strong>Taxes</strong> – Prices exclude VAT, GST or
                            sales tax unless stated. You are responsible for all
                            applicable taxes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="license">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    4
                  </span>
                  License to Use the Service
                </h2>
                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/20 border border-orange-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center text-orange-300 text-2xl backdrop-blur-sm">
                      📜
                    </div>
                    <div className="flex-1">
                      <div className="text-orange-200 text-base leading-relaxed space-y-3">
                        <p>
                          Codaiq grants you a non-exclusive, non-transferable,
                          revocable licence to access and use the Service for
                          your own business or personal projects, subject to
                          these Terms.
                        </p>
                        <p>
                          All intellectual-property rights in the Service
                          (software, templates, brand) remain ours. No rights
                          are granted except those expressly stated.
                        </p>
                        <p>
                          You may not copy, modify, distribute, sell, lease,
                          reverse-engineer or attempt to extract source code,
                          except where such restrictions are prohibited by law.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="content">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    5
                  </span>
                  Your Content
                </h2>
                <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/20 border border-cyan-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-cyan-300 text-2xl backdrop-blur-sm">
                      📁
                    </div>
                    <div className="flex-1">
                      <div className="text-cyan-200 text-base leading-relaxed space-y-3">
                        <p>
                          <strong>Ownership</strong> – You retain all rights in
                          your Content.
                        </p>
                        <p>
                          <strong>Licence to Codaiq</strong> – You grant us a
                          worldwide, non-exclusive, royalty-free licence to
                          host, display, transmit and backup your Content solely
                          to provide the Service.
                        </p>
                        <p>
                          <strong>Responsibility</strong> – You must ensure you
                          have all rights and legal bases to upload and process
                          the Content.
                        </p>
                        <p>
                          <strong>Back-Ups</strong> – We perform routine
                          backups, but you are responsible for exporting and
                          safeguarding critical data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="acceptable-use">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    6
                  </span>
                  Acceptable Use & Prohibited Conduct
                </h2>
                <div className="bg-gradient-to-r from-red-900/30 to-pink-900/20 border border-red-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-red-300 text-2xl backdrop-blur-sm">
                      🚫
                    </div>
                    <div className="flex-1">
                      <p className="text-red-200 text-base leading-relaxed">
                        You must comply with the separate Acceptable Use Policy
                        (AUP), which is incorporated by reference. Violations
                        may lead to immediate suspension or termination without
                        refund.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="third-party">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    7
                  </span>
                  Third-Party Services & Integrations
                </h2>
                <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/20 border border-indigo-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-indigo-300 text-2xl backdrop-blur-sm">
                      🔗
                    </div>
                    <div className="flex-1">
                      <p className="text-indigo-200 text-base leading-relaxed">
                        The Service may enable connections to third-party tools
                        (e.g., payment gateways, analytics). Use of those tools
                        is subject to their own terms, and Codaiq is not liable
                        for third-party services.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="availability">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    8
                  </span>
                  Service Availability & Support
                </h2>
                <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 border border-amber-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center text-amber-300 text-2xl backdrop-blur-sm">
                      ⚡
                    </div>
                    <div className="flex-1">
                      <div className="text-amber-200 text-base leading-relaxed space-y-3">
                        <p>
                          <strong>Uptime Goal</strong> – We target 99.9% monthly
                          uptime (details in the SLA for qualifying plans).
                        </p>
                        <p>
                          <strong>Planned Maintenance</strong> – We schedule
                          maintenance during low-traffic windows and give prior
                          notice when feasible.
                        </p>
                        <p>
                          <strong>Beta / Preview Features</strong> – May be
                          changed or discontinued at any time, provided "as-is,"
                          and excluded from SLAs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="termination">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-rose-500 to-red-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    9
                  </span>
                  Termination
                </h2>
                <div className="bg-gradient-to-r from-rose-900/30 to-red-900/20 border border-rose-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500/20 to-red-500/20 rounded-2xl flex items-center justify-center text-rose-300 text-2xl backdrop-blur-sm">
                      🔚
                    </div>
                    <div className="flex-1">
                      <div className="text-rose-200 text-base leading-relaxed space-y-3">
                        <p>
                          <strong>By You</strong> – Cancel anytime from the
                          dashboard; effect and refunds per Section 3 and Refund
                          Policy.
                        </p>
                        <p>
                          <strong>By Codaiq</strong> – We may suspend or close
                          accounts for breach, fraud, non-payment or legal risk.
                        </p>
                        <p>
                          On termination, your licence ends and we may delete
                          Content 30 days after the effective termination date
                          (immediately in case of severe AUP breach).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="warranties">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    10
                  </span>
                  Disclaimer of Warranties
                </h2>
                <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/20 border border-yellow-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center text-yellow-300 text-2xl backdrop-blur-sm">
                      ⚠️
                    </div>
                    <div className="flex-1">
                      <p className="text-yellow-200 text-base leading-relaxed">
                        The Service is provided "as is" and "as available." To
                        the maximum extent permitted by law, Codaiq disclaims
                        all warranties—express, implied or statutory—including
                        merchantability, fitness for a particular purpose and
                        non-infringement.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="liability">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    11
                  </span>
                  Limitation of Liability
                </h2>
                <div className="bg-gradient-to-r from-teal-900/30 to-cyan-900/20 border border-teal-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-teal-300 text-2xl backdrop-blur-sm">
                      🛡️
                    </div>
                    <div className="flex-1">
                      <div className="text-teal-200 text-base leading-relaxed space-y-3">
                        <p>To the fullest extent permitted:</p>
                        <p>
                          Codaiq shall not be liable for indirect, incidental,
                          special, consequential or punitive damages, or loss of
                          profits, data, goodwill or business opportunities.
                        </p>
                        <p>
                          Codaiq's total aggregate liability for any claim in
                          any 12-month period is capped at the amounts you paid
                          to Codaiq in that period (or USD 100 if greater
                          protection is mandated by law).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="indemnification">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    12
                  </span>
                  Indemnification
                </h2>
                <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/20 border border-emerald-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center text-emerald-300 text-2xl backdrop-blur-sm">
                      🤝
                    </div>
                    <div className="flex-1">
                      <p className="text-emerald-200 text-base leading-relaxed">
                        You will indemnify and hold Codaiq, its affiliates,
                        directors and employees harmless from any claim, loss or
                        expense (including reasonable attorneys' fees) arising
                        from your Content, your use of the Service, or your
                        breach of these Terms or the AUP.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="governing-law">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    13
                  </span>
                  Governing Law & Dispute Resolution
                </h2>
                <div className="bg-gradient-to-r from-sky-900/30 to-blue-900/20 border border-sky-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-sky-300 text-2xl backdrop-blur-sm">
                      ⚖️
                    </div>
                    <div className="flex-1">
                      <p className="text-sky-200 text-base leading-relaxed">
                        These Terms are governed by the laws of England & Wales,
                        excluding conflict-of-law rules. Exclusive venue for all
                        disputes is the competent court in London, UK. We
                        nevertheless reserve the right to seek injunctive relief
                        in any jurisdiction to protect intellectual-property
                        rights.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="changes">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    14
                  </span>
                  Changes to These Terms
                </h2>
                <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/20 border border-violet-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-violet-300 text-2xl backdrop-blur-sm">
                      📝
                    </div>
                    <div className="flex-1">
                      <p className="text-violet-200 text-base leading-relaxed">
                        We may update these Terms to reflect changes in law or
                        the Service. We will notify you at least 30 days in
                        advance by e-mail or in-app alert. Continued use after
                        the effective date constitutes acceptance. If you
                        object, your sole remedy is to cancel your Subscription
                        before the new Terms take effect.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="miscellaneous">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    15
                  </span>
                  Miscellaneous
                </h2>
                <div className="bg-gradient-to-r from-pink-900/30 to-rose-900/20 border border-pink-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-2xl flex items-center justify-center text-pink-300 text-2xl backdrop-blur-sm">
                      📋
                    </div>
                    <div className="flex-1">
                      <div className="text-pink-200 text-base leading-relaxed space-y-3">
                        <p>
                          <strong>Force Majeure:</strong> Neither party is
                          liable for delay or failure caused by events beyond
                          reasonable control (e.g., natural disasters, war,
                          governmental action, Internet outages).
                        </p>
                        <p>
                          <strong>Assignment:</strong> You may not assign these
                          Terms without our prior written consent. We may assign
                          our rights and obligations in connection with a
                          merger, acquisition or sale of assets.
                        </p>
                        <p>
                          <strong>Entire Agreement:</strong> These Terms, plus
                          the referenced policies, constitute the entire
                          agreement between you and Codaiq and supersede all
                          prior discussions.
                        </p>
                        <p>
                          <strong>Severability:</strong> If any provision is
                          held invalid, the remainder remains in effect.
                        </p>
                        <p>
                          <strong>No Waiver:</strong> Failure to enforce any
                          provision is not a waiver of future enforcement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="contact">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-slate-500 to-gray-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    16
                  </span>
                  Contact
                </h2>
                <div className="bg-gradient-to-r from-slate-800/30 to-gray-800/20 border border-slate-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-500/20 to-gray-500/20 rounded-2xl flex items-center justify-center text-slate-300 text-2xl backdrop-blur-sm">
                      📞
                    </div>
                    <div className="flex-1">
                      <div className="text-slate-200 text-base leading-relaxed space-y-2">
                        <p>
                          <strong>Webdesignoo Ltd.</strong>
                        </p>
                        <p>
                          71-75 Shelton Street, Covent Garden, London WC2H 9JQ,
                          United Kingdom
                        </p>
                        <p>
                          <strong>E-mail:</strong>
                          <a
                            href="mailto:support@codaiq.com"
                            className="text-slate-300 hover:text-slate-100 ml-2 underline bg-slate-500/10 px-2 py-1 rounded transition-colors"
                          >
                            support@codaiq.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Summary Card */}
              <div className="bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-pink-900/30 border border-indigo-400/40 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 text-center flex items-center justify-center gap-2">
                  <span className="text-indigo-400">⚡</span>
                  Key Points Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-blue-300 text-xl">📋</span>
                    </div>
                    <p className="text-indigo-200 font-semibold text-base mb-2">
                      Binding Agreement
                    </p>
                    <p className="text-gray-300 text-sm">
                      These Terms create a legally binding contract
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-green-300 text-xl">👤</span>
                    </div>
                    <p className="text-purple-200 font-semibold text-base mb-2">
                      18+ Required
                    </p>
                    <p className="text-gray-300 text-sm">
                      Must be 18+ and legally able to contract
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-purple-300 text-xl">🌍</span>
                    </div>
                    <p className="text-pink-200 font-semibold text-base mb-2">
                      UK Law Applies
                    </p>
                    <p className="text-gray-300 text-sm">
                      Governed by England & Wales law
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LegalPage;
