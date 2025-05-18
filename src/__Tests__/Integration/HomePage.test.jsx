// src/__Tests__/Integration/HomePage.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage';

// Mock the API service
jest.mock('../../services/api', () => ({
  fetchAllCountries: jest.fn(),
  fetchCountriesByRegion: jest.fn(),
  fetchCountryByName: jest.fn()
}));

// Import the mocked functions after the mock is set up
import { fetchAllCountries, fetchCountriesByRegion, fetchCountryByName } from '../../services/api';

describe('HomePage Integration', () => {
    const mockCountries = [
      {
        name: { common: 'Sri Lanka' },
        flags: { svg: 'sri-lanka-flag.svg' },
        capital: ['Colombo'],
        region: 'Asia',
        population: 21803000,
        languages: { sin: 'Sinhala', tam: 'Tamil' },
        cca3: 'LKA',
      },
      {
        name: { common: 'United States' },
        flags: { svg: 'us-flag.svg' },
        capital: ['Washington, D.C.'],
        region: 'Americas',
        population: 331002651,
        languages: { eng: 'English' },
        cca3: 'USA',
      },
    ];
    
  beforeEach(() => {
    // Reset all mocks before each test
    fetchAllCountries.mockReset();
    fetchCountriesByRegion.mockReset();
    fetchCountryByName.mockReset();
    // Mock console.error
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error
    console.error.mockRestore();
  });

  test('renders country cards when API returns data', async () => {
    // Setup our mock to return the test data
    fetchAllCountries.mockResolvedValue(mockCountries);
    
    // Render the HomePage component within a Router context
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    // Check that the loading state is displayed
    expect(screen.getByText(/Journey Through Nations/i)).toBeInTheDocument();
    
    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
    
    // Wait for the countries to be displayed
    await waitFor(() => {
      expect(screen.getByText('Sri Lanka')).toBeInTheDocument();
      expect(screen.getByText('United States')).toBeInTheDocument();
    });
  });

  test('fetches countries by region when region filter is selected', async () => {
    // Setup our mock to return the test data
    fetchCountriesByRegion.mockResolvedValue(mockCountries);
    
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Find and click the region filter
    const regionFilter = screen.getByText('Filter by Region');
    fireEvent.click(regionFilter);
    
    // Select Asia region
    const asiaOption = screen.getByText('Asia');
    fireEvent.click(asiaOption);

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Wait for the API call and verify it was called with correct region
    await waitFor(() => {
      expect(fetchCountriesByRegion).toHaveBeenCalledWith('Asia');
    });
  });

  test('fetches countries by name when search term is entered', async () => {
    // Setup our mock to return the test data
    fetchCountryByName.mockResolvedValue([mockCountries[0]]); // Return only Sri Lanka
    
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Find the search input and enter a search term
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'Sri Lanka' } });

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Wait for the API call and verify it was called with correct search term
    await waitFor(() => {
      expect(fetchCountryByName).toHaveBeenCalledWith('Sri Lanka');
    });

    // Verify that only Sri Lanka is displayed
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Sri Lanka' })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'United States' })).not.toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    // Setup our mock to reject with an error
    fetchAllCountries.mockRejectedValue(new Error('API Error'));
    
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      expect(console.error).toHaveBeenCalledWith('Error loading countries:', expect.any(Error));
    });

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to load countries. Please try again.')).toBeInTheDocument();
    });

    // Verify that the retry button is present
    expect(screen.getByRole('button', { name: /Retry/i })).toBeInTheDocument();
  });
});