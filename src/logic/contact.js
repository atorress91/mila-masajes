import emailjs from '@emailjs/browser';

// EmailJS Configuration
// IMPORTANT: Replace these values with your own from https://www.emailjs.com/
const EMAILJS_CONFIG = {
  serviceId: 'service_zp6sptz', // e.g., 'service_abc123'
  templateId: 'template_3u4svuo', // e.g., 'template_xyz789'
  publicKey: 'mdWzw4JUvsDU4aZiC', // e.g., 'abcdefghijk123456'
};

// Initialize EmailJS with public key
try {
  emailjs.init(EMAILJS_CONFIG.publicKey);
  console.log('✅ EmailJS inicializado correctamente');
} catch (error) {
  console.error('❌ Error inicializando EmailJS:', error);
}

// Form submission handler for contact page
export function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) {
    console.warn('Contact form not found');
    return;
  }

  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    console.log('🔵 Formulario enviado - Iniciando proceso...');

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

    console.log('📋 Datos del formulario:', data);

    // Validate consent checkbox
    if (!data.consent) {
      console.warn('⚠️ Consentimiento no aceptado');
      alert('Por favor, acepta recibir comunicaciones para continuar.');
      return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
    }

    try {
      console.log('🔧 Configurando EmailJS...');
      console.log('Service ID:', EMAILJS_CONFIG.serviceId);
      console.log('Template ID:', EMAILJS_CONFIG.templateId);

      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: data.fullName,
        from_email: data.email,
        from_phone: data.phone,
        service: data.service || 'No especificado',
        message: data.message,
        to_name: 'Equipo de Masajes',
      };

      console.log('📤 Enviando email con parámetros:', templateParams);

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      console.log('✅ Email enviado exitosamente!', response);
      console.log('Status:', response.status);
      console.log('Text:', response.text);

      // Show success message
      alert(
        `¡Gracias, ${data.fullName}! Tu mensaje ha sido enviado exitosamente.\n\nTe responderemos pronto a ${data.email}.`
      );

      // Reset form
      contactForm.reset();
    } catch (error) {
      console.error('❌ Error completo:', error);
      console.error('Error status:', error.status);
      console.error('Error text:', error.text);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);

      let errorMessage = 'Hubo un error al enviar tu mensaje.';

      if (error.status === 401) {
        errorMessage += '\n\n🔑 Error de autenticación. Verifica tu Public Key.';
      } else if (error.status === 404) {
        errorMessage += '\n\n🔍 Service ID o Template ID no encontrados.';
      } else if (error.text) {
        errorMessage += `\n\nDetalle: ${error.text}`;
      }

      errorMessage += '\n\nPor favor, intenta nuevamente o contáctanos directamente por teléfono.';

      alert(errorMessage);
    } finally {
      // Restore button state
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
      console.log('🔄 Botón restaurado');
    }
  });
}
