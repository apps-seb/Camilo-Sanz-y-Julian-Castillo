// 1. INICIALIZAR ANIMACIONES SCROLL
AOS.init({
    duration: 1000,
    once: true
});

// 2. HERO SLIDER (Removed Video logic, kept simple image zoom or static)
// Since we changed to a static hero image in HTML, we might not need Swiper for Hero anymore.
// But if we want to keep it extensible or use it for other sections, we can keep the library.
// For the new design, the hero is static HTML/CSS.

// 3. PROPUESTA MUSICAL (3D CARDS)
var swiperProposal = new Swiper(".proposalSwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    initialSlide: 2, // Start in the middle
    coverflowEffect: {
        rotate: 30, // Less rotation for a cleaner look
        stretch: 0,
        depth: 200, // More depth
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    breakpoints: {
        320: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        768: {
            slidesPerView: "auto",
            spaceBetween: 30
        }
    }
});

// 4. MENÚ HAMBURGUESA
function toggleMenu() {
    const btn = document.querySelector('.menu-btn');
    const overlay = document.getElementById('navOverlay');
    btn.classList.toggle('open');
    overlay.classList.toggle('active');
}

// 5. AUDIO PLAYER (Cleaned up - No Upload)
var audio = document.getElementById('main-audio');
var songTitle = document.getElementById('current-song-title');
var songArtist = document.getElementById('current-artist');
var albumArt = document.getElementById('current-album-art');

function playDemo(title, url) {
    if (!audio) return;

    audio.src = url;
    songTitle.innerText = title;
    songArtist.innerText = "Camilo Sanz & Julián Castillo";
    audio.play();

    // Highlight effect (simple)
    if (albumArt) {
        albumArt.style.transform = "scale(0.95)";
        setTimeout(() => { albumArt.style.transform = "scale(1)"; }, 200);
    }
}
