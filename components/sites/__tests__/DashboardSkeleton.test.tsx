import { render, screen } from '@/lib/test-utils';
import DashboardSkeleton from '../DashboardSkeleton';

describe('DashboardSkeleton', () => {
  it('renders correct number of skeleton cards', () => {
    render(<DashboardSkeleton />);
    
    const skeletonCards = document.querySelectorAll('.animate-pulse');
    expect(skeletonCards).toHaveLength(6);
  });

  it('renders skeleton cards with correct structure', () => {
    render(<DashboardSkeleton />);
    
    const firstCard = document.querySelector('.animate-pulse');
    expect(firstCard).toBeInTheDocument();
    
    // Check for thumbnail skeleton
    const thumbnail = firstCard?.querySelector('.aspect-video');
    expect(thumbnail).toBeInTheDocument();
    
    // Check for content skeleton items
    const contentItems = firstCard?.querySelectorAll('.bg-gray-800\\/50');
    expect(contentItems).toHaveLength(4); // Thumbnail + 3 content items
  });
}); 