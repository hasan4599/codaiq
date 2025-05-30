import { render, screen, fireEvent } from '@/lib/test-utils';
import EmptyState from '../EmptyState';

describe('EmptyState', () => {
  it('renders empty state message', () => {
    render(<EmptyState />);
    
    expect(screen.getByText('No Sites Yet')).toBeInTheDocument();
    expect(screen.getByText(/get started by creating your first site/i)).toBeInTheDocument();
  });

  it('renders create site button', () => {
    render(<EmptyState />);
    
    const button = screen.getByRole('button', { name: /create your first site/i });
    expect(button).toBeInTheDocument();
  });

  it('attempts to click new site button when create button is clicked', () => {
    // Create a mock element with click method
    const mockElement = document.createElement('button');
    const mockClick = jest.fn();
    mockElement.addEventListener('click', mockClick);

    // Mock querySelector to return our mock element
    jest.spyOn(document, 'querySelector').mockImplementation(() => mockElement);

    render(<EmptyState />);
    
    const button = screen.getByRole('button', { name: /create your first site/i });
    fireEvent.click(button);

    expect(document.querySelector).toHaveBeenCalledWith('[aria-label="Create new site"]');
    expect(mockClick).toHaveBeenCalled();

    // Clean up
    jest.restoreAllMocks();
  });
}); 