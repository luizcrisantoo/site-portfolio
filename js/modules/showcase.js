/* ==========================================================================
   SHOWCASE.JS — Galeria 3D + Contador de stats

   - Pausa animação do marquee ao hover
   - Anima contadores de números ao entrar na viewport
   ========================================================================== */

const ShowcaseModule = (function () {
  'use strict';

  function initShowcase() {
    var track = document.querySelector('.showcase__track');
    if (!track) return;

    track.addEventListener('mouseenter', function () {
      track.style.animationPlayState = 'paused';
    });
    track.addEventListener('mouseleave', function () {
      track.style.animationPlayState = 'running';
    });
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var animated = false;

    function animateCounters() {
      if (animated) return;
      animated = true;

      counters.forEach(function (counter) {
        var target = parseInt(counter.getAttribute('data-count'), 10);
        var duration = 1600;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            counter.textContent = target;
          }
        }

        requestAnimationFrame(step);
      });
    }

    var statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  function init() {
    initShowcase();
    initCounters();
  }

  return { init: init };
})();

if (typeof window !== 'undefined') {
  window.ShowcaseModule = ShowcaseModule;
}
