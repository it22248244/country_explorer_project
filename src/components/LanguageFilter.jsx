// LanguageFilter.jsx
import { useState } from 'react';

const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Portuguese',
  'Italian',
  'Russian',
  'Japanese',
  'Chinese',
  'Arabic',
  'Sinhala',
  'Tamil'
];

export default function LanguageFilter({ onFilter }) {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (language) => {
    setSelectedLanguage(language);
    onFilter(language);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-48 px-4 py-3 text-left bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition duration-200"
      >
        <span className="text-gray-700">
          {selectedLanguage || 'Filter by Language'}
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
        <div className="absolute z-50 w-48 mt-2 bg-white rounded-xl shadow-lg border-2 border-gray-200">
          <div className="py-1">
            <button
              onClick={() => handleChange('')}
              className={`w-full px-4 py-2 text-left hover:bg-indigo-50 transition duration-150 ${
                selectedLanguage === '' ? 'text-indigo-600 font-medium' : 'text-gray-700'
              }`}
            >
              All Languages
            </button>
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => handleChange(language)}
                className={`w-full px-4 py-2 text-left hover:bg-indigo-50 transition duration-150 ${
                  selectedLanguage === language ? 'text-indigo-600 font-medium' : 'text-gray-700'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}