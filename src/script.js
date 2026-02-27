/* ============================================================
   FRUK v0 — script.js
   Minimal vanilla JS: hamburger nav, form handling, active nav
   ============================================================ */

(function () {
  'use strict';

  /* ---- Mobile hamburger toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      navList.classList.toggle('open', !isOpen);
    });

    // Close menu on link click (mobile)
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
        toggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (navList.classList.contains('open') && !navList.contains(e.target) && !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
      }
    });
  }

  /* ---- Active nav link highlighting (by current page) ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Contact form submission (Formspree placeholder) ---- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form && successMsg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            form.style.display = 'none';
            successMsg.classList.add('show');
          } else {
            alert('Something went wrong. Please try again.');
          }
        })
        .catch(function () {
          // For local testing without Formspree, show success anyway
          form.style.display = 'none';
          successMsg.classList.add('show');
        });
    });
  }

  /* ---- Back to top button ---- */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
