const image = document.querySelector('#cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const background = document.getElementById("background");

// Music
const songs = [
  {
    name: '1',
    displayName: 'Yıldız Tozu',
    artist: 'Ozbi',
    cover: "https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg",
  },
  {
    name: '2',
    displayName: 'You\'re Somebody Else',
    artist: 'flora cash',
    cover: "https://pbs.twimg.com/media/D2NZH-2U4AAL9Xs.jpg",
  },
  {
    name: '3',
    displayName: 'Powerless',
    artist: 'Linkin Park',
    cover: "https://images.genius.com/c5a58cdaab9f3199214f0e3c26abbd0e.1000x1000x1.jpg",
  },
  {
    name: '4',
    displayName: 'Seni Dert Etmeler',
    artist: 'Madrigal',
    cover: "https://www.radyomega.fm/wp-content/uploads/2020/04/MADRIGAL-600.jpg",
  },
  {
    name: '5',
    displayName: 'Ederlezi',
    artist: 'Solomun',
    cover: "https://m.media-amazon.com/images/I/616t0841uvL._SS500_.jpg",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `/assets/music/${song.name}.mp3`;
  changeCover(song.cover);
}

function changeCover(cover) {
  image.classList.remove('active');
  setTimeout(() => {
    image.src = cover;
    image.classList.add('active');
  }, 100)
  background.src = cover;
} 

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
