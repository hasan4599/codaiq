"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { Fetch } from "@/hooks/fetch";
import { useEffect, useState } from "react";

const DMCAPolicyPage = () => {
  const [user, setUser] = useState<{ email: string, name: string, image: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    try {
      setLoading(true)
      const handle = async () => {
        const response = await Fetch({ body: '', api: 'get/user/selected', method: "GET", host: 'server', loading: (v) => { } })
        if (response !== null) {
          setUser({
            name: response.fullName,
            email: response.email,
            image: response.avatarUrl
          })
        }
      }
      handle();
    } finally {
      setLoading(false)
    }
  }, []);
  return (
    user && <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-gray-100 font-poppins overflow-x-hidden">
      {/* Header */}
      <Header user={user} />

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
                    <span className="text-2xl">⚖️</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-6 leading-tight">
                  DMCA / Copyright Policy
                </h1>
                <div className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <p className="text-purple-200 text-sm sm:text-base font-medium">
                    <strong>
                      Codaiq – Webdesignoo Ltd. · Effective 26 May 2025
                    </strong>
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
                    { name: "Purpose", id: "purpose" },
                    { name: "DMCA Agent", id: "agent" },
                    { name: "Filing Notice", id: "notice" },
                    { name: "Removal Process", id: "removal" },
                    { name: "Counter Notice", id: "counter" },
                    { name: "Repeat Infringers", id: "repeat" },
                    { name: "Misrepresentation", id: "misrep" },
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

              <section id="purpose">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    1
                  </span>
                  Purpose
                </h2>
                <div className="bg-gradient-to-r from-slate-800/30 to-blue-800/20 border border-blue-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                    This policy explains how Codaiq responds to allegations of
                    copyright infringement under the United States Digital
                    Millennium Copyright Act, 17 U.S.C. § 512. It applies to all
                    content hosted, transmitted or otherwise processed through
                    Codaiq's services.
                  </p>
                </div>
              </section>

              <section id="agent">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    2
                  </span>
                  Designated Copyright Agent
                </h2>
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-400/40 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mt-1 backdrop-blur-sm">
                      <span className="text-blue-300 text-3xl">👤</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent mb-4">
                        DMCA Agent
                      </h3>
                      <div className="text-blue-100 text-base space-y-1">
                        <p className="font-semibold">
                          Hasan Badruk – DMCA Agent
                        </p>
                        <p>Webdesignoo Ltd.</p>
                        <p>71-75 Shelton Street, Covent Garden</p>
                        <p>London WC2H 9JQ, United Kingdom</p>
                        <div className="mt-4 pt-4 border-t border-blue-400/20">
                          <p className="font-semibold mb-2">
                            E-mail (for copyright notices only):
                          </p>
                          <a
                            href="mailto:abuse@codaiq.com"
                            className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 underline font-mono bg-blue-500/10 px-3 py-1 rounded-lg transition-colors"
                          >
                            📧 abuse@codaiq.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="notice">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    3
                  </span>
                  Filing a Copyright Notice
                </h2>
                <div className="bg-gradient-to-r from-slate-800/30 to-red-800/20 border border-red-400/30 rounded-2xl p-6 mb-6 backdrop-blur-sm">
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                    To request removal of material you own the rights to, send a
                    written notice that includes all items below. If any element
                    is missing we may be unable to act.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-900/30 to-pink-900/20 border border-red-400/40 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-red-300 text-2xl backdrop-blur-sm">
                      📋
                    </span>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                      Required Elements:
                    </h3>
                  </div>
                  <ol className="text-red-100 space-y-4 text-base">
                    {[
                      "A physical or electronic signature of the person authorised to act for the owner of the exclusive right that is allegedly infringed.",
                      "Identification of the copyrighted work claimed to have been infringed (for multiple works, a representative list).",
                      "Identification of the material that is claimed to be infringing, with sufficient detail to permit us to locate it (URL to the page, screenshots, project name, etc.).",
                      "Your contact information: name, mailing address, telephone number and e-mail.",
                      "A statement that you have a good-faith belief the disputed use is not authorised by the copyright owner, its agent or the law.",
                      "A statement, under penalty of perjury, that the information in the notice is accurate and that you are the copyright owner or authorised to act on the owner's behalf.",
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

                <div className="bg-gradient-to-r from-slate-800/30 to-purple-800/20 border border-purple-400/30 rounded-2xl p-6 mb-12 backdrop-blur-sm">
                  <p className="text-gray-200 text-base leading-relaxed">
                    Send the complete notice to the DMCA Agent at the address or
                    e-mail above. We will confirm receipt within two business
                    days.
                  </p>
                </div>
              </section>

              <section id="removal">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    4
                  </span>
                  Removal Procedure
                </h2>
                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/20 border border-orange-400/40 rounded-2xl p-6 mb-12 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center text-orange-300 text-2xl backdrop-blur-sm">
                      ⚡
                    </span>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-200 to-red-200 bg-clip-text text-transparent">
                      Upon receiving a compliant notice we will:
                    </h3>
                  </div>
                  <ul className="text-orange-100 space-y-3 text-base">
                    {[
                      "Acknowledge receipt to the complainant.",
                      "Disable access to or remove the material in question.",
                      "Notify the user who posted the material, supplying a copy of the notice.",
                      "Record the incident for repeat-infringer tracking.",
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

              <section id="counter">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    5
                  </span>
                  Counter Notice
                </h2>
                <div className="bg-gradient-to-r from-slate-800/30 to-green-800/20 border border-green-400/30 rounded-2xl p-6 mb-6 backdrop-blur-sm">
                  <p className="text-gray-200 text-base leading-relaxed">
                    If you believe the material was removed in error, you may
                    file a counter notice that must include:
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-400/40 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center text-green-300 text-2xl backdrop-blur-sm">
                      🔄
                    </span>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                      Counter Notice Requirements:
                    </h3>
                  </div>
                  <ol className="text-green-100 space-y-4 text-base">
                    {[
                      "Your physical or electronic signature.",
                      "Identification of the material removed and the location where it appeared before removal.",
                      "A statement under penalty of perjury that you have a good-faith belief the material was removed or disabled as a result of mistake or misidentification.",
                      "Your name, address and telephone number, and a statement that you consent to the jurisdiction of the United States federal courts for the district where your address is located (or Southern District of New York if outside the USA), and that you will accept service of process from the person who filed the original notice or their agent.",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 leading-relaxed"
                      >
                        <span className="w-7 h-7 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full flex items-center justify-center text-green-300 font-bold text-sm mt-0.5 flex-shrink-0 backdrop-blur-sm">
                          {String.fromCharCode(97 + index)}.
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-gradient-to-r from-slate-800/30 to-green-800/20 border border-green-400/30 rounded-2xl p-6 mb-12 backdrop-blur-sm">
                  <p className="text-gray-200 text-base leading-relaxed">
                    Send the counter notice to the DMCA Agent. If we receive a
                    valid counter notice, we will forward it to the original
                    complainant. Unless the complainant files a court action
                    within ten business days, we may restore the material.
                  </p>
                </div>
              </section>

              {/* Warning Sections */}
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
                id="repeat"
              >
                <div className="bg-gradient-to-r from-red-900/30 to-pink-900/20 border border-red-400/40 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-red-300 text-xl backdrop-blur-sm">
                      ⚠️
                    </span>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                      Repeat Infringer Policy
                    </h3>
                  </div>
                  <p className="text-red-100 text-base leading-relaxed">
                    <strong>Warning:</strong> Codaiq terminates, in appropriate
                    circumstances, subscribers or account holders who are repeat
                    infringers. Three founded infringements in any twelve-month
                    period normally result in permanent account closure.
                  </p>
                </div>

                <div
                  className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 border border-amber-400/40 rounded-2xl p-6 backdrop-blur-sm"
                  id="misrep"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center text-amber-300 text-xl backdrop-blur-sm">
                      ⚖️
                    </span>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                      Misrepresentation
                    </h3>
                  </div>
                  <p className="text-amber-100 text-base leading-relaxed">
                    <strong>Legal Warning:</strong> Knowingly submitting a false
                    infringement notice or counter notice is illegal and may
                    lead to liability for damages, costs and attorneys' fees
                    (see 17 U.S.C. § 512(f)).
                  </p>
                </div>
              </div>

              {/* Additional Sections */}
              <div className="space-y-8 mb-12">
                <div className="bg-gradient-to-r from-slate-800/30 to-purple-800/20 border border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
                    Fair Use and Jurisdiction
                  </h3>
                  <p className="text-gray-200 text-base leading-relaxed">
                    Nothing in this policy is intended to limit legitimate
                    defences such as fair use, fair dealing or other exceptions.
                    While Codaiq is based outside the United States, we follow
                    the DMCA as an international best practice framework.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-slate-800/30 to-blue-800/20 border border-blue-400/30 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
                    Modifications
                  </h3>
                  <p className="text-gray-200 text-base leading-relaxed">
                    We may revise this policy to reflect changes in law or our
                    service. The revision date at the top is the latest version.
                    Continued use of Codaiq after changes take effect
                    constitutes acceptance.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
                id="contact"
              >
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-400/40 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-blue-300 text-lg backdrop-blur-sm">
                      💬
                    </span>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                      General Questions
                    </h3>
                  </div>
                  <a
                    href="mailto:support@codaiq.com"
                    className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 underline font-mono bg-blue-500/10 px-3 py-1 rounded-lg transition-colors"
                  >
                    📧 support@codaiq.com
                  </a>
                </div>

                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-400/40 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-purple-300 text-lg backdrop-blur-sm">
                      📋
                    </span>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                      Legal Correspondence
                    </h3>
                  </div>
                  <p className="text-purple-100 text-sm">
                    DMCA Agent address listed in section 2
                  </p>
                </div>
              </div>

              {/* Quick Reference */}
              <div className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border border-purple-400/40 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-6 text-center flex items-center justify-center gap-2">
                  <span className="text-purple-400">⚡</span>
                  Quick Reference Guide
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <p className="text-purple-200 font-semibold text-base mb-2">
                      Infringement Notice
                    </p>
                    <p className="text-gray-300 text-sm font-mono bg-purple-500/10 px-2 py-1 rounded">
                      abuse@codaiq.com
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <p className="text-blue-200 font-semibold text-base mb-2">
                      Response Time
                    </p>
                    <p className="text-gray-300 text-sm">
                      Within 2 business days
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <p className="text-cyan-200 font-semibold text-base mb-2">
                      Repeat Offenses
                    </p>
                    <p className="text-gray-300 text-sm">
                      3 strikes = account closure
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

export default DMCAPolicyPage;
