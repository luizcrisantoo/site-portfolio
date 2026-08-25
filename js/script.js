/* ==========================================================================
   SCRIPT.JS — Inicializador principal
   Importa e inicializa todos os módulos.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Inicializar módulos
  if (window.MenuModule)    window.MenuModule.init();
  if (window.ScrollModule)  window.ScrollModule.init();
  if (window.SliderModule)  window.SliderModule.init();
  if (window.FilterModule)  window.FilterModule.init();
  if (window.ContactModule) window.ContactModule.init();
});
