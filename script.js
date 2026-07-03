/* ── Location config — update this when you relocate ── */
const currentLocation = { text: "Norman, OK", zone: "America/Chicago", label: "CST" };

function initClock() {
    const clockEl = document.getElementById('footer-clock');
    const dateFmt = new Intl.DateTimeFormat('en-US', {
        timeZone: currentLocation.zone,
        month: 'numeric',
        day: 'numeric',
    });
    const timeFmt = new Intl.DateTimeFormat('en-US', {
        timeZone: currentLocation.zone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    function tick() {
        const now = new Date();
        clockEl.textContent = `${currentLocation.text}: ${dateFmt.format(now)} ${timeFmt.format(now)} ${currentLocation.label}`;
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
    if (n < 1.36)  return { phase: "New Moon",        icon: base + "new.svg" };
    if (n < 6.02)  return { phase: "Waxing Crescent", icon: base + "waxing-crescent.svg" };
    if (n < 8.74)  return { phase: "First Quarter",   icon: base + "first-quarter.svg" };
    if (n < 13.40) return { phase: "Waxing Gibbous",  icon: base + "waxing-gibbous.svg" };
    if (n < 16.12) return { phase: "Full Moon",       icon: base + "full.svg" };
    if (n < 20.78) return { phase: "Waning Gibbous",  icon: base + "waning-gibbous.svg" };
    if (n < 23.51) return { phase: "Third Quarter",   icon: base + "last-quarter.svg" };
    if (n < 28.17) return { phase: "Waning Crescent", icon: base + "waning-crescent.svg" };
    return { phase: "New Moon", icon: base + "new.svg" };
}

function renderThemeVisual() {
    const container = document.getElementById('theme-visual');
    if (!container) return;

    const hourInZone = parseInt(
        new Intl.DateTimeFormat('en-US', { timeZone: currentLocation.zone, hour: 'numeric', hour12: false }).format(new Date()),
        10
    );

    if (hourInZone >= 6 && hourInZone < 20) {
        container.innerHTML = `<img src="assets/icons/moon phases/sun.svg" alt="Daytime" class="theme-icon">`;
    } else {
        const moon = getActiveMoonState();
        container.innerHTML = `<img src="${moon.icon}" alt="${moon.phase}" title="${moon.phase}" class="theme-icon">`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    renderThemeVisual();
    setInterval(renderThemeVisual, 60000);
});


/* ── Hero greeting ── */
function initHeroGreeting() {
    const el = document.getElementById('hero-greeting-text');
    if (!el) return;

    const hour = parseInt(
        new Intl.DateTimeFormat('en-US', { timeZone: currentLocation.zone, hour: 'numeric', hour12: false }).format(new Date()),
        10
    );

    let japanese, english;
    if (hour >= 5 && hour < 12) {
        japanese = 'おはよう';
        english = 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
        japanese = 'こんにちは';
        english = 'Hello';
    } else {
        japanese = 'こんばんは';
        english = 'Good Evening';
    }

    el.textContent = japanese;
    el.lang = 'ja';
    el.dataset.translation = english;
}

document.addEventListener('DOMContentLoaded', initHeroGreeting);

/* ── Tokyo clock ── */
function initTokyoClock() {
    const tokyoEl     = document.getElementById('tokyo-clock');
    const tokyoVisual = document.getElementById('tokyo-theme-visual');
    if (!tokyoEl) return;

    const dateFmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tokyo',
        month: 'numeric',
        day: 'numeric',
    });
    const timeFmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tokyo',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });
    const hourFmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Tokyo',
        hour: 'numeric',
        hour12: false,
    });

    function renderTokyoTheme() {
        if (!tokyoVisual) return;
        const hour = parseInt(hourFmt.format(new Date()), 10);
        if (hour >= 6 && hour < 20) {
            tokyoVisual.innerHTML = `<img src="assets/icons/moon phases/sun.svg" alt="Daytime in Tokyo" class="theme-icon">`;
        } else {
            const moon = getActiveMoonState();
            tokyoVisual.innerHTML = `<img src="${moon.icon}" alt="${moon.phase}" title="${moon.phase}" class="theme-icon">`;
        }
    }

    function tickClock() {
        const now = new Date();
        tokyoEl.textContent = `${dateFmt.format(now)} ${timeFmt.format(now)} JST`;
    }

    tickClock();
    renderTokyoTheme();
    setInterval(tickClock, 1000);
    setInterval(renderTokyoTheme, 60000);
}

document.addEventListener('DOMContentLoaded', initTokyoClock);

/* ── Respect reduced-motion: stop looping demo videos ── */
document.addEventListener('DOMContentLoaded', function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('video[autoplay]').forEach(function (v) {
            v.removeAttribute('autoplay');
            v.removeAttribute('loop');
            v.pause();
        });
    }
});

/* ── CTA copy ── */
function copyCta() {
    navigator.clipboard.writeText("thomasrichardson.contact@gmail.com").then(() => {
        const span = document.getElementById("ctaText");
        span.innerText = "Copied! 🎉";
        setTimeout(() => {
            span.innerText = "Email Me";
        }, 2000);
    });
}

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
        const btn = document.getElementById("emailBtn");

        btn.style.minWidth = btn.offsetWidth + 'px';

        copyClickCount = Math.min(copyClickCount + 1, copyMessages.length);
        clearTimeout(copyResetTimer);

        textSpan.innerText = copyMessages[copyClickCount - 1];

        copyResetTimer = setTimeout(() => {
            textSpan.innerText = "thomasrichardson.contact@gmail.com";
            btn.style.minWidth = '';
            copyClickCount = 0;
        }, 2000);
    });
}
