import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_zp6sptz',
  templateId: 'template_3u4svuo',
  publicKey: 'mdWzw4JUvsDU4aZiC',
};

const defaultFormMessages = {
  consentTitle: 'Consent Required',
  consentText: 'Please accept to receive communications to continue.',
  consentConfirm: 'Got it',
  sendingButton: 'Sending...',
  sendingTitle: 'Sending message...',
  sendingText: 'Please wait a moment',
  successTitle: 'Message Sent!',
  successIntro: 'Thank you, <strong>{{name}}</strong>!',
  successBody: 'Your message has been sent successfully. We will reply soon at <strong>{{email}}</strong>.',
  successConfirm: 'Perfect',
  errorTitle: 'Error Sending',
  errorGeneric: 'There was a problem sending your message.',
  errorAuth: 'Authentication error with email service.',
  errorNotFound: 'Email service not found.',
  errorFooter: 'Please try again or contact us directly by phone.',
  errorConfirm: 'Close',
};

/**
 * Replaces {{key}} placeholders in translation templates.
 * @param {string | undefined} value
 * @param {Record<string, string>} params
 */
const template = (value, params) =>
  typeof value === 'string' ? value.replaceAll(/{{\s*(\w+)\s*}}/g, (_, key) => params[key] ?? '').trim() : '';

/**
 * Normalizes FormData values to strings.
 * @param {FormDataEntryValue | null} value
 */
const toText = value => (typeof value === 'string' ? value : '');

// Initialize EmailJS with public key
emailjs.init(EMAILJS_CONFIG.publicKey);

// Form submission handler for contact page
/**
 * @param {Partial<typeof defaultFormMessages>=} messagesOverride
 */
export function initContactForm(messagesOverride) {
  const messages = { ...defaultFormMessages };
  if (messagesOverride) {
    Object.assign(messages, messagesOverride);
  }
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      fullName: toText(formData.get('fullName')),
      email: toText(formData.get('email')),
      phone: toText(formData.get('phone')),
      service: toText(formData.get('service')),
      message: toText(formData.get('message')),
      consent: formData.get('consent'),
    };

    // Validate consent checkbox
    if (!data.consent) {
      Swal.fire({
        icon: 'warning',
        title: messages.consentTitle,
        text: messages.consentText,
        confirmButtonText: messages.consentConfirm,
        confirmButtonColor: '#fc0038',
      });
      return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = messages.sendingButton;
    }

    // Show loading alert
    Swal.fire({
      title: messages.sendingTitle,
      text: messages.sendingText,
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
        service: data.service || 'Not specified',
        message: data.message,
        to_name: 'Massage Team',
      };

      // Send email using EmailJS
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams, EMAILJS_CONFIG.publicKey);

      // Show success message
      Swal.fire({
        icon: 'success',
        title: messages.successTitle,
        html: `
          <p style="font-size: 16px; margin-bottom: 12px;">
            ${template(messages.successIntro, { name: data.fullName || '' })}
          </p>
          <p style="font-size: 14px; color: #666;">
            ${template(messages.successBody, { email: data.email || '' })}
          </p>
        `,
        confirmButtonText: messages.successConfirm,
        confirmButtonColor: '#fc0038',
        timer: 5000,
      });

      // Reset form
      contactForm.reset();
    } catch (error) {
      let errorMessage = messages.errorGeneric;

      if (error.status === 401) {
        errorMessage = messages.errorAuth;
      } else if (error.status === 404) {
        errorMessage = messages.errorNotFound;
      } else if (error.text) {
        errorMessage = error.text;
      }

      Swal.fire({
        icon: 'error',
        title: messages.errorTitle,
        html: `
          <p style="font-size: 14px; margin-bottom: 12px;">
            ${errorMessage}
          </p>
          <p style="font-size: 13px; color: #666;">
            ${messages.errorFooter}
          </p>
        `,
        confirmButtonText: messages.errorConfirm,
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
