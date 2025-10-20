// ===================================
// TXDXIA - Main JavaScript
// ===================================

(function() {
    'use strict';

    // ===================================
    // NAVBAR FUNCTIONALITY
    // ===================================
    
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const spans = mobileMenu.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu on link click
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = mobileMenu.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ===================================
    // SMOOTH SCROLLING
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // BRAIN VISUALIZATION (HERO)
    // ===================================
    
    const brainContainer = document.getElementById('brainContainer');
    
    if (brainContainer) {
        const createBrainParticles = () => {
            const particleCount = window.innerWidth < 768 ? 30 : 60;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'brain-particle';
                
                // Random position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                // Random size
                const size = Math.random() * 4 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Random color (cyan to purple gradient)
                const hue = 180 + Math.random() * 100;
                particle.style.background = `hsl(${hue}, 100%, 60%)`;
                particle.style.boxShadow = `0 0 ${size * 3}px hsl(${hue}, 100%, 60%)`;
                
                // Random animation
                particle.style.animationDelay = Math.random() * 5 + 's';
                particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
                
                // Add CSS animation
                particle.style.position = 'absolute';
                particle.style.borderRadius = '50%';
                particle.style.opacity = '0.6';
                particle.style.animation = 'brainFloat 10s infinite ease-in-out';
                
                brainContainer.appendChild(particle);
            }
        };

        // Add CSS animation for particles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes brainFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(100px, -80px) scale(1.2);
                    opacity: 0.7;
                }
                50% {
                    transform: translate(50px, -150px) scale(0.8);
                    opacity: 0.5;
                }
                75% {
                    transform: translate(-80px, -100px) scale(1.1);
                    opacity: 0.6;
                }
            }
        `;
        document.head.appendChild(style);

        createBrainParticles();
    }

    // ===================================
    // TECHNOLOGY CANVAS VISUALIZATION
    // ===================================
    
    const techCanvas = document.getElementById('techCanvas');
    
    if (techCanvas) {
        const ctx = techCanvas.getContext('2d');
        
        const resizeCanvas = () => {
            const container = techCanvas.parentElement;
            techCanvas.width = container.offsetWidth;
            techCanvas.height = container.offsetHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Orbital visualization
        class Orbit {
            constructor(radius, speed, color) {
                this.radius = radius;
                this.speed = speed;
                this.angle = Math.random() * Math.PI * 2;
                this.color = color;
                this.nodeCount = Math.floor(radius / 20);
            }
            
            update() {
                this.angle += this.speed;
            }
            
            draw(centerX, centerY) {
                // Draw orbit circle
                ctx.beginPath();
                ctx.arc(centerX, centerY, this.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `${this.color}20`;
                ctx.lineWidth = 1;
                ctx.stroke();
                
                // Draw nodes on orbit
                for (let i = 0; i < this.nodeCount; i++) {
                    const nodeAngle = (Math.PI * 2 / this.nodeCount) * i + this.angle;
                    const x = centerX + Math.cos(nodeAngle) * this.radius;
                    const y = centerY + Math.sin(nodeAngle) * this.radius;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                    
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = this.color;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }
        }
        
        const centerX = techCanvas.width / 2;
        const centerY = techCanvas.height / 2;
        
        const orbits = [
            new Orbit(60, 0.02, '#00f5ff'),
            new Orbit(100, -0.015, '#7b2ff7'),
            new Orbit(140, 0.01, '#ff00ff'),
            new Orbit(180, -0.008, '#00d4ff')
        ];
        
        const animateTech = () => {
            ctx.clearRect(0, 0, techCanvas.width, techCanvas.height);
            
            const centerX = techCanvas.width / 2;
            const centerY = techCanvas.height / 2;
            
            // Draw center core
            ctx.beginPath();
            ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20);
            gradient.addColorStop(0, '#00f5ff');
            gradient.addColorStop(1, '#7b2ff7');
            ctx.fillStyle = gradient;
            ctx.fill();
            
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#00f5ff';
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Update and draw orbits
            orbits.forEach(orbit => {
                orbit.update();
                orbit.draw(centerX, centerY);
            });
            
            requestAnimationFrame(animateTech);
        };
        
        animateTech();
        
        window.addEventListener('resize', () => {
            resizeCanvas();
        });
    }

    // ===================================
    // SCROLL ANIMATIONS
    // ===================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards
    const cards = document.querySelectorAll('.platform-card, .agent-card, .case-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // ===================================
    // FORM HANDLING
    // ===================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto para programar una demo.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // ===================================
    // CARD HOVER EFFECTS
    // ===================================
    
    const platformCards = document.querySelectorAll('.platform-card, .agent-card');
    
    platformCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // GRADIENT TEXT ANIMATION
    // ===================================
    
    const gradientTexts = document.querySelectorAll('.gradient-text');
    
    gradientTexts.forEach(text => {
        let hue = 180;
        
        setInterval(() => {
            hue = (hue + 1) % 360;
            const hue2 = (hue + 100) % 360;
            const hue3 = (hue + 200) % 360;
            text.style.background = `linear-gradient(135deg, hsl(${hue}, 100%, 60%), hsl(${hue2}, 100%, 60%), hsl(${hue3}, 100%, 60%))`;
            text.style.webkitBackgroundClip = 'text';
            text.style.backgroundClip = 'text';
        }, 50);
    });

    // ===================================
    // PARALLAX EFFECT ON SCROLL
    // ===================================
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - scrolled / 800;
        }
    });

    // ===================================
    // DEBOUNCE UTILITY
    // ===================================
    
    const debounce = (func, wait = 10) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Apply debounce to resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Resize operations here if needed
        }, 250);
    });

    // ===================================
    // CONSOLE BRANDING
    // ===================================
    
    console.log('%c TxDxIA ', 'background: linear-gradient(135deg, #00f5ff, #7b2ff7); color: #000; font-size: 24px; font-weight: bold; padding: 15px 30px; border-radius: 5px;');
    console.log('%c Plataforma de Agentes de Inteligencia Artificial ', 'color: #00f5ff; font-size: 16px; font-weight: bold;');
    console.log('%c Transformando datos en decisiones inteligentes ', 'color: #7b2ff7; font-size: 14px;');
    console.log('%c http://txdxia.com ', 'color: #666; font-size: 12px;');

    // ===================================
    // DYNAMIC PARTICLES CONNECTION
    // ===================================
    
    const createConnectionLines = () => {
        const particles = document.querySelectorAll('.brain-particle');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '1';
        
        if (brainContainer && particles.length > 0) {
            brainContainer.insertBefore(svg, brainContainer.firstChild);
            
            const updateLines = () => {
                // Clear existing lines
                while (svg.firstChild) {
                    svg.removeChild(svg.firstChild);
                }
                
                const particlePositions = Array.from(particles).map(p => ({
                    x: p.offsetLeft + parseFloat(p.style.width) / 2,
                    y: p.offsetTop + parseFloat(p.style.height) / 2
                }));
                
                // Connect nearby particles
                particlePositions.forEach((p1, i) => {
                    particlePositions.slice(i + 1).forEach(p2 => {
                        const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
                        
                        if (distance < 150) {
                            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                            line.setAttribute('x1', p1.x);
                            line.setAttribute('y1', p1.y);
                            line.setAttribute('x2', p2.x);
                            line.setAttribute('y2', p2.y);
                            line.setAttribute('stroke', '#00f5ff');
                            line.setAttribute('stroke-width', '1');
                            line.setAttribute('opacity', (150 - distance) / 150 * 0.3);
                            svg.appendChild(line);
                        }
                    });
                });
            };
            
            // Update lines periodically
            setInterval(updateLines, 100);
        }
    };
    
    // Initialize after particles are created
    setTimeout(createConnectionLines, 500);

    // ===================================
    // AGENT CARDS SEQUENTIAL REVEAL
    // ===================================
    
    const agentCards = document.querySelectorAll('.agent-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    agentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(card);
    });

    // ===================================
    // CTA BUTTON RIPPLE EFFECT
    // ===================================
    
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ===================================
    // TECH STACK PROGRESS BARS (if added later)
    // ===================================
    
    const techItems = document.querySelectorAll('.tech-item');
    
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });
    
    techItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        techObserver.observe(item);
    });

    // ===================================
    // MOUSE TRAIL EFFECT (OPTIONAL)
    // ===================================
    
    let mouseTrail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) { // Only on desktop
            mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
            if (mouseTrail.length > maxTrailLength) {
                mouseTrail.shift();
            }
        }
    });

    // ===================================
    // PERFORMANCE MONITORING
    // ===================================
    
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`%c Page loaded in ${pageLoadTime}ms`, 'color: #00f5ff; font-weight: bold;');
            }, 0);
        });
    }

    // ===================================
    // LAZY LOADING IMAGES (if any added)
    // ===================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===================================
    // KEYBOARD NAVIGATION SUPPORT
    // ===================================
    
    document.addEventListener('keydown', (e) => {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const spans = mobileMenu.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // ===================================
    // INITIALIZE ON DOM READY
    // ===================================
    
    console.log('%c ✓ TxDxIA initialized successfully', 'color: #00ff00; font-weight: bold;');

})();