"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";

const CookieGDPRPolicyPage = () => {
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
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🍪</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-6 leading-tight">
                  Cookie and GDPR Policy
                </h1>
                <div className="inline-block bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <p className="text-blue-200 text-sm sm:text-base font-medium">
                    <strong>
                      Codaiq – Webdesignoo Ltd. · Last updated 26 May 2025
                    </strong>
                  </p>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="bg-gradient-to-r from-slate-800/40 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 mb-8 sm:mb-12 backdrop-blur-sm">
                <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <span className="text-blue-400">🧭</span>
                  Quick Navigation
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    { name: "About Notice", id: "about" },
                    { name: "What Are Cookies", id: "cookies" },
                    { name: "Legal Basis", id: "legal" },
                    { name: "Cookie Categories", id: "categories" },
                    { name: "Third-Party Services", id: "third-party" },
                    { name: "Manage Cookies", id: "manage" },
                    { name: "Privacy Rights", id: "rights" },
                    { name: "Contact", id: "contact" },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-sm text-blue-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 rounded-xl px-3 py-2 transition-all duration-300 border border-transparent hover:border-blue-400/30"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <section id="about">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    1
                  </span>
                  About This Notice
                </h2>
                <div className="bg-gradient-to-r from-slate-800/30 to-blue-800/20 border border-blue-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                    This page explains how Codaiq (Webdesignoo Ltd., "we", "us")
                    uses cookies and comparable tracking technologies on
                    codaiq.com and inside the Codaiq web-builder. It also
                    describes the choices and rights you have under the EU/UK
                    GDPR, the e-Privacy rules, the California CPRA and similar
                    laws.
                  </p>
                </div>
              </section>

              <section id="cookies">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    2
                  </span>
                  What Are Cookies
                </h2>
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-blue-300 text-2xl backdrop-blur-sm">
                      🍪
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-200 text-base leading-relaxed">
                        Cookies are small text files placed on your device that
                        store information about your visit. Pixels,
                        local-storage objects and SDKs serve similar purposes;
                        for simplicity they are all called "cookies" here.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="legal">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    3
                  </span>
                  Legal Basis and Consent
                </h2>
                <div className="space-y-6 mb-8">
                  <div className="bg-gradient-to-r from-red-900/30 to-pink-900/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-red-300 text-lg backdrop-blur-sm">
                        🔒
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                        Strictly Necessary Cookies
                      </h3>
                    </div>
                    <p className="text-red-200 text-base leading-relaxed">
                      Load because they are required to provide the service you
                      request (Article 6 (1)(b) GDPR).
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center text-green-300 text-lg backdrop-blur-sm">
                        ✅
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                        Optional Cookies
                      </h3>
                    </div>
                    <p className="text-green-200 text-base leading-relaxed">
                      All other cookies (analytics, functional, advertising)
                      load only after you give explicit, granular opt-in consent
                      via our banner (Article 6 (1)(a) GDPR and § 25 TTDSG / UK
                      PECR).
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-purple-300 text-lg backdrop-blur-sm">
                        ⚙️
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                        Consent Management
                      </h3>
                    </div>
                    <p className="text-purple-200 text-base leading-relaxed">
                      Your consent record is stored securely for five years and
                      can be revoked at any time from "Cookie Settings" in the
                      site footer.
                    </p>
                  </div>
                </div>
              </section>

              <section id="categories">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    4
                  </span>
                  Cookie Categories We Use
                </h2>
                <div className="bg-gradient-to-r from-slate-800/30 to-purple-800/20 border border-purple-400/30 rounded-2xl p-6 mb-6 backdrop-blur-sm overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          Category
                        </th>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          Purpose
                        </th>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          Typical Lifetime
                        </th>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          Examples
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-red-300 font-semibold">
                          Strictly necessary
                        </td>
                        <td className="p-4 text-gray-300">
                          Login sessions, payment checkout security
                        </td>
                        <td className="p-4 text-gray-300">up to 24 h</td>
                        <td className="p-4 text-gray-300 font-mono text-sm">
                          __Host-codaiq_session
                        </td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-blue-300 font-semibold">
                          Functional
                        </td>
                        <td className="p-4 text-gray-300">
                          Remember language or editor preferences
                        </td>
                        <td className="p-4 text-gray-300">1 – 12 months</td>
                        <td className="p-4 text-gray-300 font-mono text-sm">
                          codaiq_locale
                        </td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-green-300 font-semibold">
                          Performance / analytics
                        </td>
                        <td className="p-4 text-gray-300">
                          Aggregate usage statistics (GA4 with IP-anonymisation)
                        </td>
                        <td className="p-4 text-gray-300">1 – 14 months</td>
                        <td className="p-4 text-gray-300 font-mono text-sm">
                          *ga, *gid
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-purple-300 font-semibold">
                          Marketing / targeting
                        </td>
                        <td className="p-4 text-gray-300">
                          Measure campaigns, prevent duplicate ads
                        </td>
                        <td className="p-4 text-gray-300">3 – 6 months</td>
                        <td className="p-4 text-gray-300 font-mono text-sm">
                          fbp, gcl_au
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 border border-amber-500/30 rounded-2xl p-4 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center text-amber-300 text-lg mt-0.5 backdrop-blur-sm">
                      💡
                    </span>
                    <p className="text-amber-200 text-sm leading-relaxed">
                      <strong>Note:</strong> A scanned list with exact cookie
                      names, providers and expiry dates appears in the banner's
                      "Details" tab and updates automatically after every
                      monthly scan.
                    </p>
                  </div>
                </div>
              </section>

              <section id="third-party">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    5
                  </span>
                  Third-Party Services That May Set Cookies
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {[
                    {
                      name: "Stripe",
                      type: "Payments",
                      color: "from-blue-500/20 to-cyan-500/20",
                    },
                    {
                      name: "Google Analytics 4",
                      type: "Analytics",
                      color: "from-green-500/20 to-emerald-500/20",
                    },
                    {
                      name: "Google Tag Manager",
                      type: "Tag Management",
                      color: "from-purple-500/20 to-pink-500/20",
                    },
                    {
                      name: "Meta Ads",
                      type: "Advertising",
                      color: "from-red-500/20 to-pink-500/20",
                    },
                    {
                      name: "Cloudflare",
                      type: "CDN & Security",
                      color: "from-orange-500/20 to-red-500/20",
                    },
                    {
                      name: "Cookiebot CMP",
                      type: "Consent Management",
                      color: "from-amber-500/20 to-orange-500/20",
                    },
                  ].map((service, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-r ${service.color} border border-white/20 rounded-2xl p-4 text-center backdrop-blur-sm`}
                    >
                      <p className="text-gray-200 font-semibold text-sm mb-1">
                        {service.name}
                      </p>
                      <p className="text-gray-400 text-xs">{service.type}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-slate-800/30 to-blue-800/20 border border-blue-400/30 rounded-2xl p-4 mb-8 backdrop-blur-sm">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Each provider processes data under a data-processing
                    agreement incorporating Standard Contractual Clauses where
                    data leaves the EEA/UK.
                  </p>
                </div>
              </section>

              <section id="manage">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    6
                  </span>
                  How to Manage Cookies
                </h2>
                <div className="space-y-6 mb-8">
                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center text-green-300 text-lg backdrop-blur-sm">
                        ⚙️
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                        Consent Management
                      </h3>
                    </div>
                    <p className="text-green-200 text-base leading-relaxed">
                      Use the "Cookie Settings" link at the bottom of every page
                      to withdraw or change consent.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-blue-300 text-lg backdrop-blur-sm">
                        🌐
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                        Browser Settings
                      </h3>
                    </div>
                    <p className="text-blue-200 text-base leading-relaxed">
                      Alternatively, adjust your browser settings to delete or
                      block cookies altogether. Doing so may degrade certain
                      features (for example, staying logged in to the builder).
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-purple-300 text-lg backdrop-blur-sm">
                        🚫
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Opt-Out Links
                      </h3>
                    </div>
                    <div className="text-purple-200 text-base leading-relaxed space-y-2">
                      <p>
                        Google Analytics:
                        <a
                          href="https://tools.google.com/dlpage/gaoptout"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-300 hover:text-purple-100 ml-1 underline"
                        >
                          tools.google.com/dlpage/gaoptout
                        </a>
                      </p>
                      <p>
                        Interest-based advertising:
                        <a
                          href="https://optout.aboutads.info"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-300 hover:text-purple-100 ml-1 underline"
                        >
                          optout.aboutads.info
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="rights">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    7
                  </span>
                  Your Privacy Rights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-blue-300 text-lg backdrop-blur-sm">
                        🇪🇺
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                        GDPR/UK GDPR Rights
                      </h3>
                    </div>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      Access, rectification, erasure, restriction, data
                      portability or object to processing.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center text-green-300 text-lg backdrop-blur-sm">
                        🇺🇸
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                        California Rights
                      </h3>
                    </div>
                    <p className="text-green-200 text-sm leading-relaxed">
                      Request disclosure or deletion of personal information and
                      opt out of cross-context behavioural advertising.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/20 border border-purple-400/40 rounded-2xl p-6 mb-8 text-center backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-purple-300 text-lg backdrop-blur-sm">
                      📧
                    </span>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                      Submit Requests
                    </h3>
                  </div>
                  <a
                    href="mailto:privacy@codaiq.com"
                    className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100 underline font-mono bg-purple-500/10 px-4 py-2 rounded-lg transition-colors"
                  >
                    📧 privacy@codaiq.com
                  </a>
                </div>
              </section>

              {/* Additional Sections */}
              <div className="space-y-8 mb-12">
                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/20 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                    <span className="text-orange-400">🌍</span>
                    Data Transfers
                  </h3>
                  <p className="text-orange-200 text-base leading-relaxed">
                    Personal data may be processed on servers in the United
                    States or other jurisdictions. We rely on adequacy decisions
                    or Standard Contractual Clauses plus supplementary measures
                    to protect such transfers.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                    <span className="text-green-400">🔐</span>
                    Security
                  </h3>
                  <p className="text-green-200 text-base leading-relaxed">
                    All cookies are transmitted over TLS 1.3. Session cookies
                    set the Secure and HttpOnly flags; most use the SameSite=Lax
                    attribute.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-slate-800/30 to-purple-800/20 border border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                    <span className="text-purple-400">📝</span>
                    Changes to This Policy
                  </h3>
                  <p className="text-gray-200 text-base leading-relaxed">
                    We update this notice when we introduce new cookies or
                    change regulatory requirements. The revision date at the top
                    shows the latest version. Substantive changes are announced
                    via banner and e-mail to registered customers at least 14
                    days before they take effect.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <section id="contact">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    11
                  </span>
                  Contact
                </h2>
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-400/40 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mt-1 backdrop-blur-sm">
                      <span className="text-blue-300 text-3xl">👤</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent mb-4">
                        Data Protection Officer
                      </h3>
                      <div className="text-blue-100 text-base space-y-1">
                        <p className="font-semibold">Hasan Badruk</p>
                        <p>Webdesignoo Ltd.</p>
                        <p>71–75 Shelton Street, Covent Garden</p>
                        <p>London WC2H 9JQ, United Kingdom</p>
                        <div className="mt-4 pt-4 border-t border-blue-400/20">
                          <p className="font-semibold mb-2">E-mail:</p>
                          <a
                            href="mailto:privacy@codaiq.com"
                            className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 underline font-mono bg-blue-500/10 px-3 py-1 rounded-lg transition-colors"
                          >
                            📧 privacy@codaiq.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border border-purple-400/40 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-6 text-center flex items-center justify-center gap-2">
                  <span className="text-purple-400">⚡</span>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-purple-300 text-xl">⚙️</span>
                    </div>
                    <p className="text-purple-200 font-semibold text-base mb-2">
                      Manage Cookies
                    </p>
                    <p className="text-gray-300 text-sm">
                      Check footer "Cookie Settings"
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-blue-300 text-xl">🛡️</span>
                    </div>
                    <p className="text-blue-200 font-semibold text-base mb-2">
                      Privacy Rights
                    </p>
                    <p className="text-gray-300 text-sm">
                      Email privacy@codaiq.com
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-green-300 text-xl">🚫</span>
                    </div>
                    <p className="text-cyan-200 font-semibold text-base mb-2">
                      Opt-Out
                    </p>
                    <p className="text-gray-300 text-sm">
                      Use provided links above
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

export default CookieGDPRPolicyPage;
