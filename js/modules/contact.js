/* ==========================================================================
   CONTACT.JS — Envio de formulário via AJAX + Modal de confirmação

   - Envia dados para Formsubmit sem redirecionar a página
   - Exibe modal de sucesso após envio
   - Tratamento de erro com feedback visual
   ========================================================================== */

const ContactModule = (function () {
  'use strict';

  const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/luiz.crisanto@gmail.com';

  function init() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('modal');
    const submitBtn = document.getElementById('contactSubmit');

    if (!form || !modal) return;

    // ── Envio do formulário via fetch ──
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      // Honeypot preenchido = bot
      if (formData.get('_honey')) return;

      // Adicionar configurações do Formsubmit
      formData.append('_subject', 'Nova mensagem do portfólio');
      formData.append('_captcha', 'false');

      // Desabilitar botão durante envio
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      fetch(FORMSUBMIT_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          openModal(modal);
        } else {
          throw new Error('Erro no envio');
        }
      })
      .catch(function () {
        alert('Ocorreu um erro ao enviar. Tente novamente ou entre em contato pelo e-mail.');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensagem';
      });
    });

    // ── Fechar modal ──
    var closers = modal.querySelectorAll('[data-modal-close]');
    closers.forEach(function (el) {
      el.addEventListener('click', function () {
        closeModal(modal);
      });
    });

    // Fechar com Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
        closeModal(modal);
      }
    });
  }

  function openModal(modal) {
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  return { init: init };
})();

if (typeof window !== 'undefined') {
  window.ContactModule = ContactModule;
}
