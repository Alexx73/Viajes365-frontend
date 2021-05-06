import { Photo } from './photo';
import { Role } from './role';
export class User {
  userId!: number;
  title!: string;
  firstName!: string;
  lastName!: string;
  userName!: string;
  password!: string;
  email!: string;
  roleId!: number;
  role!: Role;
  photoId!: number;
  photo!: Photo;
  isDeleting = false;
  token!: string;
  active!: boolean;
  returnUrl!: string;
  TermsAndConditionsChecked!: boolean;
}
