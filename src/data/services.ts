export interface Service {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  badge?: string;
}

export const servicesData: Record<string, Service> = {
  'deep-tissue': {
    id: 'deep-tissue',
    title: 'Deep Tissue Massage',
    price: 100,
    description:
      'Relieves tension and pain in deeper muscles. Ideal for athletes and those with chronic muscle tension.',
    image: '/assets/service-1.jpg',
    category: 'deep-tissue',
    badge: 'popular',
  },
  swedish: {
    id: 'swedish',
    title: 'Swedish Massage',
    price: 90,
    description: 'A gentle massage promoting relaxation and improving circulation throughout the body.',
    image: '/assets/service-2.jpg',
    category: 'swedish',
    badge: 'popular',
  },
  'hot-stone': {
    id: 'hot-stone',
    title: 'Hot Stone Massage',
    price: 110,
    description: 'Heated stones melt away tension and stress for ultimate relaxation experience.',
    image: '/assets/service-3.jpg',
    category: 'hot-stone',
  },
  aromatherapy: {
    id: 'aromatherapy',
    title: 'Aromatherapy Massage',
    price: 95,
    description: 'Essential oils combined with massage for enhanced relaxation and healing benefits.',
    image: '/assets/service-4.jpg',
    category: 'aromatherapy',
  },
  couples: {
    id: 'couples',
    title: 'Couples Massage',
    price: 180,
    description: 'Share the relaxation experience with your partner in our couples suite.',
    image: '/assets/service-5.jpg',
    category: 'packages',
  },
  prenatal: {
    id: 'prenatal',
    title: 'Prenatal Massage',
    price: 100,
    description: 'Specialized massage for expectant mothers, safe and relaxing for you and baby.',
    image: '/assets/hero-massage.jpg',
    category: 'packages',
  },
};

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'swedish', name: 'Swedish' },
  { id: 'deep-tissue', name: 'Deep Tissue' },
  { id: 'aromatherapy', name: 'Aromatherapy' },
  { id: 'hot-stone', name: 'Hot Stone' },
  { id: 'packages', name: 'Packages' },
];
