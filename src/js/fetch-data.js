import axios from 'axios';

export class DataAPI {
  #BASE_URL = 'https://api.deezer.com/';

  constructor() {
    this.page = 1;
    this.query = '';
  }

  async fetchTopChart() {
    const response = await axios.get(`${this.#BASE_URL}chart`);
    return response;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  decrementPage() {
    this.page -= 1;
  }
}
