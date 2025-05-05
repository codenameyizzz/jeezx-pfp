// Optimized and Enhanced script.js dengan efek animasi scroll berulang dan hover interaktif
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: false,
            mirror: true,
            anchorPlacement: 'top-bottom',
            offset: 20,
            delay: 0,
            disable: false
        });
    } else {
        console.warn('AOS is not defined. Make sure it is properly imported.');
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    mobileMenuBtn.addEventListener('click', function () {
        mobileNav.classList.toggle('active');
    });

    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileNav.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', updateNavbarTheme);


    // Horizontal slider controls
    const scrollButtons = document.querySelectorAll('.scroll-btn');
    scrollButtons.forEach(button => {
        button.addEventListener('click', function () {
            const direction = this.classList.contains('scroll-left') ? -1 : 1;
            const targetId = this.getAttribute('data-target');
            const slider = document.getElementById(targetId);
            if (slider) {
                const cardWidth = slider.querySelector('.slider-item').offsetWidth;
                const gap = 16;
                const scrollAmount = cardWidth + gap;
                slider.scrollBy({
                    left: direction * scrollAmount,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Generate bullets for each horizontal slider
    const sliders = document.querySelectorAll('.horizontal-slider');

    sliders.forEach(slider => {
        const sliderId = slider.id;
        const bulletsContainer = document.querySelector(`.slider-bullets[data-target="${sliderId}"]`);
        if (!bulletsContainer) return;

        const items = slider.querySelectorAll('.slider-item');
        items.forEach((item, index) => {
            const bullet = document.createElement('div');
            bullet.classList.add('slider-bullet');
            if (index === 0) bullet.classList.add('active');
            bullet.addEventListener('click', () => {
                slider.scrollTo({
                    left: index * (item.offsetWidth + 16), // 16px gap
                    behavior: 'smooth'
                });
            });
            bulletsContainer.appendChild(bullet);
        });

        // Update active bullet on scroll
        slider.addEventListener('scroll', () => {
            const scrollLeft = slider.scrollLeft;
            const cardWidth = items[0].offsetWidth + 16;
            const activeIndex = Math.round(scrollLeft / cardWidth);
            const bullets = bulletsContainer.querySelectorAll('.slider-bullet');
            bullets.forEach((b, idx) => {
                if (idx === activeIndex) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
        });
    });


    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -20% 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.classList.contains('tech-stack')) {
                    const badges = entry.target.querySelectorAll('.tech-badge');
                    badges.forEach((badge, index) => {
                        setTimeout(() => {
                            badge.style.opacity = '1';
                            badge.style.transform = 'translateY(0) scale(1)';
                        }, 50 * index);
                    });
                }
                if (entry.target.classList.contains('timeline')) {
                    const items = entry.target.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 200 * index);
                    });
                }
            } else {
                if (entry.target.classList.contains('tech-stack')) {
                    const badges = entry.target.querySelectorAll('.tech-badge');
                    badges.forEach(badge => {
                        badge.style.opacity = '0';
                        badge.style.transform = 'translateY(20px) scale(0.8)';
                    });
                }
                if (entry.target.classList.contains('timeline')) {
                    const items = entry.target.querySelectorAll('.timeline-item');
                    items.forEach(item => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                    });
                }
            }
        });
    }, observerOptions);

    const sectionsToObserve = document.querySelectorAll('section, .tech-stack, .timeline, .achievement-card, .certificate-card');
    sectionsToObserve.forEach(section => observer.observe(section));

    // Initialize hidden state
    document.querySelectorAll('.tech-badge').forEach(badge => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px) scale(0.8)';
        badge.style.transition = 'all 0.5s ease';
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
    });

    // Project card hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.querySelector('.project-overlay').style.opacity = '1';
            this.querySelector('.view-project').style.transform = 'translateY(0)';
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(61, 79, 217, 0.3)';
        });
        card.addEventListener('mouseleave', function () {
            this.querySelector('.project-overlay').style.opacity = '0';
            this.querySelector('.view-project').style.transform = 'translateY(20px)';
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });

    // Hero parallax effect
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const heroShapes = document.querySelectorAll('.hero-shapes .shape');
        heroShapes.forEach((shape, index) => {
            const speed = 0.05 * (index + 1);
            shape.style.transform = `translate(${scrollPosition * speed}px, ${scrollPosition * speed}px)`;
        });
    });

    // Theme toggle functionality
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark-theme');
        document.documentElement.classList.add('light-theme');
    } else {
        document.documentElement.classList.add('dark-theme');
        document.documentElement.classList.remove('light-theme');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            if (document.documentElement.classList.contains('dark-theme')) {
                document.documentElement.classList.remove('dark-theme');
                document.documentElement.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.add('dark-theme');
                document.documentElement.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            }
            updateNavbarTheme();
        });
    });
});

function updateNavbarTheme() {
    if (window.scrollY > 50) {
        nav.style.backgroundColor = document.documentElement.classList.contains('light-theme') ? 'rgba(249, 250, 251, 0.9)' : 'rgba(0, 0, 0, 0.9)';
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        nav.style.padding = '10px 0';
    } else {
        nav.style.backgroundColor = document.documentElement.classList.contains('light-theme') ? 'rgba(249, 250, 251, 0.8)' : 'rgba(0, 0, 0, 0.8)';
        nav.style.boxShadow = 'none';
        nav.style.padding = '16px 0';
    }
}
