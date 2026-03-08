export interface TourPackage {
  id: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}