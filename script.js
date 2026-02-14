const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const message = document.getElementById("love-message");
const music = document.getElementById("bg-music");
const counterText = document.getElementById("counter");

let attempts = 0;

// Utility clamp
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// Core escape logic
function evade(cursorX, cursorY) {
    const rect = noBtn.getBoundingClientRect();

    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dx = btnCenterX - cursorX;
    const dy = btnCenterY - cursorY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 120) return; // cursor not close enough

    const speed = 140; // escape speed

    let newX = rect.left + (dx / distance) * speed;
    let newY = rect.top + (dy / distance) * speed;

    const padding = 10;
    const maxX = window.innerWidth - rect.width - padding;
    const maxY = window.innerHeight - rect.height - padding;

    newX = clamp(newX, padding, maxX);
    newY = clamp(newY, padding, maxY);

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;

    attempts++;
    counterText.innerText = `Nice try 😈 (${attempts} attempts)`;
}

// Desktop
document.addEventListener("mousemove", (e) => {
    evade(e.clientX, e.clientY);
});

// Mobile
document.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    if (t) evade(t.clientX, t.clientY);
});

// YES click
yesBtn.addEventListener("click", () => {
    music.play();
    document.querySelector(".buttons").style.display = "none";
    counterText.style.display = "none";
    message.style.display = "block";
    launchConfetti();
});

// Confetti
function launchConfetti() {
    for (let i = 0; i < 120; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = `hsl(${Math.random() * 360},100%,60%)`;
        c.style.animationDuration = 2 + Math.random() * 3 + "s";
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 5000);
    }
}

// Floating hearts
const hearts = document.querySelector(".hearts");
setInterval(() => {
    const h = document.createElement("span");
    h.innerHTML = "❤️";
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = 3 + Math.random() * 5 + "s";
    hearts.appendChild(h);
    setTimeout(() => h.remove(), 8000);
}, 250);
