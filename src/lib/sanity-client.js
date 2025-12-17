/**
 * Cliente de Sanity para el navegador
 * Permite cargar datos frescos de Sanity en tiempo real
 */

const SANITY_PROJECT_ID = '6z0ec6tg';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

// Usar apicdn.sanity.io para queries públicas (tiene CORS habilitado)
const BASE_URL = `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

/**
 * Ejecuta una query GROQ contra Sanity
 */
export async function sanityFetch(query, params = {}) {
  try {
    let url = `${BASE_URL}?query=${encodeURIComponent(query)}`;

    // Agregar parámetros
    Object.entries(params).forEach(([key, value]) => {
      url += `&$${key}="${encodeURIComponent(value)}"`;
    });

    const response = await fetch(url);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    return null;
  }
}

/**
 * Construye URL de imagen de Sanity
 */
export function buildImageUrl(image, options = {}) {
  if (!image?.asset?._ref && !image?.asset?._id) {
    return image?.asset?.url || '';
  }

  const ref = image.asset._ref || image.asset._id;
  // Parse the reference: image-{id}-{dimensions}-{format}
  const [, id, dimensions, format] = ref.match(/image-([a-zA-Z0-9]+)-(\d+x\d+)-(\w+)/) || [];

  if (!id) return image?.asset?.url || '';

  let url = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}`;

  // Agregar opciones de transformación
  const params = [];
  if (options.width) params.push(`w=${options.width}`);
  if (options.height) params.push(`h=${options.height}`);
  if (options.quality) params.push(`q=${options.quality}`);
  if (options.fit) params.push(`fit=${options.fit}`);
  if (options.auto) params.push(`auto=${options.auto}`);

  if (params.length > 0) {
    url += '?' + params.join('&');
  }

  return url;
}

// ============ QUERIES ESPECÍFICAS ============

/**
 * Obtiene información de contacto
 */
export async function getContactInfo() {
  const query = `*[_type == "contactInfo"][0] {
    _id,
    email,
    phone,
    address,
    hours,
    socialMedia,
    mapEmbed
  }`;
  return await sanityFetch(query);
}

/**
 * Obtiene servicios
 */
export async function getServices(lang = 'en') {
  const query = `*[_type == "service"] | order(order asc) {
    _id,
    slug,
    "title": coalesce(title[$lang], title.en, title.es),
    "description": coalesce(description[$lang], description.en, description.es),
    price,
    duration,
    image {
      ...,
      asset->{_id, url},
      "alt": coalesce(alt[$lang], alt.en, alt.es)
    },
    color,
    rating,
    featured,
    order,
    locations[]->{
      _id,
      name,
      slug
    }
  }`;
  return await sanityFetch(query, { lang });
}

/**
 * Obtiene servicios destacados
 */
export async function getFeaturedServices(lang = 'en') {
  const query = `*[_type == "service" && featured == true] | order(order asc) {
    _id,
    slug,
    "title": coalesce(title[$lang], title.en, title.es),
    "description": coalesce(description[$lang], description.en, description.es),
    price,
    duration,
    image {
      ...,
      asset->{_id, url},
      "alt": coalesce(alt[$lang], alt.en, alt.es)
    },
    color,
    rating,
    featured,
    order
  }`;
  return await sanityFetch(query, { lang });
}

/**
 * Obtiene paquetes
 */
export async function getPackages(lang = 'en') {
  const query = `*[_type == "package" && isActive == true] | order(order asc) {
    _id,
    slug,
    "title": coalesce(title[$lang], title.en, title.es),
    "description": coalesce(description[$lang], description.en, description.es),
    icon,
    price,
    originalPrice,
    color,
    featured,
    order,
    isActive
  }`;
  return await sanityFetch(query, { lang });
}

/**
 * Obtiene beneficios
 */
export async function getBenefits(lang = 'en') {
  const query = `*[_type == "benefit"] | order(order asc) {
    _id,
    "title": coalesce(title[$lang], title.en, title.es),
    "description": coalesce(description[$lang], description.en, description.es),
    icon,
    "items": items[]{"value": coalesce(@[$lang], @.en, @.es)},
    order
  }`;
  const benefits = await sanityFetch(query, { lang });
  return (benefits || []).map(benefit => ({
    ...benefit,
    items: (benefit.items || []).map(item => item?.value).filter(v => typeof v === 'string' && v.length > 0),
  }));
}

/**
 * Obtiene contenido de página
 */
export async function getPageContent(pageType, lang = 'en') {
  const query = `*[_type == "pageContent" && pageType == $pageType][0] {
    _id,
    _type,
    "title": coalesce(title[$lang], title.en, title.es),
    "description": coalesce(description[$lang], description.en, description.es),
    "heroTitle": coalesce(heroTitle[$lang], heroTitle.en, heroTitle.es),
    "heroSubtitle": coalesce(heroSubtitle[$lang], heroSubtitle.en, heroSubtitle.es),
    heroImage{
      ...,
      asset->{_id, url},
      "alt": coalesce(alt[$lang], alt.en, alt.es)
    },
    heroImageTopRight{
      ...,
      asset->{_id, url},
      "alt": coalesce(alt[$lang], alt.en, alt.es)
    },
    heroImageBottomRight{
      ...,
      asset->{_id, url},
      "alt": coalesce(alt[$lang], alt.en, alt.es)
    },
    ogImage,
    keywords
  }`;
  return await sanityFetch(query, { pageType, lang });
}

/**
 * Obtiene imágenes de galería
 */
export async function getGalleryImages(lang = 'en') {
  const query = `*[_type == "galleryImage"] | order(order asc) {
    _id,
    "title": coalesce(title[$lang], title.en, title.es),
    image {
      ...,
      asset->{_id, url},
      "alt": coalesce(alt[$lang], alt.en, alt.es)
    },
    category,
    "description": coalesce(description[$lang], description.en, description.es),
    featured,
    order
  }`;
  return await sanityFetch(query, { lang });
}

/**
 * Obtiene imágenes de galería por categoría
 */
export async function getGalleryImagesByCategory(category, lang = 'en') {
  const query = `*[_type == "galleryImage" && category == $category] | order(order asc) {
    _id,
    "title": coalesce(title[$lang], title.en, title.es),
    image {
      ...,
      asset->{_id, url},
      "alt": coalesce(alt[$lang], alt.en, alt.es)
    },
    category,
    "description": coalesce(description[$lang], description.en, description.es),
    featured,
    order
  }`;
  return await sanityFetch(query, { category, lang });
}

/**
 * Obtiene ubicaciones
 */
export async function getLocations(lang = 'en') {
  const query = `*[_type == "location"] | order(order asc) {
    _id,
    name,
    slug,
    "seoTitle": coalesce(seoTitle[$lang], seoTitle.en, seoTitle.es),
    "seoDescription": coalesce(seoDescription[$lang], seoDescription.en, seoDescription.es),
    "tagline": coalesce(tagline[$lang], tagline.en, tagline.es),
    "description": coalesce(description[$lang], description.en, description.es),
    serviceAreas,
    keywords,
    heroImage {
      ...,
      asset->{_id, url},
      "alt": coalesce(alt[$lang], alt.en, alt.es)
    },
    ogImage,
    "ctaLabel": coalesce(ctaLabel[$lang], ctaLabel.en, ctaLabel.es),
    mapEmbed,
    testimonials[]{
      "quote": coalesce(quote[$lang], quote.en, quote.es),
      author,
      "context": coalesce(context[$lang], context.en, context.es)
    },
    faqs[]{
      "question": coalesce(question[$lang], question.en, question.es),
      "answer": coalesce(answer[$lang], answer.en, answer.es)
    },
    order
  }`;
  return await sanityFetch(query, { lang });
}

/**
 * Obtiene ubicación por slug
 */
export async function getLocationBySlug(slug, lang = 'en') {
  const query = `*[_type == "location" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    "seoTitle": coalesce(seoTitle[$lang], seoTitle.en, seoTitle.es),
    "seoDescription": coalesce(seoDescription[$lang], seoDescription.en, seoDescription.es),
    "tagline": coalesce(tagline[$lang], tagline.en, tagline.es),
    "description": coalesce(description[$lang], description.en, description.es),
    serviceAreas,
    keywords,
    heroImage {
      ...,
      asset->{_id, url},
      "alt": coalesce(alt[$lang], alt.en, alt.es)
    },
    ogImage,
    "ctaLabel": coalesce(ctaLabel[$lang], ctaLabel.en, ctaLabel.es),
    mapEmbed,
    testimonials[]{
      "quote": coalesce(quote[$lang], quote.en, quote.es),
      author,
      "context": coalesce(context[$lang], context.en, context.es)
    },
    faqs[]{
      "question": coalesce(question[$lang], question.en, question.es),
      "answer": coalesce(answer[$lang], answer.en, answer.es)
    },
    order
  }`;
  return await sanityFetch(query, { slug, lang });
}

/**
 * Obtiene servicios por ubicación
 */
export async function getServicesByLocation(locationId, lang = 'en') {
  const query = `*[_type == "service" && references($locationId)] | order(order asc) {
    _id,
    slug,
    "title": coalesce(title[$lang], title.en, title.es),
    "description": coalesce(description[$lang], description.en, description.es),
    price,
    duration,
    image {
      ...,
      asset->{_id, url},
      "alt": coalesce(alt[$lang], alt.en, alt.es)
    },
    color,
    rating,
    featured,
    order
  }`;
  return await sanityFetch(query, { locationId, lang });
}

/**
 * Obtiene información de booking
 */
export async function getBookingInfo(lang = 'en') {
  const query = `*[_type == "bookingInfo"][0] {
    _id,
    "importantInfo": importantInfo[]{"text": coalesce(text[$lang], text.en, text.es)},
    "faqs": faqs[]{
      "question": coalesce(question[$lang], question.en, question.es),
      "answer": coalesce(answer[$lang], answer.en, answer.es)
    }
  }`;
  return await sanityFetch(query, { lang });
}

/**
 * Obtiene servicio por slug
 */
export async function getServiceBySlug(slug, lang = 'en') {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    slug,
    "title": coalesce(title[$lang], title.en, title.es),
    "description": coalesce(description[$lang], description.en, description.es),
    price,
    duration,
    image {
      ...,
      asset->{_id, url},
      "alt": coalesce(alt[$lang], alt.en, alt.es)
    },
    color,
    rating,
    featured,
    order
  }`;
  return await sanityFetch(query, { slug, lang });
}
