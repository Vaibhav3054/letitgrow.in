document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Typed.js for hero section
    const typed = new Typed('#typed-text', {
        strings: [
            " Startups",
            " Small Businesses",
            " Entrepreneurs",
            " Your Vision"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // ScrollReveal animations
    ScrollReveal().reveal('.section-title, .about-image, .about-text, .service-card, .portfolio-item, .testimonial-card, .contact-info, .contact-form', {
        delay: 200,
        distance: '20px',
        origin: 'bottom',
        interval: 100,
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });

    // Dynamic stats counter with enhanced features
    // Initialize stats
    let currentStats = {
        projects: 8,
        clients: 6
    };

    // Constants
    const START_DATE = new Date('2025-01-01T00:00:00');
    const COFFEE_PER_DAY = 4;
    const WORK_HOURS_PER_DAY = 8;
    const WORK_DAYS_PER_WEEK = 6; // Only count weekdays
    const WORK_HOURS_START = 9; // 9 AM
    const WORK_HOURS_END = 17; // 5 PM

    // Calculate working hours considering only business hours and weekdays
    function calculateWorkingHours() {
        const now = new Date();
        let totalHours = 0;
        
        // Create a date object for iteration
        const current = new Date(START_DATE);
        
        while (current < now) {
            // Only count weekdays (Monday to Friday)
            if (current.getDay() >= 1 && current.getDay() <= 5) {
                // Calculate hours for this day
                let dayStart = new Date(current);
                dayStart.setHours(WORK_HOURS_START, 0, 0, 0);
                
                let dayEnd = new Date(current);
                dayEnd.setHours(WORK_HOURS_END, 0, 0, 0);
                
                // If it's today, only count hours until now
                if (current.toDateString() === now.toDateString()) {
                    dayEnd = now;
                }
                
                // Add working hours for this day
                const dayHours = (dayEnd - dayStart) / (1000 * 60 * 60);
                totalHours += Math.max(0, Math.min(dayHours, WORK_HOURS_END - WORK_HOURS_START));
            }
            
            // Move to next day
            current.setDate(current.getDate() + 1);
            current.setHours(0, 0, 0, 0);
        }
        
        return Math.floor(totalHours);
    }

    function calculateRealTimeStats() {
        const now = new Date();
        const daysPassed = (now - START_DATE) / (1000 * 60 * 60 * 24);
        
        return {
            coffee: Math.floor(daysPassed * COFFEE_PER_DAY),
            hours: calculateWorkingHours() // Using the more precise calculation
        };
    }

    // Enhanced animation function with smoother easing
    function animateCounter(elementId, targetValue, duration = 3000) {
        const element = document.getElementById(elementId);
        const startTime = performance.now();
        const startValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
        
        // Cancel any existing animation
        if (element.animationId) {
            cancelAnimationFrame(element.animationId);
        }
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Cubic easing out for smooth finish
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentValue = Math.floor(startValue + easeProgress * (targetValue - startValue));
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                element.animationId = requestAnimationFrame(updateCounter);
            } else {
                element.textContent = targetValue.toLocaleString();
                delete element.animationId;
            }
        }
        
        element.animationId = requestAnimationFrame(updateCounter);
    }

    function updateStats() {
        const realTimeStats = calculateRealTimeStats();
        
        // Only animate projects/clients if they've changed
        const currentProjects = parseInt(document.getElementById('stats-projects').textContent.replace(/,/g, ''));
        const currentClients = parseInt(document.getElementById('stats-clients').textContent.replace(/,/g, ''));
        
        if (currentStats.projects !== currentProjects) {
            animateCounter('stats-projects', currentStats.projects, 2000);
        }
        if (currentStats.clients !== currentClients) {
            animateCounter('stats-clients', currentStats.clients, 2000);
        }
        
        // Always update coffee and hours (since they're time-based)
        animateCounter('stats-coffee', realTimeStats.coffee, 2500);
        animateCounter('stats-hours', realTimeStats.hours, 3000);
    }

    // Initialize counters
    function initializeCounters() {
        // Start all counters from 0
        document.getElementById('stats-projects').textContent = '0';
        document.getElementById('stats-clients').textContent = '0';
        document.getElementById('stats-coffee').textContent = '0';
        document.getElementById('stats-hours').textContent = '0';
        
        // Begin animations after a brief delay
        setTimeout(() => {
            const realTimeStats = calculateRealTimeStats();
            animateCounter('stats-projects', currentStats.projects, 2000);
            animateCounter('stats-clients', currentStats.clients, 2000);
            animateCounter('stats-coffee', realTimeStats.coffee, 2500);
            animateCounter('stats-hours', realTimeStats.hours, 3000);
        }, 500);
    }

    

    // Initialize
    initializeCounters();
    
    // Set up intervals

    const updateInterval = setInterval(updateStats, 60000);
    
    // Clean up on page unload (good practice)
    window.addEventListener('beforeunload', () => {
       
        clearInterval(updateInterval);
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Update the icon
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        // Store preference in localStorage
        localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Dynamic skills - core technologies
    const coreSkills = [
        'HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js',
        'Git', 'Responsive Design', 'Figma', 'UI/UX Principles'
    ];

    const learningSkills = [
        'React Native', 'TypeScript', 'GraphQL', 'Web Accessibility',
        'Performance Optimization', 'Advanced CSS'
    ];

    const skillsContainer = document.getElementById('skills-container');
    const learningContainer = document.getElementById('learning-container');
    
    coreSkills.forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag glow-on-hover';
        tag.textContent = skill;
        tag.style.backgroundColor = `hsl(${Math.random() * 60 + 180}, 70%, 85%)`;
        skillsContainer.appendChild(tag);
    });

    learningSkills.forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag learning-tag glow-on-hover';
        tag.textContent = skill;
        tag.style.backgroundColor = `hsl(${Math.random() * 60 + 240}, 70%, 85%)`;
        learningContainer.appendChild(tag);
    });

    // Form submission with EmailJS (keep only this one)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: contactForm.querySelector('[name="name"]').value,
                email: contactForm.querySelector('[name="email"]').value,
                service: contactForm.querySelector('[name="service"]').value,
                message: contactForm.querySelector('[name="message"]').value
            };
            
            // Send email via EmailJS
            emailjs.send('service_ifsc5qf', 'template_lc2h32s', formData)
                .then(function(response) {
                    // Success message
                    const submitBtn = contactForm.querySelector('.submit-btn');
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.backgroundColor = '#4CAF50';
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                        submitBtn.style.backgroundColor = '';
                        contactForm.reset();
                    }, 3000);
                }, function(error) {
                    alert('Failed to send message. Please try again later.');
                });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Testimonial slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialCount = testimonials.length;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Initialize first testimonial
    showTestimonial(currentTestimonial);
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCount;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('.newsletter-input').value;
            
            if (email) {
                // Here you would typically send the email to your newsletter service
                console.log('Newsletter subscription:', email);
                
                // Show success message
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    }

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    animateOnScroll();
});