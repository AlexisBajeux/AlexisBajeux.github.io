
        // Create floating particles
        function createParticles() {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                document.body.appendChild(particle);
            }
        }

        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate cards with stagger effect
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Enhanced parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.floating-element');
            
            parallax.forEach((element, index) => {
                const speed = (index + 1) * 0.3;
                const yPos = -(scrolled * speed);
                const rotate = scrolled * 0.1;
                element.style.transform = `translateY(${yPos}px) rotate(${rotate}deg)`;
            });

            // Parallax for hero content
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });

        // Mouse movement effect
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            document.querySelectorAll('.floating-element').forEach((element, index) => {
                const speed = (index + 1) * 20;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                element.style.transform += ` translate(${x}px, ${y}px)`;
            });
        });

        // Initialize particles
        createParticles();

        // Add loading animation to cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.animation = 'pulse 0.5s ease';
            });
        });