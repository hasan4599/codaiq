import { render, screen, fireEvent, waitFor } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';
import NewSiteButton from '../NewSiteButton';
import { useSites } from '@/lib/hooks/useSites';

// Mock useSites hook
jest.mock('@/lib/hooks/useSites');

describe('NewSiteButton', () => {
  const mockCreateSite = jest.fn();
  
  beforeEach(() => {
    (useSites as jest.Mock).mockReturnValue({
      createSite: mockCreateSite,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('opens dialog when clicked', async () => {
    render(<NewSiteButton />);
    
    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(screen.getByText('Create New Site')).toBeInTheDocument();
    expect(screen.getByLabelText('Site Name')).toBeInTheDocument();
  });

  it('handles site creation', async () => {
    render(<NewSiteButton />);
    
    // Open dialog
    const button = screen.getByRole('button');
    await userEvent.click(button);

    // Fill in site name
    const input = screen.getByLabelText('Site Name');
    await userEvent.type(input, 'Test Site');

    // Submit form
    const submitButton = screen.getByRole('button', { name: 'Create Site' });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateSite).toHaveBeenCalledWith('Test Site');
    });
  });

  it('disables submit button when name is empty', async () => {
    render(<NewSiteButton />);
    
    // Open dialog
    const button = screen.getByRole('button');
    await userEvent.click(button);

    const submitButton = screen.getByRole('button', { name: 'Create Site' });
    expect(submitButton).toBeDisabled();
  });

  it('shows loading state during submission', async () => {
    mockCreateSite.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<NewSiteButton />);
    
    // Open dialog and submit
    const button = screen.getByRole('button');
    await userEvent.click(button);
    
    const input = screen.getByLabelText('Site Name');
    await userEvent.type(input, 'Test Site');
    
    const submitButton = screen.getByRole('button', { name: 'Create Site' });
    await userEvent.click(submitButton);

    expect(screen.getByText('Creating...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
}); 