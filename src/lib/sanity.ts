import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Configuración del cliente de Sanity
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || '6z0ec6tg',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, // Usa CDN para mejor rendimiento en producción
  apiVersion: '2024-01-01',
  token: import.meta.env.SANITY_API_TOKEN, // Solo para escritura
});

// Helper para construir URLs de imágenes optimizadas
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Tipos de datos
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

export async function getServices(): Promise<Service[]> {
  const query = `*[_type == "service"] | order(order asc) {
    _id,
    slug,
    title,
    description,
    price,
    duration,
    image,
    color,
    rating,
    featured,
    order
  }`;
  return await sanityClient.fetch(query);
}

export async function getServiceById(id: string): Promise<Service> {
  const query = `*[_type == "service" && _id == $id][0] {
    _id,
    slug,
    title,
    description,
    price,
    duration,
    image,
    color,
    rating,
    featured,
    order
  }`;
  return await sanityClient.fetch(query, { id });
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const query = `*[_type == "service" && slug.current == $slug][0] {
    _id,
    slug,
    title,
    description,
    price,
    duration,
    image,
    color,
    rating,
    featured,
    order
  }`;
  return await sanityClient.fetch(query, { slug });
}

export async function getBenefits(): Promise<Benefit[]> {
  const query = `*[_type == "benefit"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    items,
    order
  }`;
  return await sanityClient.fetch(query);
}

export async function getPageContent(pageType: string): Promise<PageContent> {
  const query = `*[_type == "pageContent" && pageType == $pageType][0] {
    _id,
    _type,
    title,
    description,
    heroTitle,
    heroSubtitle,
    heroImage,
    heroImageTopRight,
    heroImageBottomRight,
    ogImage,
    keywords
  }`;
  return await sanityClient.fetch(query, { pageType });
}

export async function getFeaturedServices(): Promise<Service[]> {
  const query = `*[_type == "service" && featured == true] | order(order asc) [0...3] {
    _id,
    slug,
    title,
    description,
    price,
    duration,
    image,
    color,
    rating,
    featured,
    order
  }`;
  return await sanityClient.fetch(query);
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const query = `*[_type == "galleryImage"] | order(order asc) {
      _id,
      title,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      category,
      description,
      featured,
      order
    }`;

    const images = await sanityClient.fetch(query);
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

export async function getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
  const query = `*[_type == "galleryImage" && category == $category] | order(order asc) {
    _id,
    title,
    image,
    category,
    description,
    featured,
    order
  }`;
  return await sanityClient.fetch(query, { category });
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

export async function getPackages(): Promise<Package[]> {
  const query = `*[_type == "package" && isActive == true] | order(order asc) {
    _id,
    slug,
    title,
    description,
    icon,
    price,
    originalPrice,
    color,
    featured,
    order,
    isActive
  }`;
  return await sanityClient.fetch(query);
}

export async function getBookingInfo(): Promise<BookingInfo | null> {
  const query = `*[_type == "bookingInfo"][0] {
    _id,
    importantInfo,
    faqs
  }`;
  return await sanityClient.fetch(query);
}
