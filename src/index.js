import axios from 'axios';
import { fetchBreeds,fetchCatByBreed } from './cat-api.js';

axios.defaults.headers.common['x-api-key'] =
  'live_7OmHCNWsSrqi3vdA1HFMl0CkV035BNyesghrSC8tUcfriqDjnLMsFYPhRtKIyotP';

const selector = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

let breedInfo = [];

fetchBreeds()
  .then(data => {
    data.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      selector.appendChild(option);
    });
    breedInfo = data;
  })
  .catch(err => console.log(err));

selector.addEventListener('change', event => {
  const info = breedInfo.find(item => item.id === event.target.value);
  fetchCatByBreed(event.target.value)
    .then(data => {
      catInfo.innerHTML = `
        <img src="${data[0].url}" alt="${info.name}" width="300" />
        <h2>${info.name}</h2>
        <p><strong>Опис:</strong> ${info.description}</p>
        <p><strong>Темперамент:</strong> ${info.temperament}</p>
        `;
    })
    .catch(err => console.log(err));
});
