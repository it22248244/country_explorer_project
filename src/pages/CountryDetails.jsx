import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCountryByCode } from '../services/api';

export default function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCountry = async () => {
      try {
        setLoading(true);
        const data = await fetchCountryByCode(code);
        setCountry(data);
        setError(null);
      } catch (err) {
        setError('Failed to load country details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCountry();
  }, [code]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-xl mb-4">{error || 'Country not found'}</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-24">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-lg rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300 group border border-white/30"
          >
            <svg 
              className="w-5 h-5 mr-2 text-white group-hover:translate-x-[-2px] transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium text-white">Back to Home</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            {/* Flag Image */}
            <div className="relative group lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="relative w-full h-auto rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Country Details */}
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/30 lg:col-span-2">
              <div className="mb-8 relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                <h1 className="text-5xl font-bold text-white mb-2 relative">{country.name.common}</h1>
                <p className="text-white/80 italic text-lg">{country.name.official}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-white/90">Population</span>
                      <p className="text-white text-lg">{country.population.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-white/90">Region</span>
                      <p className="text-white text-lg">{country.region}</p>
                    </div>
                  </div>

                  <div className="flex items-center bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-white/90">Capital</span>
                      <p className="text-white text-lg">{country.capital?.[0] || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-white/90">Currencies</span>
                      <p className="text-white text-lg">
                        {Object.values(country.currencies)
                          .map(currency => `${currency.name} (${currency.symbol})`)
                          .join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-white/90">Languages</span>
                      <p className="text-white text-lg">
                        {Object.values(country.languages).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-white/90">Top Level Domain</span>
                      <p className="text-white text-lg">{country.tld?.join(', ') || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-white/90">Demonym</span>
                      <p className="text-white text-lg">{country.demonyms?.eng?.m || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-white/90">Subregion</span>
                      <p className="text-white text-lg">{country.subregion || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Border Countries */}
              {country.borders && country.borders.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4 text-white">Border Countries</h2>
                  <div className="flex flex-wrap gap-3">
                    {country.borders.map((borderCode) => (
                      <Link
                        key={borderCode}
                        to={`/country/${borderCode}`}
                        className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105 hover:shadow-lg"
                      >
                        {borderCode}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
