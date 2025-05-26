const DMCAPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Glassmorphism container */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-white mb-8">
              DMCA / Copyright Policy
            </h1>
            <p className="text-gray-300 mb-8">
              <strong>Codaiq – Webdesignoo Ltd. · Effective 26 May 2025</strong>
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              1 Purpose
            </h2>
            <p className="text-gray-300 mb-4">
              This policy explains how Codaiq responds to allegations of
              copyright infringement under the United States Digital Millennium
              Copyright Act, 17 U.S.C. § 512. It applies to all content hosted,
              transmitted or otherwise processed through Codaiq's services.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              2 Designated Copyright Agent
            </h2>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                DMCA Agent
              </h3>
              <div className="text-blue-200">
                <p className="mb-1">
                  <strong>Hasan Badruk</strong> – DMCA Agent
                </p>
                <p className="mb-1">Webdesignoo Ltd.</p>
                <p className="mb-1">71-75 Shelton Street, Covent Garden</p>
                <p className="mb-1">London WC2H 9JQ, United Kingdom</p>
                <p className="mt-3">
                  <strong>E-mail (for copyright notices only):</strong>
                  <a
                    href="mailto:abuse@codaiq.com"
                    className="text-blue-300 hover:text-blue-100 ml-1 underline"
                  >
                    abuse@codaiq.com
                  </a>
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              3 Filing a Copyright Infringement Notice
            </h2>
            <p className="text-gray-300 mb-4">
              To request removal of material you own the rights to, send a
              written notice that includes all items below. If any element is
              missing we may be unable to act.
            </p>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-red-300 mb-3">
                Required Elements:
              </h3>
              <ol className="text-red-200 space-y-2">
                <li className="flex items-start">
                  <span className="font-bold text-red-400 mr-2 min-w-[20px]">
                    a.
                  </span>
                  A physical or electronic signature of the person authorised to
                  act for the owner of the exclusive right that is allegedly
                  infringed.
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-400 mr-2 min-w-[20px]">
                    b.
                  </span>
                  Identification of the copyrighted work claimed to have been
                  infringed (for multiple works, a representative list).
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-400 mr-2 min-w-[20px]">
                    c.
                  </span>
                  Identification of the material that is claimed to be
                  infringing, with sufficient detail to permit us to locate it
                  (URL to the page, screenshots, project name, etc.).
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-400 mr-2 min-w-[20px]">
                    d.
                  </span>
                  Your contact information: name, mailing address, telephone
                  number and e-mail.
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-400 mr-2 min-w-[20px]">
                    e.
                  </span>
                  A statement that you have a good-faith belief the disputed use
                  is not authorised by the copyright owner, its agent or the
                  law.
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-red-400 mr-2 min-w-[20px]">
                    f.
                  </span>
                  A statement, under penalty of perjury, that the information in
                  the notice is accurate and that you are the copyright owner or
                  authorised to act on the owner's behalf.
                </li>
              </ol>
            </div>
            <p className="text-gray-300 mb-4">
              Send the complete notice to the DMCA Agent at the address or
              e-mail above. We will confirm receipt within two business days.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              4 Removal Procedure
            </h2>
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-orange-300 mb-3">
                Upon receiving a compliant notice we will:
              </h3>
              <ul className="text-orange-200 space-y-2">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  Acknowledge receipt to the complainant.
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  Disable access to or remove the material in question.
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  Notify the user who posted the material, supplying a copy of
                  the notice.
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  Record the incident for repeat-infringer tracking.
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              5 Counter Notice
            </h2>
            <p className="text-gray-300 mb-4">
              If you believe the material was removed in error, you may file a
              counter notice that must include:
            </p>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-green-300 mb-3">
                Counter Notice Requirements:
              </h3>
              <ol className="text-green-200 space-y-2">
                <li className="flex items-start">
                  <span className="font-bold text-green-400 mr-2 min-w-[20px]">
                    a.
                  </span>
                  Your physical or electronic signature.
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-green-400 mr-2 min-w-[20px]">
                    b.
                  </span>
                  Identification of the material removed and the location where
                  it appeared before removal.
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-green-400 mr-2 min-w-[20px]">
                    c.
                  </span>
                  A statement under penalty of perjury that you have a
                  good-faith belief the material was removed or disabled as a
                  result of mistake or misidentification.
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-green-400 mr-2 min-w-[20px]">
                    d.
                  </span>
                  Your name, address and telephone number, and a statement that
                  you consent to the jurisdiction of the United States federal
                  courts for the district where your address is located (or
                  Southern District of New York if outside the USA), and that
                  you will accept service of process from the person who filed
                  the original notice or their agent.
                </li>
              </ol>
            </div>
            <p className="text-gray-300 mb-4">
              Send the counter notice to the DMCA Agent. If we receive a valid
              counter notice, we will forward it to the original complainant.
              Unless the complainant files a court action within ten business
              days, we may restore the material.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              6 Repeat Infringer Policy
            </h2>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-200">
                <strong>Warning:</strong> Codaiq terminates, in appropriate
                circumstances, subscribers or account holders who are repeat
                infringers. Three founded infringements in any twelve-month
                period normally result in permanent account closure.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              7 Misrepresentation
            </h2>
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 mb-6">
              <p className="text-amber-200">
                <strong>Legal Warning:</strong> Knowingly submitting a false
                infringement notice or counter notice is illegal and may lead to
                liability for damages, costs and attorneys' fees (see 17 U.S.C.
                § 512(f)).
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              8 Fair Use and Jurisdiction
            </h2>
            <p className="text-gray-300 mb-4">
              Nothing in this policy is intended to limit legitimate defences
              such as fair use, fair dealing or other exceptions. While Codaiq
              is based outside the United States, we follow the DMCA as an
              international best practice framework.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              9 Modifications
            </h2>
            <p className="text-gray-300 mb-4">
              We may revise this policy to reflect changes in law or our
              service. The revision date at the top is the latest version.
              Continued use of Codaiq after changes take effect constitutes
              acceptance.
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              10 Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  General Questions
                </h3>
                <p className="text-gray-300">
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
                  Legal Correspondence
                </h3>
                <p className="text-gray-300">
                  DMCA Agent address listed in section 2
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Quick Reference
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-purple-200 font-semibold">
                      Infringement Notice
                    </p>
                    <p className="text-gray-300">Send to: abuse@codaiq.com</p>
                  </div>
                  <div>
                    <p className="text-purple-200 font-semibold">
                      Response Time
                    </p>
                    <p className="text-gray-300">Within 2 business days</p>
                  </div>
                  <div>
                    <p className="text-purple-200 font-semibold">
                      Repeat Offenses
                    </p>
                    <p className="text-gray-300">3 strikes = account closure</p>
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

export default DMCAPolicyPage;
