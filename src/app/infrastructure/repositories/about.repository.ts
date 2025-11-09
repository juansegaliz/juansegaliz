import { AboutData } from '../../models/about.model';

export abstract class AboutRepository {
  abstract get(): Promise<AboutData>;
}
