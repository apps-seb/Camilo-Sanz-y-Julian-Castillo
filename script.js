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

    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');
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

    // --- 3.1 RIDER TABS ---
    window.openRiderTab = function(name) {
        const tabs = document.querySelectorAll('.rider-tab-btn');
        const contents = document.querySelectorAll('.rider-panel');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        const targetTab = document.querySelector(`.rider-tab-btn[onclick="openRiderTab('${name}')"]`);
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

    // --- 5. BOTTOM NAVIGATION ACTIVE STATE ---
    const bottomNavLinks = document.querySelectorAll('.bottom-nav .nav-item');
    // Select only sections that are linked in the bottom nav for better performance/accuracy
    // Or select all sections but map them correctly.
    // The nav links are: #inicio, #fechas, #albumes, #videos, #zona-pro
    // We want to highlight the corresponding link when the section is in view.
    const sections = document.querySelectorAll('section');

    const navObserverOptions = {
        threshold: 0.2,
        rootMargin: "-50px 0px -50px 0px"
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Find matching link
                let matchingLink = document.querySelector(`.bottom-nav .nav-item[href="#${id}"]`);

                if (matchingLink) {
                    bottomNavLinks.forEach(link => link.classList.remove('nav-active'));
                    matchingLink.classList.add('nav-active');
                }
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Click handler for immediate feedback
    bottomNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            bottomNavLinks.forEach(l => l.classList.remove('nav-active'));
            this.classList.add('nav-active');
        });
    });


    // --- 6. 3D CAROUSEL LOGIC ---
    const cards = document.querySelectorAll('.carousel-card');
    const prevBtn = document.querySelector('.control-btn-arrow.prev');
    const nextBtn = document.querySelector('.control-btn-arrow.next');
    let cardIndices = [0, 1, 2]; // Indices of cards in DOM order: [Left, Center, Right]

    // Helper to update classes based on positions
    function updateCarousel() {
        // cardIndices[0] is Left, [1] is Center, [2] is Right
        cards[cardIndices[0]].className = 'carousel-card card-left';
        cards[cardIndices[1]].className = 'carousel-card card-center';
        cards[cardIndices[2]].className = 'carousel-card card-right';

        // Update click handlers dynamically or rely on global function
    }

    window.rotateCarousel = function(direction) {
        if (direction === 'next') {
            // Shift indices: [0, 1, 2] -> [1, 2, 0] (Left becomes Right, Center becomes Left, Right becomes Center)
            const first = cardIndices.shift();
            cardIndices.push(first);

        } else if (direction === 'prev') {
            // Prev Click: Center(1) goes Right, Left(0) goes Center, Right(2) goes Left
            const last = cardIndices.pop();
            cardIndices.unshift(last);
        }
        updateCarousel();
    };

    if (prevBtn) prevBtn.addEventListener('click', () => rotateCarousel('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => rotateCarousel('next'));

    // Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;
    const carouselWrapper = document.querySelector('.carousel-3d-wrapper');

    if (carouselWrapper) {
        carouselWrapper.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        carouselWrapper.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
    }

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            rotateCarousel('next'); // Swipe Left -> Next
        }
        if (touchEndX > touchStartX + 50) {
            rotateCarousel('prev'); // Swipe Right -> Prev
        }
    }


    // --- 7. EXPERIENCIA VALLENATA (ACCORDION) ANIMATION ---
    const accordionSection = document.querySelector('.accordion-section');

    if (accordionSection) {
        const accordionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('expanded');
                } else {
                    entry.target.classList.remove('expanded'); // Optional: Collapse when out of view
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% visible

        accordionObserver.observe(accordionSection);
    }

});
