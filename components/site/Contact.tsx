import { FC } from 'react';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faPhone, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

interface ContactProps {
  title?: string;
  subtitle?: string;
  contactInfo?: ContactInfo;
  formEndpoint?: string;
  backgroundColor?: string;
  textColor?: string;
}

const Contact: FC<ContactProps> = ({
  title = "Contact Us",
  subtitle,
  contactInfo,
  formEndpoint = "#",
  backgroundColor,
  textColor,
}) => {
  return (
    <div
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6"
      style={{
        backgroundColor: backgroundColor || 'var(--background-color)',
        color: textColor || 'var(--text-color)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            style={{ fontFamily: 'var(--heading-font)' }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg sm:text-xl opacity-80 max-w-3xl mx-auto px-4 sm:px-6">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 p-6 sm:p-8 rounded-xl transition-all duration-300 hover:bg-white/10">
            <form action={formEndpoint} method="POST" className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5 sm:mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="
                    w-full px-3 sm:px-4 py-2 rounded-lg 
                    bg-white/10 border border-white/20 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                    transition-all duration-300
                    text-sm sm:text-base
                  "
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5 sm:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="
                    w-full px-3 sm:px-4 py-2 rounded-lg 
                    bg-white/10 border border-white/20 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                    transition-all duration-300
                    text-sm sm:text-base
                  "
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5 sm:mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="
                    w-full px-3 sm:px-4 py-2 rounded-lg 
                    bg-white/10 border border-white/20 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                    transition-all duration-300
                    text-sm sm:text-base
                  "
                ></textarea>
              </div>
              <button
                type="submit"
                className="
                  w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg 
                  bg-blue-500 text-white font-medium 
                  hover:bg-blue-600 
                  transition-all duration-300
                  transform hover:scale-[1.02]
                  text-sm sm:text-base
                "
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          {contactInfo && (
            <div className="space-y-6 sm:space-y-8">
              {contactInfo.email && (
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="
                    w-10 h-10 sm:w-12 sm:h-12 rounded-lg 
                    bg-blue-500/10 
                    flex items-center justify-center flex-shrink-0
                    transition-all duration-300
                    hover:bg-blue-500/20
                  ">
                    <FontAwesomeIcon
                      icon={faEnvelope as IconProp}
                      className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-1">Email</h3>
                    <a 
                      href={`mailto:${contactInfo.email}`} 
                      className="
                        text-sm sm:text-base opacity-80 
                        hover:opacity-100 transition-opacity
                      "
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.phone && (
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="
                    w-10 h-10 sm:w-12 sm:h-12 rounded-lg 
                    bg-blue-500/10 
                    flex items-center justify-center flex-shrink-0
                    transition-all duration-300
                    hover:bg-blue-500/20
                  ">
                    <FontAwesomeIcon
                      icon={faPhone as IconProp}
                      className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-1">Phone</h3>
                    <a 
                      href={`tel:${contactInfo.phone}`} 
                      className="
                        text-sm sm:text-base opacity-80 
                        hover:opacity-100 transition-opacity
                      "
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.address && (
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="
                    w-10 h-10 sm:w-12 sm:h-12 rounded-lg 
                    bg-blue-500/10 
                    flex items-center justify-center flex-shrink-0
                    transition-all duration-300
                    hover:bg-blue-500/20
                  ">
                    <FontAwesomeIcon
                      icon={faMapMarker as IconProp}
                      className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-1">Address</h3>
                    <p className="text-sm sm:text-base opacity-80">{contactInfo.address}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact; 