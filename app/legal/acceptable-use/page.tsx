const AUPPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Glassmorphism container */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-white mb-8">
              Acceptable Use Policy (AUP)
            </h1>
            <p className="text-gray-300 mb-8">
              <strong>Codaiq – Webdesignoo Ltd. · Effective 26 May 2025</strong>
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              1 Purpose and Scope
            </h2>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-blue-200">
                This Acceptable Use Policy ("Policy") applies to every visitor,
                registered user and customer ("you") of the Codaiq website,
                builder, APIs, and any other service operated by Webdesignoo
                Ltd. ("Codaiq", "we", "us"). It forms part of the Terms of
                Service. By accessing or using the Service you agree to comply
                with this Policy; if you violate it, we may suspend or terminate
                your account without notice.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              2 General Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-green-300 mb-2">
                  Lawful Use
                </h3>
                <p className="text-green-200 text-sm">
                  Use Codaiq only for lawful, ethical and bona-fide
                  web-development activities.
                </p>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                  Respect Others
                </h3>
                <p className="text-blue-200 text-sm">
                  Respect the rights, privacy and security of others.
                </p>
              </div>
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Platform Integrity
                </h3>
                <p className="text-purple-200 text-sm">
                  Do not interfere with, disrupt or degrade the Service or its
                  underlying infrastructure.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              3 Prohibited Content
            </h2>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-red-300 mb-3">
                You must not upload, publish, host or link to content that:
              </h3>
              <ol className="text-red-200 space-y-2">
                <li className="flex items-start">
                  <span className="font-bold text-red-400 mr-2 min-w-[20px]">
                    a)
                  </span>
                  infringes copyrights, trademarks, trade secrets or other
                  intellectual-property rights;
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-400 mr-2 min-w-[20px]">
                    b)
                  </span>
                  is obscene, sexually explicit (including CSEM), hateful,
                  violent, harassing or defamatory;
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-400 mr-2 min-w-[20px]">
                    c)
                  </span>
                  promotes terrorism, extremism, self-harm or illegal
                  activities;
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-400 mr-2 min-w-[20px]">
                    d)
                  </span>
                  contains unauthorised personal data or violates privacy laws
                  (GDPR, CCPA, etc.);
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-400 mr-2 min-w-[20px]">
                    e)
                  </span>
                  violates export controls or economic-sanctions regulations;
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-400 mr-2 min-w-[20px]">
                    f)
                  </span>
                  constitutes gambling services, unlicensed financial products,
                  or medical advice without proper authorisation.
                </li>
              </ol>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              4 Prohibited Activities
            </h2>
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-orange-300 mb-3">
                You must not:
              </h3>
              <ul className="text-orange-200 space-y-2">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  send spam, bulk unsolicited messages or phishing content;
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  distribute malware, ransomware, spyware, keyloggers or
                  exploits;
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  attempt to gain unauthorised access to any system or data
                  ("hacking", "scraping" beyond robots.txt, brute-force,
                  scanning);
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  reverse-engineer, decompile, circumvent security or usage
                  limits;
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  abuse shared resources (for example, sustained CPU or
                  bandwidth that risks platform stability);
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  use the Service for cryptocurrency mining or high-risk compute
                  without prior written consent;
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  impersonate another person or entity, or misrepresent
                  affiliation;
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  use the Service in breach of applicable law, including export,
                  sanctions, consumer-protection and data-protection statutes.
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              5 Resource Limits
            </h2>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <p className="text-yellow-200">
                Free-tier and trial accounts are subject to fair-use thresholds
                published in the docs. Excessive consumption may be throttled or
                billed. If you need higher limits, contact
                <a
                  href="mailto:sales@codaiq.com"
                  className="text-yellow-300 hover:text-yellow-100 ml-1 underline"
                >
                  sales@codaiq.com
                </a>
                .
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              6 Security Vulnerability Reporting
            </h2>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <p className="text-green-200">
                If you discover a vulnerability, notify us promptly at
                <a
                  href="mailto:security@codaiq.com"
                  className="text-green-300 hover:text-green-100 ml-1 underline"
                >
                  security@codaiq.com
                </a>
                and do not publicly disclose it until we have confirmed a fix.
                We will not pursue legal action for good-faith, compliant
                research.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              7 Enforcement
            </h2>
            <div className="space-y-4 mb-6">
              <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Detection & Review
                </h3>
                <p className="text-gray-300">
                  We review reports and automated signals to detect abuse.
                </p>
              </div>
              <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Progressive Response
                </h3>
                <p className="text-gray-300">
                  On first violation we may issue a warning or request immediate
                  remediation. Serious or repeated breaches can result in
                  suspension or permanent termination.
                </p>
              </div>
              <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Content Removal
                </h3>
                <p className="text-gray-300">
                  We reserve the right to remove any content that, in our sole
                  judgment, violates this Policy or presents risk to Codaiq,
                  other users or third parties.
                </p>
              </div>
              <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Legal Reporting
                </h3>
                <p className="text-gray-300">
                  Where required by law, we will report illegal conduct to
                  competent authorities.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              8 Copyright Complaints
            </h2>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
              <p className="text-purple-200">
                We operate a DMCA-style notice-and-takedown process. Send
                infringement notices to
                <a
                  href="mailto:abuse@codaiq.com"
                  className="text-purple-300 hover:text-purple-100 ml-1 underline"
                >
                  abuse@codaiq.com
                </a>
                with complete claim details (see DMCA Policy). We may disable or
                delete allegedly infringing material and, for repeat infringers,
                terminate accounts.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              9 Changes to This Policy
            </h2>
            <p className="text-gray-300 mb-4">
              We update this Policy as needed. The revision date appears at the
              top. Continued use after a change becomes effective constitutes
              acceptance.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              10 Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                  Policy Questions
                </h3>
                <p className="text-blue-200">
                  <a
                    href="mailto:support@codaiq.com"
                    className="text-blue-300 hover:text-blue-100 underline"
                  >
                    support@codaiq.com
                  </a>
                </p>
              </div>
              <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Legal Notices
                </h3>
                <p className="text-gray-300 text-sm">
                  Webdesignoo Ltd., 71-75 Shelton Street, Covent Garden, London
                  WC2H 9JQ, United Kingdom
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-300 mb-2">
                  Important Contacts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-red-200 font-semibold">
                      Security Issues
                    </p>
                    <p className="text-gray-300">security@codaiq.com</p>
                  </div>
                  <div className="text-center">
                    <p className="text-red-200 font-semibold">
                      Copyright Claims
                    </p>
                    <p className="text-gray-300">abuse@codaiq.com</p>
                  </div>
                  <div className="text-center">
                    <p className="text-red-200 font-semibold">
                      Resource Limits
                    </p>
                    <p className="text-gray-300">sales@codaiq.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-200 text-sm text-center">
                  <strong>Disclaimer:</strong> This document is provided for
                  information only and does not constitute legal advice. Consult
                  counsel to adapt it to your jurisdiction and business model.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AUPPolicyPage;
