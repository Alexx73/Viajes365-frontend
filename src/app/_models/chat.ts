import { Chatcomment } from './chatcomment';

export class Chat {
  chatId!: number;
  nick!: string;
  email!: string;
  status!: string;
  created!: Date;
  active!:boolean;
  isSelected!:boolean;
  chatcomments!: Chatcomment[];
}