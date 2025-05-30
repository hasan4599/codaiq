import { create } from 'zustand';
import { StoreApi } from 'zustand';

export interface SiteConfig {
  theme: {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    typography: {
      headingFont: string;
      bodyFont: string;
    };
  };
  components: {
    id: string;
    type: string;
    props: Record<string, any>;
  }[];
  sections: {
    id: string;
    name: string;
    components: string[]; // Component IDs
  }[];
  meta: {
    title: string;
    description: string;
    favicon?: string;
  };
}

interface EditorState {
  // Site data
  siteId: string | null;
  config: SiteConfig | null;
  isDirty: boolean;
  activePanel: string | null;
  selectedComponent: string | null;
  
  // Actions
  setSiteId: (id: string) => void;
  setConfig: (config: SiteConfig) => void;
  updateTheme: (theme: Partial<SiteConfig['theme']>) => void;
  addComponent: (type: string, props: Record<string, any>) => void;
  updateComponent: (id: string, props: Record<string, any>) => void;
  deleteComponent: (id: string) => void;
  setActivePanel: (panel: string | null) => void;
  setSelectedComponent: (id: string | null) => void;
  markClean: () => void;
}

const defaultConfig: SiteConfig = {
  theme: {
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      background: '#FFFFFF',
      text: '#1F2937',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
  },
  components: [],
  sections: [],
  meta: {
    title: 'New Site',
    description: 'Created with CodaIQ',
  },
};

export const useEditorStore = create<EditorState>((set) => ({
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
  
  addComponent: (type: string, props: Record<string, any>) => set((state: EditorState) => {
    if (!state.config) return state;
    
    const newComponent = {
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
  
  updateComponent: (id: string, props: Record<string, any>) => set((state: EditorState) => {
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
        sections: state.config.sections.map((section) => ({
          ...section,
          components: section.components.filter((compId) => compId !== id),
        })),
      },
      isDirty: true,
    };
  }),
  
  setActivePanel: (panel: string | null) => set({ activePanel: panel }),
  
  setSelectedComponent: (id: string | null) => set({ selectedComponent: id }),
  
  markClean: () => set({ isDirty: false }),
})); 