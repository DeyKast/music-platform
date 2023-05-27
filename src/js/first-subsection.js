import { Notify } from 'notiflix/build/notiflix-notify-aio';

const answerContainer = document.querySelector('.search-answer');
const playerContainer = document.querySelector('.player');
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
        <div class="track-image">
          <img src="${track.album.images[2].url}" alt="">
        </div>
        <div class="track-info">
          <p class="track-name">${track.name}</p>
          <p class="track-artist">${track.artists[0].name}</p>
        </div>
        <div class="track-actions">
          <button class="play-button" data-id="${track.id}">&#9205</button>
        </div>
      </div>
    `;
    tracksList += trackCard;
  });
  answerContainer.innerHTML = tracksList;
  tracksList = '';

  // Додавання обробника подій до кнопок "Play" після вставки їх в DOM
  const playButtons = answerContainer.querySelectorAll('.play-button');
  playButtons.forEach(button => {
    button.addEventListener('click', () => {
      const trackId = button.dataset.id;
      playTrack(trackId);
    });
  });
}

function playTrack(trackId) {
  console.log('Playing track with ID:', trackId);

  const player = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0" width="100%" height="250" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;

  playerContainer.innerHTML = player;
}

export default searchAnswerRender;
