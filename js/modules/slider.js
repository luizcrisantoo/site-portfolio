/* ==========================================================================
   SLIDER.JS — Image Comparison Slider (Antes / Depois)

   Técnica:
   - Imagem "antes" fica por baixo (posição absoluta, cobrindo tudo)
   - Imagem "depois" fica por cima, com clip-path controlado via JS
   - Input range invisível captura interação (mouse + touch)
   - Divisor + handle seguem a posição do range

   REVISÃO QA — CORREÇÕES APLICADAS:
   ✅ touch-action: none no CSS do range (permite controle total do gesto)
   ✅ e.preventDefault() no touchmove { passive: false } do container
   ✅ Classe --dragging para feedback visual durante arraste
   ✅ Handle 44px (touch target mínimo Apple/Google)
   ✅ Funciona com teclado (setas) via input range nativo
   ✅ overscroll-behavior: contain no body durante arraste (anti pull-to-refresh)
   ========================================================================== */

const SliderModule = (function () {
  'use strict';

  function initSlider(sliderEl) {
    const range    = sliderEl.querySelector('[data-range]');
    const imgAfter = sliderEl.querySelector('.project-card__img--after');
    const divider  = sliderEl.querySelector('[data-divider]');
    const handle   = sliderEl.querySelector('[data-handle]');

    if (!range || !imgAfter || !divider || !handle) return;

    let isDragging = false;

    // ── Atualizar posição visual do slider ──
    function updateSlider(value) {
      const percent = value;
      imgAfter.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
      divider.style.left  = percent + '%';
      handle.style.left   = percent + '%';
    }

    // ── Input event (funciona com mouse, touch e teclado) ──
    range.addEventListener('input', function () {
      updateSlider(this.value);
    });

    // ── Início do arraste ──
    function startDrag() {
      isDragging = true;
      sliderEl.classList.add('project-card__slider--dragging');
      // Prevenir pull-to-refresh no Chrome
      document.body.style.overscrollBehavior = 'contain';
    }

    // ── Fim do arraste ──
    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      sliderEl.classList.remove('project-card__slider--dragging');
      document.body.style.overscrollBehavior = '';
    }

    // Mouse
    range.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', endDrag);

    // Touch
    range.addEventListener('touchstart', startDrag, { passive: true });
    range.addEventListener('touchend', endDrag, { passive: true });
    range.addEventListener('touchcancel', endDrag, { passive: true });

    // ── Bloquear scroll vertical no container durante arraste ──
    sliderEl.addEventListener('touchmove', function (e) {
      if (isDragging) {
        e.preventDefault();
      }
    }, { passive: false });

    // Inicializar na posição 50%
    updateSlider(50);
  }

  function init() {
    const sliders = document.querySelectorAll('[data-slider]');
    sliders.forEach(initSlider);
  }

  return { init };
})();

if (typeof window !== 'undefined') {
  window.SliderModule = SliderModule;
}
