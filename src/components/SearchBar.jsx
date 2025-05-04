import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Trigger search immediately when the component mounts to show all countries
    if (searchTerm === '') {
      onSearch('');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // Reduced delay for more responsive letter-by-letter search

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 pl-14 text-lg rounded-xl shadow-lg bg-white border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              onSearch('');
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
