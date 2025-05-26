"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";

const AUPPolicyPage = () => {
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
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-red-100 to-orange-100 bg-clip-text text-transparent mb-6 leading-tight">
                  Acceptable Use Policy (AUP)
                </h1>
                <div className="inline-block bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <p className="text-red-200 text-sm sm:text-base font-medium">
                    <strong>
                      Codaiq – Webdesignoo Ltd. · Effective 26 May 2025
                    </strong>
                  </p>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="bg-gradient-to-r from-slate-800/40 to-red-800/20 border border-red-500/30 rounded-2xl p-6 mb-8 sm:mb-12 backdrop-blur-sm">
                <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <span className="text-red-400">🧭</span>
                  Quick Navigation
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    { name: "Purpose & Scope", id: "purpose" },
                    { name: "General Principles", id: "principles" },
                    { name: "Prohibited Content", id: "content" },
                    { name: "Prohibited Activities", id: "activities" },
                    { name: "Resource Limits", id: "limits" },
                    { name: "Security Reporting", id: "security" },
                    { name: "Enforcement", id: "enforcement" },
                    { name: "Contact", id: "contact" },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-sm text-red-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500/20 hover:to-orange-500/20 rounded-xl px-3 py-2 transition-all duration-300 border border-transparent hover:border-red-400/30"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <section id="purpose">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    1
                  </span>
                  Purpose and Scope
                </h2>
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-blue-300 text-2xl backdrop-blur-sm">
                      📋
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-200 text-base leading-relaxed">
                        This Acceptable Use Policy ("Policy") applies to every
                        visitor, registered user and customer ("you") of the
                        Codaiq website, builder, APIs, and any other service
                        operated by Webdesignoo Ltd. ("Codaiq", "we", "us"). It
                        forms part of the Terms of Service. By accessing or
                        using the Service you agree to comply with this Policy;
                        if you violate it, we may suspend or terminate your
                        account without notice.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="principles">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    2
                  </span>
                  General Principles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-green-300 text-xl">⚖️</span>
                    </div>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent mb-3">
                      Lawful Use
                    </h3>
                    <p className="text-green-200 text-sm leading-relaxed">
                      Use Codaiq only for lawful, ethical and bona-fide
                      web-development activities.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-blue-300 text-xl">🤝</span>
                    </div>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent mb-3">
                      Respect Others
                    </h3>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      Respect the rights, privacy and security of others.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6 text-center backdrop-blur-sm">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-purple-300 text-xl">🛡️</span>
                    </div>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-3">
                      Platform Integrity
                    </h3>
                    <p className="text-purple-200 text-sm leading-relaxed">
                      Do not interfere with, disrupt or degrade the Service or
                      its underlying infrastructure.
                    </p>
                  </div>
                </div>
              </section>

              <section id="content">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    3
                  </span>
                  Prohibited Content
                </h2>
                <div className="bg-gradient-to-r from-red-900/30 to-pink-900/20 border border-red-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-red-300 text-2xl backdrop-blur-sm">
                      🚫
                    </span>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                      You must not upload, publish, host or link to content
                      that:
                    </h3>
                  </div>
                  <ol className="text-red-100 space-y-4 text-base">
                    {[
                      "infringes copyrights, trademarks, trade secrets or other intellectual-property rights;",
                      "is obscene, sexually explicit (including CSEM), hateful, violent, harassing or defamatory;",
                      "promotes terrorism, extremism, self-harm or illegal activities;",
                      "contains unauthorised personal data or violates privacy laws (GDPR, CCPA, etc.);",
                      "violates export controls or economic-sanctions regulations;",
                      "constitutes gambling services, unlicensed financial products, or medical advice without proper authorisation.",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 leading-relaxed"
                      >
                        <span className="w-7 h-7 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-full flex items-center justify-center text-red-300 font-bold text-sm mt-0.5 flex-shrink-0 backdrop-blur-sm">
                          {String.fromCharCode(97 + index)}.
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section id="activities">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    4
                  </span>
                  Prohibited Activities
                </h2>
                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/20 border border-orange-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center text-orange-300 text-2xl backdrop-blur-sm">
                      ⚠️
                    </span>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-200 to-red-200 bg-clip-text text-transparent">
                      You must not:
                    </h3>
                  </div>
                  <ul className="text-orange-100 space-y-3 text-base">
                    {[
                      "send spam, bulk unsolicited messages or phishing content;",
                      "distribute malware, ransomware, spyware, keyloggers or exploits;",
                      'attempt to gain unauthorised access to any system or data ("hacking", "scraping" beyond robots.txt, brute-force, scanning);',
                      "reverse-engineer, decompile, circumvent security or usage limits;",
                      "abuse shared resources (for example, sustained CPU or bandwidth that risks platform stability);",
                      "use the Service for cryptocurrency mining or high-risk compute without prior written consent;",
                      "impersonate another person or entity, or misrepresent affiliation;",
                      "use the Service in breach of applicable law, including export, sanctions, consumer-protection and data-protection statutes.",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 leading-relaxed"
                      >
                        <span className="text-orange-400 text-lg mt-0.5">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section id="limits">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    5
                  </span>
                  Resource Limits
                </h2>
                <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/20 border border-yellow-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center text-yellow-300 text-2xl backdrop-blur-sm">
                      📊
                    </div>
                    <div className="flex-1">
                      <p className="text-yellow-200 text-base leading-relaxed">
                        Free-tier and trial accounts are subject to fair-use
                        thresholds published in the docs. Excessive consumption
                        may be throttled or billed. If you need higher limits,
                        contact
                        <a
                          href="mailto:sales@codaiq.com"
                          className="text-yellow-300 hover:text-yellow-100 ml-1 underline bg-yellow-500/10 px-2 py-0.5 rounded transition-colors"
                        >
                          sales@codaiq.com
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="security">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    6
                  </span>
                  Security Vulnerability Reporting
                </h2>
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center text-green-300 text-2xl backdrop-blur-sm">
                      🔐
                    </div>
                    <div className="flex-1">
                      <p className="text-green-200 text-base leading-relaxed">
                        If you discover a vulnerability, notify us promptly at
                        <a
                          href="mailto:security@codaiq.com"
                          className="text-green-300 hover:text-green-100 ml-1 underline bg-green-500/10 px-2 py-0.5 rounded transition-colors"
                        >
                          security@codaiq.com
                        </a>
                        and do not publicly disclose it until we have confirmed
                        a fix. We will not pursue legal action for good-faith,
                        compliant research.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="enforcement">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    7
                  </span>
                  Enforcement
                </h2>
                <div className="space-y-6 mb-8">
                  <div className="bg-gradient-to-r from-slate-800/30 to-purple-800/20 border border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-purple-300 text-lg backdrop-blur-sm">
                        🔍
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Detection & Review
                      </h3>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">
                      We review reports and automated signals to detect abuse.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-slate-800/30 to-blue-800/20 border border-blue-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-blue-300 text-lg backdrop-blur-sm">
                        📈
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                        Progressive Response
                      </h3>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">
                      On first violation we may issue a warning or request
                      immediate remediation. Serious or repeated breaches can
                      result in suspension or permanent termination.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-slate-800/30 to-red-800/20 border border-red-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-red-300 text-lg backdrop-blur-sm">
                        🗑️
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                        Content Removal
                      </h3>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">
                      We reserve the right to remove any content that, in our
                      sole judgment, violates this Policy or presents risk to
                      Codaiq, other users or third parties.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-slate-800/30 to-amber-800/20 border border-amber-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center text-amber-300 text-lg backdrop-blur-sm">
                        ⚖️
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                        Legal Reporting
                      </h3>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">
                      Where required by law, we will report illegal conduct to
                      competent authorities.
                    </p>
                  </div>
                </div>
              </section>

              {/* Additional Sections */}
              <div className="space-y-8 mb-12">
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                    <span className="text-purple-400">©️</span>
                    Copyright Complaints
                  </h3>
                  <p className="text-purple-200 text-base leading-relaxed">
                    We operate a DMCA-style notice-and-takedown process. Send
                    infringement notices to
                    <a
                      href="mailto:abuse@codaiq.com"
                      className="text-purple-300 hover:text-purple-100 ml-1 underline bg-purple-500/10 px-2 py-0.5 rounded transition-colors"
                    >
                      abuse@codaiq.com
                    </a>
                    with complete claim details (see DMCA Policy). We may
                    disable or delete allegedly infringing material and, for
                    repeat infringers, terminate accounts.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-slate-800/30 to-blue-800/20 border border-blue-400/30 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                    <span className="text-blue-400">📝</span>
                    Changes to This Policy
                  </h3>
                  <p className="text-gray-200 text-base leading-relaxed">
                    We update this Policy as needed. The revision date appears
                    at the top. Continued use after a change becomes effective
                    constitutes acceptance.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <section id="contact">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    10
                  </span>
                  Contact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-blue-300 text-lg backdrop-blur-sm">
                        💬
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                        Policy Questions
                      </h3>
                    </div>
                    <a
                      href="mailto:support@codaiq.com"
                      className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 underline font-mono bg-blue-500/10 px-3 py-1 rounded-lg transition-colors"
                    >
                      📧 support@codaiq.com
                    </a>
                  </div>
                  <div className="bg-gradient-to-r from-slate-800/30 to-purple-800/20 border border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-purple-300 text-lg backdrop-blur-sm">
                        📋
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Legal Notices
                      </h3>
                    </div>
                    <p className="text-purple-100 text-sm leading-relaxed">
                      Webdesignoo Ltd., 71-75 Shelton Street, Covent Garden,
                      London WC2H 9JQ, United Kingdom
                    </p>
                  </div>
                </div>
              </section>

              {/* Important Contacts */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/20 border border-red-500/30 rounded-2xl p-6 mb-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-red-200 to-orange-200 bg-clip-text text-transparent mb-6 text-center flex items-center justify-center gap-2">
                  <span className="text-red-400">📞</span>
                  Important Contacts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-green-300 text-xl">🔐</span>
                    </div>
                    <p className="text-red-200 font-semibold text-base mb-2">
                      Security Issues
                    </p>
                    <p className="text-gray-300 text-sm font-mono bg-green-500/10 px-2 py-1 rounded">
                      security@codaiq.com
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-purple-300 text-xl">©️</span>
                    </div>
                    <p className="text-red-200 font-semibold text-base mb-2">
                      Copyright Claims
                    </p>
                    <p className="text-gray-300 text-sm font-mono bg-purple-500/10 px-2 py-1 rounded">
                      abuse@codaiq.com
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-blue-300 text-xl">📊</span>
                    </div>
                    <p className="text-red-200 font-semibold text-base mb-2">
                      Resource Limits
                    </p>
                    <p className="text-gray-300 text-sm font-mono bg-blue-500/10 px-2 py-1 rounded">
                      sales@codaiq.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 border border-amber-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center text-amber-300 text-2xl backdrop-blur-sm">
                    ⚠️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent mb-2">
                      Legal Disclaimer
                    </h3>
                    <p className="text-amber-200 text-sm leading-relaxed">
                      <strong>Disclaimer:</strong> This document is provided for
                      information only and does not constitute legal advice.
                      Consult counsel to adapt it to your jurisdiction and
                      business model.
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

export default AUPPolicyPage;
