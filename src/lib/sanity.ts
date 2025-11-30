import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { Lang } from './i18n';

// Configuración del cliente de Sanity
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '6z0ec6tg',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Desactivado para obtener datos frescos en cada build
  apiVersion: '2024-01-01',
  token: import.meta.env.SANITY_API_TOKEN, // Solo para escritura
});

// Helper para construir URLs de imágenes optimizadas
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const localizedField = (fieldPath: string) => `coalesce(${fieldPath}[$lang], ${fieldPath}.en, ${fieldPath}.es)`;

const serviceFields = `
  _id,
  slug,
  "title": ${localizedField('title')},
  "description": ${localizedField('description')},
  price,
  duration,
  image {
    ...,
    "alt": ${localizedField('alt')}
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
`;

const locationFields = `
  _id,
  name,
  slug,
  "seoTitle": ${localizedField('seoTitle')},
  "seoDescription": ${localizedField('seoDescription')},
  "tagline": ${localizedField('tagline')},
  "description": ${localizedField('description')},
  serviceAreas,
  keywords,
  heroImage {
    ...,
    "alt": ${localizedField('alt')}
  },
  ogImage,
  "ctaLabel": ${localizedField('ctaLabel')},
  mapEmbed,
  testimonials[]{
    "quote": ${localizedField('quote')},
    author,
    "context": ${localizedField('context')}
  },
  faqs[]{
    "question": ${localizedField('question')},
    "answer": ${localizedField('answer')}
  },
  order
`;

// Tipos de datos
export interface LocationSummary {
  _id: string;
  name: string;
  slug: { current: string };
}

export interface Service {
  _id: string;
  slug: { current: string };
  title: string;
  description: string;
  price: number;
  duration: number;
  image: any;
  color?: string;
  rating?: number;
  featured: boolean;
  order: number;
  locations?: LocationSummary[];
}

export interface Benefit {
  _id: string;
  title: string;
  description: string;
  icon: string;
  items: string[];
  order: number;
}

export interface PageContent {
  _id: string;
  _type: string;
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: any;
  heroImageTopRight?: any;
  heroImageBottomRight?: any;
  ogImage: any;
  keywords: string[];
}

export interface LocationTestimonial {
  quote: string;
  author: string;
  context?: string;
}

export interface LocationFaq {
  question: string;
  answer: string;
}

export interface Location {
  _id: string;
  name: string;
  slug: { current: string };
  seoTitle?: string;
  seoDescription?: string;
  tagline?: string;
  description?: string;
  serviceAreas?: string[];
  keywords?: string[];
  heroImage?: any;
  ogImage?: any;
  ctaLabel?: string;
  mapEmbed?: string;
  testimonials?: LocationTestimonial[];
  faqs?: LocationFaq[];
  order?: number;
}

export interface GalleryImage {
  _id: string;
  title: string;
  image: any;
  category: string;
  description?: string;
  featured: boolean;
  order: number;
}

export interface ContactInfo {
  _id: string;
  title: string;
  subtitle?: string;
  email: string;
  phone: string;
  address: string;
  hours: Array<{ days: string; hours: string }>;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  mapEmbed?: string;
}

export interface Package {
  _id: string;
  slug: { current: string };
  title: string;
  description: string;
  icon: string;
  price: number;
  originalPrice: number;
  color: string;
  featured: boolean;
  order: number;
  isActive: boolean;
}

export interface BookingInfo {
  _id: string;
  importantInfo: Array<{ text: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

// Funciones para obtener datos

export async function getServices(lang: Lang = 'en'): Promise<Service[]> {
  const query = `*[_type == "service"] | order(order asc) {
    ${serviceFields}
  }`;
  return await sanityClient.fetch(query, { lang });
}

export async function getServiceById(id: string, lang: Lang = 'en'): Promise<Service> {
  const query = `*[_type == "service" && _id == $id][0] {
    ${serviceFields}
  }`;
  return await sanityClient.fetch(query, { id, lang });
}

export async function getServiceBySlug(slug: string, lang: Lang = 'en'): Promise<Service | null> {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    ${serviceFields}
  }`;
  return await sanityClient.fetch(query, { slug, lang });
}

export async function getBenefits(lang: Lang = 'en'): Promise<Benefit[]> {
  const query = `*[_type == "benefit"] | order(order asc) {
    _id,
    "title": ${localizedField('title')},
    "description": ${localizedField('description')},
    icon,
    "items": items[]{
      "value": ${localizedField('@')}
    },
    order
  }`;
  const benefits = await sanityClient.fetch(query, { lang });
  return (benefits || []).map((benefit: any) => ({
    ...benefit,
    items: (benefit.items || [])
      .map((item: { value?: string } | null) => item?.value)
      .filter((v: string | undefined): v is string => typeof v === 'string' && v.length > 0),
  }));
}

export async function getPageContent(pageType: string, lang: Lang = 'en'): Promise<PageContent> {
  const query = `*[_type == "pageContent" && pageType == $pageType][0] {
    _id,
    _type,
    "title": ${localizedField('title')},
    "description": ${localizedField('description')},
    "heroTitle": ${localizedField('heroTitle')},
    "heroSubtitle": ${localizedField('heroSubtitle')},
    heroImage{
      ...,
      "alt": ${localizedField('alt')}
    },
    heroImageTopRight{
      ...,
      "alt": ${localizedField('alt')}
    },
    heroImageBottomRight{
      ...,
      "alt": ${localizedField('alt')}
    },
    ogImage,
    keywords
  }`;
  return await sanityClient.fetch(query, { pageType, lang });
}

export async function getFeaturedServices(lang: Lang = 'en'): Promise<Service[]> {
  const query = `*[_type == "service" && featured == true] | order(order asc) [0...3] {
    ${serviceFields}
  }`;
  return await sanityClient.fetch(query, { lang });
}

export async function getGalleryImages(lang: Lang = 'en'): Promise<GalleryImage[]> {
  try {
    const query = `*[_type == "galleryImage"] | order(order asc) {
      _id,
      "title": ${localizedField('title')},
      image {
        asset-> {
          _id,
          url
        },
        "alt": ${localizedField('alt')}
      },
      category,
      "description": ${localizedField('description')},
      featured,
      order
    }`;

    const images = await sanityClient.fetch(query, { lang });
    console.log(`[Sanity] Fetched ${images.length} gallery images`);

    if (images.length > 0) {
      console.log('[Sanity] First gallery image:', JSON.stringify(images[0], null, 2));
    }

    return images;
  } catch (error) {
    console.error('[Sanity] Error fetching gallery images:', error);
    return [];
  }
}

export async function getGalleryImagesByCategory(category: string, lang: Lang = 'en'): Promise<GalleryImage[]> {
  const query = `*[_type == "galleryImage" && category == $category] | order(order asc) {
    _id,
    "title": ${localizedField('title')},
    image {
      ...,
      "alt": ${localizedField('alt')}
    },
    category,
    "description": ${localizedField('description')},
    featured,
    order
  }`;
  return await sanityClient.fetch(query, { category, lang });
}

export async function getContactInfo(): Promise<ContactInfo> {
  const query = `*[_type == "contactInfo"][0] {
    _id,
    email,
    phone,
    address,
    hours,
    socialMedia,
    mapEmbed
  }`;
  return await sanityClient.fetch(query);
}

export async function getPackages(lang: Lang = 'en'): Promise<Package[]> {
  const query = `*[_type == "package" && isActive == true] | order(order asc) {
    _id,
    slug,
    "title": ${localizedField('title')},
    "description": ${localizedField('description')},
    icon,
    price,
    originalPrice,
    color,
    featured,
    order,
    isActive
  }`;
  return await sanityClient.fetch(query, { lang });
}

export async function getBookingInfo(lang: Lang = 'en'): Promise<BookingInfo | null> {
  const query = `*[_type == "bookingInfo"][0] {
    _id,
    "importantInfo": importantInfo[]{
      "text": ${localizedField('text')}
    },
    "faqs": faqs[]{
      "question": ${localizedField('question')},
      "answer": ${localizedField('answer')}
    }
  }`;
  const bookingData = await sanityClient.fetch(query, { lang });
  if (!bookingData) return null;

  return {
    ...bookingData,
    importantInfo: (bookingData.importantInfo || []).map((item: { text?: string }) => ({ text: item.text || '' })),
    faqs: (bookingData.faqs || []).map((faq: { question?: string; answer?: string }) => ({
      question: faq.question || '',
      answer: faq.answer || '',
    })),
  };
}

export async function getLocations(lang: Lang = 'en'): Promise<Location[]> {
  const query = `*[_type == "location"] | order(order asc) {
    ${locationFields}
  }`;
  return await sanityClient.fetch(query, { lang });
}

export async function getLocationsSlugs(): Promise<Array<{ slug: { current: string } }>> {
  const query = `*[_type == "location" && defined(slug.current)] {
    slug
  }`;
  return await sanityClient.fetch(query);
}

export async function getLocationBySlug(slug: string, lang: Lang = 'en'): Promise<Location | null> {
  const query = `*[_type == "location" && slug.current == $slug][0] {
    ${locationFields}
  }`;
  return await sanityClient.fetch(query, { slug, lang });
}

export async function getServicesByLocation(locationId: string, lang: Lang = 'en'): Promise<Service[]> {
  const query = `*[_type == "service" && $locationId in locations[]._ref] | order(order asc) {
    ${serviceFields}
  }`;
  return await sanityClient.fetch(query, { locationId, lang });
}
