const axios = require('axios');
require('dotenv').config();

const BASE_URLS = {
  production: 'https://www.ulip.dpiit.gov.in/ulip/v1.0.0',
  staging: 'https://www.ulipstaging.dpiit.gov.in/ulip/v1.0.0',
};

let authToken = null; 
let tokenExpiry = null; 

// Function to get a new authentication token.
const fetchAuthToken = async () => {
  const environment = process.env.ULIP_ENVIRONMENT || 'staging';
  const loginUrl = `${BASE_URLS[environment]}/user/login`;

  try {
    const response = await axios.post(
      loginUrl,
      {
        username: process.env.ULIP_USERNAME,
        password: process.env.ULIP_PASSWORD,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const token = response.data.response.id;
    authToken = token; 
    tokenExpiry = Date.now() + 30 * 60 * 1000; 

    console.log('New Token Fetched:', token);
    return token;
  } catch (error) {
    console.error('Error fetching token:', error.response?.data || error.message);
    throw new Error('Authentication failed');
  }
};

//Token fetch
const getAuthToken = async () => {
  if (!authToken || Date.now() >= tokenExpiry) {
    console.log('Token expired or not available. Fetching a new one...');
    return await fetchAuthToken();
  }
  console.log('Reusing existing token...');
  return authToken;
};

const postRequest = async (endpoint, payload) => {
  const environment = process.env.ULIP_ENVIRONMENT || 'staging';
  const baseUrl = BASE_URLS[environment];
  const token = await getAuthToken(); 

  try {
    const response = await axios.post(
      `${baseUrl}${endpoint}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error making API request:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { getAuthToken, postRequest };
