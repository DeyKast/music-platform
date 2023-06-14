const trendContainer = document.querySelector('.trend-list');
let trendList = '';

async function recommendationsRender(tracks) {
  if (tracks == null) {
    trendList = '';
    trendContainer.innerHTML = trendList;
    return;
  } else if (tracks.length < 1) {
    Notify.info('Recommendations not found');
    trendList = '';
  }
  tracks.forEach(track => {
    const trackCard = `
      <div class="track-card-recs">
        <div class="track-image-recs">
          <img src="${track.album.images[2].url}" alt="">
        </div>
        <div class="track-info-recs">
          <p class="track-name-recs">${track.name}</p>
          <p class="track-artist-recs">${track.artists[0].name}</p>
        </div>
        <div class="track-actions-recs">
          <button class="play-button-recs" data-id="${track.id}">&#9205</button>
        </div>
      </div>
    `;
    trendList += trackCard;
  });
  trendContainer.innerHTML = trendList;
  trendList = '';

  const playButtons = trendContainer.querySelectorAll('.play-button-recs');
  playButtons.forEach(button => {
    button.addEventListener('click', () => {
      const trackId = button.dataset.id;
      playTrack(trackId);
    });
  });
}

const playerContainer = document.querySelector('.player');

function playTrack(trackId) {
  console.log('Playing track with ID:', trackId);

  const player = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0" width="100%" height="250" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;

  playerContainer.innerHTML = player;
}

export default recommendationsRender;
