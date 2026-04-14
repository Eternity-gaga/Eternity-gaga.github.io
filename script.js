// ========================================
// Smooth Scroll Navigation
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Active Navigation Highlighting
    // ========================================

    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Run on scroll
    window.addEventListener('scroll', highlightActiveSection);
    
    // Run on page load
    highlightActiveSection();

    // ========================================
    // Navbar Background on Scroll
    // ========================================

    const navbar = document.querySelector('.navbar');
    
    function updateNavbarOnScroll() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }
    }

    window.addEventListener('scroll', updateNavbarOnScroll);

    // ========================================
    // Fade-in Animation on Scroll
    // ========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in to publication and project items
    const animatedElements = document.querySelectorAll('.publication-item, .project-item, .education-card, .skill-category');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });

    // ========================================
    // Mobile Menu Toggle (for future enhancement)
    // ========================================

    // This can be enhanced later if a hamburger menu is added for mobile
    function createMobileMenu() {
        const nav = document.querySelector('.navbar .container');
        const menu = document.querySelector('.nav-menu');
        
        // Check if window width is mobile
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.menu-toggle')) {
                const toggleButton = document.createElement('button');
                toggleButton.className = 'menu-toggle';
                toggleButton.innerHTML = '☰';
                toggleButton.style.cssText = `
                    display: block;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--text-primary);
                `;
                
                nav.insertBefore(toggleButton, menu);
                
                toggleButton.addEventListener('click', function() {
                    menu.classList.toggle('mobile-open');
                });
            }
        }
    }

    // ========================================
    // Scroll to Top Button (Optional)
    // ========================================

    function createScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 999;
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    createScrollToTopButton();

    // ========================================
    // Copy Email to Clipboard
    // ========================================

    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.href.replace('mailto:', '');
            
            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(function() {
                    // Show a temporary tooltip
                    const tooltip = document.createElement('span');
                    tooltip.textContent = 'Email copied!';
                    tooltip.style.cssText = `
                        position: absolute;
                        background-color: #10b981;
                        color: white;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        font-size: 0.875rem;
                        margin-left: 1rem;
                        animation: fadeOut 2s forwards;
                    `;
                    
                    link.parentElement.style.position = 'relative';
                    link.parentElement.appendChild(tooltip);
                    
                    setTimeout(() => {
                        tooltip.remove();
                    }, 2000);
                });
            }
        });
    });

    // Add CSS animation for tooltip
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // Print Functionality
    // ========================================

    // Add print button if needed
    function addPrintButton() {
        const printBtn = document.createElement('button');
        printBtn.textContent = 'Print CV';
        printBtn.className = 'btn btn-secondary print-btn';
        printBtn.style.cssText = `
            position: fixed;
            top: 6rem;
            right: 2rem;
            z-index: 999;
        `;
        
        printBtn.addEventListener('click', function() {
            window.print();
        });
        
        // Uncomment to add print button
        // document.body.appendChild(printBtn);
    }

    // ========================================
    // Performance: Lazy Loading Images
    // ========================================

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
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

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // Console Easter Egg
    // ========================================

    console.log('%cWelcome to Jiayi Kuang\'s Academic Homepage!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%cInterested in collaboration? Feel free to reach out!', 'color: #64748b; font-size: 14px;');
    console.log('%c📧 kuangjy6@mail2.sysu.edu.cn', 'color: #2563eb; font-size: 14px;');
});
