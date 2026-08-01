/* QuickCloud - Main JavaScript */

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(() => preloader.remove(), 600);
  }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  // Scroll top button
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    scrollTop.classList.toggle('visible', window.scrollY > 300);
  }
});

// Scroll to top
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    }
  });
}

// Login Modal
const loginModal = document.getElementById('loginModal');
const openLoginBtns = document.querySelectorAll('[data-modal="login"]');
const closeModal = document.querySelector('.modal-close');

openLoginBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (loginModal) loginModal.classList.add('active');
  });
});

if (closeModal) {
  closeModal.addEventListener('click', () => {
    loginModal.classList.remove('active');
  });
}

if (loginModal) {
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.classList.remove('active');
  });
}

// Modal tabs
const modalTabs = document.querySelectorAll('.modal-tab');
modalTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    modalTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.modal-tab-content').forEach(c => {
      c.style.display = c.id === target ? 'block' : 'none';
    });
  });
});

// Animate on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Counting animation
function animateCount(el, end, duration = 2000) {
  const start = 0;
  const increment = end / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    const suffix = el.dataset.suffix || '';
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const end = parseInt(entry.target.dataset.count);
      animateCount(entry.target, end);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

// Pricing toggle
const pricingToggle = document.querySelector('.toggle-switch');
if (pricingToggle) {
  let isYearly = false;
  pricingToggle.addEventListener('click', () => {
    isYearly = !isYearly;
    pricingToggle.classList.toggle('yearly', isYearly);

    document.querySelectorAll('.price-value').forEach(el => {
      const monthly = parseInt(el.dataset.monthly);
      const yearly = parseInt(el.dataset.yearly);
      el.textContent = '$' + (isYearly ? yearly : monthly);
    });

    document.querySelectorAll('.price-period').forEach(el => {
      el.textContent = isYearly ? '/year' : '/month';
    });

    document.querySelectorAll('.toggle-label').forEach((el, i) => {
      el.classList.toggle('active', i === (isYearly ? 1 : 0));
    });
  });
}

// Domain search
const domainForm = document.querySelector('.search-form');
if (domainForm) {
  domainForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = domainForm.querySelector('input');
    const val = input.value.trim();
    if (val) {
      alert(`Searching for domain: ${val}\nThis is a demo. Please contact us to register!`);
    }
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
