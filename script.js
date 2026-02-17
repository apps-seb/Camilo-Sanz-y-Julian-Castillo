// 1. INICIALIZAR ANIMACIONES SCROLL
AOS.init({
    duration: 1000,
    once: true
});

// 2. HERO SLIDER
var swiperHero = new Swiper(".heroSwiper", {
    loop: true,
    autoplay: { delay: 4000 },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

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
    pagination: { el: ".swiper-pagination", clickable: true },
    // Make side cards smaller
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

// 5. AUDIO PLAYER & UPLOAD
var audio = document.getElementById('main-audio');
var songTitle = document.getElementById('current-song-title');
var songArtist = document.getElementById('current-artist');
var albumArt = document.getElementById('current-album-art');

function playDemo(title, url) {
    audio.src = url;
    songTitle.innerText = title;
    songArtist.innerText = "Camilo Sanz & Julián Castillo";
    audio.play();

    // Highlight effect (simple)
    albumArt.style.transform = "scale(0.95)";
    setTimeout(() => { albumArt.style.transform = "scale(1)"; }, 200);
}

function handleFileUpload(event) {
    var file = event.target.files[0];
    if (file) {
        var fileURL = URL.createObjectURL(file);
        audio.src = fileURL;
        songTitle.innerText = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
        songArtist.innerText = "Archivo Local";
        audio.play();

        // Visual feedback
        albumArt.style.border = "2px solid #00ff00";
        setTimeout(() => { albumArt.style.border = "none"; }, 1000);
    }
}
