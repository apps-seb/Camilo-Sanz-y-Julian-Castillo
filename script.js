document.addEventListener('DOMContentLoaded', () => {

    // --- 0. DATA & INITIALIZATION ---
    // Mock Events Data
    const events = [
        {
            date: '2026-03-15',
            title: 'Bogotá - Movistar Arena',
            info: 'Lanzamiento oficial. 8:00 PM. Puertas 6:00 PM.'
        },
        {
            date: '2026-03-22',
            title: 'Medellín - La Macarena',
            info: 'Festival de las Flores. 9:00 PM.'
        },
        {
            date: '2026-04-05',
            title: 'Cali - Arena Cañaveralejo',
            info: 'Feria de Cali Remake. 7:00 PM.'
        },
        {
            date: '2026-03-28',
            title: 'Barranquilla - Puerta de Oro',
            info: 'Noche de Parranda. 10:00 PM.'
        }
    ];

    initNextEventLogic();
    initCalendarLogic();
    injectMenuPlayer();

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


    // --- FUNCTIONS FOR FEATURES ---

    function initNextEventLogic() {
        const now = new Date();
        now.setHours(0,0,0,0); // Start of today

        // Only target the main card on Agenda page now
        const container = document.getElementById('agenda-next-event');
        if (!container) return;

        const upcoming = events
            .map(e => {
                const d = new Date(e.date + 'T00:00:00');
                return { ...e, dateObj: d };
            })
            .filter(e => e.dateObj >= now)
            .sort((a, b) => a.dateObj - b.dateObj);

        if (upcoming.length > 0) {
            const next = upcoming[0];
            const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let formattedDate = next.dateObj.toLocaleDateString('es-ES', dateOptions);
            formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

            container.innerHTML = `
                <div class="next-event-content">
                    <div class="next-event-badge">¡PRÓXIMO SHOW!</div>
                    <h3 class="next-event-title">${next.title}</h3>
                    <div class="next-event-date"><i class="fas fa-calendar-day"></i> ${formattedDate}</div>
                    <p class="next-event-info">${next.info}</p>
                    <div class="next-event-actions">
                        <a href="https://tu-boleta.com" target="_blank" class="btn btn-primary">Comprar Boletas</a>
                    </div>
                </div>
            `;
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    }

    function initCalendarLogic() {
        const calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return; // Not on agenda page

        const monthDisplay = document.getElementById('monthDisplay');
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');
        const eventModal = document.getElementById('eventModal');
        const closeModal = document.getElementById('closeModal');

        const mDate = document.getElementById('modalDate');
        const mTitle = document.getElementById('modalTitle');
        const mInfo = document.getElementById('modalInfo');

        let nav = 0;

        function loadCalendar() {
            // Force start date to March 2026 (Month 2) as per project context
            const dt = new Date(2026, 2, 1);

            if (nav !== 0) {
                dt.setMonth(new Date(2026, 2, 1).getMonth() + nav);
            }

            const month = dt.getMonth();
            const year = dt.getFullYear();
            const firstDayOfMonth = new Date(year, month, 1);
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const paddingDays = firstDayOfMonth.getDay();

            monthDisplay.innerText = `${dt.toLocaleDateString('es-es', { month: 'long' })} ${year}`;
            monthDisplay.style.textTransform = 'capitalize';

            calendarGrid.innerHTML = '';

            const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
            weekdays.forEach(wd => {
                const div = document.createElement('div');
                div.classList.add('weekday');
                div.innerText = wd;
                calendarGrid.appendChild(div);
            });

            for(let i = 0; i < paddingDays; i++) {
                const daySquare = document.createElement('div');
                daySquare.classList.add('day-cell');
                daySquare.style.opacity = '0';
                daySquare.style.cursor = 'default';
                calendarGrid.appendChild(daySquare);
            }

            for(let i = 1; i <= daysInMonth; i++) {
                const daySquare = document.createElement('div');
                daySquare.classList.add('day-cell');
                daySquare.innerText = i;

                const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                const eventForDay = events.find(e => e.date === dayString);

                const today = new Date();
                if (i === today.getDate() && nav === 0 && month === today.getMonth()) {
                    daySquare.classList.add('today');
                }

                if (eventForDay) {
                    daySquare.classList.add('event-day');
                    daySquare.addEventListener('click', () => openModal(eventForDay));
                }

                calendarGrid.appendChild(daySquare);
            }
        }

        function openModal(event) {
            mDate.innerText = event.date;
            mTitle.innerText = event.title;
            mInfo.innerText = event.info;
            eventModal.classList.add('active');
        }

        function closeModalFunc() {
            eventModal.classList.remove('active');
        }

        prevBtn.addEventListener('click', () => { nav--; loadCalendar(); });
        nextBtn.addEventListener('click', () => { nav++; loadCalendar(); });
        closeModal.addEventListener('click', closeModalFunc);
        eventModal.addEventListener('click', (e) => {
            if(e.target === eventModal) closeModalFunc();
        });

        loadCalendar();
    }

    function injectMenuPlayer() {
        const overlay = document.querySelector('.mobile-menu-overlay');
        const links = document.querySelector('.mobile-links');

        if (overlay && !document.querySelector('.menu-player')) {
            const playerHTML = document.createElement('div');
            playerHTML.className = 'menu-player glass';
            playerHTML.innerHTML = `
                <div class="player-visual">
                   <img src="https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=200" alt="Album Art">
                </div>
                <div class="player-meta">
                    <div class="player-title">Horizonte Azul</div>
                    <div class="player-artist">Camilo Sanz & Julián Castillo</div>
                </div>
                <div class="player-controls">
                    <div class="player-progress">
                        <div class="progress-bar" style="width: 35%;"></div>
                    </div>
                    <div class="control-row">
                        <i class="fas fa-backward-step"></i>
                        <div class="play-btn-circle">
                            <i class="fas fa-play"></i>
                        </div>
                        <i class="fas fa-forward-step"></i>
                    </div>
                </div>
            `;

            // Insert before links
            if(links) {
                overlay.insertBefore(playerHTML, links);
            } else {
                overlay.appendChild(playerHTML);
            }
        }
    }

});
