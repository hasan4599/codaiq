"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { Fetch } from "@/hooks/fetch";
import { useEffect, useState } from "react";

const LegalNoticePage = () => {
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
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-6 leading-tight">
                  Codaiq · Legal Notice (Imprint)
                </h1>
                <div className="inline-block bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <p className="text-blue-200 text-sm sm:text-base font-medium">
                    <strong>Webdesignoo Ltd. – Effective 26 May 2025</strong>
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
                    { name: "Company Info", id: "company" },
                    { name: "Address", id: "address" },
                    { name: "Registration", id: "registration" },
                    { name: "Director", id: "director" },
                    { name: "Contact", id: "contact" },
                    { name: "Content Liability", id: "content" },
                    { name: "Link Liability", id: "links" },
                    { name: "Dispute Resolution", id: "dispute" },
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

              <section id="company">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    1
                  </span>
                  Provider / Company
                </h2>
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-blue-300 text-2xl backdrop-blur-sm">
                      🏢
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-200 text-base leading-relaxed">
                        <strong className="text-blue-100">
                          Webdesignoo Ltd.
                        </strong>{" "}
                        - a private company limited by shares, registered in
                        England & Wales.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="address">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    2
                  </span>
                  Registered Office (Correspondence Address)
                </h2>
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center text-green-300 text-2xl backdrop-blur-sm">
                      📍
                    </div>
                    <div className="flex-1">
                      <div className="text-green-200 text-base leading-relaxed space-y-1">
                        <p>71-75 Shelton Street</p>
                        <p>Covent Garden</p>
                        <p>London WC2H 9JQ</p>
                        <p className="font-semibold text-green-100 mt-2">
                          United Kingdom
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="registration">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    3
                  </span>
                  Company Number
                </h2>
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-purple-300 text-2xl backdrop-blur-sm">
                      📊
                    </div>
                    <div className="flex-1">
                      <p className="text-purple-200 text-base leading-relaxed">
                        <span className="font-semibold text-purple-100 bg-purple-500/10 px-2 py-1 rounded">
                          148 818 01
                        </span>{" "}
                        – Companies House, Cardiff
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="director">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    4
                  </span>
                  Managing Director / Owner
                </h2>
                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/20 border border-orange-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center text-orange-300 text-2xl backdrop-blur-sm">
                      👤
                    </div>
                    <div className="flex-1">
                      <p className="text-orange-200 text-base leading-relaxed">
                        <span className="font-semibold text-orange-100 bg-orange-500/10 px-2 py-1 rounded">
                          Hasan Badruk
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="contact">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    5
                  </span>
                  Contact
                </h2>
                <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/20 border border-cyan-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-cyan-300 text-2xl backdrop-blur-sm">
                      📧
                    </div>
                    <div className="flex-1">
                      <p className="text-cyan-200 text-base leading-relaxed">
                        <strong>E-mail:</strong>
                        <a
                          href="mailto:support@codaiq.com"
                          className="text-cyan-300 hover:text-cyan-100 ml-2 underline bg-cyan-500/10 px-2 py-1 rounded transition-colors"
                        >
                          support@codaiq.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="responsible">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    6
                  </span>
                  Responsible for Website Content
                </h2>
                <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/20 border border-indigo-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-indigo-300 text-2xl backdrop-blur-sm">
                      📝
                    </div>
                    <div className="flex-1">
                      <p className="text-indigo-200 text-base leading-relaxed">
                        <strong>Section 55 RStV / § 18 (2) MStV:</strong> Hasan
                        Badruk – address as above.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="content">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    7
                  </span>
                  Liability for Contents
                </h2>
                <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 border border-amber-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center text-amber-300 text-2xl backdrop-blur-sm">
                      ⚠️
                    </div>
                    <div className="flex-1">
                      <p className="text-amber-200 text-base leading-relaxed">
                        Although we carefully prepare and update all information
                        on codaiq.com, we cannot guarantee completeness or
                        accuracy. Pursuant to applicable law we are responsible
                        only for our own content; we are under no obligation to
                        monitor third-party information transmitted or stored on
                        our platform. Obligations to remove or block the use of
                        information under general law remain unaffected.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="links">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    8
                  </span>
                  Liability for Links
                </h2>
                <div className="bg-gradient-to-r from-red-900/30 to-pink-900/20 border border-red-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-red-300 text-2xl backdrop-blur-sm">
                      🔗
                    </div>
                    <div className="flex-1">
                      <p className="text-red-200 text-base leading-relaxed">
                        Our site contains links to external websites of third
                        parties over whose content we have no influence.
                        Responsibility for linked pages rests solely with their
                        operators. We checked the linked pages for possible
                        legal violations when first linking; no unlawful content
                        was recognisable at that time. Permanent monitoring of
                        linked pages is not reasonable without concrete
                        indications of a violation. Upon notification of
                        infringements, we will remove such links promptly.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="dispute">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-rose-500 to-red-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    9
                  </span>
                  Online Dispute Resolution
                </h2>
                <div className="bg-gradient-to-r from-rose-900/30 to-red-900/20 border border-rose-500/30 rounded-2xl p-6 mb-12 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500/20 to-red-500/20 rounded-2xl flex items-center justify-center text-rose-300 text-2xl backdrop-blur-sm">
                      ⚖️
                    </div>
                    <div className="flex-1">
                      <p className="text-rose-200 text-base leading-relaxed">
                        The European Commission offers a platform for online
                        dispute resolution (ODR):
                        <a
                          href="https://ec.europa.eu/consumers/odr/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-rose-300 hover:text-rose-100 ml-1 underline bg-rose-500/10 px-2 py-1 rounded transition-colors"
                        >
                          https://ec.europa.eu/consumers/odr/
                        </a>
                        . We are neither obliged nor willing to participate in
                        dispute-resolution proceedings before a consumer
                        arbitration board.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Summary Cards */}
              <div className="bg-gradient-to-r from-slate-800/30 to-purple-800/20 border border-purple-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6 text-center flex items-center justify-center gap-2">
                  <span className="text-purple-400">📋</span>
                  Company Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-blue-300 text-xl">🏢</span>
                    </div>
                    <h3 className="text-white font-semibold text-base mb-2">
                      Company
                    </h3>
                    <p className="text-gray-300 text-sm">Webdesignoo Ltd.</p>
                    <p className="text-gray-400 text-xs">
                      Registered in England & Wales
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-purple-300 text-xl">📊</span>
                    </div>
                    <h3 className="text-white font-semibold text-base mb-2">
                      Registration
                    </h3>
                    <p className="text-gray-300 text-sm">148 818 01</p>
                    <p className="text-gray-400 text-xs">
                      Companies House, Cardiff
                    </p>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mb-3">
                      <span className="text-orange-300 text-xl">👤</span>
                    </div>
                    <h3 className="text-white font-semibold text-base mb-2">
                      Director
                    </h3>
                    <p className="text-gray-300 text-sm">Hasan Badruk</p>
                    <p className="text-gray-400 text-xs">Managing Director</p>
                  </div>
                </div>
              </div>

              {/* Compliance Notice */}
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center text-green-300 text-lg backdrop-blur-sm">
                    ✅
                  </div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                    Compliance Notice
                  </h3>
                </div>
                <p className="text-green-200 text-sm text-center leading-relaxed">
                  This legal notice complies with German § 5 TMG and § 55 RStV
                  requirements
                </p>
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

export default LegalNoticePage;
