const axios = require('axios').default;
import _ from 'lodash';

import searchAnswerRender from './first-subsection';

const searchInput = document.querySelector('.search-input');

// DEBOUNCER

const debounced = _.debounce(value => {
  searchQuery(value);
}, 500);

const debounceNull = _.debounce(value => {
  searchAnswerRender(value);
}, 600);

// СЛУХАЧ ІНПУТУ
searchInput.addEventListener('input', event => {
  if (event.target.value != 0) {
    debounced(event.target.value.trim());
  } else {
    return;
  }
});

let TOKEN = '';

// ОТРИМАННЯ ТОКЕНУ
async function getToken() {
  const CLIENTID = '89c78375788c421b8a7e095a0d0f41d0';
  const CLIENTSECRET = '0bb28ff04b0a4bcaa06283432eeb01cf';

  const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  const authString = Buffer.from(`${CLIENTID}:${CLIENTSECRET}`).toString(
    'base64'
  );

  try {
    const response = await axios.post(
      tokenEndpoint,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authString}`,
        },
      }
    );

    TOKEN = response.data.access_token; // Збереження токену
  } catch (error) {
    console.error('Failed to retrieve access token:', error);
    throw error;
  }
}

// ПОШУК
async function searchQuery(query) {
  if (!TOKEN) {
    console.error('Invalid access token.');
    return;
  }

  const searchEndpoint = 'https://api.spotify.com/v1/search';
  const queryParams = {
    q: query,
    type: 'track',
    offset: '0',
    limit: '10',
  };

  try {
    const response = await axios.get(searchEndpoint, {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    console.log(response.data.tracks.items);
    searchAnswerRender(response.data.tracks.items);
    return response;
  } catch (error) {
    console.error('Failed to retrieve search:', error);
    throw error;
  }
}

// Виклик функції отримання токену і пошуку
getToken()
  .then(() => {
    searchInput.addEventListener('input', event => {
      if (event.target.value != 0) {
        debounced(event.target.value.trim(), false);
      } else {
        debounceNull(null);
        return;
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
