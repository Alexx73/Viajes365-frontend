import { Topic } from './topic';
import { User } from './user';

export class Comment {
  commentId!: number;
  body!: string;
  status!: string;
  topicId!: number;
  topic!: Topic;
  userId!: number;
  user!: User;
  isDeleting = false;
  created!: Date;
  active!: boolean;
}
