// Cart functionality
let cart = [];

const defaultCartLabels = {
  quantity: 'Quantity',
  remove: 'Remove',
  paymentHeading: 'Payment Details',
  total: 'Total',
  giftWrapping: 'Gift Wrapping',
  newsletter: 'Newsletter',
  yes: 'Yes',
  no: 'No',
  pending: 'Payment integration coming soon!',
};

let cartLabels = { ...defaultCartLabels };

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('massageBlissCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('massageBlissCart', JSON.stringify(cart));
  // Trigger cart update event
  globalThis.dispatchEvent(new CustomEvent('cartUpdated'));
}

// Calculate totals
function calculateTotals() {
  const subtotal = cart.reduce((total, item) => {
    let itemTotal = item.basePrice;
    if (item.addons) {
      for (const addon of item.addons) {
        itemTotal += addon.price;
      }
    }
    return total + itemTotal * item.quantity;
  }, 0);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return { subtotal, tax, total };
}

// Helper: Toggle cart display state
function toggleCartDisplay(isEmpty, elements) {
  const { cartItemsContainer, emptyCartMessage, cartSummary, cartOptions, cartActions } = elements;

  if (isEmpty) {
    console.log('Cart: Cart is empty, showing empty message');
    cartItemsContainer.style.display = 'none';
    emptyCartMessage.style.display = 'flex';
    if (cartSummary) cartSummary.style.display = 'none';
    if (cartOptions) cartOptions.style.display = 'none';
    if (cartActions) cartActions.style.display = 'none';
  } else {
    console.log('Cart: Displaying cart items');
    cartItemsContainer.style.display = 'flex';
    emptyCartMessage.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    if (cartOptions) cartOptions.style.display = 'flex';
    if (cartActions) cartActions.style.display = 'flex';
  }
}

// Helper: Create cart item element
function createCartItemElement(item, index) {
  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';
  cartItem.dataset.index = index.toString();

  cartItem.appendChild(createImageSection(item));
  cartItem.appendChild(createDetailsSection(item));
  cartItem.appendChild(createQuantitySection(item, index));
  cartItem.appendChild(createActionsSection(index));

  return cartItem;
}

// Helper: Create image section
function createImageSection(item) {
  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'cart-item-image';
  const image = document.createElement('img');
  image.src = item.image;
  image.alt = item.title;
  imageWrapper.appendChild(image);
  return imageWrapper;
}

// Helper: Create details section
function createDetailsSection(item) {
  const details = document.createElement('div');
  details.className = 'cart-item-details';

  const title = document.createElement('h3');
  title.className = 'cart-item-title';
  title.textContent = item.title;
  details.appendChild(title);

  const price = document.createElement('span');
  price.className = 'cart-item-price';
  price.textContent = `$${item.basePrice.toFixed(2)}`;
  details.appendChild(price);

  if (Array.isArray(item.addons) && item.addons.length > 0) {
    details.appendChild(createAddonsSection(item.addons));
  }

  return details;
}

// Helper: Create addons section
function createAddonsSection(addons) {
  const addonsContainer = document.createElement('div');
  addonsContainer.className = 'cart-item-addons';

  for (const addon of addons) {
    const addonWrapper = document.createElement('div');
    addonWrapper.className = 'cart-item-addon';
    const addonLabel = document.createElement('span');
    addonLabel.textContent = `${addon.name} (+$${addon.price.toFixed(2)})`;
    addonWrapper.appendChild(addonLabel);
    addonsContainer.appendChild(addonWrapper);
  }

  return addonsContainer;
}

// Helper: Create quantity section
function createQuantitySection(item, index) {
  const quantityContainer = document.createElement('div');
  quantityContainer.className = 'cart-item-quantity';

  const quantityLabel = document.createElement('span');
  quantityLabel.className = 'cart-item-quantity-label';
  quantityLabel.textContent = `${cartLabels.quantity}: ${item.quantity}`;
  quantityContainer.appendChild(quantityLabel);

  const quantityControls = document.createElement('div');
  quantityControls.className = 'quantity-controls';

  const minusButton = document.createElement('button');
  minusButton.type = 'button';
  minusButton.className = 'qty-cart-btn minus';
  minusButton.dataset.index = index.toString();
  minusButton.textContent = '−';

  const quantityDisplay = document.createElement('span');
  quantityDisplay.className = 'qty-cart-display';
  quantityDisplay.textContent = `${item.quantity}`;

  const plusButton = document.createElement('button');
  plusButton.type = 'button';
  plusButton.className = 'qty-cart-btn plus';
  plusButton.dataset.index = index.toString();
  plusButton.textContent = '+';

  quantityControls.append(minusButton, quantityDisplay, plusButton);
  quantityContainer.appendChild(quantityControls);

  return quantityContainer;
}

// Helper: Create actions section
function createActionsSection(index) {
  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'cart-item-actions';

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'remove-item-btn';
  removeButton.dataset.index = index.toString();
  removeButton.textContent = cartLabels.remove;
  actionsContainer.appendChild(removeButton);

  return actionsContainer;
}

// Helper: Update cart summary
function updateCartSummary() {
  const { subtotal, tax, total } = calculateTotals();
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryTax = document.getElementById('summaryTax');
  const summaryTotal = document.getElementById('summaryTotal');

  if (summarySubtotal) summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (summaryTax) summaryTax.textContent = `$${tax.toFixed(2)}`;
  if (summaryTotal) summaryTotal.textContent = `$${total.toFixed(2)}`;

  console.log('Cart: Summary updated - Subtotal:', subtotal, 'Tax:', tax, 'Total:', total);
}

// Render cart
function renderCart() {
  console.log('Cart: Rendering cart with', cart.length, 'items');

  const cartItemsContainer = document.getElementById('cartItems');
  const emptyCartMessage = document.getElementById('emptyCart');
  const cartSummary = document.getElementById('cartSummary');
  const cartOptions = document.getElementById('cartOptions');
  const cartActions = document.getElementById('cartActions');

  if (!cartItemsContainer || !emptyCartMessage) {
    console.error('Cart: Required DOM elements not found');
    return;
  }

  const elements = { cartItemsContainer, emptyCartMessage, cartSummary, cartOptions, cartActions };
  toggleCartDisplay(cart.length === 0, elements);

  if (cart.length === 0) {
    return;
  }

  cartItemsContainer.textContent = '';
  const fragment = document.createDocumentFragment();

  let index = 0;
  for (const item of cart) {
    fragment.appendChild(createCartItemElement(item, index));
    index++;
  }

  cartItemsContainer.appendChild(fragment);

  updateCartSummary();
  attachEventListeners();
}

// Attach event listeners to cart items
function attachEventListeners() {
  // Plus buttons
  for (const btn of document.querySelectorAll('.qty-cart-btn.plus')) {
    btn.addEventListener('click', e => {
      const index = Number.parseInt(e.target.dataset.index || '0');
      if (cart[index] && cart[index].quantity < 10) {
        cart[index].quantity++;
        saveCart();
        renderCart();
      }
    });
  }

  // Minus buttons
  for (const btn of document.querySelectorAll('.qty-cart-btn.minus')) {
    btn.addEventListener('click', e => {
      const index = Number.parseInt(e.target.dataset.index || '0');
      if (cart[index] && cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart();
        renderCart();
      }
    });
  }

  // Remove buttons
  for (const btn of document.querySelectorAll('.remove-item-btn')) {
    btn.addEventListener('click', e => {
      const index = Number.parseInt(e.target.dataset.index || '0');
      cart.splice(index, 1);
      saveCart();
      renderCart();
    });
  }
}

// Setup button listeners
function setupButtonListeners() {
  const backBtn = document.getElementById('backBtn');
  const continueBtn = document.getElementById('continueShoppingBtn');
  const proceedBtn = document.getElementById('proceedPaymentBtn');

  backBtn?.addEventListener('click', () => {
    globalThis.history.back();
  });

  continueBtn?.addEventListener('click', () => {
    const target = continueBtn.dataset.target || '/discover';
    globalThis.location.href = target;
  });

  proceedBtn?.addEventListener('click', () => {
    const { total } = calculateTotals();
    const giftWrapping = document.getElementById('giftWrapping')?.checked;
    const newsletter = document.getElementById('newsletter')?.checked;

    const summaryLines = [
      cartLabels.paymentHeading,
      '',
      `${cartLabels.total}: $${total.toFixed(2)}`,
      `${cartLabels.giftWrapping}: ${giftWrapping ? cartLabels.yes : cartLabels.no}`,
      `${cartLabels.newsletter}: ${newsletter ? cartLabels.yes : cartLabels.no}`,
      '',
      cartLabels.pending,
    ];

    alert(summaryLines.join('\n'));
  });
}

// Initialize cart
export function initializeCart(labelsOverride) {
  if (labelsOverride) {
    cartLabels = { ...defaultCartLabels, ...labelsOverride };
  }
  console.log('Cart: Initializing cart page');
  loadCart();
  renderCart();
  setupButtonListeners();

  // Listen for cart updates from other pages
  globalThis.addEventListener('cartUpdated', () => {
    console.log('Cart: Cart updated event received');
    loadCart();
    renderCart();
  });
}
