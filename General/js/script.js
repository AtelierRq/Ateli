//Wstęp i guess
document.addEventListener("DOMContentLoaded", () => {
    console.log("Siemanko");
});


const audio = document.getElementById("audio");
audio.volume = 0.2; // Ustawienie głośności

const muteButton = document.getElementById("muteButton");
muteButton.addEventListener("click", function () {
    audio.muted = !audio.muted;
    muteButton.textContent = audio.muted ? "🔇" : "🔊";
});
