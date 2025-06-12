document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation functionality
    const navOpenBtn = document.querySelector('[data-nav-open-btn]');
    const navCloseBtn = document.querySelector('[data-nav-close-btn]');
    const navbar = document.querySelector('[data-navbar]');
    const overlay = document.querySelector('[data-overlay]');
    const navbarLinks = document.querySelectorAll('.navbar-link');

    const toggleNavbar = () => {
        navbar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('active'); // Prevents scrolling when nav is open
    };

    navOpenBtn.addEventListener('click', toggleNavbar);
    navCloseBtn.addEventListener('click', toggleNavbar);
    overlay.addEventListener('click', toggleNavbar);

    // Close navbar when a link is clicked (for smoother navigation)
    navbarLinks.forEach((link, index) => {
        // Stagger animation for mobile nav links
        link.style.setProperty('--delay-factor', `${index * 0.1}s`);
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                toggleNavbar();
            }
        });
    });

    // "Go Top" button functionality
    const goTopBtn = document.querySelector('[data-go-top]');

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 200) {
            goTopBtn.classList.add('active');
        } else {
            goTopBtn.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll(
        '.section-title, .about-banner, .about-content, .tournament-content, ' +
        '.tournament-prize, .tournament-winners, .gallery-list li, .team-list li, ' +
        '.gears-card, .newsletter-card, .footer-top'
    );

    const observerOptions = {
        root: null, // viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // element is 10% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once it's animated
            }
        });
    }, observerOptions);

    animatedElements.forEach((element, index) => {
        // Set a delay for staggered animations
        element.style.setProperty('--delay-factor', `${index * 0.1}s`);
        observer.observe(element);
    });
});