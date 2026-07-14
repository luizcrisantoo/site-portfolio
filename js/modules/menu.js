/* ==========================================================================
   MENU.JS — Navegação mobile (hambúrguer)
   ========================================================================== */

const MenuModule = (function () {
  'use strict';

  function init() {
    const toggle  = document.getElementById('navToggle');
    const navList = document.getElementById('navList');

    if (!toggle || !navList) return;

    toggle.addEventListener('click', function () {
      const isOpen = navList.classList.toggle('nav__list--open');
      toggle.classList.toggle('nav__toggle--active');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Fechar menu ao clicar em um link
    navList.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('nav__list--open');
        toggle.classList.remove('nav__toggle--active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function (e) {
      if (!navList.contains(e.target) && !toggle.contains(e.target)) {
        navList.classList.remove('nav__list--open');
        toggle.classList.remove('nav__toggle--active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  return { init };
})();

if (typeof window !== 'undefined') {
  window.MenuModule = MenuModule;
}
