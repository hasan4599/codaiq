import { FC } from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  alignment?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  textColor?: string;
}

export const Hero: FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaLink = '#',
  image,
  alignment = 'center',
  backgroundColor,
  textColor,
}) => {
  return (
    <div
      className={`
        py-12 sm:py-16 md:py-20 px-4 sm:px-6 
        ${alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'}
      `}
      style={{
        backgroundColor: backgroundColor || 'var(--background-color)',
        color: textColor || 'var(--text-color)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`
          flex flex-col gap-8 sm:gap-12
          ${image ? 'lg:flex-row lg:items-center' : ''}
          ${alignment === 'right' ? 'lg:flex-row-reverse' : ''}
        `}>
          <div className={`
            flex-1 
            ${alignment === 'center' ? 'text-center' : ''} 
            ${image ? 'lg:max-w-[50%]' : 'max-w-4xl mx-auto'}
          `}>
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ fontFamily: 'var(--heading-font)' }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-80 leading-relaxed">
                {subtitle}
              </p>
            )}
            {ctaText && (
              <a
                href={ctaLink}
                className="
                  inline-block px-6 sm:px-8 py-3 rounded-lg 
                  text-white text-base sm:text-lg font-medium 
                  transition-all duration-300
                  transform hover:scale-105 hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50
                "
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                {ctaText}
              </a>
            )}
          </div>
          {image && (
            <div className="flex-1 lg:max-w-[50%]">
              <img
                src={image}
                alt={title}
                className="
                  w-full h-auto rounded-lg shadow-xl 
                  transition-transform duration-300 
                  hover:scale-[1.02] hover:shadow-2xl
                "
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero; 