import { FC } from 'react';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PricingFeature {
  id: string;
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  ctaText?: string;
  ctaLink?: string;
  highlighted?: boolean;
}

interface PricingProps {
  title?: string;
  subtitle?: string;
  plans: PricingPlan[];
  backgroundColor?: string;
  textColor?: string;
}

const Pricing: FC<PricingProps> = ({
  title = "Pricing Plans",
  subtitle,
  plans,
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

        <div className="
          grid grid-cols-1 gap-6 sm:gap-8
          sm:max-w-lg sm:mx-auto md:max-w-none 
          md:grid-cols-2 lg:grid-cols-3
        ">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`
                p-6 sm:p-8 rounded-xl 
                transition-all duration-300 
                hover:scale-[1.02] hover:shadow-xl
                ${plan.highlighted 
                  ? 'bg-blue-500 text-white ring-2 sm:ring-4 ring-blue-500/20' 
                  : 'bg-white/5 hover:bg-white/10'
                }
              `}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm sm:text-base opacity-80 mb-4 sm:mb-6">{plan.description}</p>
              <div className="mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                {!plan.price.includes('Custom') && (
                  <span className="text-sm sm:text-base opacity-80">/month</span>
                )}
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex items-center gap-2 sm:gap-3">
                    <FontAwesomeIcon
                      icon={(feature.included ? faCheck : faTimes) as IconProp}
                      className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${
                        feature.included 
                          ? 'text-green-500' 
                          : 'text-red-500 opacity-50'
                      }`}
                    />
                    <span className={`
                      text-sm sm:text-base
                      ${!feature.included ? 'opacity-50' : ''}
                    `}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              {plan.ctaText && (
                <a
                  href={plan.ctaLink || '#'}
                  className={`
                    block w-full py-2.5 sm:py-3 px-4 sm:px-6 
                    rounded-lg text-center font-medium 
                    text-sm sm:text-base
                    transition-all duration-300
                    transform hover:scale-[1.02]
                    ${plan.highlighted
                      ? 'bg-white text-blue-500 hover:bg-blue-50'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                    }
                  `}
                >
                  {plan.ctaText}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing; 