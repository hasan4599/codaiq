import Link from "next/link";

const FooterLinks = () => {
  const footerColumns = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Templates", href: "/templates" },
        { name: "Integrations", href: "/integrations" },
        { name: "Roadmap", href: "/roadmap" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Academy", href: "/academy" },
        { name: "Blog", href: "/blog" },
        { name: "Community", href: "/community" },
        { name: "Status", href: "https://status.example.com", external: true },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Acceptable Use", href: "/legal/acceptable-use" },
        { name: "Cookie Policy", href: "/legal/cookie-policy" },
        { name: "DMCA Policy", href: "/legal/dmca-policy" },
        { name: "Imprint", href: "/legal/imprint" },
        { name: "Privacy Policy", href: "/legal/privacy-policy" },
        { name: "Refund Policy", href: "/legal/refund-policy" },
        { name: "Terms of Service", href: "/legal/terms-of-service" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
      {footerColumns.map((column, columnIndex) => (
        <div key={columnIndex} className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-4">{column.title}</h3>
          <nav aria-label={`${column.title} navigation`}>
            <ul className="space-y-3">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  {link.external ? (
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-200 inline-flex items-center gap-1"
                      aria-label={`${link.name} (opens in new tab)`}
                    >
                      {link.name}
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-200 block"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;
