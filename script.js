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

/* ── Swatch carousel ── */
function initSwatchCarousel(rootId, currentId, totalId) {
    const root = document.getElementById(rootId);
    if (!root) return;

    const track   = root.querySelector('.swatch-track');
    const swatches = Array.from(root.querySelectorAll('.swatch'));
    const prevBtn = root.querySelector('.swatch-prev');
    const nextBtn = root.querySelector('.swatch-next');
    const curEl   = document.getElementById(currentId);
    const totEl   = document.getElementById(totalId);
    if (!track || swatches.length === 0) return;

    let page = 0;

    // How many swatches fit per page, derived from actual laid-out widths.
    function perPage() {
        const viewport = root.querySelector('.swatch-viewport');
        const swatchW  = swatches[0].getBoundingClientRect().width;
        const gap      = 12;
        return Math.max(1, Math.round((viewport.clientWidth + gap) / (swatchW + gap)));
    }

    function totalPages() {
        return Math.ceil(swatches.length / perPage());
    }

    function render() {
        const pages = totalPages();
        if (page > pages - 1) page = pages - 1;

        const step = swatches[0].getBoundingClientRect().width + 12;
        track.style.transform = `translateX(-${page * perPage() * step}px)`;

        if (curEl) curEl.textContent = page + 1;
        if (totEl) totEl.textContent = pages;
        if (prevBtn) prevBtn.disabled = page === 0;
        if (nextBtn) nextBtn.disabled = page >= pages - 1;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { if (page > 0) { page--; render(); } });
    if (nextBtn) nextBtn.addEventListener('click', () => { if (page < totalPages() - 1) { page++; render(); } });

    // Keep edge tooltips from being clipped: shift them inward if they'd
    // overflow the viewport left/right. Runs on hover/focus of each swatch.
    const viewport = root.querySelector('.swatch-viewport');
    function positionTip(swatch) {
        const tip = swatch.querySelector('.swatch-tip');
        if (!tip || !viewport) return;
        tip.style.setProperty('--tip-shift', '0px');
        // Measure after the reset so we get the centered geometry.
        const tipRect  = tip.getBoundingClientRect();
        const viewRect = viewport.getBoundingClientRect();
        const pad = 6;
        let shift = 0;
        if (tipRect.left < viewRect.left + pad) {
            shift = (viewRect.left + pad) - tipRect.left;
        } else if (tipRect.right > viewRect.right - pad) {
            shift = (viewRect.right - pad) - tipRect.right;
        }
        tip.style.setProperty('--tip-shift', shift + 'px');
    }
    swatches.forEach((sw) => {
        sw.addEventListener('mouseenter', () => positionTip(sw));
        sw.addEventListener('focus', () => positionTip(sw));
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(render, 150);
    });

    render();
}

document.addEventListener('DOMContentLoaded', () => {
    initSwatchCarousel('colorCarousel', 'colorPageCurrent', 'colorPageTotal');
});

/* ── Design system: flip demo column navy ⇄ rust ── */
function initCompFlip() {
    const btn     = document.getElementById('compFlipBtn');
    const column  = document.getElementById('compDemoColumn');
    const heading = document.getElementById('compDemoHeading');
    if (!btn || !column) return;

    btn.addEventListener('click', () => {
        const isRust = column.classList.toggle('creative-column');
        column.classList.toggle('tech-column', !isRust);
        btn.setAttribute('aria-pressed', String(isRust));
        btn.textContent = isRust ? 'Flip to Technical' : 'Flip to Advertising';
        if (heading) heading.textContent = isRust ? 'Advertising' : 'Technical';
    });
}

document.addEventListener('DOMContentLoaded', initCompFlip);

/* ── Design system: standalone demo clocks (ds- prefixed IDs) ── */
function initDsClocks() {
    const local = document.getElementById('ds-footer-clock');
    const tokyo = document.getElementById('ds-tokyo-clock');
    if (!local && !tokyo) return;

    function fmt(zone) {
        const d = new Intl.DateTimeFormat('en-US', { timeZone: zone, month: 'numeric', day: 'numeric' });
        const t = new Intl.DateTimeFormat('en-US', { timeZone: zone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        return (now) => `${d.format(now)} ${t.format(now)}`;
    }

    const localFmt = fmt(currentLocation.zone);
    const tokyoFmt = fmt('Asia/Tokyo');

    function tick() {
        const now = new Date();
        if (local) local.textContent = `${currentLocation.text}: ${localFmt(now)} ${currentLocation.label}`;
        if (tokyo) tokyo.textContent = `${tokyoFmt(now)} JST`;
    }
    tick();
    setInterval(tick, 1000);

    // Day/night visuals for the demo rows
    function visual(elId, zone) {
        const el = document.getElementById(elId);
        if (!el) return;
        const hour = parseInt(new Intl.DateTimeFormat('en-US', { timeZone: zone, hour: 'numeric', hour12: false }).format(new Date()), 10);
        if (hour >= 6 && hour < 20) {
            el.innerHTML = `<img src="assets/icons/moon phases/sun.svg" alt="Daytime" class="theme-icon">`;
        } else {
            const moon = getActiveMoonState();
            el.innerHTML = `<img src="${moon.icon}" alt="${moon.phase}" title="${moon.phase}" class="theme-icon">`;
        }
    }
    function renderVisuals() {
        visual('ds-theme-visual', currentLocation.zone);
        visual('ds-tokyo-theme-visual', 'Asia/Tokyo');
    }
    renderVisuals();
    setInterval(renderVisuals, 60000);
}

document.addEventListener('DOMContentLoaded', initDsClocks);

/* ── Design system: standalone copy-email demo (ds- prefixed IDs) ── */
function initDsCopyEmail() {
    const btn      = document.getElementById('ds-emailBtn');
    const textSpan = document.getElementById('ds-emailText');
    if (!btn || !textSpan) return;

    let count = 0;
    let resetTimer = null;

    btn.addEventListener('click', () => {
        navigator.clipboard.writeText("thomasrichardson.contact@gmail.com").then(() => {
            btn.style.minWidth = btn.offsetWidth + 'px';
            count = Math.min(count + 1, copyMessages.length);
            clearTimeout(resetTimer);
            textSpan.innerText = copyMessages[count - 1];
            resetTimer = setTimeout(() => {
                textSpan.innerText = "thomasrichardson.contact@gmail.com";
                btn.style.minWidth = '';
                count = 0;
            }, 2000);
        });
    });
}

document.addEventListener('DOMContentLoaded', initDsCopyEmail);

/* ── Design system: keep the Links specimens from navigating ── */
function initDsLinkDemo() {
    const demo = document.getElementById('dsLinkDemo');
    if (!demo) return;
    demo.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) e.preventDefault();
    });
}

document.addEventListener('DOMContentLoaded', initDsLinkDemo);

/* ── Sticky section-nav scroll-spy (project pages) ── */
function initSectionNav() {
    const nav = document.querySelector('.section-nav');
    if (!nav) return;

    const links = Array.from(nav.querySelectorAll('a'));
    const targets = links
        .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
        .filter(Boolean);
    if (targets.length === 0) return;

    const linkFor = (id) => links.find((a) => a.getAttribute('href') === '#' + id);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                links.forEach((a) => a.classList.remove('is-active'));
                const active = linkFor(entry.target.id);
                if (active) active.classList.add('is-active');
            }
        });
    }, {
        // Trigger when a section is near the top, just under the sticky bars.
        rootMargin: '-150px 0px -65% 0px',
        threshold: 0,
    });

    targets.forEach((t) => observer.observe(t));
}

document.addEventListener('DOMContentLoaded', initSectionNav);
