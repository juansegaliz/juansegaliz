import { SkillsData } from '../../models/skill.model';

export abstract class SkillsRepository {
  abstract getAll(): Promise<SkillsData>;
}
