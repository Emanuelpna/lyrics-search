const Lyrics = (songName, artist, lyrics) => `
  <li class="lyrics-container">

    <h2 class="song-artist">
      <strong>${songName}</strong> - ${artist}
    </h2>

    <p>
     ${lyrics}
    </p>

  </li>
`;

const fetchLyrics = async (artist, song) => {
  try {
    const { lyrics } = await api.get(`${apiURL}/v1/${artist}/${song}`);

    return lyrics;
  } catch (error) {
    alert(
      'Não foi possível encontrar a letra desta música, tente novamente mais tarde.'
    );
  }
};

const insertLyricsIntoPage = async (song, artist, lyrics, container) => {
  container.innerHTML = Lyrics(song, artist, lyrics);
};
