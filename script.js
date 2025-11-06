// Main JavaScript file for Web Training Project

// DOM Content Loaded - ensures HTML is loaded before running JS
document.addEventListener('DOMContentLoaded', function() {
    console.log('Web Training Project - JavaScript Loaded!');

    // Initialize all interactive features
    initializeNavigation();
    initializeScrollEffects();
    initializeCodeExamples();
    initializeContactForm();
    initializeThemeToggle();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add active state to clicked link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Smooth scroll behavior (if on same page)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Scroll effects for enhanced UX
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');

    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add shadow on scroll
            if (scrollTop > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            } else {
                navbar.style.boxShadow = '';
            }

            // Hide/show navbar on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop;
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements that should animate in
    document.querySelectorAll('.content-list li, .code-block, .info-box').forEach(el => {
        observer.observe(el);
    });
}

// Interactive code examples
function initializeCodeExamples() {
    // Add copy functionality to code blocks
    document.querySelectorAll('.code-block').forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.textContent = '📋 Copy';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255,255,255,0.2);
            border: none;
            border-radius: 5px;
            color: white;
            padding: 5px 10px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.3s ease;
        `;

        block.style.position = 'relative';
        block.appendChild(copyButton);

        copyButton.addEventListener('click', function() {
            const code = block.querySelector('pre').textContent;
            navigator.clipboard.writeText(code).then(() => {
                const originalText = this.textContent;
                this.textContent = '✅ Copied!';
                this.style.background = 'rgba(0,255,0,0.3)';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'rgba(255,255,255,0.2)';
                }, 2000);
            });
        });
    });

    // Add interactive examples for JavaScript tutorial
    if (document.querySelector('.js-examples')) {
        createJSExamples();
    }
}

// JavaScript interactive examples
function createJSExamples() {
    // Variable demonstration
    const varDemo = document.createElement('div');
    varDemo.className = 'interactive-demo';
    varDemo.innerHTML = `
        <h3>Try JavaScript Variables</h3>
        <input type="text" id="varInput" placeholder="Enter your name" style="margin: 10px; padding: 8px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white;">
        <button id="varButton" style="margin: 10px; padding: 8px 15px; background: linear-gradient(45deg, #ffd700, #ffed4e); border: none; border-radius: 5px; color: #333; cursor: pointer;">Greet Me!</button>
        <p id="varOutput" style="margin: 10px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; min-height: 20px;"></p>
    `;

    const jsExamples = document.querySelector('.js-examples');
    if (jsExamples) {
        jsExamples.appendChild(varDemo);

        // Add event listener
        document.getElementById('varButton').addEventListener('click', function() {
            const name = document.getElementById('varInput').value;
            const output = document.getElementById('varOutput');

            if (name.trim() === '') {
                output.textContent = 'Please enter your name!';
                output.style.color = '#ff6b6b';
            } else {
                output.textContent = `Hello, ${name}! Welcome to JavaScript!`;
                output.style.color = '#fff';
            }
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Theme toggle functionality (for future enhancement)
function initializeThemeToggle() {
    // This could be expanded to toggle between light/dark themes
    // For now, it's a placeholder for future functionality
    console.log('Theme toggle initialized');
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some CSS animations via JavaScript
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .copy-button:hover {
            background: rgba(255,255,255,0.3) !important;
        }

        nav a.active {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Progress tracking for tutorials (localStorage)
function initializeProgressTracking() {
    // Track which tutorial sections have been viewed
    const tutorialPages = ['basics', 'css', 'javascript', 'responsive', 'accessibility'];

    tutorialPages.forEach(page => {
        if (window.location.pathname.includes(page)) {
            localStorage.setItem(`tutorial-${page}-visited`, Date.now());
        }
    });

    // Could display progress on homepage
    updateProgressDisplay();
}

function updateProgressDisplay() {
    const progressContainer = document.querySelector('.tutorial-progress');
    if (progressContainer) {
        const tutorialPages = ['basics', 'css', 'javascript', 'responsive', 'accessibility'];
        let completed = 0;

        tutorialPages.forEach(page => {
            if (localStorage.getItem(`tutorial-${page}-visited`)) {
                completed++;
            }
        });

        const percentage = Math.round((completed / tutorialPages.length) * 100);
        progressContainer.innerHTML = `
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin: 20px 0;">
                <h3>Tutorial Progress</h3>
                <div style="background: rgba(255,255,255,0.2); height: 20px; border-radius: 10px; overflow: hidden;">
                    <div style="background: linear-gradient(45deg, #ffd700, #ffed4e); height: 100%; width: ${percentage}%; transition: width 0.3s ease;"></div>
                </div>
                <p style="margin: 10px 0 0 0;">${completed}/${tutorialPages.length} tutorials completed (${percentage}%)</p>
            </div>
        `;
    }
}

// Initialize progress tracking
initializeProgressTracking();