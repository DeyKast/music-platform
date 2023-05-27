import { Notify } from 'notiflix/build/notiflix-notify-aio';

const answerContainer = document.querySelector('.search-answer');
let tracksList = '';

export async function searchAnswerRender(tracks) {
  if (tracks == null) {
    tracksList = '';
    answerContainer.innerHTML = tracksList;
    return;
  } else if (tracks.length < 1) {
    Notify.info('tracks not found');
    tracksList = '';
  }
  tracks.forEach(track => {
    const trackCard = `
    <div class="track-card">
    <div>
    <img src="${track.album.images[2].url}" alt="">
    
    </div>
    <div>
    <p>${track.name}</p>
    <p>${track.artists[0].name}</p>
    </div>
    </div>
    `;
    tracksList += trackCard;
  });
  answerContainer.innerHTML = tracksList;
  tracksList = '';
}

export default searchAnswerRender;
// function createTopChartCard(topChartList) {
//   console.log(topChartList);
//   const Card = `<p>${topChartList}</p>`;

//   ChartCard.innerHTML += Card;
// }

// getTopChart();
