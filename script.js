const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const curTime = document.getElementById("current-time");
const songDuration = document.getElementById("duration");
const playBtn = document.getElementById("play");
const playPrev = document.getElementById("prev");
const playNext = document.getElementById("next");

let isPlay = false;
let songIndex = 0;

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Dram Kit",
    artist: "Farhan",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army",
    artist: "Ishtiyak",
  },
  {
    name: "jacinto-3",
    displayName: "Feel Around You",
    artist: "Sezar",
  },
  {
    name: "metric-1",
    displayName: "Feel The Chill",
    artist: "FarhanIshtiyak",
  },
];

// Play Function
function playMusic() {
  isPlay = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}

// Pause Function
function pauseMusic() {
  isPlay = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

// Load Song
function loadSong(song) {
  image.src = `img/${song.name}.jpg`;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
}

//loadSong(songs[0]);

// Previous Song
function previousSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playMusic();
}
// next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playMusic();
}

// Update Progress Bar
function updateProgressBar(e) {
  //console.log(e);
  if (isPlay) {
    const { duration, currentTime } = e.srcElement;
    // Update the progress bar width
    const currentProgressPercent = (currentTime / duration) * 100;
    progress.style.width = `${currentProgressPercent}%`;

    // Display Duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      songDuration.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Display Current time
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    curTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar Jump
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Trigger Function
playPrev.addEventListener("click", previousSong);
playBtn.addEventListener("click", () => (isPlay ? pauseMusic() : playMusic()));
playNext.addEventListener("click", nextSong);

music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);
