export interface Project {
  id: string;
  slug: string;
  title: string;
  year: number;
  country: string;
  type: string;
  client: string;
  description: string;
  stack: string[];
  challenges?: string;
  solutions?: string;
  results?: string;
  images?: string[];
  featured?: boolean;
}

export interface ProjectListItem {
  id: string;
  slug: string;
  title: string;
  year: number;
  country: string;
  type: string;
  client: string;
  description: string;
  stack: string[];
  featured?: boolean;
}
