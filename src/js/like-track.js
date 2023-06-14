import getLiked from './fetch-data';

function saveLikedTrackIDToLocalStorage(trackID) {
  let likedTracks = JSON.parse(localStorage.getItem('likedTracks')) || [];
  likedTracks = Array.isArray(likedTracks) ? likedTracks : [];
  likedTracks.push(trackID);
  const likedTracksJSON = JSON.stringify(likedTracks);
  localStorage.setItem('likedTracks', likedTracksJSON);
}

const likeListButton = document.querySelector('.LikedList');

likeListButton.addEventListener('click', () => {
  processLikedTracks();
});

function processLikedTracks() {
  const likedTracks = JSON.parse(localStorage.getItem('likedTracks')) || [];
  if (likedTracks.length < 1) {
    console.warn('NO LIKED');
  }
  likedTracks.forEach(trackID => {
    console.log(trackID);
    getLiked(trackID);
  });
}

export default saveLikedTrackIDToLocalStorage;
