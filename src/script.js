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

  /* ---- Contact form submission (Formspree AJAX) ---- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form && successMsg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);

      if (submitBtn) {
        submitBtn.disabled = true;
      }

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          return response.json().catch(function () {
            return {};
          }).then(function (data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok) {
            form.style.display = 'none';
            successMsg.classList.add('show');
          } else {
            var msg = (result.data && result.data.error)
              ? result.data.error
              : 'Something went wrong. Please try again.';
            alert(msg);
          }
        })
        .catch(function () {
          alert('We could not send your message. Please check your connection and try again.');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
          }
        });
    });
  }

  /* ---- Team page: profile modal (“Who we are”) — whole card opens modal ---- */
  (function () {
    var modal = document.getElementById('team-member-modal');
    if (!modal || typeof modal.showModal !== 'function') return;

    var modalBody = modal.querySelector('.team-modal__body');
    var modalTitle = document.getElementById('team-member-modal-title');
    var modalLinkedin = document.getElementById('team-modal-linkedin');
    var openCards = document.querySelectorAll('#team-members [data-team-modal-open]');
    var activeCard = null;

    function clearExpanded() {
      openCards.forEach(function (c) {
        c.setAttribute('aria-expanded', 'false');
      });
      activeCard = null;
    }

    function closeModal() {
      if (modal.open) {
        modal.close();
      }
    }

    function openModal(card) {
      if (!card || !modalBody || !modalTitle) return;

      var source = card.querySelector('.person-card__expand-source');
      var nameEl = card.querySelector('.person-card__name');
      if (!source || !nameEl) return;

      clearExpanded();
      activeCard = card;
      card.setAttribute('aria-expanded', 'true');
      modalTitle.textContent = nameEl.textContent;
      modalBody.innerHTML = source.innerHTML;

      var linkedinUrl = card.getAttribute('data-linkedin');
      if (modalLinkedin) {
        if (linkedinUrl) {
          modalLinkedin.href = linkedinUrl;
          modalLinkedin.setAttribute('aria-label', nameEl.textContent.trim() + ' on LinkedIn');
          modalLinkedin.removeAttribute('hidden');
        } else {
          modalLinkedin.setAttribute('hidden', '');
          modalLinkedin.removeAttribute('href');
          modalLinkedin.removeAttribute('aria-label');
        }
      }

      if (!modal.open) {
        modal.showModal();
      }
    }

    function activateCard(card) {
      if (activeCard === card && modal.open) {
        closeModal();
        return;
      }
      openModal(card);
    }

    modal.addEventListener('close', function () {
      clearExpanded();
    });

    openCards.forEach(function (card) {
      card.addEventListener('click', function () {
        activateCard(card);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateCard(card);
        }
      });
    });

    modal.querySelectorAll('[data-team-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
  })();

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
