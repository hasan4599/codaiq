import { FC } from 'react';
import { SiteConfig } from '@/lib/store/editorStore';
import dynamic from 'next/dynamic';
import { Loading } from '@/components/ui/loading';

// Base responsive props that all components can use
interface ResponsiveProps {
  layout?: 'stack' | 'grid' | 'list' | 'slider' | 'side-by-side';
  spacing?: 'compact' | 'normal' | 'wide';
  isEditing?: boolean;
}

// Dynamically import components with loading states
const components = {
  hero: dynamic(() => import('@/components/site/Hero'), {
    loading: () => <Loading title="Loading Hero Component..." />
  }),
  features: dynamic(() => import('@/components/site/Features'), {
    loading: () => <Loading title="Loading Features Component..." />
  }),
  testimonials: dynamic(() => import('@/components/site/Testimonials'), {
    loading: () => <Loading title="Loading Testimonials Component..." />
  }),
  pricing: dynamic(() => import('@/components/site/Pricing'), {
    loading: () => <Loading title="Loading Pricing Component..." />
  }),
  contact: dynamic(() => import('@/components/site/Contact'), {
    loading: () => <Loading title="Loading Contact Component..." />
  }),
  footer: dynamic(() => import('@/components/site/Footer'), {
    loading: () => <Loading title="Loading Footer Component..." />
  }),
};

interface ComponentRendererProps {
  component: SiteConfig['components'][0];
  viewportSize?: 'desktop' | 'tablet' | 'mobile';
  isEditing?: boolean;
}

export const ComponentRenderer: FC<ComponentRendererProps> = ({ 
  component, 
  viewportSize = 'desktop',
  isEditing = false,
}) => {
  const Component = components[component.type as keyof typeof components];

  if (!Component) {
    return (
      <div className="p-4 border border-red-500 rounded-lg">
        <p className="text-red-500">Unknown component type: {component.type}</p>
        <pre className="mt-2 bg-gray-100 p-2 rounded text-sm overflow-auto">
          {JSON.stringify(component, null, 2)}
        </pre>
      </div>
    );
  }

  // Get the appropriate layout based on component type and viewport
  const getResponsiveLayout = (type: string, viewport: string): ResponsiveProps['layout'] => {
    if (viewport !== 'mobile') return undefined;
    
    switch (type) {
      case 'features':
      case 'pricing':
      case 'testimonials':
        return 'stack';
      case 'contact':
        return 'side-by-side';
      default:
        return undefined;
    }
  };

  // Get the appropriate spacing based on component type and viewport
  const getResponsiveSpacing = (type: string, viewport: string): ResponsiveProps['spacing'] => {
    if (viewport !== 'mobile') return 'normal';
    return 'compact';
  };

  // Add viewport-specific props
  const responsiveProps = {
    ...component.props,
    layout: component.props.layout || getResponsiveLayout(component.type, viewportSize),
    spacing: component.props.spacing || getResponsiveSpacing(component.type, viewportSize),
    isEditing,
  } as const;

  return (
    <div className="relative group">
      {isEditing && (
        <div className="
          absolute -top-4 left-1/2 transform -translate-x-1/2
          bg-gray-900 text-white text-xs px-2 py-1 rounded
          opacity-0 group-hover:opacity-100 transition-opacity
          pointer-events-none
        ">
          {component.type}
        </div>
      )}
      <Component {...responsiveProps} />
    </div>
  );
}; 