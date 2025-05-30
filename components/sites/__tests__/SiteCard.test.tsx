import { render, screen } from '@/lib/test-utils';
import SiteCard from '../SiteCard';
import { mockSite } from '@/lib/test-utils';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src} alt={props.alt} />;
  },
}));

describe('SiteCard', () => {
  it('renders site information correctly', () => {
    render(<SiteCard site={mockSite} />);

    expect(screen.getByText(mockSite.name)).toBeInTheDocument();
    expect(screen.getByText(mockSite.slug)).toBeInTheDocument();
    expect(screen.getByText('Open Editor')).toBeInTheDocument();
  });

  it('has correct link to editor', () => {
    render(<SiteCard site={mockSite} />);

    const link = screen.getByRole('link', { name: /open editor/i });
    expect(link).toHaveAttribute('href', `/dashboard/${mockSite.id}/editor`);
  });

  it('uses default thumbnail when thumbnailUrl is null', () => {
    const siteWithoutThumbnail = { ...mockSite, thumbnailUrl: null };
    render(<SiteCard site={siteWithoutThumbnail} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', siteWithoutThumbnail.name);
    expect(image).toHaveAttribute('src', '/thumbnails/default.png');
  });
}); 