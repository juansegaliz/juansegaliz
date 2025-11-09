import { Project, ProjectListItem } from '../../models/project.model';
import { ProjectFilter } from '../../models/project-filter.model';

export abstract class ProjectsRepository {
  abstract list(filter?: ProjectFilter): Promise<ProjectListItem[]>;
  abstract getBySlug(slug: string): Promise<Project | null>;
  abstract getAvailableFilters(): Promise<{
    years: number[];
    countries: string[];
    types: string[];
    clients: string[];
  }>;
}
