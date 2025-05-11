// Fichier JavaScript pour le portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Chargement de la page
    setTimeout(function() {
        document.querySelector('.loader-wrapper').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loader-wrapper').style.display = 'none';
        }, 500);
    }, 1000);

    // Effet de typing pour le hero
    const typingTexts = [
        "Bonjour, je suis Kadjo Allouan Moise Bienvenue",
        "Étudiant en LICENCE 3 de Science Informatique",
        "Département de MATH-INFO - UFHB"
    ];

    const typingElements = [
        document.querySelector('.typing-effect'),
        document.querySelector('.typing-effect-2'),
        document.querySelector('.typing-effect-3')
    ];

    function typeWriter(text, element, speed, callback) {
        let i = 0;
        element.textContent = '';
        
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else if (callback) {
                callback();
            }
        }
        
        typing();
    }

    // Lancement séquentiel des effets de typing
    typeWriter(typingTexts[0], typingElements[0], 50, function() {
        typeWriter(typingTexts[1], typingElements[1], 50, function() {
            typeWriter(typingTexts[2], typingElements[2], 50);
        });
    });

    // Menu burger pour mobile
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', function() {
        // Toggle nav
        navLinks.classList.toggle('nav-active');
        
        // Animation burger
        burger.classList.toggle('toggle');
        
        // Animation des liens
        navLinkItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Fermer le menu mobile après clic sur un lien
    navLinkItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinkItems.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });

    // Changement de style du header au scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animation des barres de compétences
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skillItems.forEach(item => {
            const progress = item.querySelector('.progress');
            const width = progress.getAttribute('data-width');
            progress.style.width = width;
        });
    }

    // Observer pour déclencher l'animation des compétences
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Filtrage des projets
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Validation du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Valider chaque champ
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Réinitialiser les messages d'erreur
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            // Validation du nom
            if (name.value.trim() === '') {
                showError(name, 'Le nom est requis');
                isValid = false;
            }
            
            // Validation de l'email
            if (email.value.trim() === '') {
                showError(email, 'L\'email est requis');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Veuillez entrer un email valide');
                isValid = false;
            }
            
            // Validation du sujet
            if (subject.value.trim() === '') {
                showError(subject, 'Le sujet est requis');
                isValid = false;
            }
            
            // Validation du message
            if (message.value.trim() === '') {
                showError(message, 'Le message est requis');
                isValid = false;
            }
            
            // Si tout est valide, on peut envoyer le formulaire
            if (isValid) {
                // Ici, vous pourriez ajouter du code pour envoyer le formulaire via AJAX
                alert('Message envoyé avec succès!');
                contactForm.reset();
            }
        });
    }
    
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.style.borderColor = 'var(--danger-color)';
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Bouton retour en haut
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animation au scroll des sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Navigation active
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Ajout des animations CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .nav-active {
        transform: translateX(0%) !important;
    }
    
    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .toggle .line2 {
        opacity: 0;
    }
    
    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    section.animate {
        animation: fadeIn 1s ease forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);