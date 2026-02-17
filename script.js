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


    // --- 3. BIO TABS ---
    window.openBio = function(name) {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.bio-content');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        const targetTab = document.querySelector(`.tab-btn[onclick="openBio('${name}')"]`);
        const targetContent = document.getElementById(name);

        if (targetTab) targetTab.classList.add('active');
        if (targetContent) targetContent.classList.add('active');
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
