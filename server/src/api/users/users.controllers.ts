import { User } from '@prisma/client';
import { UserData } from '../../utils/zodValidator.js';


export function filterUserData(user: User): UserData {
  const {admin, password, ...u }= user;
  return u as UserData; 
}
