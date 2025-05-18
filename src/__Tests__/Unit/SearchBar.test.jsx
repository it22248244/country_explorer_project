// src/__Tests__/Unit/SearchBar.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../../components/EnhancedSearchBar';

describe('SearchBar Component', () => {
  // Set up fake timers before each test
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Clean up after each test
  afterEach(() => {
    jest.useRealTimers();
  });

  test('updates search term and calls onSearch when input changes', () => {
    // Create a mock function for the onSearch prop
    const mockOnSearch = jest.fn();
    
    // Render the SearchBar component with the mock function
    render(<SearchBar onSearch={mockOnSearch} />);
    
    // Find the search input element
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    
    // Simulate user typing in the search box
    fireEvent.change(searchInput, { target: { value: 'Sri Lanka' } });
    
    // Check if the input value has been updated
    expect(searchInput.value).toBe('Sri Lanka');
    
    // Fast-forward timers to trigger the debounced function
    jest.runAllTimers();
    
    // Verify that onSearch was called with the correct value
    expect(mockOnSearch).toHaveBeenCalledWith('Sri Lanka');
  });
});