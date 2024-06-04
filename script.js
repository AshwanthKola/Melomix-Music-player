document.addEventListener("DOMContentLoaded", function() {
    const audioElement = document.getElementById("audio");
    const songTitleElement = document.getElementById("song-title");
    const artistNameElement = document.getElementById("artist-name");
    const albumArtElement = document.getElementById("album-art");
    const playlistElement = document.getElementById("playlist");

    // Example API URL (Replace with your actual API)
    const API_URL = "https://api.example.com/music";

    // Fetch songs from the API
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            // Populate the playlist
            data.songs.forEach((song, index) => {
                const songElement = document.createElement("div");
                songElement.classList.add("playlist-item");
                songElement.innerHTML = `<span>${song.title}</span><span>${song.artist}</span>`;
                songElement.addEventListener("click", () => {
                    playSong(song);
                });
                playlistElement.appendChild(songElement);
            });

            // Automatically play the first song
            if (data.songs.length > 0) {
                playSong(data.songs[0]);
            }
        })
        .catch(error => console.error("Error fetching songs:", error));

    function playSong(song) {
        audioElement.src = song.audioUrl;
        songTitleElement.textContent = song.title;
        artistNameElement.textContent = song.artist;
        albumArtElement.src = song.albumArtUrl;
        audioElement.play();
    }
});
