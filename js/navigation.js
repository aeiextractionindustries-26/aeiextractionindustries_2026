/**
 * AEI EXTRACTION INDUSTRIES PRIVATE LIMITED
 * Navigation, Sticky Header, Mobile Drawer & Back-to-Top — js/navigation.js
 * Pure Vanilla JavaScript (ES6+)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.primary-nav');
    const mobileBackdrop = document.querySelector('.mobile-backdrop');
    const dropdownItem = document.querySelector('.nav-item--dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle-btn');
    const backToTopBtn = document.querySelector('.back-to-top');

    // 1. Sticky Header State & Back-to-Top Visibility
    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;

      if (header) {
        if (scrollY > 36) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      }

      if (backToTopBtn) {
        if (scrollY > 420) {
          backToTopBtn.classList.add('is-visible');
        } else {
          backToTopBtn.classList.remove('is-visible');
        }
      }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Mobile Navigation Drawer
    function closeMobileNav() {
      if (!mobileToggle || !primaryNav) return;
      mobileToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      if (mobileBackdrop) {
        mobileBackdrop.classList.remove('is-active');
      }
      if (dropdownItem) {
        dropdownItem.classList.remove('is-open');
      }
      if (dropdownToggle) {
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    }

    function openMobileNav() {
      if (!mobileToggle || !primaryNav) return;
      mobileToggle.setAttribute('aria-expanded', 'true');
      primaryNav.classList.add('is-open');
      document.body.classList.add('nav-open');
      if (mobileBackdrop) {
        mobileBackdrop.classList.add('is-active');
      }
    }

    if (mobileToggle && primaryNav) {
      mobileToggle.addEventListener('click', function () {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMobileNav);
    }

    // 3. Products Dropdown (Mobile Accordion & Desktop Keyboard Support)
    if (dropdownItem && dropdownToggle) {
      dropdownToggle.addEventListener('click', function (event) {
        const isMobileViewport = window.innerWidth <= 1024;
        if (isMobileViewport) {
          event.preventDefault();
          const isOpen = dropdownItem.classList.toggle('is-open');
          dropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
      });

      dropdownToggle.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          if (window.innerWidth <= 1024) {
            event.preventDefault();
            const isOpen = dropdownItem.classList.toggle('is-open');
            dropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          }
        }
      });
    }

    // Close menus on Escape key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMobileNav();
        if (dropdownItem) {
          dropdownItem.classList.remove('is-open');
        }
      }
    });

    // Reset mobile drawer on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024 && primaryNav && primaryNav.classList.contains('is-open')) {
        closeMobileNav();
      }
    });

    // 4. Active Navigation Link Highlighting Across Multi-Page URLs
    const normalizePath = function (path) {
      return path.replace(/\/+$/, '') || '/';
    };
    const currentPath = normalizePath(window.location.pathname);
    const productDetailPages = [
      '/products/biomass-pellets',
      '/products/soap-grade-oil',
      '/products/tannin',
      '/products/cashew-catechin'
    ];

    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      const cleanHref = normalizePath(new URL(href, window.location.href).pathname);

      if (cleanHref === currentPath) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }

      if (
        link.classList.contains('dropdown-toggle-btn') &&
        productDetailPages.indexOf(currentPath) !== -1
      ) {
        link.classList.add('is-active');
      }
    });

    // 5. Back to Top Smooth Action
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function () {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
          top: 0,
          behavior: prefersReduced ? 'auto' : 'smooth'
        });
      });
    }
  });
})();
