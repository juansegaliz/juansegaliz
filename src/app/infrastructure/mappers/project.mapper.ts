import { Project, ProjectListItem } from '../../models/project.model';

export class ProjectMapper {
  static toListItem(project: Project): ProjectListItem {
    return {
      id: project.id,
      slug: project.slug,
      title: project.title,
      year: project.year,
      country: project.country,
      type: project.type,
      client: project.client,
      description: project.description,
      stack: project.stack,
      featured: project.featured,
    };
  }

  static toFull(listItem: ProjectListItem): Project {
    return {
      ...listItem,
      challenges: '',
      solutions: '',
      results: '',
      images: [],
    };
  }
}
