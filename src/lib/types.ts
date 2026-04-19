export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  tag: string | null;
  featured: number;
  sort_order: number;
}

export interface Collection {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  tag: string | null;
  piece_count: string;
  sort_order: number;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  video_path: string;
  sort_order: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  stars: number;
  sort_order: number;
}

export interface MediaMention {
  id: number;
  video_url: string;
  title: string;
  source: string;
  description: string;
  sort_order: number;
}
