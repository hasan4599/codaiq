import { create } from 'zustand';
import { IconName } from '@fortawesome/free-solid-svg-icons';

// Base responsive props that all components can use
interface ResponsiveProps {
  layout?: 'stack' | 'grid' | 'list' | 'slider' | 'side-by-side';
  spacing?: 'compact' | 'normal' | 'wide';
  isEditing?: boolean;
}

// Component-specific types
interface HeroProps extends ResponsiveProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  alignment?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  textColor?: string;
  imagePosition?: 'left' | 'right';
}

interface HeroComponent {
  type: 'hero';
  props: HeroProps;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

interface FeaturesProps extends ResponsiveProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  backgroundColor?: string;
  textColor?: string;
}

interface FeaturesComponent {
  type: 'features';
  props: FeaturesProps;
}

interface Testimonial {
  id: string;
  content: string;
  author: string;
  role?: string;
  avatar?: string;
  company?: string;
}

interface TestimonialsProps extends ResponsiveProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  backgroundColor?: string;
  textColor?: string;
  cardStyle?: 'minimal' | 'elevated';
}

interface TestimonialsComponent {
  type: 'testimonials';
  props: TestimonialsProps;
}

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

interface PricingProps extends ResponsiveProps {
  title?: string;
  subtitle?: string;
  plans: PricingPlan[];
  backgroundColor?: string;
  textColor?: string;
  highlightStyle?: 'border' | 'fill';
}

interface PricingComponent {
  type: 'pricing';
  props: PricingProps;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

interface ContactProps extends ResponsiveProps {
  title?: string;
  subtitle?: string;
  contactInfo?: ContactInfo;
  formEndpoint?: string;
  backgroundColor?: string;
  textColor?: string;
  formStyle?: 'minimal' | 'floating';
}

interface ContactComponent {
  type: 'contact';
  props: ContactProps;
}

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

interface FooterProps extends ResponsiveProps {
  logo?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  bottomText?: string;
  backgroundColor?: string;
  textColor?: string;
  columnLayout?: 'auto' | 'fixed';
}

interface FooterComponent {
  type: 'footer';
  props: FooterProps;
}

// Combined component type
type SiteComponent = (
  | HeroComponent
  | FeaturesComponent
  | TestimonialsComponent
  | PricingComponent
  | ContactComponent
  | FooterComponent
) & {
  id: string;
  name?: string;
};

// Theme types with responsive support
interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent?: string;
  muted?: string;
  surface?: string;
}

interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  baseSize?: string;
  scaleRatio?: number;
}

interface ThemeSpacing {
  base?: string;
  scale?: number;
  container?: {
    padding?: string;
    maxWidth?: string;
  };
}

interface ThemeBreakpoints {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export interface SiteConfig {
  id: string;
  theme: {
    colors: ThemeColors;
    typography: ThemeTypography;
    spacing?: ThemeSpacing;
    breakpoints?: ThemeBreakpoints;
  };
  components: SiteComponent[];
  meta: {
    title: string;
    description: string;
    favicon?: string;
  };
}

interface EditorState {
  siteId: string | null;
  config: SiteConfig | null;
  isDirty: boolean;
  activePanel: string | null;
  selectedComponent: string | null;
  
  // Actions
  setSiteId: (id: string) => void;
  setConfig: (config: SiteConfig) => void;
  updateTheme: (theme: Partial<SiteConfig['theme']>) => void;
  addComponent: (type: SiteComponent['type'], props: any) => void;
  updateComponent: (id: string, props: any) => void;
  deleteComponent: (id: string) => void;
  setActivePanel: (panel: string | null) => void;
  setSelectedComponent: (id: string | null) => void;
  markClean: () => void;
}

const defaultConfig: SiteConfig = {
  id: '',
  theme: {
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      background: '#FFFFFF',
      text: '#1F2937',
      accent: '#F59E0B',
      muted: '#6B7280',
      surface: '#F3F4F6',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      baseSize: '16px',
      scaleRatio: 1.25,
    },
    spacing: {
      base: '1rem',
      scale: 1.5,
      container: {
        padding: '1rem',
        maxWidth: '80rem',
      },
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  components: [],
  meta: {
    title: 'New Site',
    description: 'Created with CodaIQ',
  },
};

export const useEditorStore = create<EditorState>()((set) => ({
  siteId: null,
  config: null,
  isDirty: false,
  activePanel: null,
  selectedComponent: null,

  setSiteId: (id: string) => set({ siteId: id }),
  
  setConfig: (config: SiteConfig) => set({ config, isDirty: true }),
  
  updateTheme: (theme: Partial<SiteConfig['theme']>) => set((state: EditorState) => ({
    config: state.config ? {
      ...state.config,
      theme: { ...state.config.theme, ...theme },
    } : defaultConfig,
    isDirty: true,
  })),
  
  addComponent: (type: SiteComponent['type'], props: any) => set((state: EditorState) => {
    if (!state.config) return state;
    
    const newComponent: SiteComponent = {
      id: crypto.randomUUID(),
      type,
      props,
    };
    
    return {
      config: {
        ...state.config,
        components: [...state.config.components, newComponent],
      },
      isDirty: true,
    };
  }),
  
  updateComponent: (id: string, props: any) => set((state: EditorState) => {
    if (!state.config) return state;
    
    return {
      config: {
        ...state.config,
        components: state.config.components.map((comp) =>
          comp.id === id ? { ...comp, props: { ...comp.props, ...props } } : comp
        ),
      },
      isDirty: true,
    };
  }),
  
  deleteComponent: (id: string) => set((state: EditorState) => {
    if (!state.config) return state;
    
    return {
      config: {
        ...state.config,
        components: state.config.components.filter((comp) => comp.id !== id),
      },
      isDirty: true,
    };
  }),
  
  setActivePanel: (panel: string | null) => set({ activePanel: panel }),
  
  setSelectedComponent: (id: string | null) => set({ selectedComponent: id }),
  
  markClean: () => set({ isDirty: false }),
})); 