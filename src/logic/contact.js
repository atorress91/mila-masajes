// Form submission handler for contact page
export function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) {
    console.warn('Contact form not found');
    return;
  }

  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      message: formData.get('message'),
      consent: formData.get('consent'),
    };

    // Validate consent checkbox
    if (!data.consent) {
      alert('Por favor, acepta recibir comunicaciones para continuar.');
      return;
    }

    // Show success message (you can integrate with a real backend here)
    alert(`¡Gracias, ${data.firstName}! Tu mensaje ha sido enviado.\n\nTe responderemos pronto a ${data.email}.`);

    // Reset form
    contactForm.reset();

    // In a real application, you would send this data to your backend:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log('Success:', result);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
  });
}
