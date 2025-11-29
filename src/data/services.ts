/**
 * Service type definition
 * The actual service data comes from Sanity CMS
 */
export interface Service {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  badge?: string;
}
