// Interactive service showcase
export function setupServiceShowcase(servicesData) {
  const serviceItems = document.querySelectorAll('.service-item');
  const showcaseImage = document.getElementById('showcase-image');
  const serviceTitle = document.getElementById('service-title');
  const serviceDescription = document.getElementById('service-description');
  const servicePrice = document.getElementById('service-price');
  const serviceDuration = document.getElementById('service-duration');
  const benefitsColumns = document.getElementById('benefits-columns');

  function updateBenefits(benefits) {
    if (!benefitsColumns) return;

    benefitsColumns.replaceChildren();

    if (!benefits || benefits.length === 0) {
      return;
    }

    const midPoint = Math.ceil(benefits.length / 2);
    const createColumn = items => {
      const list = document.createElement('ul');
      list.className = 'benefits-column';

      for (const benefit of items) {
        const listItem = document.createElement('li');
        listItem.textContent = benefit;
        list.appendChild(listItem);
      }

      return list;
    };

    benefitsColumns.appendChild(createColumn(benefits.slice(0, midPoint)));
    benefitsColumns.appendChild(createColumn(benefits.slice(midPoint)));
  }

  let index = 0;
  for (const item of serviceItems) {
    const currentIndex = index;
    item.addEventListener('click', () => {
      // Remove active class from all items
      for (const i of serviceItems) {
        i.classList.remove('active');
      }
      // Add active class to clicked item
      item.classList.add('active');

      // Update showcase content
      const service = servicesData[currentIndex];
      if (service) {
        if (showcaseImage) showcaseImage.src = service.image;
        if (serviceTitle) serviceTitle.textContent = service.title;
        if (serviceDescription) serviceDescription.textContent = service.description;
        if (servicePrice) servicePrice.textContent = `$${service.price}`;
        if (serviceDuration) serviceDuration.textContent = `${service.duration} min`;
        updateBenefits(service.benefits);
      }
    });
    index++;
  }
}
