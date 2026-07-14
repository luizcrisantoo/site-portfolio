/* ==========================================================================
   SCROLL.JS — Header scroll, animações on-scroll (IntersectionObserver)
   ========================================================================== */

const ScrollModule = (function () {
  'use strict';

  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
          } else {
            header.classList.remove('header--scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  function init() {
    initHeaderScroll();
    initReveal();
  }

  return { init };
})();

if (typeof window !== 'undefined') {
  window.ScrollModule = ScrollModule;
}
