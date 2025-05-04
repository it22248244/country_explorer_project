// RegionFilter.jsx
import { useState } from 'react';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export default function RegionFilter({ onFilter }) {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (region) => {
    setSelectedRegion(region);
    onFilter(region);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-48 px-4 py-3 text-left bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition duration-200"
      >
        <span className="text-gray-700">
          {selectedRegion || 'Filter by Region'}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-[1000] w-48 mt-2 bg-white rounded-xl shadow-lg border-2 border-gray-200">
          <div className="py-1">
            <button
              onClick={() => handleChange('')}
              className={`w-full px-4 py-2 text-left hover:bg-indigo-50 transition duration-150 ${
                selectedRegion === '' ? 'text-indigo-600 font-medium' : 'text-gray-700'
              }`}
            >
              All Regions
            </button>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => handleChange(region)}
                className={`w-full px-4 py-2 text-left hover:bg-indigo-50 transition duration-150 ${
                  selectedRegion === region ? 'text-indigo-600 font-medium' : 'text-gray-700'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
