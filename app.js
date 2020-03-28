const form = document.querySelector('#form');
const search = document.querySelector('#search');
const songsContainer = document.querySelector('#songs-container');
const prevAndNextContainer = document.querySelector('#prev-and-next-container');

search.focus();

const apiURL = `https://api.lyrics.ovh`;

const WarningMessage = `
  <li class="warning-message">Preencha com um termo de busca válido</li>
`;

form.addEventListener('submit', async e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  search.value = '';
  search.focus();

  if (!searchTerm) {
    songsContainer.innerHTML = WarningMessage;
    return false;
  }

  const [songs, next, prev] = await fetchSongs(apiURL, searchTerm);

  insertSongIntoPage(songs, songsContainer);

  createNextPrevButtons(prevAndNextContainer, next, prev);
});

songsContainer.addEventListener('click', async e => {
  const clickedElement = e.target;

  if (clickedElement.tagName === 'BUTTON') {
    const artist = clickedElement.getAttribute('data-artist');

    const song = clickedElement.getAttribute('data-song');

    prevAndNextContainer.innerHTML = '';

    const lyrics = await fetchLyrics(artist, song);

    insertLyricsIntoPage(song, artist, lyrics, songsContainer);
  }
});
