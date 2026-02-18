document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
    initMobileMenu();
    initScrollAnimations();
    initNextEventLogic(); // New logic for agenda page
    injectMenuPlayer(); // Inject the player into the mobile menu
});

function initCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;

    const today = new Date();
    // Start from March 2026 as per context
    const currentMonth = new Date(2026, 2, 1); // March 1, 2026

    const daysInMonth = new Date(2026, 3, 0).getDate();
    const startDay = currentMonth.getDay();

    // Clear existing
    calendarGrid.innerHTML = '';

    // Empty slots
    for (let i = 0; i < startDay; i++) {
        const empty = document.createElement('div');
        empty.classList.add('calendar-day', 'empty');
        calendarGrid.appendChild(empty);
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.classList.add('calendar-day');
        dayEl.textContent = i;

        // Example event
        if (i === 15) {
            dayEl.classList.add('has-event');
            dayEl.setAttribute('data-event', 'Bogotá - Movistar Arena');
            dayEl.addEventListener('click', () => openEventModal('Bogotá - Movistar Arena', '15 de Marzo 2026'));
        }

        calendarGrid.appendChild(dayEl);
    }
}

function openEventModal(title, date) {
    // Simple alert or custom modal (mock for now)
    alert(`Evento: ${title}\nFecha: ${date}`);
}

function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.close-menu');

    if (toggle && overlay) {
        toggle.addEventListener('click', () => {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }

    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close on link click
    const links = document.querySelectorAll('.mobile-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

function initNextEventLogic() {
    const container = document.getElementById('agenda-next-event');
    if (!container) return;

    // Hardcoded next event for demo
    const eventData = {
        city: 'Bogotá',
        venue: 'Movistar Arena',
        date: 'Domingo, 15 de marzo de 2026',
        time: 'Lanzamiento oficial. 8:00 PM. Puertas 6:00 PM.',
        link: '#'
    };

    container.innerHTML = `
        <div class="next-event-card">
            <div class="animated-gradient-bg"></div>
            <span class="next-event-tag">Próximo Show</span>
            <h2>${eventData.city} - ${eventData.venue}</h2>

            <div class="event-meta">
                <p><i class="far fa-calendar-alt"></i> ${eventData.date}</p>
                <p><i class="far fa-clock"></i> ${eventData.time}</p>
            </div>

            <a href="${eventData.link}" class="ticket-btn">Comprar Tickets</a>
        </div>
    `;
}

function injectMenuPlayer() {
    const mobileLinks = document.querySelector('.mobile-links');
    if (!mobileLinks) return;

    // Spotify-style player HTML
    const playerHTML = `
        <div class="menu-player glass-panel">
            <div class="player-header">
                <span>REPRODUCIENDO DESDE ARTISTA</span>
                <i class="fas fa-ellipsis-h"></i>
            </div>

            <div class="album-art">
                <!-- Using a fallback if image fails, or just css gradient -->
                <img src="assets/images/cover.jpg" alt="Album Cover" onerror="this.style.display='none'">
            </div>

            <div class="track-info-large">
                <div class="track-details">
                    <h3>Horizonte Azul</h3>
                    <p>Camilo Sanz, Julián Castillo</p>
                </div>
                <i class="far fa-heart like-btn"></i>
            </div>

            <div class="progress-area">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="time-stamps">
                    <span>1:24</span>
                    <span>3:45</span>
                </div>
            </div>

            <div class="player-controls-large">
                <button class="control-btn"><i class="fas fa-random"></i></button>
                <button class="control-btn"><i class="fas fa-step-backward"></i></button>
                <button class="control-btn play-btn"><i class="fas fa-play"></i></button>
                <button class="control-btn"><i class="fas fa-step-forward"></i></button>
                <button class="control-btn"><i class="fas fa-redo"></i></button>
            </div>
        </div>
    `;

    // Insert at the top of the mobile menu links container
    mobileLinks.insertAdjacentHTML('afterbegin', playerHTML);
}
