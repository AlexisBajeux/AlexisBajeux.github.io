// ---- PARTICULES ANIMÉES ----
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position horizontale aléatoire
        particle.style.left = Math.random() * 100 + '%';
        
        // Durée d'animation aléatoire
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        
        // Délai d'animation aléatoire
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ---- ANIMATIONS AU SCROLL ----
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// ---- BOUTON RETOUR EN HAUT ----
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;
    
    let isScrolling = false;
    
    function handleScroll() {
        if (isScrolling) return;
        
        isScrolling = true;
        requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
            
            isScrolling = false;
        });
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    });
}

// ---- SMOOTH SCROLL POUR LES LIENS D'ANCRAGE ----
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ---- ANIMATIONS DES ÉLÉMENTS FLOTTANTS ----
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Animation de rotation continue
        element.style.animation = `float-rotate ${8 + index * 2}s linear infinite`;
        
        // Mouvement au survol de la souris
        document.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.02;
            const deltaY = (e.clientY - centerY) * 0.02;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${index * 45}deg)`;
        });
    });
}

// ---- INITIALISATION ----
document.addEventListener('DOMContentLoaded', function() {
    // Créer les particules
    createParticles();
    
    // Observer les sections pour les animations
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Initialiser le bouton retour en haut
    initScrollToTop();
    
    // Initialiser le smooth scroll
    initSmoothScroll();
    
    // Animer les éléments flottants
    animateFloatingElements();
    
    console.log('Portfolio initialisé avec succès !');
});

// ---- ANIMATIONS CSS SUPPLÉMENTAIRES ----
const style = document.createElement('style');
style.textContent = `
    @keyframes float-rotate {
        0% { transform: rotate(0deg) translateY(0px); }
        25% { transform: rotate(90deg) translateY(-10px); }
        50% { transform: rotate(180deg) translateY(0px); }
        75% { transform: rotate(270deg) translateY(10px); }
        100% { transform: rotate(360deg) translateY(0px); }
    }
`;
document.head.appendChild(style);