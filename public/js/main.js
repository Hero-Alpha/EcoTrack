document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Mobile Navigation
    // ======================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Set active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ======================
    // Sticky Navbar on Scroll
    // ======================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ======================
    // Smooth Scrolling
    // ======================
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

    // ======================
    // Animated Counter
    // ======================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target.toLocaleString();
                    clearInterval(timer);
                }
            }, 16);
        });
    }

    // ======================
    // Animated CO2 Reduction Bar
    // ======================
    const reductionFill = document.querySelector('.reduction-fill');
    
    function animateReductionBar() {
        const targetWidth = reductionFill.getAttribute('data-width');
        let currentWidth = 0;
        const duration = 2000;
        const increment = 100 / (duration / 16);
        
        const timer = setInterval(() => {
            currentWidth += increment;
            reductionFill.style.width = `${currentWidth}%`;
            
            if (currentWidth >= 100) {
                reductionFill.style.width = targetWidth;
                clearInterval(timer);
            }
        }, 16);
    }

    // ======================
    // Intersection Observer for Animations
    // ======================
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats when carbon section comes into view
                if (entry.target.classList.contains('carbon-stats')) {
                    animateStats();
                    animateReductionBar();
                }
                
                // Add animation classes when elements come into view
                if (entry.target.classList.contains('step-card')) {
                    entry.target.classList.add('zoom-in');
                }
                if (entry.target.classList.contains('client-logo')) {
                    entry.target.classList.add('fade-in');
                }
                if (entry.target.classList.contains('stat-card')) {
                    entry.target.classList.add('flip-in');
                }
                if (entry.target.classList.contains('contact-info')) {
                    entry.target.classList.add('slide-in-left');
                }
                if (entry.target.classList.contains('contact-form')) {
                    entry.target.classList.add('slide-in-right');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate when scrolled into view
    document.querySelectorAll('.step-card, .client-logo, .carbon-stats, .stat-card, .contact-info, .contact-form').forEach(el => {
        observer.observe(el);
    });

    // ======================
    // Button Hover Effects
    // ======================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // ======================
    // Form Input Effects
    // ======================
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        input.addEventListener('focus', function() {
            label.style.top = '-10px';
            label.style.left = '10px';
            label.style.fontSize = '12px';
            label.style.backgroundColor = '#ecf0f1';
            label.style.padding = '0 5px';
            label.style.color = '#2ecc71';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                label.style.top = '15px';
                label.style.left = '15px';
                label.style.fontSize = '16px';
                label.style.backgroundColor = 'transparent';
                label.style.padding = '0';
                label.style.color = '#95a5a6';
            }
        });
    });
});