import { TaskEntity } from 'libs/shared-entities/src/lib/task.entity';
import { UserEntity } from '../../../shared-entities/src/lib/user.entity';


export const calculateScore = (user:UserEntity, task:TaskEntity) => {
  const skillMatch = task.requiredSkills.every(skill => user.skills.includes(skill));
  const availability = user.maxTask - user.currentTask;

  let score = 0;
  if (skillMatch) score += 10;
  score += availability; // more availability = higher score

  switch (task.priority) {
    case 'High': score += 30; break;
    case 'Medium': score += 20; break;
    case 'Low': score += 10; break;
  }

  return score;
}
