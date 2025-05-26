const CookieGDPRPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Glassmorphism container */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-white mb-8">
              Cookie and GDPR Policy
            </h1>
            <p className="text-gray-300 mb-8">
              <strong>
                Codaiq – Webdesignoo Ltd. · Last updated 26 May 2025
              </strong>
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              1 About This Notice
            </h2>
            <p className="text-gray-300 mb-4">
              This page explains how Codaiq (Webdesignoo Ltd., "we", "us") uses
              cookies and comparable tracking technologies on codaiq.com and
              inside the Codaiq web-builder. It also describes the choices and
              rights you have under the EU/UK GDPR, the e-Privacy rules, the
              California CPRA and similar laws.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              2 What Are Cookies
            </h2>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-blue-200">
                Cookies are small text files placed on your device that store
                information about your visit. Pixels, local-storage objects and
                SDKs serve similar purposes; for simplicity they are all called
                "cookies" here.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              3 Legal Basis and Consent
            </h2>
            <div className="space-y-4 mb-6">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-300 mb-2">
                  Strictly Necessary Cookies
                </h3>
                <p className="text-red-200">
                  Load because they are required to provide the service you
                  request (Article 6 (1)(b) GDPR).
                </p>
              </div>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-2">
                  Optional Cookies
                </h3>
                <p className="text-green-200">
                  All other cookies (analytics, functional, advertising) load
                  only after you give explicit, granular opt-in consent via our
                  banner (Article 6 (1)(a) GDPR and § 25 TTDSG / UK PECR).
                </p>
              </div>
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Consent Management
                </h3>
                <p className="text-purple-200">
                  Your consent record is stored securely for five years and can
                  be revoked at any time from "Cookie Settings" in the site
                  footer.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              4 Cookie Categories We Use
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/20 bg-white/5 rounded-lg">
                <thead>
                  <tr className="bg-white/10">
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Category
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Purpose
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Typical Lifetime
                    </th>
                    <th className="border border-white/20 p-3 text-left text-white font-semibold">
                      Examples
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/20 p-3 text-red-300 font-semibold">
                      Strictly necessary
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Login sessions, payment checkout security
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      up to 24 h
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300 font-mono text-sm">
                      __Host-codaiq_session
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-blue-300 font-semibold">
                      Functional
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Remember language or editor preferences
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      1 – 12 months
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300 font-mono text-sm">
                      codaiq_locale
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-green-300 font-semibold">
                      Performance / analytics
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Aggregate usage statistics (GA4 with IP-anonymisation)
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      1 – 14 months
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300 font-mono text-sm">
                      *ga, *gid
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/20 p-3 text-purple-300 font-semibold">
                      Marketing / targeting
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      Measure campaigns, prevent duplicate ads
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300">
                      3 – 6 months
                    </td>
                    <td className="border border-white/20 p-3 text-gray-300 font-mono text-sm">
                      fbp, gcl_au
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 mb-6">
              <p className="text-amber-200 text-sm">
                <strong>Note:</strong> A scanned list with exact cookie names,
                providers and expiry dates appears in the banner's "Details" tab
                and updates automatically after every monthly scan.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              5 Third-Party Services That May Set Cookies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-center">
                <p className="text-gray-300 font-semibold">Stripe</p>
                <p className="text-gray-400 text-xs">Payments</p>
              </div>
              <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-center">
                <p className="text-gray-300 font-semibold">
                  Google Analytics 4
                </p>
                <p className="text-gray-400 text-xs">Analytics</p>
              </div>
              <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-center">
                <p className="text-gray-300 font-semibold">
                  Google Tag Manager
                </p>
                <p className="text-gray-400 text-xs">Tag Management</p>
              </div>
              <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-center">
                <p className="text-gray-300 font-semibold">Meta Ads</p>
                <p className="text-gray-400 text-xs">Advertising</p>
              </div>
              <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-center">
                <p className="text-gray-300 font-semibold">Cloudflare</p>
                <p className="text-gray-400 text-xs">CDN & Security</p>
              </div>
              <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-center">
                <p className="text-gray-300 font-semibold">Cookiebot CMP</p>
                <p className="text-gray-400 text-xs">Consent Management</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Each provider processes data under a data-processing agreement
              incorporating Standard Contractual Clauses where data leaves the
              EEA/UK.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              6 How to Manage Cookies
            </h2>
            <div className="space-y-4 mb-6">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-2">
                  Consent Management
                </h3>
                <p className="text-green-200">
                  Use the "Cookie Settings" link at the bottom of every page to
                  withdraw or change consent.
                </p>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                  Browser Settings
                </h3>
                <p className="text-blue-200">
                  Alternatively, adjust your browser settings to delete or block
                  cookies altogether. Doing so may degrade certain features (for
                  example, staying logged in to the builder).
                </p>
              </div>
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Opt-Out Links
                </h3>
                <p className="text-purple-200">
                  Google Analytics:
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-100 ml-1 underline"
                  >
                    tools.google.com/dlpage/gaoptout
                  </a>
                  <br />
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

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              7 Your Privacy Rights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                  GDPR/UK GDPR Rights
                </h3>
                <p className="text-blue-200 text-sm">
                  Access, rectification, erasure, restriction, data portability
                  or object to processing.
                </p>
              </div>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-2">
                  California Rights
                </h3>
                <p className="text-green-200 text-sm">
                  Request disclosure or deletion of personal information and opt
                  out of cross-context behavioural advertising.
                </p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 mb-6 text-center">
              <p className="text-gray-300">
                <strong>Submit Requests:</strong>
                <a
                  href="mailto:privacy@codaiq.com"
                  className="text-blue-300 hover:text-blue-100 ml-1 underline"
                >
                  privacy@codaiq.com
                </a>
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              8 Data Transfers
            </h2>
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-6">
              <p className="text-orange-200">
                Personal data may be processed on servers in the United States
                or other jurisdictions. We rely on adequacy decisions or
                Standard Contractual Clauses plus supplementary measures to
                protect such transfers.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              9 Security
            </h2>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <p className="text-green-200">
                All cookies are transmitted over TLS 1.3. Session cookies set
                the Secure and HttpOnly flags; most use the SameSite=Lax
                attribute.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              10 Changes to This Policy
            </h2>
            <p className="text-gray-300 mb-4">
              We update this notice when we introduce new cookies or change
              regulatory requirements. The revision date at the top shows the
              latest version. Substantive changes are announced via banner and
              e-mail to registered customers at least 14 days before they take
              effect.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              11 Contact
            </h2>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Data Protection Officer
              </h3>
              <div className="text-blue-200">
                <p className="mb-1">
                  <strong>Hasan Badruk</strong>
                </p>
                <p className="mb-1">Webdesignoo Ltd.</p>
                <p className="mb-1">71–75 Shelton Street, Covent Garden</p>
                <p className="mb-1">London WC2H 9JQ, United Kingdom</p>
                <p className="mt-3">
                  <strong>E-mail:</strong>
                  <a
                    href="mailto:privacy@codaiq.com"
                    className="text-blue-300 hover:text-blue-100 ml-1 underline"
                  >
                    privacy@codaiq.com
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-purple-200 font-semibold">
                      Manage Cookies
                    </p>
                    <p className="text-gray-300">
                      Check footer "Cookie Settings"
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-purple-200 font-semibold">
                      Privacy Rights
                    </p>
                    <p className="text-gray-300">Email privacy@codaiq.com</p>
                  </div>
                  <div className="text-center">
                    <p className="text-purple-200 font-semibold">Opt-Out</p>
                    <p className="text-gray-300">Use provided links above</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieGDPRPolicyPage;
