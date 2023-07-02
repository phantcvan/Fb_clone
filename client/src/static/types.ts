export interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string;
  cover: string;
  gender: string;
  birthday: string;
  verify: number;
  isOnline: number;
  bio: string|null;
  job: string|null;
  highSchool: string|null;
  college: string|null;
  currentCity: string|null;
  hometown: string|null;
  relationship: string|null;
  relationship_to: number|null;

}