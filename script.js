/* ===========================
   KAMB Portfolio - script.js
   =========================== */

document.addEventListener('DOMContentLoaded', function () {

    // ── Theme Toggle (Clair / Sombre) ────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon   = themeToggle ? themeToggle.querySelector('i') : null;

    function applyTheme(mode) {
        if (mode === 'light') {
            document.body.classList.add('light-mode');
            if (themeIcon) { themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon'); }
            if (themeToggle) themeToggle.setAttribute('aria-label', 'Passer en mode sombre');
        } else {
            document.body.classList.remove('light-mode');
            if (themeIcon) { themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun'); }
            if (themeToggle) themeToggle.setAttribute('aria-label', 'Passer en mode clair');
        }
    }

    // Load saved preference
    const savedTheme = localStorage.getItem('kamb-theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isLight = document.body.classList.contains('light-mode');
            const newTheme = isLight ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('kamb-theme', newTheme);
        });
    }

    // ── Loader ──────────────────────────────────────────────
    const loaderWrapper = document.querySelector('.loader-wrapper');
    if (loaderWrapper) {
        setTimeout(function () {
            loaderWrapper.style.opacity = '0';
            setTimeout(function () {
                loaderWrapper.style.display = 'none';
            }, 600);
        }, 1200);
    }

    // ── Typing Effect ────────────────────────────────────────
    const typingData = [
        { el: document.querySelector('.typing-effect'),   text: 'Bonjour, je suis Kadjo Allouan Moise Bienvenue', speed: 45 },
        { el: document.querySelector('.typing-effect-2'), text: 'Étudiant en Master 1 RIST — UFHB',               speed: 55 },
        { el: document.querySelector('.typing-effect-3'), text: 'Réseaux · Systèmes · Cybersécurité',             speed: 60 },
    ];

    function typeWriter(data, index, callback) {
        if (index >= data.length) {
            if (callback) callback();
            return;
        }
        const { el, text, speed } = data[index];
        if (!el) { typeWriter(data, index + 1, callback); return; }
        el.textContent = '';
        let i = 0;
        const cursor = document.createElement('span');
        cursor.style.cssText = 'display:inline-block;width:2px;height:1em;background:var(--primary,#00c8ff);vertical-align:middle;margin-left:2px;animation:blink 1s step-end infinite;';
        el.appendChild(cursor);

        function tick() {
            if (i < text.length) {
                el.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                i++;
                setTimeout(tick, speed);
            } else {
                el.removeChild(cursor);
                setTimeout(function () {
                    typeWriter(data, index + 1, callback);
                }, 400);
            }
        }
        tick();
    }

    // Start typing after loader hides
    setTimeout(function () {
        typeWriter(typingData, 0);
    }, 1300);

    // ── Mobile Burger Menu ───────────────────────────────────
    const burger    = document.querySelector('.burger');
    const navLinks  = document.querySelector('.nav-links');
    const navItems  = document.querySelectorAll('.nav-links li');

    if (burger && navLinks) {
        burger.addEventListener('click', function () {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            // Staggered animation for nav items
            navItems.forEach(function (link, index) {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = 'navLinkFade 0.4s ease forwards ' + (index * 0.07 + 0.1) + 's';
                }
            });
        });

        // Close menu on nav link click
        navItems.forEach(function (item) {
            item.addEventListener('click', function () {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navItems.forEach(function (link) { link.style.animation = ''; });
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function (e) {
            if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navItems.forEach(function (link) { link.style.animation = ''; });
            }
        });
    }

    // ── Header Scroll Effect ─────────────────────────────────
    const header = document.querySelector('header');
    function handleHeaderScroll() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ── Active Nav Link on Scroll ────────────────────────────
    const sections     = document.querySelectorAll('section[id]');
    const navLinksAll  = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        sections.forEach(function (section) {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinksAll.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ── Smooth Scrolling ─────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 75,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── Back to Top ──────────────────────────────────────────
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 400) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }, { passive: true });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Project Filtering ────────────────────────────────────
    const projectFilterBtns = document.querySelectorAll('.projects-filter .filter-btn');
    const projectCards       = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            projectFilterBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');

            projectCards.forEach(function (card) {
                const categories = card.getAttribute('data-category') || '';
                const show = filter === 'all' || categories.split(' ').includes(filter);
                if (show) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ── Certification Filtering ──────────────────────────────
    const certFilterBtns = document.querySelectorAll('.certifications-filter .filter-btn');
    const certCards       = document.querySelectorAll('.certification-card');

    certFilterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            certFilterBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');

            certCards.forEach(function (card) {
                const cat = card.getAttribute('data-category') || '';
                const show = filter === 'all' || cat === filter;
                if (show) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ── Scroll Reveal Animation ──────────────────────────────
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(function (section) { revealObserver.observe(section); });

    // Cards stagger animation
    const cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, idx) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, idx * 80);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.project-card, .certification-card, .skill-category, .info-item').forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(el);
    });

    // ── Lazy Loading for Images ──────────────────────────────
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    imgObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(function (img) { imgObserver.observe(img); });
    }

    // ── EmailJS Contact Form ─────────────────────────────────
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name    = document.getElementById('name')?.value.trim();
            const email   = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            const templateParams = { from_name: name, from_email: email, subject: subject, message: message };

            emailjs.send('service_wz2e2ch', 'template_qut237h', templateParams)
                .then(function () {
                    alert('Message envoyé avec succès !');
                    contactForm.reset();
                })
                .catch(function (err) {
                    console.error('EmailJS error:', err);
                    alert('Une erreur est survenue. Veuillez réessayer.');
                });
        });
    }

});

// ── Injected CSS Animations ──────────────────────────────────
(function () {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from { opacity: 0; transform: translateX(30px); }
            to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        .toggle .line1 { transform: rotate(-45deg) translate(-5px, 7px); }
        .toggle .line2 { opacity: 0; transform: translateX(-10px); }
        .toggle .line3 { transform: rotate(45deg) translate(-5px, -7px); }
        img.loaded { animation: fadeInUp 0.4s ease; }
    `;
    document.head.appendChild(style);
})();
