document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SCROLL ANIMATIONS (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));


    // --- 2. MOBILE MENU ---
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    function toggleMenu() {
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : 'auto';
    }

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });


    // --- 3. MUSIC PLAYER ---
    const audio = document.getElementById('audio-element');
    const playBtn = document.getElementById('play-btn');
    const playIcon = playBtn ? playBtn.querySelector('i') : null;
    const playerTitle = document.getElementById('player-title');
    const playerArtist = document.getElementById('player-artist');
    const trackItems = document.querySelectorAll('.track-item');
    const albumArt = document.getElementById('album-art');

    let isPlaying = false;

    function updatePlayIcon() {
        if (!playIcon) return;
        if (isPlaying) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    }

    function playTrack(trackElement) {
        const src = trackElement.getAttribute('data-src');
        const title = trackElement.getAttribute('data-title');

        // Remove active class from all
        trackItems.forEach(item => item.classList.remove('active'));
        // Add to current
        trackElement.classList.add('active');

        // Update Info
        playerTitle.textContent = title;

        // Change Audio Source
        if (audio.src !== src) {
            audio.src = src;
            audio.load();
        }

        audio.play().then(() => {
            isPlaying = true;
            updatePlayIcon();
            // Simple album art animation
            albumArt.style.transform = "scale(0.9)";
            setTimeout(() => albumArt.style.transform = "scale(1)", 200);
        }).catch(err => {
            console.error("Playback error:", err);
        });
    }

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (!audio.src) {
                // If no track selected, play first one
                if (trackItems.length > 0) {
                    playTrack(trackItems[0]);
                }
                return;
            }

            if (isPlaying) {
                audio.pause();
                isPlaying = false;
            } else {
                audio.play();
                isPlaying = true;
            }
            updatePlayIcon();
        });
    }

    trackItems.forEach(item => {
        item.addEventListener('click', () => {
            playTrack(item);
        });
    });

    // Reset icon when song ends
    if (audio) {
        audio.addEventListener('ended', () => {
            isPlaying = false;
            updatePlayIcon();
        });
    }

    // --- 4. NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(28, 28, 30, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        } else {
            navbar.style.background = 'rgba(28, 28, 30, 0.6)'; // Return to initial glass
        }
    });

});
