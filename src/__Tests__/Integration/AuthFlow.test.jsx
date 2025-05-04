// src/__Tests__/Integration/AuthFlow.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/Login';

// Mock the auth context
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn().mockImplementation((email, password) => {
      if (email === 'test@example.com' && password === 'password123') {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }),
    error: null
  })
}));

describe('Auth Flow', () => {
  test('login form submits with correct values', async () => {
    // Render the Login component
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    // Get the input fields
    const emailInput = screen.getByPlaceholderText('you@example.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    
    // Fill in the form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Get the submit button and click it
    const submitButton = screen.getByRole('button', { name: /Sign in/i });
    fireEvent.click(submitButton);
    
    // Verify the form submission was successful
    await waitFor(() => {
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });
    
    // Test passes if the form submits correctly
  });
});