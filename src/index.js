import axios from 'axios';
import { fetchBreeds,fetchCatByBreed } from './cat-api.js';

axios.defaults.headers.common['x-api-key'] =
  'live_7OmHCNWsSrqi3vdA1HFMl0CkV035BNyesghrSC8tUcfriqDjnLMsFYPhRtKIyotP';

const selector = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

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
  .catch(err => {
    Notiflix.Notify.Failure('Oops! Something went wrong loading the breeds! Try reloading the page!');
    console.error(err);
  });

selector.addEventListener('change', event => {
    loader.style.display = 'inline-block';
  const info = breedInfo.find(item => item.id === event.target.value);
  fetchCatByBreed(event.target.value)
    .then(data => {
      catInfo.innerHTML = `
        <img src="${data[0].url}" alt="${info.name}" width="300" />
        <h2>${info.name}</h2>
        <p><strong>Description:</strong> ${info.description}</p>
        <p><strong>Temperament:</strong> ${info.temperament}</p>
        `;
        loader.style.display = 'none';
    })
    .catch(err => {
        Notiflix.Notify.Failure('Oops! Something went wrong loading the cat info! Try reloading the page!');
        console.error(err);
    });
});

