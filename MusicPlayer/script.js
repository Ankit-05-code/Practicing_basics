const song = {
    name: "Bajrangbali Aur Main",
    path: "Music1.mp3",
    image: "image1.jpg",
    artist: "Narci"
};
const track = new Audio(song.path);
const playButton = document.querySelector("#play");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const durationRange = document.querySelector("#song-duration");
const volumeRange = document.querySelector("#volume-range");
const songName = document.querySelector("#song-name");
const songArtist = document.querySelector("#song-artist");
const songImage = document.querySelector(".song-image");

track.preload = "metadata";
track.volume = 0.8;
volumeRange.value = track.volume * 100;
durationRange.value = 0;
durationRange.disabled = true;

songName.textContent = song.name;
songArtist.textContent = song.artist;
songImage.style.backgroundImage = `url("${song.image}")`;

function updatePlayButton() {
    playButton.src = track.paused ? "play.svg" : "pause.svg";
    playButton.alt = track.paused ? "Play" : "Pause";
}
function togglePlayback() {
    if (track.paused) {
        track.play().catch(() => updatePlayButton());
    } else {
        track.pause();
    }
    updatePlayButton();
}
function restartSong() {
    track.currentTime = 0;
    track.play().catch(() => updatePlayButton());
    updatePlayButton();
}
playButton.addEventListener("click", togglePlayback);
previousButton.addEventListener("click", restartSong);
nextButton.addEventListener("click", restartSong);

volumeRange.addEventListener("input", () => {
    track.volume = Number(volumeRange.value) / 100;
});
track.addEventListener("loadedmetadata", () => {
    durationRange.max = track.duration;
    durationRange.disabled = false;
});
track.addEventListener("timeupdate", () => {
    durationRange.value = track.currentTime;
});
durationRange.addEventListener("input", () => {
    track.currentTime = Number(durationRange.value);
});
track.addEventListener("play", updatePlayButton);
track.addEventListener("pause", updatePlayButton);
track.addEventListener("ended", () => {
    track.currentTime = 0;
    updatePlayButton();
});
updatePlayButton();
