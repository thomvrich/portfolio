/* ── Location config — update this when you relocate ── */
const currentLocation = { text: "Norman, OK", zone: "America/Chicago", label: "CST" };

function initClock() {
    const clockEl = document.getElementById('footer-clock');
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: currentLocation.zone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    function tick() {
        clockEl.textContent = `${currentLocation.text}: ${formatter.format(new Date())} ${currentLocation.label}`;
    }

    tick();
    setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', initClock);

/* ── Moon phase / sun display ── */
function getActiveMoonState() {
    const lunarEpoch = Date.UTC(2024, 11, 30, 4, 27, 0);
    const currentUTC = Date.UTC(
        new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(),
        new Date().getUTCHours(), new Date().getUTCMinutes(), new Date().getUTCSeconds()
    );
    const totalDaysElapsed = (currentUTC - lunarEpoch) / 86400000;
    const n = ((totalDaysElapsed % 29.53059) + 29.53059) % 29.53059;

    const base = "assets/icons/moon phases/";
    if (n < 1.36)  return { phase: "New Moon",        icon: base + "mdi--moon-new.svg" };
    if (n < 6.02)  return { phase: "Waxing Crescent", icon: base + "mdi--moon-waxing-crescent.svg" };
    if (n < 8.74)  return { phase: "First Quarter",   icon: base + "mdi--moon-first-quarter.svg" };
    if (n < 13.40) return { phase: "Waxing Gibbous",  icon: base + "mdi--moon-waxing-gibbous.svg" };
    if (n < 16.12) return { phase: "Full Moon",       icon: base + "mdi--moon-full.svg" };
    if (n < 20.78) return { phase: "Waning Gibbous",  icon: base + "mdi--moon-waning-gibbous.svg" };
    if (n < 23.51) return { phase: "Third Quarter",   icon: base + "mdi--moon-last-quarter.svg" };
    if (n < 28.17) return { phase: "Waning Crescent", icon: base + "mdi--moon-waning-crescent.svg" };
    return { phase: "New Moon", icon: base + "mdi--moon-new.svg" };
}

function renderThemeVisual() {
    const container = document.getElementById('theme-visual');
    if (!container) return;

    const hourInZone = parseInt(
        new Intl.DateTimeFormat('en-US', { timeZone: currentLocation.zone, hour: 'numeric', hour12: false }).format(new Date()),
        10
    );

    if (hourInZone >= 6 && hourInZone < 20) {
        container.innerHTML = `<img src="assets/icons/mdi--white-balance-sunny.svg" alt="Daytime" class="theme-icon">`;
    } else {
        const moon = getActiveMoonState();
        container.innerHTML = `<img src="${moon.icon}" alt="${moon.phase}" title="${moon.phase}" class="theme-icon">`;
    }
}

document.addEventListener('DOMContentLoaded', renderThemeVisual);

/* ── Email copy ── */
const copyMessages = [
    "Copied to Clipboard! 🎉",
    "Still copied! 😉",
    "You really like copying, huh? 😄",
];
let copyClickCount = 0;
let copyResetTimer = null;

function copyEmail() {
    navigator.clipboard.writeText("thomasrichardson.contact@gmail.com").then(() => {
        const textSpan = document.getElementById("emailText");

        copyClickCount = Math.min(copyClickCount + 1, copyMessages.length);
        clearTimeout(copyResetTimer);

        textSpan.innerText = copyMessages[copyClickCount - 1];

        copyResetTimer = setTimeout(() => {
            textSpan.innerText = "thomasrichardson.contact@gmail.com";
            copyClickCount = 0;
        }, 2000);
    });
}
