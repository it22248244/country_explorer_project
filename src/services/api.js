import axios from 'axios';

const BASE_URL = "https://restcountries.com/v3.1";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const fetchAllCountries = async () => {
  try {
    const response = await api.get('/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw error;
  }
};

export const fetchCountryByName = async (name) => {
  try {
    const response = await api.get(`/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country by name ${name}:`, error);
    throw error;
  }
};

export const fetchCountriesByRegion = async (region) => {
  try {
    const response = await api.get(`/region/${region}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries by region ${region}:`, error);
    throw error;
  }
};

export const fetchCountryByCode = async (code) => {
  try {
    const response = await api.get(`/alpha/${code}`);
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching country by code ${code}:`, error);
    throw error;
  }
};
