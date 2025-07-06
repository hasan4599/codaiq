"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { Fetch } from "@/hooks/fetch";
import { useEffect, useState } from "react";

const RefundPolicyPage = () => {
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
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-2xl">💳</span>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-green-100 to-emerald-100 bg-clip-text text-transparent mb-6 leading-tight">
                  Codaiq · Refund & Cancellation Policy
                </h1>
                <div className="inline-block bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-full px-6 py-3 backdrop-blur-sm">
                  <p className="text-green-200 text-sm sm:text-base font-medium">
                    <strong>Webdesignoo Ltd. – Effective 26 May 2025</strong>
                  </p>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="bg-gradient-to-r from-slate-800/40 to-green-800/20 border border-green-500/30 rounded-2xl p-6 mb-8 sm:mb-12 backdrop-blur-sm">
                <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                  <span className="text-green-400">🧭</span>
                  Quick Navigation
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    { name: "Scope", id: "scope" },
                    { name: "Free Trial", id: "trial" },
                    { name: "Billing Cycles", id: "billing" },
                    { name: "Refund Rules", id: "refund-rules" },
                    { name: "Refund Method", id: "refund-method" },
                    { name: "Account Termination", id: "termination" },
                    { name: "Contact Us", id: "contact" },
                    { name: "Policy Updates", id: "updates" },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-sm text-green-300 hover:text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-500/20 rounded-xl px-3 py-2 transition-all duration-300 border border-transparent hover:border-green-400/30"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <section id="scope">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    1
                  </span>
                  Scope
                </h2>
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center text-blue-300 text-2xl backdrop-blur-sm">
                      📋
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-200 text-base leading-relaxed">
                        This policy applies to all paid subscriptions, add-on
                        services and one-time purchases made through codaiq.com
                        or the in-app billing portal. Nothing herein limits any
                        statutory consumer rights that cannot be waived (e.g.
                        the 14-day "cooling-off" period for EU/UK consumers on
                        digital subscriptions).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="trial">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    2
                  </span>
                  Free Trial
                </h2>
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center text-green-300 text-2xl backdrop-blur-sm">
                      🆓
                    </div>
                    <div className="flex-1">
                      <div className="text-green-200 text-base leading-relaxed space-y-2">
                        <p>
                          <strong>Length:</strong> 7 days, full platform access.
                        </p>
                        <p>
                          <strong>Charges:</strong> Your payment method is
                          authorised at sign-up but not debited until the trial
                          ends.
                        </p>
                        <p>
                          Cancel any time during the trial from Dashboard →
                          Billing → Cancel Plan to avoid fees.
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
                  Billing Cycles & Cancellation
                </h2>
                <div className="bg-gradient-to-r from-slate-800/30 to-purple-800/20 border border-purple-400/30 rounded-2xl p-6 mb-6 backdrop-blur-sm overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          Plan type
                        </th>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          Renewal
                        </th>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          How to cancel
                        </th>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                          When cancellation takes effect
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-gray-300">Monthly</td>
                        <td className="p-4 text-gray-300">Every 30 days</td>
                        <td className="p-4 text-gray-300">In-app or e-mail*</td>
                        <td className="p-4 text-gray-300">
                          End of the current billing month
                        </td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-gray-300">Annual</td>
                        <td className="p-4 text-gray-300">Every 12 months</td>
                        <td className="p-4 text-gray-300">In-app or e-mail*</td>
                        <td className="p-4 text-gray-300">
                          End of the paid-up year
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-gray-300">
                          Pay-as-you-go / Credits
                        </td>
                        <td className="p-4 text-gray-300">N/A (one-time)</td>
                        <td className="p-4 text-gray-300">
                          Unused credits expire after 12 months
                        </td>
                        <td className="p-4 text-gray-300">Immediate</td>
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
                      * E-mail requests must come from the account address and
                      be sent to billing@codaiq.com with the subject "Cancel
                      Subscription". We confirm by reply within one business
                      day.
                    </p>
                  </div>
                </div>
              </section>

              <section id="refund-rules">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    4
                  </span>
                  Refund Rules
                </h2>
                <div className="bg-gradient-to-r from-slate-800/30 to-orange-800/20 border border-orange-400/30 rounded-2xl p-6 mb-6 backdrop-blur-sm overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                          Situation
                        </th>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                          Refund?
                        </th>
                        <th className="border-b border-white/20 p-4 text-left text-white font-semibold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-gray-300">
                          Trial cancelled on or before day 7
                        </td>
                        <td className="p-4 text-green-400 font-semibold">
                          100%
                        </td>
                        <td className="p-4 text-gray-300">
                          No charge captured.
                        </td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-gray-300">
                          Monthly plan – cancellation mid-cycle
                        </td>
                        <td className="p-4 text-yellow-400 font-semibold">
                          Prorated
                        </td>
                        <td className="p-4 text-gray-300">
                          Prorated credit for every full unused day after the
                          cancellation date, refunded to original payment method
                          within 10 business days.
                        </td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-gray-300">
                          Annual plan – within first 14 days
                        </td>
                        <td className="p-4 text-green-400 font-semibold">
                          100%
                        </td>
                        <td className="p-4 text-gray-300">
                          EU/UK "cooling-off" or voluntary global money-back
                          guarantee (no questions asked).
                        </td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-gray-300">
                          Annual plan – after day 14
                        </td>
                        <td className="p-4 text-red-400 font-semibold">
                          No cash refund
                        </td>
                        <td className="p-4 text-gray-300">
                          Service continues until term ends; you keep platform
                          access.
                        </td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-gray-300">
                          Service outage {">"} 24h in a calendar month
                          (unplanned)
                        </td>
                        <td className="p-4 text-blue-400 font-semibold">
                          Account credit
                        </td>
                        <td className="p-4 text-gray-300">
                          Account credit equal to one week of fees; claimed via
                          support ticket within 30 days of the incident.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-gray-300">
                          Charge processed in error
                        </td>
                        <td className="p-4 text-green-400 font-semibold">
                          100%
                        </td>
                        <td className="p-4 text-gray-300">
                          Report within 60 days for full reversal.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gradient-to-r from-red-900/30 to-pink-900/20 border border-red-500/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-red-300 text-xl backdrop-blur-sm">
                      🚫
                    </span>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                      Non-refundable items:
                    </h3>
                  </div>
                  <ul className="text-red-100 space-y-2 text-base">
                    {[
                      "Domain registration or renewal fees",
                      "Third-party integrations purchased through Codaiq Marketplace",
                      "One-time professional-services packages once work has begun",
                      "Bank/processing fees incurred from chargebacks",
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
                </div>
              </section>

              <section id="refund-method">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    5
                  </span>
                  Refund Method & Timing
                </h2>
                <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/20 border border-cyan-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-cyan-300 text-2xl backdrop-blur-sm">
                      ⏰
                    </div>
                    <div className="flex-1">
                      <div className="text-cyan-200 text-base leading-relaxed space-y-3">
                        <p>
                          Refunds are credited to the same payment method (card,
                          PayPal, etc.) used for the original transaction.
                        </p>
                        <p>
                          We initiate refunds within 10 business days of
                          approval; your bank's posting time may add a few days.
                        </p>
                        <p>
                          All refunds are processed in the original transaction
                          currency. Any FX differences are borne by the
                          customer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="termination">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    6
                  </span>
                  Account Termination for Breach
                </h2>
                <div className="bg-gradient-to-r from-red-900/30 to-pink-900/20 border border-red-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center text-red-300 text-2xl backdrop-blur-sm">
                      ⚠️
                    </div>
                    <div className="flex-1">
                      <p className="text-red-200 text-base leading-relaxed">
                        If we suspend or terminate your account for violating
                        the Terms of Service or Acceptable Use Policy, all fees
                        paid remain non-refundable.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="contact">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    7
                  </span>
                  How to Contact Us
                </h2>
                <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/20 border border-indigo-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-indigo-300 text-2xl backdrop-blur-sm">
                      📞
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent mb-3">
                        Billing & Refund Desk
                      </h3>
                      <div className="text-indigo-200 text-base leading-relaxed space-y-2">
                        <p>
                          <strong>E-mail:</strong>
                          <a
                            href="mailto:billing@codaiq.com"
                            className="text-indigo-300 hover:text-indigo-100 ml-2 underline bg-indigo-500/10 px-2 py-1 rounded transition-colors"
                          >
                            billing@codaiq.com
                          </a>
                        </p>
                        <p>
                          <strong>Postal:</strong> Webdesignoo Ltd., 71-75
                          Shelton Street, Covent Garden, London WC2H 9JQ, United
                          Kingdom
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="updates">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent mt-8 sm:mt-12 mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-base font-bold text-white shadow-lg">
                    8
                  </span>
                  Policy Updates
                </h2>
                <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 border border-amber-400/30 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center text-amber-300 text-2xl backdrop-blur-sm">
                      📝
                    </div>
                    <div className="flex-1">
                      <p className="text-amber-200 text-base leading-relaxed">
                        We may revise this policy to reflect changes in law,
                        pricing or our services. Updates take effect 30 days
                        after posting; material changes are announced via e-mail
                        and in-app notice.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Disclaimer */}
              <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/20 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center text-yellow-300 text-2xl backdrop-blur-sm">
                    ⚠️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-yellow-200 to-amber-200 bg-clip-text text-transparent mb-2">
                      Legal Disclaimer
                    </h3>
                    <p className="text-yellow-200 text-sm leading-relaxed">
                      <strong>Disclaimer:</strong> This document is provided for
                      information only and does not constitute legal advice.
                      Please consult qualified counsel to adapt the policy to
                      your specific jurisdiction and business model.
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

export default RefundPolicyPage;
