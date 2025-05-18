// EnhancedSearchBar.jsx
import { useState, useEffect, useRef } from 'react';
import { fetchCountryByName } from '../services/api';

const EnhancedSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    // Handle clicks outside the search component
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      setLoading(true);
      try {
        // Use fetchCountryByName to get suggestions
        const countries = await fetchCountryByName(value);
        // Sort countries alphabetically only if data exists
        if (countries && Array.isArray(countries)) {
          const sortedCountries = countries.sort((a, b) => 
            a.name.common.localeCompare(b.name.common)
          );
          setSuggestions(sortedCountries.slice(0, 5)); // Show top 5 suggestions
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    onSearch(value);
  };

  const handleSuggestionClick = (country) => {
    setSearchTerm(country.name.common);
    setShowSuggestions(false);
    onSearch(country.name.common);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch('');
  };

  return (
    <div className="relative mx-auto max-w-2xl" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
          className="w-full px-6 py-4 pl-14 text-lg rounded-full shadow-lg bg-white border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-[9999] w-full mt-2 bg-white rounded-xl shadow-lg border-2 border-gray-200 max-h-80 overflow-y-auto">
          <div className="py-2">
            {suggestions.map((country) => (
              <button
                key={country.cca3}
                onClick={() => handleSuggestionClick(country)}
                className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition duration-150 flex items-center space-x-3"
              >
                <img
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                  className="w-6 h-4 object-cover rounded"
                />
                <span className="text-gray-700">{country.name.common}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchBar;