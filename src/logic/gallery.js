export function initGallery() {
  console.log('Initializing gallery...');

  let currentImageIndex = 0;
  let visibleItems = [];

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox?.querySelector('.lightbox-image');
  const lightboxTitle = lightbox?.querySelector('.lightbox-title');
  const lightboxCategory = lightbox?.querySelector('.lightbox-category');

  // Filter functionality
  const filterTabs = document.querySelectorAll('.filter-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Initialize visible items
  visibleItems = Array.from(galleryItems).filter(item => {
    return !item.classList.contains('hidden');
  });

  for (const tab of filterTabs) {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      // Update active tab
      for (const t of filterTabs) {
        t.classList.remove('active');
      }
      tab.classList.add('active');

      // Filter gallery items and update visible items
      visibleItems = [];
      for (const item of galleryItems) {
        const category = item.dataset.category;

        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          item.classList.add('fade-in');
          visibleItems.push(item);
        } else {
          item.classList.add('hidden');
          item.classList.remove('fade-in');
        }
      }
    });
  }

  // Open lightbox
  function openLightbox(item) {
    const title = item.dataset.title;
    const description = item.dataset.description;
    const category = item.dataset.category;
    const fullUrl = item.dataset.fullUrl;

    if (lightboxImage && lightbox && fullUrl) {
      lightboxImage.src = fullUrl;
      lightboxImage.alt = title || 'Gallery image';

      if (lightboxTitle) {
        lightboxTitle.textContent = title || '';
      }

      if (lightboxCategory) {
        // Find category name from categories
        const categoryName =
          {
            massage: 'Massage Therapy',
            spa: 'Spa Facilities',
            rooms: 'Treatment Rooms',
            relaxation: 'Relaxation Areas',
            staff: 'Staff',
          }[category || ''] ||
          category ||
          '';

        lightboxCategory.textContent = categoryName;
      }

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';

      currentImageIndex = visibleItems.indexOf(item);
      console.log('Opened lightbox for image:', title, 'URL:', fullUrl);
    }
  }

  // Close lightbox
  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Navigate images
  function showPrevImage() {
    if (visibleItems.length === 0) return;
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : visibleItems.length - 1;
    openLightbox(visibleItems[currentImageIndex]);
  }

  function showNextImage() {
    if (visibleItems.length === 0) return;
    currentImageIndex = currentImageIndex < visibleItems.length - 1 ? currentImageIndex + 1 : 0;
    openLightbox(visibleItems[currentImageIndex]);
  }

  // Event listeners for gallery items
  for (const item of galleryItems) {
    item.addEventListener('click', () => {
      openLightbox(item);
    });
  }

  const closeBtn = lightbox?.querySelector('.lightbox-close');
  const prevBtn = lightbox?.querySelector('.lightbox-prev');
  const nextBtn = lightbox?.querySelector('.lightbox-next');

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', e => {
    e.stopPropagation();
    showPrevImage();
  });
  nextBtn?.addEventListener('click', e => {
    e.stopPropagation();
    showNextImage();
  });

  // Close on overlay click
  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    }
  });

  // Load More functionality (placeholder)
  const loadMoreBtn = document.querySelector('.load-more-btn');
  loadMoreBtn?.addEventListener('click', () => {
    alert('Loading more images... (This would load additional gallery items in a real implementation)');
  });

  console.log('Gallery initialized with', galleryItems.length, 'images');
}
