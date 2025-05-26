const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Glassmorphism container */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-white mb-8">
              Codaiq · Privacy Policy (GDPR/CCPA-Ready)
            </h1>
            <p className="text-gray-300 mb-8">
              <strong>Webdesignoo Ltd. – Effective 26 May 2025</strong>
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              3.1 Who We Are
            </h2>
            <p className="text-gray-300 mb-4">
              <strong>Controller:</strong> Webdesignoo Ltd., Hasan Badruk (see
              Legal Notice).
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              3.2 What Data We Collect
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/20 bg-white/5 rounded-lg">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Category
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Examples
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Purpose
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Legal Basis (GDPR)
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Retention
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-3 text-blue-300 font-semibold">
                      Account Data
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Name, e-mail, password hash
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Contract fulfilment
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Art. 6 (1)(b)
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Until deletion + 5 years
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-green-300 font-semibold">
                      Usage Data
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      IP, browser, pages, logs
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Security, analytics
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Art. 6 (1)(f)
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      30 days
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-yellow-300 font-semibold">
                      Payment Data
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Card tokens via Stripe
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Billing
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Art. 6 (1)(b)/(c)
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      10 years (tax)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-purple-300 font-semibold">
                      Marketing Data
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Opt-in e-mail preferences
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Newsletters
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Consent Art. 6 (1)(a)
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Until withdrawal
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              3.3 Cookies & Tracking
            </h2>
            <p className="text-gray-300 mb-4">
              We use essential cookies for login/session and optional analytics
              cookies (Google Analytics 4) with anonymised IP. Consent banner
              provided via Cookiebot.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              3.4 Your Rights (GDPR)
            </h2>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-blue-200">
                You have the right to: Access, rectification, deletion,
                restriction, data portability, object, and lodge complaint with
                a supervisory authority.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              3.5 CCPA Notice (California)
            </h2>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <p className="text-green-200">
                <strong>Important:</strong> Codaiq does not sell personal
                information. California residents can exercise disclosure or
                deletion rights via privacy@codaiq.com.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              3.6 Data Transfers
            </h2>
            <p className="text-gray-300 mb-4">
              Where we transfer data outside the EEA/UK, we rely on Standard
              Contractual Clauses or adequacy decisions.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              3.7 Security
            </h2>
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 mb-6">
              <p className="text-gray-300">
                <strong>Security Measures:</strong> ISO-27001 aligned controls,
                encryption in transit (TLS 1.3) and at rest (AES-256),
                least-privilege access.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              4 Cookie Policy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-300 mb-2">
                  Strictly Necessary
                </h3>
                <p className="text-gray-300 text-sm">
                  Auth tokens, security cookies.
                </p>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                  Performance
                </h3>
                <p className="text-gray-300 text-sm">
                  *ga, *gid (Google Analytics).
                </p>
              </div>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-2">
                  Functional
                </h3>
                <p className="text-gray-300 text-sm">Language preference.</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  Marketing
                </h3>
                <p className="text-gray-300 text-sm">None by default.</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-center">
              Manage preferences anytime via the "Cookie Settings" link in the
              footer.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              5 Refund & Cancellation Policy
            </h2>
            <div className="space-y-4 mb-6">
              <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Trial Period
                </h3>
                <p className="text-gray-300">
                  7-day free trial; cancel before day 7 to avoid charges.
                </p>
              </div>
              <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Monthly Plans
                </h3>
                <p className="text-gray-300">
                  Prorated refund for unused full months after cancellation.
                </p>
              </div>
              <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Annual Plans
                </h3>
                <p className="text-gray-300">
                  Full refund within 14 days of first payment; thereafter no
                  refund but subscription continues until term end.
                </p>
              </div>
              <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Process
                </h3>
                <p className="text-gray-300">
                  E-mail billing@codaiq.com from your account address; refunds
                  are credited to the original payment method within 10 business
                  days.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              6 Acceptable Use Policy (AUP)
            </h2>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-red-300 mb-3">
                You must not use Codaiq to host or transmit:
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Illegal content or intellectual-property-infringing material.
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Hate speech, threats, or harassment.
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Personal data without lawful basis.
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  High-risk or regulated data (e.g., HIPAA, PCI-DSS) unless we
                  explicitly agree in writing.
                </li>
              </ul>
              <p className="text-red-200 mt-3 font-semibold">
                Violations may result in suspension or deletion without notice.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              7 Disclaimer
            </h2>
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-200">
                All information on codaiq.com is provided for general
                information only and should not be construed as professional
                advice. While we endeavour to keep content up to date, we make
                no warranties regarding accuracy, completeness or reliability.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-gray-400 text-center text-sm">
                For questions about this privacy policy, contact us at
                privacy@codaiq.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
