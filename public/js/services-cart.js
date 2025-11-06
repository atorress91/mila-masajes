// Sistema de carrito para servicios
console.log('🚀 Script de carrito cargado');

// Función para obtener el carrito del localStorage
function getCart() {
  try {
    const cart = localStorage.getItem('massageCart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('❌ Error al leer el carrito:', error);
    return [];
  }
}

// Función para guardar el carrito en localStorage
function saveCart(cart) {
  try {
    localStorage.setItem('massageCart', JSON.stringify(cart));
    console.log('💾 Carrito guardado:', cart);
    // Disparar evento personalizado para actualizar otros componentes
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error('❌ Error al guardar el carrito:', error);
  }
}

// Función para agregar item al carrito
function addToCart(item) {
  console.log('➕ Agregando al carrito:', item);
  const cart = getCart();

  // Verificar si el item ya existe en el carrito
  const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id && cartItem.title === item.title);

  if (existingItemIndex > -1) {
    // Si existe, incrementar la cantidad
    cart[existingItemIndex].quantity += item.quantity || 1;
    console.log('📈 Cantidad incrementada para:', item.title);
  } else {
    // Si no existe, agregarlo
    cart.push({
      ...item,
      quantity: item.quantity || 1,
      addedAt: new Date().toISOString(),
    });
    console.log('✅ Item agregado:', item.title);
  }

  saveCart(cart);

  // Mostrar notificación
  showNotification(`${item.title} agregado al carrito`);
}

// Función para mostrar notificación
function showNotification(message) {
  console.log('🔔 Mostrando notificación:', message);

  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #A8C5BE;
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Función para inicializar botones
function initializeServicesButtons() {
  console.log('🔄 Inicializando botones de servicios...');

  // Botones "Reservar Ahora" de servicios
  const bookButtons = document.querySelectorAll('.book-button');
  console.log(`📍 Encontrados ${bookButtons.length} botones de servicios`);

  bookButtons.forEach((button, index) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('🖱️ Click en botón de servicio', index + 1);

      const card = this.closest('.service-card, .service-card-wide');
      if (!card) {
        console.error('❌ No se encontró la tarjeta del servicio');
        return;
      }

      const title = card.querySelector('.service-title')?.textContent?.trim();
      const priceText = card.querySelector('.service-price')?.textContent;
      const description = card.querySelector('.service-description')?.textContent?.trim();
      const duration = card.querySelector('.duration-badge')?.textContent?.trim();

      console.log('📦 Datos del servicio:', { title, priceText, description, duration });

      // Extraer el precio numérico
      const price = parseFloat(priceText?.replace(/[^0-9.]/g, '') || '0');

      const serviceItem = {
        id: `service-${Date.now()}-${index}`,
        title: title || 'Servicio',
        description: description || '',
        price: price,
        duration: duration || '',
        type: 'service',
        image: '/assets/placeholder-service.jpg',
      };

      console.log('✅ Agregando servicio al carrito:', serviceItem);
      addToCart(serviceItem);
    });
  });

  // Botones "Elegir Paquete" de paquetes especiales
  const packageButtons = document.querySelectorAll('.package-button');
  console.log(`📍 Encontrados ${packageButtons.length} botones de paquetes`);

  packageButtons.forEach((button, index) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('🖱️ Click en botón de paquete', index + 1);

      const card = this.closest('.package-card');
      if (!card) {
        console.error('❌ No se encontró la tarjeta del paquete');
        return;
      }

      const title = card.querySelector('.package-title')?.textContent?.trim();
      const priceText = card.querySelector('.package-price')?.textContent;
      const description = card.querySelector('.package-description')?.textContent?.trim();
      const icon = card.querySelector('.icon-emoji')?.textContent?.trim();

      console.log('📦 Datos del paquete:', { title, priceText, description, icon });

      // Extraer el precio numérico
      const price = parseFloat(priceText?.replace(/[^0-9.]/g, '') || '0');

      const packageItem = {
        id: `package-${Date.now()}-${index}`,
        title: title || 'Paquete',
        description: description || '',
        price: price,
        icon: icon || '✨',
        type: 'package',
        image: '/assets/placeholder-package.jpg',
      };

      console.log('✅ Agregando paquete al carrito:', packageItem);
      addToCart(packageItem);
    });
  });

  // Botón "Consulta Personalizada"
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('🖱️ Redirigiendo a contacto...');
      window.location.href = '/contact';
    });
  }

  console.log(`✅ Botones inicializados correctamente`);
}

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeServicesButtons);
} else {
  initializeServicesButtons();
}

// Re-inicializar en navegación con ViewTransitions
document.addEventListener('astro:page-load', () => {
  console.log('🔄 Página cargada con ViewTransitions, re-inicializando...');
  setTimeout(initializeServicesButtons, 100);
});

console.log('✅ Script de servicios-carrito completamente cargado');
