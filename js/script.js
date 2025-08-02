//Wstęp i guess
document.addEventListener("DOMContentLoaded", () => {
    console.log("Hi");
});

//Audio
const audio = document.getElementById("audio");
audio.volume = 0.2; // Ustawienie głośności

const muteButton = document.getElementById("muteButton");
muteButton.addEventListener("click", function () {
    audio.muted = !audio.muted;
    muteButton.textContent = audio.muted ? "🔇" : "🔊";
});

// Alert discord
function showDiscord() {
    alert("Discord: atelierr");
}

// Animacja scrollowanie w dół na stronie
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // usu
        }
    });
}, { threshold: 0.1 });

reveals.forEach((reveal) => observer.observe(reveal));


// Gra 1
let secretCode = [];
let attempts = 0;
const maxAttempts = 10;

function generateCode() {
    secretCode = [];

    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Losowo przetasowuje cyfry
    for (let i = digits.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [digits[i], digits[j]] = [digits[j], digits[i]];
    }

    secretCode = digits.slice(0, 4);  // Wybiera pierwsze 4 niepowtarzające się cyfry
    //console.log("Secret code:", secretCode);
}

function checkGuess() {
    if (attempts >= maxAttempts) return;

    const guess = [
        parseInt(document.getElementById("digit1").value),
        parseInt(document.getElementById("digit2").value),
        parseInt(document.getElementById("digit3").value),
        parseInt(document.getElementById("digit4").value)
    ];

    if (guess.some(isNaN)) {
        alert("Enter all 4 digits");
        return;
    }

    attempts++;

    let correctPlace = 0;
    let correctDigit = 0;

    let secretCopy = [...secretCode];
    let guessCopy = [...guess];

    // Sprawdzenie poprawnego miejsca
    for (let i = 0; i < 4; i++) {
        if (guess[i] === secretCode[i]) {
            correctPlace++;
            secretCopy[i] = guessCopy[i] = null; // oznaczanie jako sprawdzony
        }
    }

    // Sprawdzenie poprawnych cyfr w złym miejscu
    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] != null) {
            let index = secretCopy.indexOf(guessCopy[i]);
            if (index !== -1) {
                correctDigit++;
                secretCopy[index] = null;
            }
        }
    }

    const log = document.getElementById("log");
    const entry = document.createElement("div");
    entry.className = "log-entry custom-font";
    entry.textContent = `Attempt: ${attempts}: ${guess.join("")} → ${correctPlace} correct, ${correctDigit} present`;
    log.prepend(entry);

    if (correctPlace === 4) {
        alert("You won, congrats! =)");
    } else if (attempts >= maxAttempts) {
        alert("You lost, the code is: " + secretCode.join(""));
    }
}


// Obsługa przycisku sprawdzania i QoL wpisywania xD
const inputs = document.querySelectorAll('.input-row input[type="number"]');

inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        const value = e.target.value;

        // Usuwanie wszystkiego oprócz jednej cyfry (0–9)
        e.target.value = value.replace(/[^0-9]/g, '').slice(0, 1);

        // Automatyczne przejście do następnego inputa
        if (e.target.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    // Pozwala na przechodzenie tabulatorem i cofanie
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

generateCode();

// ------------------------------------------------------------------------

