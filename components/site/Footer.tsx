import { FC } from 'react';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FooterLink {
  id: string;
  label: string;
  href: string;
}

interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  href: string;
}

interface FooterProps {
  logo?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  bottomText?: string;
  backgroundColor?: string;
  textColor?: string;
}

const socialIcons = {
  facebook: faFacebook,
  twitter: faTwitter,
  instagram: faInstagram,
  linkedin: faLinkedin,
};

const Footer: FC<FooterProps> = ({
  logo,
  columns = [],
  socialLinks = [],
  bottomText = "© 2024 All rights reserved.",
  backgroundColor,
  textColor,
}) => {
  return (
    <footer
      className="py-8 sm:py-12 px-4 sm:px-6"
      style={{
        backgroundColor: backgroundColor || 'var(--background-color)',
        color: textColor || 'var(--text-color)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="
          grid gap-8 sm:gap-12
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          mb-8 sm:mb-12
        ">
          {/* Logo and Social Links */}
          <div className="space-y-4 sm:space-y-6">
            {logo && (
              <img 
                src={logo} 
                alt="Logo" 
                className="h-6 sm:h-8 w-auto"
                loading="lazy"
              />
            )}
            {socialLinks.length > 0 && (
              <div className="flex gap-3 sm:gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-9 h-9 sm:w-10 sm:h-10 rounded-lg 
                      bg-white/5 hover:bg-white/10 
                      flex items-center justify-center 
                      transition-all duration-300
                      transform hover:scale-110
                      focus:outline-none focus:ring-2 focus:ring-blue-500/50
                    "
                  >
                    <FontAwesomeIcon
                      icon={socialIcons[link.platform] as IconProp}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer Columns */}
          {columns.map((column) => (
            <div key={column.id} className="sm:pl-4">
              <h3 className="
                font-semibold text-base sm:text-lg mb-3 sm:mb-4
                border-b border-white/10 pb-2 sm:border-0 sm:pb-0
              ">
                {column.title}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="
                        text-sm sm:text-base
                        opacity-80 hover:opacity-100 
                        transition-all duration-300
                        hover:translate-x-1
                        inline-block
                        focus:outline-none focus:text-blue-500
                      "
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="
          pt-6 sm:pt-8 
          border-t border-white/10 
          text-center 
          text-sm sm:text-base
          opacity-80
        ">
          <p>{bottomText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 