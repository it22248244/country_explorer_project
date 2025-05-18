import { useEffect, useState } from "react";
import { fetchAllCountries, fetchCountriesByRegion, fetchCountryByName } from "../services/api";
import CountryCard from "../components/CountryCard";
import EnhancedSearchBar from "../components/EnhancedSearchBar";
import RegionFilter from "../components/RegionFilter";
import LanguageFilter from "../components/LanguageFilter";
import BackgroundCarousel from "../components/BackgroundCarousel";

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;
        
        if (searchTerm) {
          // Use fetchCountryByName when there's a search term
          data = await fetchCountryByName(searchTerm);
        } else if (selectedRegion) {
          // Use fetchCountriesByRegion when a region is selected
          data = await fetchCountriesByRegion(selectedRegion);
        } else {
          // Use fetchAllCountries as fallback
          data = await fetchAllCountries();
        }
        
        // Apply language filter if selected
        if (selectedLanguage) {
          data = data.filter(country => 
            country.languages && 
            Object.values(country.languages).some(lang => 
              lang.toLowerCase().includes(selectedLanguage.toLowerCase())
            )
          );
        }
        
        // Sort countries alphabetically only if data exists
        if (data && Array.isArray(data)) {
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        } else {
          data = [];
        }
        
        setCountries(data);
        setRetryCount(0); // Reset retry count on success
      } catch (err) {
        console.error('Error loading countries:', err);
        setError("Failed to load countries. Please try again.");
        if (retryCount < 3) {
          // Retry after 2 seconds
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, [searchTerm, selectedRegion, selectedLanguage, retryCount]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRegionFilter = (region) => {
    setSelectedRegion(region);
  };

  const handleLanguageFilter = (language) => {
    setSelectedLanguage(language);
  };

  const handleRetry = () => {
    setRetryCount(0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundCarousel />
      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              Journey Through Nations
            </h1>
            <p className="text-xl text-white/95 max-w-2xl mx-auto">
              Uncover the rich diversity of global cultures, traditions, and heritage
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 mb-16">
            <div className="w-full max-w-2xl transform transition-all duration-300 hover:scale-105 z-50">
              <EnhancedSearchBar onSearch={handleSearch} />
            </div>
            <div className="flex flex-col md:flex-row gap-6 z-10">
              <div className="transform transition-all duration-300 hover:scale-105">
                <RegionFilter onFilter={handleRegionFilter} />
              </div>
              <div className="transform transition-all duration-300 hover:scale-105">
                <LanguageFilter onFilter={handleLanguageFilter} />
              </div>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 mb-8 rounded-lg backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-200">
                      {error}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRetry}
                  className="ml-4 px-4 py-2 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-0">
              {countries.map((country) => (
                <div key={country.cca3} className="transform transition-all duration-300 hover:scale-105">
                  <CountryCard country={country} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
