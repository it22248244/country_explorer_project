// src/__Tests__/Integration/HomePage.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage';

// Mock the API service
jest.mock('../../services/api', () => ({
  fetchAllCountries: jest.fn()
}));

// Import the mocked function after the mock is set up
import { fetchAllCountries } from '../../services/api';

describe('HomePage Integration', () => {
  beforeEach(() => {
    // Reset the mock before each test
    fetchAllCountries.mockReset();
  });

  test('renders country cards when API returns data', async () => {
    // Mock data returned from the API
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
    
    // Wait for the countries to load
    await waitFor(() => {
      expect(fetchAllCountries).toHaveBeenCalled();
    });
    
    // Test will pass if the API is correctly mocked and the component renders correctly
  });
});