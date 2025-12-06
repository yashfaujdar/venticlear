// ===================================
// Initialize AOS (Animate On Scroll)
// ===================================
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ===================================
// Navigation Functionality
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const subject = encodeURIComponent(`Contact Form Submission from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}`
    );
    
    const mailtoLink = `mailto:aashishdubey@venticlear.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Thank you! Your message has been prepared. Please send it from your email client.');
    
    // Reset form
    contactForm.reset();
});

// ===================================
// Notification Function
// ===================================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #059669, #22c55e);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.5s ease-out;
        max-width: 350px;
        font-family: 'Inter', sans-serif;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// ===================================
// Product Card Animations
// ===================================
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.style.willChange = 'transform, box-shadow';
});

// ===================================
// Smooth Scroll Performance
// ===================================
// Removed parallax effect to prevent scroll lag

// ===================================
// Counter Animation for Stats
// ===================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const text = item.textContent;
                const number = parseFloat(text.replace(/[^0-9.]/g, ''));
                const suffix = text.replace(/[0-9.]/g, '');
                
                if (!isNaN(number)) {
                    item.textContent = '0' + suffix;
                    animateCounter(item, number, 2000);
                    item.textContent = number + suffix;
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// ===================================
// Lazy Loading for Images
// ===================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// Form Validation
// ===================================
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
    }
    
    if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    if (isValid) {
        field.style.borderColor = '#10b981';
        field.classList.remove('error');
    } else {
        field.style.borderColor = '#ef4444';
        field.classList.add('error');
    }
    
    return isValid;
}

// ===================================
// Preloader (Optional)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger animations
    setTimeout(() => {
        AOS.refresh();
    }, 100);
});

// ===================================
// Dynamic Year in Footer
// ===================================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
}

// ===================================
// Keyboard Navigation Accessibility
// ===================================
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    updateActiveNav();
}, 10));

// ===================================
// Product Modal System
// ===================================
const productData = {
    'pre-filter': {
        title: 'PRE FILTER',
        image: 'images/pre filter.jpg',
        description: 'THE FIRST LINE OF DEFENSE AGAINST AIRBORNE CONTAMINANTS',
        specifications: `
            <h3>Technical Specifications</h3>
            <table class="spec-table">
                <tr><th>Filter Class</th><th>MOC</th><th>MERV Rating</th><th>Eurovent Class</th><th>Frame Depth (mm)</th><th>Gasket Thickness (mm)</th></tr>
                <tr><td>G-4</td><td>Al Extrusion</td><td>MERV 8</td><td>EU 4</td><td>25 / 50</td><td>3</td></tr>
            </table>
            <br>
            <table class="spec-table">
                <tr><th>Filter Size (mm)</th><th>CFM</th><th>Efficiency</th><th>IPD (mm WG)</th><th>FPD (mm WG)</th><th>Temp (°C)</th></tr>
                <tr><td>610 x 610 x 50</td><td>2000</td><td>90% @ 10 Micron</td><td>4-5</td><td>13-14</td><td>70-80</td></tr>
                <tr><td>610 x 305 x 50</td><td>1000</td><td>90% @ 10 Micron</td><td>4-5</td><td>13-14</td><td>70-80</td></tr>
                <tr><td>305 x 305 x 50</td><td>500</td><td>90% @ 10 Micron</td><td>4-5</td><td>13-14</td><td>70-80</td></tr>
            </table>
            <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">
                Pre filters serve as the initial stage of filtration in HVAC systems, capturing larger particles 
                such as dust, pollen, and dirt. By preventing these contaminants from reaching finer filters, 
                they enhance efficiency and extend the lifespan of HEPA and fine filters. Commonly used in 
                HVAC systems, food processing plants, malls, and industrial facilities, pre filters help maintain 
                clean air while ensuring optimal system performance and energy efficiency.
            </p>
        `
    },
    'fine-filter': {
        title: 'FINE FILTER',
        image: 'images/fine filter.jpg',
        description: 'PRECISION FILTRATION FOR CLEANER, HEALTHIER AIR',
        specifications: `
            <h3>Technical Specifications</h3>
            <table class="spec-table">
                <tr><th>Filter Class</th><th>MOC</th><th>MERV Rating</th><th>Eurovent Class</th><th>Frame Depth (mm)</th><th>Gasket Thickness (mm)</th></tr>
                <tr><td>F5-F9</td><td>AL / SS / GI</td><td>MERV 9-10/ MERV-14</td><td>EU 5 - EU 9</td><td>150 / 300</td><td>3</td></tr>
            </table>
            <br>
            <table class="spec-table">
                <tr><th>CLASS</th><th>Filter Size (mm)</th><th>CFM</th><th>Micron</th><th>Efficiency</th><th>IPD (mm WG)</th><th>FPD (mm WG)</th><th>Temp (°C)</th></tr>
                <tr><td>F5</td><td>610 x 610 x 300</td><td>2000</td><td>5</td><td>95% @ 5 Micron</td><td>6-7</td><td>20-21</td><td>70-80</td></tr>
                <tr><td>F6</td><td>610 x 610 x 300</td><td>2000</td><td>5</td><td>95% @ 5 Micron</td><td>7-8</td><td>21-22</td><td>70-80</td></tr>
                <tr><td>F7</td><td>610 x 610 x 300</td><td>2000</td><td>3</td><td>95% @ 3 Micron</td><td>8-9</td><td>22-25</td><td>70-80</td></tr>
                <tr><td>F8</td><td>610 x 610 x 300</td><td>2000</td><td>1</td><td>95% @ 1 Micron</td><td>9-10</td><td>25-28</td><td>70-80</td></tr>
                <tr><td>F9</td><td>610 x 610 x 300</td><td>2000</td><td>0.3</td><td>50% @ 0.3 Micron</td><td>10-11</td><td>28-30</td><td>70-80</td></tr>
            </table>
            <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">
                Fine filters are designed to capture smaller particles like mold spores, fine dust, and allergens, providing an extra layer of protection after pre filters. With high efficiency and precision, they contribute to improved indoor air quality in commercial buildings, hospitals, laboratories, and residential buildings, and high-performance HVAC systems. Their superior filtration performance ensures cleaner air circulation, reducing health risks and equipment contamination.
            </p>
        `
    },
    'mini-pleat-filter': {
        title: 'MINI PLEAT FILTER',
        image: 'images/mini pleat.jpg',
        description: 'MAXIMIZED EFFICIENCY WITH MINIMAL AIRFLOW RESISTANCE',
        specifications: `
            <h3>Technical Specifications</h3>
            <table class="spec-table">
                <tr><th>Filter Class</th><th>MOC</th><th>MERV Rating</th><th>Eurovent Class</th><th>Frame Depth (mm)</th><th>Gasket Thickness (mm)</th></tr>
                <tr><td>H13 & H14</td><td>Al Extrusion</td><td>MERV 19</td><td>EU 13 & EU 14</td><td>91 / 105 / 135</td><td>3</td></tr>
            </table>
            <br>
            <table class="spec-table">
                <tr><th>Filter Size (mm)</th><th>CFM</th><th>Micron</th><th>Efficiency</th><th>IPD (mm WG)</th><th>FPD (mm WG)</th><th>Temp (°C)</th></tr>
                <tr><td>610 x 610 x 105</td><td>1000</td><td>0.3</td><td>99.95% @ 0.3 Micron</td><td>25</td><td>60</td><td>70-80</td></tr>
                <tr><td>450 x 450 x 105</td><td>520</td><td>0.3</td><td>99.95% @ 0.3 Micron</td><td>25</td><td>60</td><td>70-80</td></tr>
                <tr><td>305 x 305 x 105</td><td>250</td><td>0.3</td><td>99.95% @ 0.3 Micron</td><td>25</td><td>60</td><td>70-80</td></tr>
            </table>
            <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">
                Mini pleat filters feature an advanced pleated design that maximizes filtration surface area while maintaining low airflow resistance. These filters provide high-efficiency air purification and are widely used in clean rooms, laboratories, hospitals, and pharmaceutical facilities. Their compact design makes them an excellent choice for HVAC systems requiring maximum particle capture without compromising airflow efficiency.
            </p>
        `
    },
    'hepa-filter': {
        title: 'HEPA FILTER',
        image: 'images/hepa filter.jpg',
        description: 'UNCOMPROMISED AIR PURITY FOR CRITICAL ENVIRONMENTS',
        specifications: `
            <h3>Technical Specifications</h3>
            <table class="spec-table">
                <tr><th>Filter Class</th><th>MOC</th><th>MERV Rating</th><th>Eurovent Class</th><th>Frame Depth (mm)</th><th>Gasket Thickness (mm)</th></tr>
                <tr><td>H13 & H14</td><td>Al Anodized</td><td>MERV 19</td><td>EU 13 & EU 14</td><td>150 / 300</td><td>5</td></tr>
            </table>
            <br>
            <table class="spec-table">
                <tr><th>Filter Size (mm)</th><th>CFM</th><th>Micron</th><th>Efficiency</th><th>IPD (mm WG)</th><th>FPD (mm WG)</th><th>Temp (°C)</th></tr>
                <tr><td>610 x 610 x 300</td><td>1000</td><td>0.3</td><td>99.99% @ 0.3 Micron</td><td>25</td><td>60</td><td>70-80</td></tr>
                <tr><td>450 x 450 x 300</td><td>500</td><td>0.3</td><td>99.99% @ 0.3 Micron</td><td>25</td><td>60</td><td>70-80</td></tr>
                <tr><td>305 x 305 x 300</td><td>250</td><td>0.3</td><td>99.99% @ 0.3 Micron</td><td>25</td><td>60</td><td>70-80</td></tr>
            </table>
            <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">
                HEPA (High-Efficiency Particulate Air) filters are essential for environments that require the highest level of air purity. These filters capture at least 99.97% of particles that are 0.3 micrometers or larger, ensuring superior air purification. Designed to meet strict industry standards, HEPA filters are widely used in clean rooms, hospitals, pharmaceutical industries, and high precision manufacturing facilities. They play a critical role in HVAC systems by improving indoor air quality, reducing airborne contaminants, and extending system longevity.
            </p>
        `
    },
    'bag-filter': {
        title: 'BAG FILTER',
        image: 'images/Bag filter.jpg',
        description: 'HIGH-CAPACITY FILTRATION FOR INDUSTRIAL AND COMMERCIAL USE',
        specifications: `
            <h3>Technical Specifications</h3>
            <table class="spec-table">
                <tr><th>Filter Class</th><th>MOC</th><th>MERV Rating</th><th>Eurovent Class</th><th>Frame Depth (mm)</th><th>Gasket Thickness (mm)</th></tr>
                <tr><td>F5-F9</td><td>AL / SS / GI</td><td>MERV 9-10/ MERV-14</td><td>EU 5 - EU 9</td><td>150 / 300</td><td>3</td></tr>
            </table>
            <br>
            <table class="spec-table">
                <tr><th>CLASS</th><th>Filter Size (mm)</th><th>CFM</th><th>Micron</th><th>Efficiency</th><th>IPD (mm WG)</th><th>FPD (mm WG)</th><th>Temp (°C)</th></tr>
                <tr><td>F5</td><td>610 x 610 x 300</td><td>2000</td><td>5</td><td>65% @ 5 Micron</td><td>6-7</td><td>20-21</td><td>70-80</td></tr>
                <tr><td>F6</td><td>610 x 610 x 300</td><td>2000</td><td>5</td><td>65% @ 5 Micron</td><td>7-8</td><td>21-22</td><td>70-80</td></tr>
                <tr><td>F7</td><td>610 x 610 x 300</td><td>2000</td><td>3</td><td>95% @ 3 Micron</td><td>8-9</td><td>22-25</td><td>70-80</td></tr>
                <tr><td>F8</td><td>610 x 610 x 300</td><td>2000</td><td>1</td><td>95% @ 1 Micron</td><td>9-10</td><td>25-28</td><td>70-80</td></tr>
                <tr><td>F9</td><td>610 x 610 x 300</td><td>2000</td><td>0.3</td><td>50% @ 0.3 Micron</td><td>10-11</td><td>28-30</td><td>70-80</td></tr>
            </table>
            <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">
                Bag filters are designed to handle large dust loads and airborne contaminants, making them a preferred choice for industrial HVAC systems, commercial buildings, and large-scale ventilation systems. With high dust-holding capacity and extended service life, these filters ensure sustained efficiency and optimal indoor air quality. Their ability to trap fine particles while maintaining low pressure drop makes them ideal for applications such as manufacturing plants, pharmaceutical facilities, and high-traffic public spaces.
            </p>
        `
    },
    'filter-module': {
        title: 'FILTER MODULE',
        image: 'images/filter housing.jpg',
        description: 'The Filter Module is a high-efficiency terminal filtration system designed to deliver clean, particle-free air in controlled environments. Engineered for compatibility with a variety of ceiling grids and ducted systems, this module supports HEPA or ULPA filters to meet the most stringent air quality requirements in cleanrooms, pharmaceutical facilities, and hospitals.',
        specifications: `
            <h3>Technical Specifications</h3>
            <table class="spec-table">
                <tr><th>Parameter</th><th>Details</th></tr>
                <tr><td>Frame</td><td>Aluminium Powder Coated / SS-304</td></tr>
                <tr><td>Duct Connection</td><td>Rectangular Connection</td></tr>
                <tr><td>Air Entry</td><td>Side & Top</td></tr>
                <tr><td>Housing Type</td><td>Box & Flange type with DOP & FOG port, with bottom control damper</td></tr>
                <tr><td>Coil Material (MOC)</td><td>SS304/316</td></tr>
                <tr><td>Standard Grid Size</td><td>734x734, 574x574, etc.</td></tr>
                <tr><td>Standard Housing Size</td><td>700x700, 540x540, etc.</td></tr>
            </table>
            <br>
            <h3>APPLICATIONS</h3>
            <ul style="margin-left: 20px; color: #666;">
                <li>Cleanrooms (ISO 5 to ISO 8)</li>
                <li>Operation Theatres and ICUs</li>
                <li>Pharmaceutical manufacturing</li>
                <li>Microelectronics and semiconductor production</li>
            </ul>
        `
    },
    'bibo-system': {
        title: 'BIBO SYSTEM',
        image: 'images/bibo.jpeg',
        description: 'Safe, contained solutions for hazardous environments. Bag-in/bag-out technology for maximum safety.',
        specifications: `
            <h3>Technical Specifications</h3>
            <p>Detailed specifications for BIBO Systems will be available soon.</p>
        `
    }
};

function openProductModal(productId) {
    const product = productData[productId];
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalSpecifications = document.getElementById('modalSpecifications');
    
    modalTitle.textContent = product.title;
    modalImage.src = product.image;
    modalImage.alt = product.title;
    modalDescription.textContent = product.description;
    modalSpecifications.innerHTML = product.specifications;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeProductModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProductModal);
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeProductModal();
        }
    });
});

// ===================================
// Console Message
// ===================================
console.log('%c Venticlear Website ', 'background: #059669; color: white; font-size: 20px; padding: 10px;');
console.log('%c Excellence in Every Breath. ', 'color: #059669; font-size: 14px;');

// ===================================
// Service Worker Registration (for PWA - Optional)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(err => console.log('SW registration failed'));
    });
}
