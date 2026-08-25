/* ==========================================================================
   FILTER.JS — Filtro de projetos por categoria

   - Filtra cards de projeto por data-category
   - Gerencia estado ativo dos botões de filtro
   - Garante que cards filtrados fiquem visíveis (força reveal--visible)
   ========================================================================== */

const FilterModule = (function () {
  'use strict';

  function init() {
    var buttons = document.querySelectorAll('[data-filter]');
    var cards = document.querySelectorAll('[data-category]');

    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        // Atualizar botão ativo
        buttons.forEach(function (b) {
          b.classList.remove('filter-btn--active');
        });
        btn.classList.add('filter-btn--active');

        // Filtrar cards
        cards.forEach(function (card) {
          var category = card.getAttribute('data-category');

          if (filter === 'todos' || category === filter) {
            card.classList.remove('project-card--hidden');
            // Forçar visibilidade (o IntersectionObserver pode não ter
            // observado cards que estavam display:none)
            card.classList.add('reveal--visible');
            // Animação de entrada
            card.classList.remove('project-card--show');
            void card.offsetWidth;
            card.classList.add('project-card--show');
          } else {
            card.classList.add('project-card--hidden');
            card.classList.remove('project-card--show');
          }
        });
      });
    });
  }

  return { init: init };
})();

if (typeof window !== 'undefined') {
  window.FilterModule = FilterModule;
}
