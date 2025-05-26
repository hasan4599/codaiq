const LegalNoticePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Glassmorphism container */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-white mb-8">
              Codaiq · Legal Notice (Imprint)
            </h1>
            <p className="text-gray-300 mb-8">
              <strong>Webdesignoo Ltd. – Effective 26 May 2025</strong>
            </p>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              Provider / Company
            </h2>
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 mb-6">
              <p className="text-gray-300">
                <strong className="text-blue-300">Webdesignoo Ltd.</strong> - a
                private company limited by shares, registered in England &
                Wales.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              Registered Office (Correspondence Address)
            </h2>
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 mb-6">
              <div className="text-gray-300">
                <p className="mb-1">71-75 Shelton Street</p>
                <p className="mb-1">Covent Garden</p>
                <p className="mb-1">London WC2H 9JQ</p>
                <p className="font-semibold text-blue-300">United Kingdom</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              Company Number
            </h2>
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 mb-6">
              <p className="text-gray-300">
                <span className="font-semibold text-green-300">148 818 01</span>{" "}
                – Companies House, Cardiff
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              Managing Director / Owner
            </h2>
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 mb-6">
              <p className="text-gray-300">
                <span className="font-semibold text-purple-300">
                  Hasan Badruk
                </span>
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              Contact
            </h2>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-blue-200">
                <strong>E-mail:</strong>
                <a
                  href="mailto:support@codaiq.com"
                  className="text-blue-300 hover:text-blue-100 ml-1 underline"
                >
                  support@codaiq.com
                </a>
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              Responsible for Website Content
            </h2>
            <div className="bg-white/5 border border-white/20 rounded-lg p-4 mb-6">
              <p className="text-gray-300">
                <strong>Section 55 RStV / § 18 (2) MStV:</strong> Hasan Badruk –
                address as above.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              Liability for Contents
            </h2>
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-4 mb-6">
              <p className="text-amber-200">
                Although we carefully prepare and update all information on
                codaiq.com, we cannot guarantee completeness or accuracy.
                Pursuant to applicable law we are responsible only for our own
                content; we are under no obligation to monitor third-party
                information transmitted or stored on our platform. Obligations
                to remove or block the use of information under general law
                remain unaffected.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              Liability for Links
            </h2>
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 mb-6">
              <p className="text-orange-200">
                Our site contains links to external websites of third parties
                over whose content we have no influence. Responsibility for
                linked pages rests solely with their operators. We checked the
                linked pages for possible legal violations when first linking;
                no unlawful content was recognisable at that time. Permanent
                monitoring of linked pages is not reasonable without concrete
                indications of a violation. Upon notification of infringements,
                we will remove such links promptly.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">
              Online Dispute Resolution
            </h2>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-200">
                The European Commission offers a platform for online dispute
                resolution (ODR):
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-300 hover:text-red-100 ml-1 underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . We are neither obliged nor willing to participate in
                dispute-resolution proceedings before a consumer arbitration
                board.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Company</h3>
                  <p className="text-gray-300 text-sm">Webdesignoo Ltd.</p>
                  <p className="text-gray-400 text-xs">
                    Registered in England & Wales
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">
                    Registration
                  </h3>
                  <p className="text-gray-300 text-sm">148 818 01</p>
                  <p className="text-gray-400 text-xs">
                    Companies House, Cardiff
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Director</h3>
                  <p className="text-gray-300 text-sm">Hasan Badruk</p>
                  <p className="text-gray-400 text-xs">Managing Director</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                This legal notice complies with German § 5 TMG and § 55 RStV
                requirements
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNoticePage;
