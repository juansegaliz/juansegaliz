export interface Hero {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  image: string;
  alt: string;
}

export interface AboutData {
  name: string;
  title: string;
  sinceDev: number;
  sinceTeacher: number;
  intro: string;
  motivations: string[];
  values: string[];
  location: string;
  hero: Hero;
}
