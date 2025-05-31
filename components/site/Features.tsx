import { FC } from 'react';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/free-solid-svg-icons";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  backgroundColor?: string;
  textColor?: string;
}

export const Features: FC<FeaturesProps> = ({
  title = "Features",
  subtitle,
  features,
  columns = 3,
  backgroundColor,
  textColor,
}) => {
  // Calculate grid columns based on screen size and number of features
  const gridCols = features.length === 1 ? 1 : features.length === 2 ? 2 : columns;

  return (
    <div
      className="py-12 sm:py-20 px-4 sm:px-6"
      style={{
        backgroundColor: backgroundColor || 'var(--background-color)',
        color: textColor || 'var(--text-color)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
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

        <div 
          className={`
            grid gap-6 sm:gap-8
            grid-cols-1
            ${features.length === 2 ? 'sm:grid-cols-2' : ''}
            ${features.length >= 3 ? `
              sm:grid-cols-2 
              ${gridCols >= 3 ? 'lg:grid-cols-3' : ''}
              ${gridCols === 4 ? 'xl:grid-cols-4' : ''}
            ` : ''}
          `}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className="
                p-6 sm:p-8 rounded-xl 
                bg-white/5 hover:bg-white/10 
                transition-all duration-300
                transform hover:scale-105
                hover:shadow-xl
              "
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 sm:mb-6">
                <FontAwesomeIcon
                  icon={feature.icon as IconProp}
                  className="w-6 h-6 text-blue-500"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base opacity-80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features; 