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
  name: string;
  theme: {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      accent: string;
      muted: string;
      surface: string;
    };
    typography: {
      headingFont: string;
      bodyFont: string;
      baseSize: string;
      scaleRatio: number;
    };
    spacing?: {
      base?: string;
      scale?: number;
      container?: {
        padding?: string;
        maxWidth?: string;
      };
    };
    breakpoints?: {
      sm?: string;
      md?: string;
      lg?: string;
      xl?: string;
    };
  };
  components: Array<{
    id: string;
    type: string;
    props: Record<string, any>;
  }>;
}

interface EditorStore {
  siteId: string | null;
  config: SiteConfig | null;
  isDirty: boolean;
  activePanel: string;
  setSiteId: (id: string) => void;
  setConfig: (config: SiteConfig) => void;
  setIsDirty: (isDirty: boolean) => void;
  setActivePanel: (panel: string) => void;
  updateConfig: (updates: Partial<SiteConfig>) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  siteId: null,
  config: null,
  isDirty: false,
  activePanel: 'theme',
  setSiteId: (id) => set({ siteId: id }),
  setConfig: (config) => set({ config, isDirty: false }),
  setIsDirty: (isDirty) => set({ isDirty }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  updateConfig: (updates) => 
    set((state) => ({
      config: state.config ? { ...state.config, ...updates } : null,
      isDirty: true
    })),
})); 