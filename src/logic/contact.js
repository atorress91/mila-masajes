import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_zp6sptz',
  templateId: 'template_3u4svuo',
  publicKey: 'mdWzw4JUvsDU4aZiC',
};

// Initialize EmailJS with public key
emailjs.init(EMAILJS_CONFIG.publicKey);

// Form submission handler for contact page
export function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      message: formData.get('message'),
      consent: formData.get('consent'),
    };

    // Validate consent checkbox
    if (!data.consent) {
      Swal.fire({
        icon: 'warning',
        title: 'Consentimiento Requerido',
        text: 'Por favor, acepta recibir comunicaciones para continuar.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#fc0038',
      });
      return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
    }

    // Show loading alert
    Swal.fire({
      title: 'Enviando mensaje...',
      text: 'Por favor espera un momento',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: data.fullName,
        from_email: data.email,
        from_phone: data.phone,
        service: data.service || 'No especificado',
        message: data.message,
        to_name: 'Equipo de Masajes',
      };

      // Send email using EmailJS
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams, EMAILJS_CONFIG.publicKey);

      // Show success message
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje Enviado!',
        html: `
          <p style="font-size: 16px; margin-bottom: 12px;">
            Gracias, <strong>${data.fullName}</strong>!
          </p>
          <p style="font-size: 14px; color: #666;">
            Tu mensaje ha sido enviado exitosamente.<br>
            Te responderemos pronto a <strong>${data.email}</strong>
          </p>
        `,
        confirmButtonText: 'Perfecto',
        confirmButtonColor: '#fc0038',
        timer: 5000,
      });

      // Reset form
      contactForm.reset();
    } catch (error) {
      let errorTitle = 'Error al Enviar';
      let errorMessage = 'Hubo un problema al enviar tu mensaje.';

      if (error.status === 401) {
        errorMessage = 'Error de autenticación con el servicio de email.';
      } else if (error.status === 404) {
        errorMessage = 'Servicio de email no encontrado.';
      } else if (error.text) {
        errorMessage = error.text;
      }

      Swal.fire({
        icon: 'error',
        title: errorTitle,
        html: `
          <p style="font-size: 14px; margin-bottom: 12px;">
            ${errorMessage}
          </p>
          <p style="font-size: 13px; color: #666;">
            Por favor, intenta nuevamente o contáctanos directamente por teléfono.
          </p>
        `,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#fc0038',
      });
    } finally {
      // Restore button state
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}
