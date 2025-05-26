const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Glassmorphism container */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-white mb-8">
              Codaiq · Refund & Cancellation Policy
            </h1>
            <p className="text-gray-300 mb-8">
              <strong>Webdesignoo Ltd. – Effective 26 May 2025</strong>
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              1 Scope
            </h2>
            <p className="text-gray-300 mb-4">
              This policy applies to all paid subscriptions, add-on services and
              one-time purchases made through codaiq.com or the in-app billing
              portal. Nothing herein limits any statutory consumer rights that
              cannot be waived (e.g. the 14-day "cooling-off" period for EU/UK
              consumers on digital subscriptions).
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              2 Free Trial
            </h2>
            <p className="text-gray-300 mb-4">
              <strong>Length:</strong> 7 days, full platform access.
              <br />
              <strong>Charges:</strong> Your payment method is authorised at
              sign-up but not debited until the trial ends.
              <br />
              Cancel any time during the trial from Dashboard → Billing → Cancel
              Plan to avoid fees.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              3 Billing Cycles & Cancellation
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/20 bg-white/5 rounded-lg">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Plan type
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Renewal
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      How to cancel
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      When cancellation takes effect
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Monthly
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Every 30 days
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      In-app or e-mail*
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      End of the current billing month
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Annual
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Every 12 months
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      In-app or e-mail*
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      End of the paid-up year
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Pay-as-you-go / Credits
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      N/A (one-time)
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Unused credits expire after 12 months
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Immediate
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              * E-mail requests must come from the account address and be sent
              to billing@codaiq.com with the subject "Cancel Subscription". We
              confirm by reply within one business day.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              4 Refund Rules
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/20 bg-white/5 rounded-lg">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Situation
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Refund?
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Trial cancelled on or before day 7
                    </td>
                    <td className="border border-white/20 p-3 text-green-400 font-semibold">
                      100%
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      No charge captured.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Monthly plan – cancellation mid-cycle
                    </td>
                    <td className="border border-white/20 p-3 text-yellow-400 font-semibold">
                      Prorated
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Prorated credit for every full unused day after the
                      cancellation date, refunded to original payment method
                      within 10 business days.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Annual plan – within first 14 days
                    </td>
                    <td className="border border-white/20 p-3 text-green-400 font-semibold">
                      100%
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      EU/UK "cooling-off" or voluntary global money-back
                      guarantee (no questions asked).
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Annual plan – after day 14
                    </td>
                    <td className="border border-white/20 p-3 text-red-400 font-semibold">
                      No cash refund
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Service continues until term ends; you keep platform
                      access.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Service outage {">"} 24h in a calendar month (unplanned)
                    </td>
                    <td className="border border-white/20 p-3 text-blue-400 font-semibold">
                      Account credit
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Account credit equal to one week of fees; claimed via
                      support ticket within 30 days of the incident.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Charge processed in error
                    </td>
                    <td className="border border-white/20 p-3 text-green-400 font-semibold">
                      100%
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Report within 60 days for full reversal.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-red-300 mb-2">
                Non-refundable items:
              </h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Domain registration or renewal fees</li>
                <li>
                  • Third-party integrations purchased through Codaiq
                  Marketplace
                </li>
                <li>
                  • One-time professional-services packages once work has begun
                </li>
                <li>• Bank/processing fees incurred from chargebacks</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              5 Refund Method & Timing
            </h2>
            <p className="text-gray-300 mb-4">
              Refunds are credited to the same payment method (card, PayPal,
              etc.) used for the original transaction.
              <br />
              We initiate refunds within 10 business days of approval; your
              bank's posting time may add a few days.
              <br />
              All refunds are processed in the original transaction currency.
              Any FX differences are borne by the customer.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              6 Account Termination for Breach
            </h2>
            <p className="text-gray-300 mb-4">
              If we suspend or terminate your account for violating the Terms of
              Service or Acceptable Use Policy, all fees paid remain
              non-refundable.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              7 How to Contact Us
            </h2>
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Billing & Refund Desk
              </h3>
              <p className="text-gray-300">
                <strong>E-mail:</strong> billing@codaiq.com
                <br />
                <strong>Postal:</strong> Webdesignoo Ltd., 71-75 Shelton Street,
                Covent Garden, London WC2H 9JQ, United Kingdom
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              8 Policy Updates
            </h2>
            <p className="text-gray-300 mb-6">
              We may revise this policy to reflect changes in law, pricing or
              our services. Updates take effect 30 days after posting; material
              changes are announced via e-mail and in-app notice.
            </p>

            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-200 text-sm">
                <strong>Disclaimer:</strong> This document is provided for
                information only and does not constitute legal advice. Please
                consult qualified counsel to adapt the policy to your specific
                jurisdiction and business model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;
