export interface Skill {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface SkillsData {
  categories: SkillCategory[];
}
