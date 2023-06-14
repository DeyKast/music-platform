import getLiked from './fetch-data';

const answerContainer = document.querySelector('.search-answer');
const playerContainer = document.querySelector('.player');

export let tracksList = '';

function playTrack(trackId) {
  console.log('Playing track with ID:', trackId);

  const player = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0" width="100%" height="250" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;

  playerContainer.innerHTML = player;
}

async function likedListRender(track) {
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
        <button class="like-button like-button__active" data-id="${track.id}">&#127892</button>
          <button class="play-button" data-id="${track.id}">&#9205</button>
        </div>
      </div>
    `;

  tracksList += trackCard;

  answerContainer.innerHTML = tracksList;

  const playButtons = answerContainer.querySelectorAll('.play-button');
  playButtons.forEach(button => {
    button.addEventListener('click', () => {
      const trackId = button.dataset.id;
      playTrack(trackId);
    });
  });
  const likeButtons = answerContainer.querySelectorAll('.like-button');
  likeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const trackId = button.dataset.id;

      // Отримуємо збережені ID з локального сховища
      let likedTracks = localStorage.getItem('likedTracks');
      if (likedTracks) {
        likedTracks = JSON.parse(likedTracks);
        // Видаляємо ID з масиву
        const index = likedTracks.indexOf(trackId);
        if (index > -1) {
          likedTracks.splice(index, 1);
        }

        // Зберігаємо оновлений масив з ID в локальному сховищі
        localStorage.setItem('likedTracks', JSON.stringify(likedTracks));

        likedTracks.forEach(trackID => {
          console.log(trackID);
          getLiked(trackID);
        });
      }
    });
  });
}

export default likedListRender;
