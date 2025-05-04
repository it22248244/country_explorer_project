// src/setupTests.js
import '@testing-library/jest-dom';

// Suppress specific React Router warnings during tests
const originalWarn = console.warn;
console.warn = (...args) => {
  // Filter out specific React Router warnings
  if (args[0] && typeof args[0] === 'string' && 
     (args[0].includes('React Router Future Flag Warning') || 
      args[0].includes('v7_startTransition') ||
      args[0].includes('v7_relativeSplatPath'))) {
    return;
  }
  originalWarn(...args);
};

// Mock the window.matchMedia function used by some components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});