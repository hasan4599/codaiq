"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";

const PrivacyPolicyPage = () => {
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
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🔒</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-6 leading-tight">
                  Codaiq · Privacy Policy (GDPR/CCPA-Ready)
                </h1>
                <div className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <p className="text-purple-200 text-sm sm:text-base font-medium">
                    <strong>Webdesignoo Ltd. – Effective 26 May 2025</strong>
                  </p>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="bg-gradient-to-r from-slate-800/40 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6 mb-8 sm:mb-12 backdrop-blur-sm">
                <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <span className="text-purple-400">🧭</span>
                  Quick Navigation
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    { name: "Who We Are", id: "who" },
                    { name: "Data We Collect", id: "data" },
                    { name: "Cookies & Tracking", id: "cookies" },
                    { name: "Your Rights (GDPR)", id: "rights" },
                    { name: "CCPA Notice", id: "ccpa" },
                    { name: "Data Transfers", id: "transfers" },
                    { name: "Security", id: "security" },
                    { name: "Cookie Policy", id: "cookie-policy" },
                    { name: "Refund Policy", id: "refund" },
                    { name: "Acceptable Use", id: "aup" },
                    { name: "Disclaimer", id: "disclaimer" },
                    { name: "Contact", id: "contact" },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-sm text-purple-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 rounded-xl px-3 py-2 transition-all duration-300 border border-transparent hover:border-purple-400/30"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <section id="who">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    1
                  </span>
                  Who We Are
                </h2>
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-blue-300 text-2xl backdrop-blur-sm">
                      🏢
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-200 text-base leading-relaxed">
                        <strong>Controller:</strong> Webdesignoo Ltd., Hasan
                        Badruk (see Legal Notice).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="data">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    2
                  </span>
                  What Data We Collect
                </h2>
                <div className="bg-gradient-to-r from-slate-800/30 to-green-800/20 border border-green-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                          Category
                        </th>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                          Examples
                        </th>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                          Purpose
                        </th>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                          Legal Basis (GDPR)
                        </th>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                          Retention
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-blue-300 font-semibold">
                          Account Data
                        </td>
                        <td className="p-4 text-gray-300">
                          Name, e-mail, password hash
                        </td>
                        <td className="p-4 text-gray-300">
                          Contract fulfilment
                        </td>
                        <td className="p-4 text-gray-300">Art. 6 (1)(b)</td>
                        <td className="p-4 text-gray-300">
                          Until deletion + 5 years
                        </td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-green-300 font-semibold">
                          Usage Data
                        </td>
                        <td className="p-4 text-gray-300">
                          IP, browser, pages, logs
                        </td>
                        <td className="p-4 text-gray-300">
                          Security, analytics
                        </td>
                        <td className="p-4 text-gray-300">Art. 6 (1)(f)</td>
                        <td className="p-4 text-gray-300">30 days</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-yellow-300 font-semibold">
                          Payment Data
                        </td>
                        <td className="p-4 text-gray-300">
                          Card tokens via Stripe
                        </td>
                        <td className="p-4 text-gray-300">Billing</td>
                        <td className="p-4 text-gray-300">Art. 6 (1)(b)/(c)</td>
                        <td className="p-4 text-gray-300">10 years (tax)</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-purple-300 font-semibold">
                          Marketing Data
                        </td>
                        <td className="p-4 text-gray-300">
                          Opt-in e-mail preferences
                        </td>
                        <td className="p-4 text-gray-300">Newsletters</td>
                        <td className="p-4 text-gray-300">
                          Consent Art. 6 (1)(a)
                        </td>
                        <td className="p-4 text-gray-300">Until withdrawal</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="cookies">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    3
                  </span>
                  Cookies & Tracking
                </h2>
                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/20 border border-orange-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center text-orange-300 text-2xl backdrop-blur-sm">
                      🍪
                    </div>
                    <div className="flex-1">
                      <p className="text-orange-200 text-base leading-relaxed">
                        We use essential cookies for login/session and optional
                        analytics cookies (Google Analytics 4) with anonymised
                        IP. Consent banner provided via Cookiebot.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="rights">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    4
                  </span>
                  Your Rights (GDPR)
                </h2>
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-blue-300 text-2xl backdrop-blur-sm">
                      🛡️
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-200 text-base leading-relaxed">
                        You have the right to: Access, rectification, deletion,
                        restriction, data portability, object, and lodge
                        complaint with a supervisory authority.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="ccpa">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    5
                  </span>
                  CCPA Notice (California)
                </h2>
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center text-green-300 text-2xl backdrop-blur-sm">
                      🇺🇸
                    </div>
                    <div className="flex-1">
                      <p className="text-green-200 text-base leading-relaxed">
                        <strong>Important:</strong> Codaiq does not sell
                        personal information. California residents can exercise
                        disclosure or deletion rights via privacy@codaiq.com.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="transfers">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    6
                  </span>
                  Data Transfers
                </h2>
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-purple-300 text-2xl backdrop-blur-sm">
                      🌍
                    </div>
                    <div className="flex-1">
                      <p className="text-purple-200 text-base leading-relaxed">
                        Where we transfer data outside the EEA/UK, we rely on
                        Standard Contractual Clauses or adequacy decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="security">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    7
                  </span>
                  Security
                </h2>
                <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/20 border border-indigo-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-indigo-300 text-2xl backdrop-blur-sm">
                      🔐
                    </div>
                    <div className="flex-1">
                      <p className="text-indigo-200 text-base leading-relaxed">
                        <strong>Security Measures:</strong> ISO-27001 aligned
                        controls, encryption in transit (TLS 1.3) and at rest
                        (AES-256), least-privilege access.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="cookie-policy">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    8
                  </span>
                  Cookie Policy
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-red-900/30 to-pink-900/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-red-300 text-lg backdrop-blur-sm">
                        🔒
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                        Strictly Necessary
                      </h3>
                    </div>
                    <p className="text-red-200 text-sm leading-relaxed">
                      Auth tokens, security cookies.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-blue-300 text-lg backdrop-blur-sm">
                        📊
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                        Performance
                      </h3>
                    </div>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      *ga, *gid (Google Analytics).
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center text-green-300 text-lg backdrop-blur-sm">
                        ⚙️
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                        Functional
                      </h3>
                    </div>
                    <p className="text-green-200 text-sm leading-relaxed">
                      Language preference.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-gray-800/50 to-slate-800/30 border border-gray-500/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-lg flex items-center justify-center text-gray-300 text-lg backdrop-blur-sm">
                        📢
                      </span>
                      <h3 className="text-lg font-semibold text-gray-300">
                        Marketing
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      None by default.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-slate-800/30 to-purple-800/20 border border-purple-400/30 rounded-2xl p-4 mb-8 backdrop-blur-sm text-center">
                  <p className="text-purple-200 text-base leading-relaxed">
                    Manage preferences anytime via the "Cookie Settings" link in
                    the footer.
                  </p>
                </div>
              </section>

              <section id="refund">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    9
                  </span>
                  Refund & Cancellation Policy
                </h2>
                <div className="space-y-6 mb-8">
                  <div className="bg-gradient-to-r from-slate-800/30 to-cyan-800/20 border border-cyan-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-cyan-300 text-lg backdrop-blur-sm">
                        🆓
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
                        Trial Period
                      </h3>
                    </div>
                    <p className="text-cyan-200 text-base leading-relaxed">
                      7-day free trial; cancel before day 7 to avoid charges.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-slate-800/30 to-blue-800/20 border border-blue-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center text-blue-300 text-lg backdrop-blur-sm">
                        📅
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                        Monthly Plans
                      </h3>
                    </div>
                    <p className="text-blue-200 text-base leading-relaxed">
                      Prorated refund for unused full months after cancellation.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-slate-800/30 to-purple-800/20 border border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-purple-300 text-lg backdrop-blur-sm">
                        📆
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Annual Plans
                      </h3>
                    </div>
                    <p className="text-purple-200 text-base leading-relaxed">
                      Full refund within 14 days of first payment; thereafter no
                      refund but subscription continues until term end.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-slate-800/30 to-green-800/20 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center text-green-300 text-lg backdrop-blur-sm">
                        💳
                      </span>
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                        Process
                      </h3>
                    </div>
                    <p className="text-green-200 text-base leading-relaxed">
                      E-mail billing@codaiq.com from your account address;
                      refunds are credited to the original payment method within
                      10 business days.
                    </p>
                  </div>
                </div>
              </section>

              <section id="aup">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    10
                  </span>
                  Acceptable Use Policy (AUP)
                </h2>
                <div className="bg-gradient-to-r from-red-900/30 to-pink-900/20 border border-red-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-red-300 text-2xl backdrop-blur-sm">
                      🚫
                    </span>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                      You must not use Codaiq to host or transmit:
                    </h3>
                  </div>
                  <ul className="text-red-100 space-y-3 text-base">
                    {[
                      "Illegal content or intellectual-property-infringing material.",
                      "Hate speech, threats, or harassment.",
                      "Personal data without lawful basis.",
                      "High-risk or regulated data (e.g., HIPAA, PCI-DSS) unless we explicitly agree in writing.",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 leading-relaxed"
                      >
                        <span className="text-red-400 text-lg mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-red-400/20">
                    <p className="text-red-200 font-semibold text-base text-center">
                      Violations may result in suspension or deletion without
                      notice.
                    </p>
                  </div>
                </div>
              </section>

              <section id="disclaimer">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    11
                  </span>
                  Disclaimer
                </h2>
                <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 border border-amber-500/30 rounded-2xl p-6 mb-12 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center text-amber-300 text-2xl backdrop-blur-sm">
                      ⚠️
                    </div>
                    <div className="flex-1">
                      <p className="text-amber-200 text-base leading-relaxed">
                        All information on codaiq.com is provided for general
                        information only and should not be construed as
                        professional advice. While we endeavour to keep content
                        up to date, we make no warranties regarding accuracy,
                        completeness or reliability.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact">
                <div className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border border-purple-400/40 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-6 text-center flex items-center justify-center gap-2">
                    <span className="text-purple-400">📧</span>
                    Contact Information
                  </h3>
                  <div className="text-center">
                    <p className="text-gray-300 text-base leading-relaxed mb-4">
                      For questions about this privacy policy, contact us at:
                    </p>
                    <a
                      href="mailto:privacy@codaiq.com"
                      className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100 underline font-mono bg-purple-500/10 px-4 py-2 rounded-lg transition-colors text-lg"
                    >
                      📧 privacy@codaiq.com
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
