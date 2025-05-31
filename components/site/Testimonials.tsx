import { FC } from 'react';

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role?: string;
  avatar?: string;
  company?: string;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  backgroundColor?: string;
  textColor?: string;
}

const Testimonials: FC<TestimonialsProps> = ({
  title = "What Our Customers Say",
  subtitle,
  testimonials,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="
                p-6 sm:p-8 rounded-xl 
                bg-white/5 hover:bg-white/10 
                transition-all duration-300
                transform hover:scale-[1.02]
                hover:shadow-xl
              "
            >
              <blockquote>
                <p className="
                  text-base sm:text-lg leading-relaxed 
                  mb-6 opacity-90
                ">
                  "{testimonial.content}"
                </p>
                <footer className="flex items-center gap-3 sm:gap-4">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <cite className="not-italic font-semibold text-sm sm:text-base">
                      {testimonial.author}
                    </cite>
                    {(testimonial.role || testimonial.company) && (
                      <p className="text-xs sm:text-sm opacity-80">
                        {testimonial.role}
                        {testimonial.role && testimonial.company && " at "}
                        {testimonial.company}
                      </p>
                    )}
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 