// src/__Tests__/Unit/SearchBar.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EnhancedSearchBar from '../../components/EnhancedSearchBar';

// Mock the API service
jest.mock('../../services/api', () => ({
  fetchCountryByName: jest.fn()
}));

// Import the mocked function after the mock is set up
import { fetchCountryByName } from '../../services/api';

describe('EnhancedSearchBar Component', () => {
  const mockCountries = [
    {
      name: { common: 'Sri Lanka' },
      flags: { png: 'sri-lanka-flag.png' },
      cca3: 'LKA',
    },
    {
      name: { common: 'United States' },
      flags: { png: 'us-flag.png' },
      cca3: 'USA',
    }
  ];

  beforeEach(() => {
    // Reset the mock before each test
    fetchCountryByName.mockReset();
    // Mock console.error
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error
    console.error.mockRestore();
  });

  test('updates search term and calls onSearch when input changes', async () => {
    // Create a mock function for the onSearch prop
    const mockOnSearch = jest.fn();
    
    // Setup mock API response
    fetchCountryByName.mockResolvedValue(mockCountries);
    
    // Render the EnhancedSearchBar component with the mock function
    render(<EnhancedSearchBar onSearch={mockOnSearch} />);
    
    // Find the search input element
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    
    // Simulate user typing in the search box
    fireEvent.change(searchInput, { target: { value: 'Sri' } });
    
    // Check if the input value has been updated
    expect(searchInput.value).toBe('Sri');
    
    // Wait for the API call and suggestions to appear
    await waitFor(() => {
      expect(fetchCountryByName).toHaveBeenCalledWith('Sri');
    });
    
    // Verify that onSearch was called with the correct value
    expect(mockOnSearch).toHaveBeenCalledWith('Sri');
  });

  test('displays suggestions when API returns results', async () => {
    // Create a mock function for the onSearch prop
    const mockOnSearch = jest.fn();
    
    // Setup mock API response
    fetchCountryByName.mockResolvedValue(mockCountries);
    
    // Render the EnhancedSearchBar component
    render(<EnhancedSearchBar onSearch={mockOnSearch} />);
    
    // Find and type in the search input
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Sri' } });
    
    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    // Verify that suggestion images are displayed
    const suggestionImages = screen.getAllByRole('img');
    expect(suggestionImages).toHaveLength(2);
  });

  test('handles API errors gracefully', async () => {
    // Create a mock function for the onSearch prop
    const mockOnSearch = jest.fn();
    
    // Setup mock API to reject
    fetchCountryByName.mockRejectedValue(new Error('API Error'));
    
    // Render the EnhancedSearchBar component
    render(<EnhancedSearchBar onSearch={mockOnSearch} />);
    
    // Find and type in the search input
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Sri' } });
    
    // Wait for the API call
    await waitFor(() => {
      expect(fetchCountryByName).toHaveBeenCalledWith('Sri');
      expect(console.error).toHaveBeenCalledWith('Error fetching suggestions:', expect.any(Error));
    });

    // Verify that no suggestions are displayed
    expect(screen.queryByText('Sri Lanka')).not.toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
  });

  test('clears search and suggestions when clear button is clicked', async () => {
    // Create a mock function for the onSearch prop
    const mockOnSearch = jest.fn();
    
    // Setup mock API response
    fetchCountryByName.mockResolvedValue(mockCountries);
    
    // Render the EnhancedSearchBar component
    render(<EnhancedSearchBar onSearch={mockOnSearch} />);
    
    // Find and type in the search input
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Sri' } });
    
    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
    });

    // Find and click the clear button using a more specific selector
    const clearButton = screen.getByRole('button', { name: '' }); // The clear button has no text content
    fireEvent.click(clearButton);
    
    // Verify that search input is cleared
    expect(searchInput.value).toBe('');
    
    // Verify that suggestions are hidden
    expect(screen.queryByText('Sri Lanka')).not.toBeInTheDocument();
    
    // Verify that onSearch was called with empty string
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});