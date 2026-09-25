/**
 * ============================================================================
 * Reanty - Real Estate Website
 * Main JavaScript Application
 * ============================================================================
 * 
 * This file handles:
 * - Mobile menu toggle
 * - Dynamic data loading from JSON
 * - DOM manipulation and rendering
 * - Interactive UI components
 */

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================
const CONFIG = {
  DATA_PATH: './assets/data/properties.json',
  DEBUG: false
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Safely get an element by ID
 * @param {string} id - Element ID
 * @returns {HTMLElement|null}
 */
function getElement(id) {
  return document.getElementById(id);
}

/**
 * Safely query a selector
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null}
 */
function queryElement(selector) {
  return document.querySelector(selector);
}

/**
 * Log message if debug is enabled
 * @param {string} message - Log message
 * @param {any} data - Optional data to log
 */
function log(message, data = null) {
  if (CONFIG.DEBUG) {
    if (data) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  }
}

// ============================================================================
// MOBILE MENU CONTROLLER
// ============================================================================

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
  const menuBtn = getElement('menu-toggle-btn');
  const mobileNav = getElement('mobile-nav');
  
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      log('Mobile menu toggled');
    });
  }
}

// ============================================================================
// DATA LOADER & RENDERER
// ============================================================================

/**
 * Fetch data from JSON file
 * @returns {Promise<Object>}
 */
async function fetchData() {
  try {
    const response = await fetch(CONFIG.DATA_PATH);
    
    if (!response.ok) {
      throw new Error(`Data fetch failed with status ${response.status}`);
    }
    
    const data = await response.json();
    log('Data loaded successfully:', data);
    return data;
    
  } catch (error) {
    console.warn('⚠️ Could not load data from JSON file:', error.message);
    console.info('💡 Using static HTML content as fallback.');
    console.info('📝 To enable dynamic content, make sure properties.json exists and is accessible.');
    return null;
  }
}

/**
 * Render top bar data
 * @param {Object} topBar - Top bar data from JSON
 */
function renderTopBar(topBar) {
  if (!topBar) return;
  
  // Update email
  const emailEl = queryElement('#top-email span');
  if (emailEl && topBar.email) {
    emailEl.textContent = topBar.email;
  }
  
  // Update address
  const addrEl = queryElement('#top-address span');
  if (addrEl && topBar.address) {
    addrEl.textContent = topBar.address;
  }
  
  // Update social links
  if (topBar.socials && Array.isArray(topBar.socials)) {
    const socialsContainer = getElement('top-socials');
    if (socialsContainer) {
      // Could dynamically render socials here if needed
      log('Social links available:', topBar.socials.length);
    }
  }
}

/**
 * Render hero section data
 * @param {Object} hero - Hero data from JSON
 */
function renderHero(hero) {
  if (!hero) return;
  
  // Update headline
  const headline = getElement('hero-headline');
  if (headline && hero.headline) {
    headline.textContent = hero.headline;
  }
  
  // Update subline
  const subline = getElement('hero-subline');
  if (subline && hero.subline) {
    subline.textContent = hero.subline;
  }
  
  // Update CTA text
  const ctaBtn = getElement('hero-cta-btn');
  if (ctaBtn && hero.ctaText) {
    const ctaSpan = ctaBtn.querySelector('span');
    if (ctaSpan) {
      ctaSpan.textContent = hero.ctaText;
    }
  }
  
  // Update revenue value
  const revenue = getElement('hero-revenue-val');
  if (revenue && hero.revenue) {
    revenue.textContent = hero.revenue;
  }
  
  // Update hero image
  const heroImg = getElement('hero-main-img');
  if (heroImg && hero.heroImage) {
    heroImg.src = hero.heroImage;
  }
}

/**
 * Render guides section
 * @param {Array} guides - Guides data from JSON
 */
function renderGuides(guides) {
  if (!guides || !Array.isArray(guides)) return;
  
  const container = getElement('guides-container');
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Render each guide card
  guides.forEach(guide => {
    const card = document.createElement('div');
    card.className = 'guide-card';
    card.innerHTML = `
      <div class="guide-icon-box">
        <i class="${guide.icon}"></i>
      </div>
      <h3 class="guide-title">${guide.title}</h3>
      <p class="guide-desc">${guide.desc}</p>
    `;
    container.appendChild(card);
  });
  
  log('Rendered guides:', guides.length);
}

/**
 * Render services section
 * @param {Array} services - Services data from JSON
 */
function renderServices(services) {
  if (!services || !Array.isArray(services)) return;
  
  const container = getElement('services-container');
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Render each service card
  services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <div class="service-icon"><i class="${service.icon}"></i></div>
      <h3 class="service-title">${service.title}</h3>
      <p class="service-desc">${service.desc}</p>
      <a class="service-link" href="#">
        <span>Learn more</span>
        <i class="fa-solid fa-arrow-right" style="font-size: 10px;"></i>
      </a>
    `;
    container.appendChild(card);
  });
  
  log('Rendered services:', services.length);
}

/**
 * Render featured properties
 * @param {Array} properties - Properties data from JSON
 */
function renderProperties(properties) {
  if (!properties || !Array.isArray(properties)) return;
  
  const container = getElement('properties-container');
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Render each property card
  properties.forEach(property => {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
      <div class="property-img-bg">
        <img alt="${property.title}" src="${property.image}">
      </div>
      <div class="property-floating-info">
        <h4 class="property-title">${property.title}</h4>
        <p class="property-location">
          <i class="fa-solid fa-location-dot" style="font-size: 10px;"></i> 
          ${property.location}
        </p>
        <div class="property-price ${property.isPrimary ? 'highlight' : ''}">${property.price}</div>
        <button class="property-arrow-btn" aria-label="View property details">
          <i class="fa-solid fa-arrow-right" style="font-size: 12px;"></i>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
  
  log('Rendered properties:', properties.length);
}

/**
 * Render location projects
 * @param {Array} locations - Locations data from JSON
 */
function renderLocations(locations) {
  if (!locations || !Array.isArray(locations)) return;
  
  const container = getElement('locations-container');
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Render each location card
  locations.forEach(location => {
    const card = document.createElement('div');
    card.className = 'location-card';
    card.innerHTML = `
      <img alt="${location.city}" src="${location.image}">
      <div class="location-overlay"></div>
      <h4 class="location-name">${location.city}</h4>
      <a class="location-see-more" href="#">
        <span>See more</span> 
        <i class="fa-solid fa-angle-right" style="font-size: 9px;"></i>
      </a>
    `;
    container.appendChild(card);
  });
  
  log('Rendered locations:', locations.length);
}

/**
 * Render blog posts
 * @param {Array} posts - Blog posts data from JSON
 */
function renderBlog(posts) {
  if (!posts || !Array.isArray(posts)) return;
  
  const container = getElement('blog-container');
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Render each blog card
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      <div class="blog-img-box">
        <img alt="${post.title}" src="${post.image}">
      </div>
      <div class="blog-content">
        <h4 class="blog-title">${post.title}</h4>
        <div class="blog-cat-badge">
          <i class="fa-regular fa-bookmark"></i>
          <span>${post.category}</span>
        </div>
        <p class="blog-excerpt">${post.desc}</p>
        <div class="blog-meta-footer">
          <span><i class="fa-regular fa-calendar"></i> ${post.time}</span>
          <span><i class="fa-regular fa-user"></i> By <span class="text-brand">${post.author}</span></span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
  
  log('Rendered blog posts:', posts.length);
}

/**
 * Render all dynamic data
 * @param {Object} data - Complete data object from JSON
 */
function renderDynamicData(data) {
  if (!data) {
    log('No data to render - using static HTML content');
    console.info('✅ Website is running in static mode (no JSON data needed).');
    return;
  }
  
  // Render each section
  renderTopBar(data.topBar);
  renderHero(data.hero);
  renderGuides(data.guides);
  renderServices(data.services);
  renderProperties(data.featuredProperties);
  renderLocations(data.locationProjects);
  renderBlog(data.blogPosts);
  
  log('All dynamic content rendered successfully');
  console.info('✅ Website loaded with dynamic content from properties.json');
}

// ============================================================================
// FORM HANDLING
// ============================================================================

/**
 * Initialize contact form
 */
function initContactForm() {
  const form = getElement('contact-form');
  
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Cảm ơn bạn đã gửi liên hệ!');
      form.reset();
      log('Contact form submitted');
    });
  }
}

// ============================================================================
// SCROLL SPY FOR NAVIGATION
// ============================================================================

/**
 * Initialize scroll spy for navigation active state
 */
function initScrollSpy() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-menu a');
  // Get sections with id OR data-section attribute
  const allSections = document.querySelectorAll('section[id], section[data-section]');
  
  if (allSections.length === 0) return;
  
  /**
   * Update active navigation state based on scroll position
   */
  function updateActiveNav() {
    // Get current scroll position with offset for header
    const scrollPosition = window.scrollY + 150;
    
    // Get window height for better detection near bottom
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    let currentSection = '';
    
    // Check if we're at the bottom of the page
    if (window.scrollY + windowHeight >= documentHeight - 50) {
      // At bottom, find the last section with id or data-section
      for (let i = allSections.length - 1; i >= 0; i--) {
        const section = allSections[i];
        currentSection = section.getAttribute('id') || section.getAttribute('data-section');
        if (currentSection) break;
      }
    } else {
      // Find which section is currently in view
      allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Section is active if scroll position is within its bounds
        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight) {
          // Prefer id over data-section
          currentSection = section.getAttribute('id') || section.getAttribute('data-section');
        }
      });
    }
    
    // If no section detected and we're near top, default to first section
    if (!currentSection && scrollPosition < 200) {
      const firstSection = allSections[0];
      currentSection = firstSection.getAttribute('id') || firstSection.getAttribute('data-section');
    }
    
    // Update active class on navigation links
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Listen to scroll events with throttling
  let isThrottled = false;
  window.addEventListener('scroll', () => {
    if (!isThrottled) {
      updateActiveNav();
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 100);
    }
  });
  
  // Initial check on page load
  updateActiveNav();
  
  log('Scroll spy initialized');
}

/**
 * Initialize smooth scroll for navigation links
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-menu a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      
      // Only handle hash links
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          event.preventDefault();
          
          // Close mobile menu if open
          const mobileNav = getElement('mobile-nav');
          if (mobileNav && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
          }
          
          // Smooth scroll to target
          const headerOffset = 80;
          const targetPosition = targetSection.offsetTop - headerOffset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          log('Smooth scrolled to:', targetId);
        }
      }
    });
  });
  
  log('Smooth scroll initialized');
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize all application functionality
 */
async function initApp() {
  log('Initializing Reanty application...');
  
  // Initialize UI components
  initMobileMenu();
  initContactForm();
  initScrollSpy();
  initSmoothScroll();
  
  // Load and render data
  const data = await fetchData();
  renderDynamicData(data);
  
  log('Application initialized successfully');
}

// ============================================================================
// APPLICATION ENTRY POINT
// ============================================================================

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', initApp);
