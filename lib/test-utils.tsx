import { render as rtlRender } from '@testing-library/react';
import { ReactElement } from 'react';

// Add providers here if needed
function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function render(ui: ReactElement, options = {}) {
  return rtlRender(ui, { wrapper: Providers, ...options });
}

// Mock site data
export const mockSite = {
  id: 'test-site-id',
  ownerId: 'test-user-id',
  name: 'Test Site',
  slug: 'test-site',
  thumbnailUrl: '/thumbnails/default.png',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Re-export everything
export * from '@testing-library/react';
export { render }; 