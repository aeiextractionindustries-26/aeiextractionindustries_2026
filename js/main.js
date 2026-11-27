/**
 * AEI EXTRACTION INDUSTRIES PRIVATE LIMITED
 * Scroll Reveal, FAQ Accordion, Filter Tabs & Facility Lightbox — js/main.js
 * Pure Vanilla JavaScript (ES6+)
 */

(function () {
  'use strict';

  // Enable progressive animation hooks immediately
  document.documentElement.classList.add('js-enabled');

  document.addEventListener('DOMContentLoaded', function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Intersection Observer Scroll Reveal
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length > 0) {
      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach(function (el) {
          el.classList.add('is-revealed');
        });
      } else {
        const revealObserver = new IntersectionObserver(
          function (entries, observer) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
              }
            });
          },
          {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.12
          }
        );

        revealElements.forEach(function (el) {
          revealObserver.observe(el);
        });
      }
    }

    // 2. FAQ Accordion Component
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      const trigger = item.querySelector('.faq-trigger');
      const panel = item.querySelector('.faq-panel');
      if (!trigger || !panel) return;

      // Initialize pre-opened FAQ item if marked
      if (item.classList.contains('is-open')) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        trigger.setAttribute('aria-expanded', 'false');
      }

      trigger.addEventListener('click', function () {
        const isCurrentlyOpen = item.classList.contains('is-open');

        // Close sibling items in the same FAQ list for clean reading
        const parentList = item.closest('.faq-list');
        if (parentList) {
          parentList.querySelectorAll('.faq-item.is-open').forEach(function (openSibling) {
            if (openSibling !== item) {
              openSibling.classList.remove('is-open');
              const sibTrigger = openSibling.querySelector('.faq-trigger');
              const sibPanel = openSibling.querySelector('.faq-panel');
              if (sibTrigger) sibTrigger.setAttribute('aria-expanded', 'false');
              if (sibPanel) sibPanel.style.maxHeight = '0px';
            }
          });
        }

        if (isCurrentlyOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = '0px';
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });

    // Recalculate open FAQ height on resize
    window.addEventListener('resize', function () {
      document.querySelectorAll('.faq-item.is-open .faq-panel').forEach(function (panel) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      });
    });

    // 3. Category Filter Tabs (Products Overview & Infrastructure Gallery)
    const filterBars = document.querySelectorAll('[data-filter-bar]');
    filterBars.forEach(function (bar) {
      const targetGroup = bar.getAttribute('data-filter-bar');
      const buttons = bar.querySelectorAll('.filter-btn');
      const items = document.querySelectorAll('[data-filter-group="' + targetGroup + '"]');

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const filterValue = btn.getAttribute('data-filter');

          buttons.forEach(function (b) {
            b.classList.remove('is-active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('is-active');
          btn.setAttribute('aria-pressed', 'true');

          items.forEach(function (item) {
            const category = item.getAttribute('data-category') || '';
            if (filterValue === 'all' || category.indexOf(filterValue) !== -1) {
              item.style.display = '';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    });

    // 4. Industrial Photograph Lightbox Viewer
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    if (lightboxTriggers.length > 0) {
      let modal = document.querySelector('.lightbox-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.className = 'lightbox-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Facility Photograph Viewer');
        modal.innerHTML =
          '<div class="lightbox-content">' +
          '  <button type="button" class="lightbox-close" aria-label="Close image preview">Close [ESC]</button>' +
          '  <img alt="" id="lightbox-img">' +
          '  <div class="lightbox-caption-bar">' +
          '    <span class="lightbox-title" id="lightbox-caption"></span>' +
          '    <span class="frame-caption-code">AEI EXTRACTION INDUSTRIES</span>' +
          '  </div>' +
          '</div>';
        document.body.appendChild(modal);
      }

      const lightboxImg = modal.querySelector('#lightbox-img');
      const lightboxCaption = modal.querySelector('#lightbox-caption');
      const lightboxClose = modal.querySelector('.lightbox-close');

      function closeLightbox() {
        modal.classList.remove('is-active');
        document.body.classList.remove('lightbox-open');
      }

      lightboxTriggers.forEach(function (card) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        function openCardLightbox() {
          const img = card.querySelector('img');
          if (!img) return;
          const titleEl = card.querySelector('.gallery-card-title');
          const captionText = titleEl ? titleEl.textContent : img.getAttribute('alt') || '';

          lightboxImg.setAttribute('src', img.getAttribute('src'));
          lightboxImg.setAttribute('alt', img.getAttribute('alt') || captionText);
          lightboxCaption.textContent = captionText;

          modal.classList.add('is-active');
          document.body.classList.add('lightbox-open');
          lightboxClose.focus();
        }

        card.addEventListener('click', openCardLightbox);
        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openCardLightbox();
          }
        });
      });

      lightboxClose.addEventListener('click', closeLightbox);
      modal.addEventListener('click', function (e) {
        if (e.target === modal) {
          closeLightbox();
        }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('is-active')) {
          closeLightbox();
        }
      });
    }

    // 5. Dynamic Copyright Year
    const yearNodes = document.querySelectorAll('[data-current-year]');
    const currentYear = new Date().getFullYear();
    yearNodes.forEach(function (node) {
      node.textContent = String(currentYear);
    });
  });
})();
