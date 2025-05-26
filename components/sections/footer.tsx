import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faDiscord,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterLinks from "../footer-links";

export default function Footer() {
  return (
    <footer className="bg-gray-900/80 py-20 px-4 lg:px-8 border-t border-gray-800/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faRocket as unknown as IconProp}
                className="text-purple-400 w-8 h-8"
              />
              <span className="text-2xl font-bold">Codaiq</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering the next generation of web creation through AI
              innovation.
            </p>
            <div className="flex gap-4">
              {[faTwitter, faLinkedin, faGithub, faDiscord].map((icon, i) => (
                <button
                  key={i}
                  className="glass-layer p-3 rounded-xl hover:bg-gray-800/30 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={icon as unknown as IconProp}
                    className="w-6 h-6"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Links - Takes up remaining 3 columns */}
          <div className="lg:col-span-3">
            <FooterLinks />
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-16 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Codaiq. All rights reserved.</p>
          <p className="mt-2">By Badruk Group | Dubai</p>
        </div>
      </div>
    </footer>
  );
}
