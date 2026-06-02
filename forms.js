/* FORMS.JS — Proposal + Contact form handling */
(function() {

  function handleForm(formId, successId) {
    const form = document.getElementById(formId);
    const success = document.getElementById(successId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      btn.disabled = true;

      // Build mailto link
      const data = new FormData(form);
      const name = form.querySelector('[type="text"]')?.value || '';
      const email = form.querySelector('[type="email"]')?.value || '';
      const msg = form.querySelector('textarea')?.value || '';
      const type = form.querySelector('select')?.value || '';
      const subject = encodeURIComponent(`Contacto desde Portfolio — ${name}${type ? ' ['+type+']' : ''}`);
      const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${msg}`);
      window.open(`mailto:oruiz6446@gmail.com?subject=${subject}&body=${body}`, '_blank');

      setTimeout(() => {
        btn.innerHTML = origText;
        btn.disabled = false;
        success.classList.add('show');
        form.reset();
        setTimeout(() => success.classList.remove('show'), 5000);
      }, 1200);
    });
  }

  handleForm('proposalForm', 'proposalSuccess');
  handleForm('contactForm', 'contactSuccess');
})();
