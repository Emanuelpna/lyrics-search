const Song = (songName, artist) => `
  <li class="song">

    <span class="song-artist">
      <strong>${artist}</strong> - ${songName}
    </span>

    <button 
      class="button" 
      data-artist="${artist}" 
      data-song="${songName}"
    >
      Ver Letra
    </button>

  </li>
`;

const getMoreSongs = async apiURL => {
  try {
    const { data: songs, next, prev } = await api.get(
      `https://cors-anywhere.herokuapp.com/${apiURL}`
    );

    insertSongIntoPage(songs, songsContainer);

    createNextPrevButtons(prevAndNextContainer, next, prev);
  } catch (error) {
    alert('Falha ao buscar outras músicas deste artista, tente novamente mais tarde.');
    return false;
  }
};

const NextPrevButton = (url, text) => {
  return `
    <button class="button" onClick="getMoreSongs('${url}')" >${text}</button>
  `;
};

const createNextPrevButtons = (buttonsContainer, next = '', prev = '') => {
  if (next || prev) {
    buttonsContainer.innerHTML = `
      ${prev ? NextPrevButton(next, 'Anteriores <span style="transform: rotate(180deg) translateY(-2px); display: inline-block;">&#10148;</span>') : ''}
      ${next ? NextPrevButton(next, 'Próximas <span>&#10148;</span>') : ''}
    `;
  } else {
    buttonsContainer.innerHTML = '';
  }
};

const insertSongIntoPage = (songsInfo, songsContainer) => {
  songsContainer.innerHTML = songsInfo
    .map(song => Song(song.title, song.artist.name))
    .join('');
};

const fetchSongs = async (apiURL, term) => {
  try {
    const songs = await api.get(`${apiURL}/suggest/${term}`);

    return [songs.data, songs.next, songs.prev];
  } catch (error) {
    alert('Não foi possível encontrar as músicas pedidas, tente novamente mais tarde.');
  }
};
