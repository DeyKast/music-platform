import { DataAPI } from './fetch-data';
import Notiflix from 'notiflix';
import axios from 'axios';

const ChartCard = document.querySelector('.chart-card');

export async function getTopChart() {
  try {
    const dataAPI = new DataAPI();
    const topChart = await dataAPI.fetchTopChart();

    if (topChart.data.length > 0) {
      topChart.data.forEach(topChartList => {
        createTopChartCard(topChartList);
      });
    } else {
      Notiflix.Notify.warning('No data available');
    }
  } catch (error) {
    Notiflix.Notify.info('Oops... Something went wrong(');
  }
}

function createTopChartCard(topChartList) {
  console.log(topChartList);
  const Card = `<p>${topChartList}</p>`;

  ChartCard.innerHTML += Card;
}

getTopChart();
