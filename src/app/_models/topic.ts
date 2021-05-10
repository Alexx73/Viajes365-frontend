import { User } from './user';
import { Comment } from './comment';
export class Topic {
  topicId!: number;
  name!: string;
  summary!: string;
  status!: string;
  pinned!: boolean;
  userId!: number;
  user!: User;
  isDeleting = false;
  created!: Date;
  active!: boolean;
  comments!: Comment[];
}
