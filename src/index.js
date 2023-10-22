import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_7OmHCNWsSrqi3vdA1HFMl0CkV035BNyesghrSC8tUcfriqDjnLMsFYPhRtKIyotP";

const selector = document.querySelector('.breed-select')

import { fetchBreeds } from "./cat-api.js";

fetchBreeds()
.then(data => {
    data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        selector.appendChild(option)
    });
})
.catch(err => console.log(err))




