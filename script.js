// Main JavaScript file for Web Training Project
// Enhanced with advanced features for a complete learning experience

// Global state management
const AppState = {
    theme: localStorage.getItem('theme') || 'light',
    searchIndex: null,
    performance: {
        startTime: Date.now(),
        pageLoads: 0,
        interactions: 0
    }
};

// DOM Content Loaded - ensures HTML is loaded before running JS
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Web Training Project - Enhanced JavaScript Loaded!');

    // Initialize all features in order
    initializeCoreFeatures();
    initializeAdvancedFeatures();
    initializePerformanceMonitoring();
});

// Core features initialization
function initializeCoreFeatures() {
    initializeNavigation();
    initializeScrollEffects();
    initializeCodeExamples();
    initializeContactForm();
    initializeThemeToggle();
    initializeProgressTracking();
}

// Advanced features initialization
function initializeAdvancedFeatures() {
    initializeSearch();
    initializeKeyboardShortcuts();
    initializeSocialSharing();
    initializeQuizzes();
    initializeCodePlayground();
    initializePrintStyles();
    initializeServiceWorker();
}

// ===== SERVICE WORKER & PWA =====

function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registered:', registration.scope);

                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch(error => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        });

        // Listen for controller change (new SW activated)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }
}

function showUpdateNotification() {
    const updateBanner = document.createElement('div');
    updateBanner.id = 'update-banner';
    updateBanner.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; background: linear-gradient(45deg, #ff6b6b, #ffa500);
        color: white; padding: 10px; text-align: center; z-index: 3000; font-weight: bold;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    updateBanner.innerHTML = `
        🎉 New version available!
        <button onclick="window.location.reload()" style="background: white; color: #ff6b6b; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-left: 10px; font-weight: bold;">Update Now</button>
        <button onclick="this.parentElement.remove()" style="background: transparent; color: white; border: none; margin-left: 10px; cursor: pointer; text-decoration: underline;">Dismiss</button>
    `;

    document.body.appendChild(updateBanner);
}

// ===== ADVANCED FEATURES =====

// Search functionality
function initializeSearch() {
    // Create search interface
    const searchContainer = document.createElement('div');
    searchContainer.id = 'search-container';
    searchContainer.innerHTML = `
        <div id="search-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; backdrop-filter: blur(5px);">
            <div style="position: absolute; top: 20%; left: 50%; transform: translateX(-50%); width: 90%; max-width: 600px;">
                <input type="text" id="search-input" placeholder="Search tutorials, topics, code..." style="width: 100%; padding: 15px; font-size: 18px; border: none; border-radius: 10px; background: rgba(255,255,255,0.9); color: #333;" autocomplete="off">
                <div id="search-results" style="background: rgba(255,255,255,0.95); border-radius: 10px; margin-top: 10px; max-height: 400px; overflow-y: auto; display: none;"></div>
                <button id="close-search" style="position: absolute; top: -10px; right: -10px; background: #ff4757; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-size: 18px;">×</button>
            </div>
        </div>
        <button id="search-toggle" style="position: fixed; bottom: 20px; right: 20px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; font-size: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 999;">🔍</button>
    `;

    document.body.appendChild(searchContainer);

    // Search functionality
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const closeSearch = document.getElementById('close-search');

    // Build search index
    buildSearchIndex();

    searchToggle.addEventListener('click', () => {
        searchOverlay.style.display = 'block';
        searchInput.focus();
    });

    closeSearch.addEventListener('click', () => {
        searchOverlay.style.display = 'none';
        searchInput.value = '';
        searchResults.style.display = 'none';
    });

    searchInput.addEventListener('input', debounce(performSearch, 300));
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearch.click();
        }
    });
}

function buildSearchIndex() {
    // Simple search index for demo purposes
    AppState.searchIndex = {
        'html': ['basics.html', 'HTML Fundamentals'],
        'css': ['css.html', 'CSS Styling'],
        'javascript': ['javascript.html', 'JavaScript Fundamentals'],
        'responsive': ['responsive.html', 'Responsive Design'],
        'accessibility': ['accessibility.html', 'Web Accessibility'],
        'flexbox': ['css.html', 'CSS Flexbox'],
        'grid': ['css.html', 'CSS Grid'],
        'variables': ['javascript.html', 'JavaScript Variables'],
        'functions': ['javascript.html', 'JavaScript Functions'],
        'media queries': ['responsive.html', 'CSS Media Queries'],
        'semantic html': ['accessibility.html', 'Semantic HTML'],
        'aria': ['accessibility.html', 'ARIA Attributes']
    };
}

function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const resultsDiv = document.getElementById('search-results');

    if (query.length < 2) {
        resultsDiv.style.display = 'none';
        return;
    }

    const results = [];
    for (const [term, data] of Object.entries(AppState.searchIndex)) {
        if (term.includes(query)) {
            results.push({ term, page: data[0], title: data[1] });
        }
    }

    if (results.length > 0) {
        resultsDiv.innerHTML = results.map(result => `
            <div style="padding: 10px; border-bottom: 1px solid #eee; cursor: pointer;" onclick="window.location.href='${result.page}'">
                <strong>${result.title}</strong><br>
                <small style="color: #666;">Found in: ${result.term}</small>
            </div>
        `).join('');
        resultsDiv.style.display = 'block';
    } else {
        resultsDiv.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">No results found</div>';
        resultsDiv.style.display = 'block';
    }
}

// Keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K: Open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('search-toggle').click();
        }

        // Ctrl/Cmd + /: Show shortcuts help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            showKeyboardShortcuts();
        }

        // Escape: Close modals/overlays
        if (e.key === 'Escape') {
            const searchOverlay = document.getElementById('search-overlay');
            if (searchOverlay && searchOverlay.style.display === 'block') {
                document.getElementById('close-search').click();
            }
        }
    });
}

function showKeyboardShortcuts() {
    const shortcuts = [
        { keys: 'Ctrl/Cmd + K', action: 'Open search' },
        { keys: 'Ctrl/Cmd + /', action: 'Show shortcuts' },
        { keys: 'Escape', action: 'Close modals' },
        { keys: 'Tab', action: 'Navigate focusable elements' }
    ];

    const shortcutsHTML = shortcuts.map(shortcut => `
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <span>${shortcut.action}</span>
            <kbd style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 3px; font-family: monospace;">${shortcut.keys}</kbd>
        </div>
    `).join('');

    showNotification(`
        <h3 style="margin-top: 0;">Keyboard Shortcuts</h3>
        ${shortcutsHTML}
    `, 5000);
}

// Social sharing
function initializeSocialSharing() {
    // Add share buttons to tutorial pages
    if (window.location.pathname.includes('tutorial') || window.location.pathname.includes('.html')) {
        const shareContainer = document.createElement('div');
        shareContainer.id = 'share-container';
        shareContainer.innerHTML = `
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin: 20px 0; text-align: center;">
                <h4 style="margin: 0 0 10px 0;">Share this tutorial</h4>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="shareOnTwitter()" style="background: #1da1f2; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">🐦 Twitter</button>
                    <button onclick="shareOnLinkedIn()" style="background: #0077b5; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">💼 LinkedIn</button>
                    <button onclick="shareOnFacebook()" style="background: #1877f2; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">📘 Facebook</button>
                    <button onclick="copyPageLink()" style="background: #28a745; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">🔗 Copy Link</button>
                </div>
            </div>
        `;

        // Insert after the main heading
        const mainHeading = document.querySelector('h1');
        if (mainHeading && mainHeading.nextElementSibling) {
            mainHeading.parentNode.insertBefore(shareContainer, mainHeading.nextElementSibling);
        }
    }
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this ${document.title} tutorial!`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function copyPageLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showNotification('✅ Link copied to clipboard!', 2000);
    });
}

// Interactive quizzes
function initializeQuizzes() {
    // Add quiz functionality to tutorial pages
    const quizData = {
        'basics': {
            title: 'HTML & CSS Basics Quiz',
            questions: [
                {
                    question: 'What does HTML stand for?',
                    options: ['HyperText Markup Language', 'High Tech Modern Language', 'Hyperlink and Text Markup Language'],
                    correct: 0
                },
                {
                    question: 'Which CSS property is used to change text color?',
                    options: ['font-color', 'text-color', 'color'],
                    correct: 2
                }
            ]
        },
        'javascript': {
            title: 'JavaScript Fundamentals Quiz',
            questions: [
                {
                    question: 'Which keyword is used to declare a variable in JavaScript?',
                    options: ['var', 'let', 'const', 'All of the above'],
                    correct: 3
                },
                {
                    question: 'What does DOM stand for?',
                    options: ['Document Object Model', 'Data Object Management', 'Dynamic Object Method'],
                    correct: 0
                }
            ]
        }
    };

    // Add quiz button to relevant pages
    const pageName = window.location.pathname.split('/').pop().replace('.html', '');
    if (quizData[pageName]) {
        const quizButton = document.createElement('button');
        quizButton.textContent = '🧠 Take Quiz';
        quizButton.style.cssText = `
            background: linear-gradient(45deg, #ff6b6b, #ffa500);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            margin: 20px 0;
            box-shadow: 0 4px 15px rgba(255,107,107,0.3);
        `;

        quizButton.addEventListener('click', () => showQuiz(quizData[pageName]));

        // Add after the last content section
        const contentSections = document.querySelectorAll('h2');
        if (contentSections.length > 0) {
            const lastSection = contentSections[contentSections.length - 1];
            lastSection.parentNode.insertBefore(quizButton, lastSection.nextElementSibling);
        }
    }
}

function showQuiz(quizData) {
    let currentQuestion = 0;
    let score = 0;

    const quizModal = document.createElement('div');
    quizModal.id = 'quiz-modal';
    quizModal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); z-index: 2000; display: flex;
        align-items: center; justify-content: center; backdrop-filter: blur(5px);
    `;

    function renderQuestion() {
        const question = quizData.questions[currentQuestion];
        quizModal.innerHTML = `
            <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 20px; max-width: 500px; width: 90%;">
                <h2 style="margin-top: 0; color: white;">${quizData.title}</h2>
                <h3 style="color: white;">Question ${currentQuestion + 1}/${quizData.questions.length}</h3>
                <p style="color: white; font-size: 18px; margin: 20px 0;">${question.question}</p>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${question.options.map((option, index) => `
                        <button class="quiz-option" data-index="${index}" style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 12px; border-radius: 8px; cursor: pointer; text-align: left; transition: all 0.3s ease;">${option}</button>
                    `).join('')}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <span style="color: rgba(255,255,255,0.7);">Score: ${score}/${quizData.questions.length}</span>
                </div>
            </div>
        `;

        // Add event listeners to options
        document.querySelectorAll('.quiz-option').forEach(button => {
            button.addEventListener('click', function() {
                const selectedIndex = parseInt(this.dataset.index);
                const correct = question.correct === selectedIndex;

                if (correct) {
                    score++;
                    this.style.background = 'rgba(0,255,0,0.3)';
                    this.style.borderColor = '#00ff00';
                } else {
                    this.style.background = 'rgba(255,0,0,0.3)';
                    this.style.borderColor = '#ff0000';
                    // Highlight correct answer
                    document.querySelectorAll('.quiz-option')[question.correct].style.background = 'rgba(0,255,0,0.3)';
                    document.querySelectorAll('.quiz-option')[question.correct].style.borderColor = '#00ff00';
                }

                // Disable all options
                document.querySelectorAll('.quiz-option').forEach(btn => btn.disabled = true);

                setTimeout(() => {
                    currentQuestion++;
                    if (currentQuestion < quizData.questions.length) {
                        renderQuestion();
                    } else {
                        showQuizResults();
                    }
                }, 1500);
            });
        });
    }

    function showQuizResults() {
        const percentage = Math.round((score / quizData.questions.length) * 100);
        quizModal.innerHTML = `
            <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 20px; max-width: 500px; width: 90%; text-align: center;">
                <h2 style="margin-top: 0; color: white;">Quiz Complete!</h2>
                <div style="font-size: 48px; margin: 20px 0; color: ${percentage >= 70 ? '#00ff00' : '#ffa500'};">${percentage}%</div>
                <p style="color: white; font-size: 18px;">You scored ${score} out of ${quizData.questions.length}</p>
                <p style="color: rgba(255,255,255,0.7);">${percentage >= 70 ? 'Great job! 🎉' : 'Keep learning! 📚'}</p>
                <button onclick="document.body.removeChild(this.closest('#quiz-modal'))" style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer; font-size: 16px; margin-top: 20px;">Close</button>
            </div>
        `;
    }

    document.body.appendChild(quizModal);
    renderQuestion();
}

// Code playground
function initializeCodePlayground() {
    // Add code playground to JavaScript tutorial
    if (document.querySelector('.js-examples')) {
        const playground = document.createElement('div');
        playground.className = 'code-playground';
        playground.innerHTML = `
            <h3>🎮 Code Playground</h3>
            <p>Try out JavaScript code live!</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                <div>
                    <h4>Code Editor</h4>
                    <textarea id="code-editor" style="width: 100%; height: 200px; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white; font-family: 'Courier New', monospace; resize: vertical;" placeholder="Enter your JavaScript code here...">// Example: Hello World
console.log('Hello, Web Development!');

// Try some code:
const name = 'Student';
const greeting = \`Welcome, \${name}!\`;
console.log(greeting);</textarea>
                    <button id="run-code" style="margin-top: 10px; background: linear-gradient(45deg, #00ff00, #009900); color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">▶️ Run Code</button>
                </div>
                <div>
                    <h4>Output</h4>
                    <div id="code-output" style="width: 100%; height: 200px; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(0,0,0,0.8); color: #00ff00; font-family: 'Courier New', monospace; overflow-y: auto; white-space: pre-wrap;"></div>
                </div>
            </div>
        `;

        document.querySelector('.js-examples').appendChild(playground);

        // Add event listener
        document.getElementById('run-code').addEventListener('click', function() {
            const code = document.getElementById('code-editor').value;
            const output = document.getElementById('code-output');

            // Clear previous output
            output.textContent = '';

            // Capture console.log
            const originalLog = console.log;
            let logs = [];

            console.log = function(...args) {
                logs.push(args.join(' '));
                originalLog.apply(console, args);
            };

            try {
                // Execute the code
                eval(code);
                output.textContent = logs.join('\n') || 'Code executed successfully! (no console output)';
                output.style.color = '#00ff00';
            } catch (error) {
                output.textContent = `Error: ${error.message}`;
                output.style.color = '#ff4757';
            }

            // Restore console.log
            console.log = originalLog;
        });
    }
}

// Print styles
function initializePrintStyles() {
    const printStyles = document.createElement('style');
    printStyles.media = 'print';
    printStyles.textContent = `
        @media print {
            body {
                background: white !important;
                color: black !important;
            }

            nav, .copy-button, .interactive-demo, #search-container,
            .tutorial-progress, footer {
                display: none !important;
            }

            .code-block {
                background: #f5f5f5 !important;
                border: 1px solid #ccc !important;
                color: black !important;
                page-break-inside: avoid;
            }

            h1, h2, h3 {
                color: black !important;
                page-break-after: avoid;
            }

            .content-list li {
                background: transparent !important;
                border: none !important;
                page-break-inside: avoid;
            }

            a {
                color: blue !important;
                text-decoration: underline !important;
            }

            .info-box {
                background: #f0f0f0 !important;
                border: 1px solid #ccc !important;
                color: black !important;
            }
        }
    `;
    document.head.appendChild(printStyles);
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Track page load performance
    window.addEventListener('load', function() {
        const loadTime = Date.now() - AppState.performance.startTime;
        console.log(`📊 Page loaded in ${loadTime}ms`);

        // Track user interactions
        document.addEventListener('click', () => AppState.performance.interactions++);
        document.addEventListener('keydown', () => AppState.performance.interactions++);

        // Send anonymous usage data (in a real app, this would be opt-in)
        setInterval(() => {
            if (AppState.performance.interactions > 0) {
                console.log(`📈 Session stats: ${AppState.performance.interactions} interactions`);
            }
        }, 30000); // Every 30 seconds
    });

    // Monitor for performance issues
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 100) { // Log slow operations
                        console.warn(`🐌 Slow operation: ${entry.name} took ${entry.duration}ms`);
                    }
                }
            });
            observer.observe({ entryTypes: ['measure'] });
        } catch (e) {
            console.log('Performance monitoring not fully supported');
        }
    }
}

// Utility function for notifications
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.8);
        color: white; padding: 15px 20px; border-radius: 10px; z-index: 3000;
        backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);
        max-width: 300px; font-size: 14px; line-height: 1.4;
    `;
    notification.innerHTML = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, duration);
}

// Enhanced theme toggle with actual functionality
function initializeThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = AppState.theme === 'dark' ? '☀️' : '🌙';
    themeToggle.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: rgba(255,255,255,0.2);
        border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer;
        font-size: 18px; z-index: 998; backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    `;
    themeToggle.title = 'Toggle theme';

    document.body.appendChild(themeToggle);

    // Apply initial theme
    applyTheme(AppState.theme);

    themeToggle.addEventListener('click', function() {
        AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', AppState.theme);
        applyTheme(AppState.theme);
        this.innerHTML = AppState.theme === 'dark' ? '☀️' : '🌙';
    });
}

function applyTheme(theme) {
    const root = document.documentElement;

    if (theme === 'dark') {
        root.style.setProperty('--bg-color', '#1a1a1a');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--card-bg', 'rgba(255,255,255,0.05)');
        root.style.setProperty('--border-color', 'rgba(255,255,255,0.1)');
    } else {
        root.style.setProperty('--bg-color', '#f4f4f4');
        root.style.setProperty('--text-color', '#333333');
        root.style.setProperty('--card-bg', 'rgba(255,255,255,0.9)');
        root.style.setProperty('--border-color', 'rgba(0,0,0,0.1)');
    }

    document.body.style.background = theme === 'dark'
        ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
        : 'linear-gradient(135deg, #decc69 0%, #d09848 100%)';
}

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