import { prisma } from "../../db.js";
import session from "../../utils/sessions.js";
import { hash, compare } from "bcrypt";
import { User } from "@prisma/client";

export async function userExists(username: string) {
  const users = await prisma.user.findMany({
    where: {
      username: username
    }
  });
  if (users.length > 0) return true;
  else return false;
}

export async function findUserWithEmailOrUsernameOrId(email?: string, username?: string, id?: number): Promise<User | null> {
  if (!email && !username && !id) {
    return null;
  } else {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: username
        },
        {
          email: email
        },
        {
          id:  id
        }
      ]
    }
  });
  return user? user : null;
} 
}

export async function createNewUser(username: string, email: string, password: string, firstName?: string, lastName?: string): Promise<User | null> {
  const hashedPassword = await hash(password, 4);
  let name = "";
  if (!firstName && !lastName) {
    
  }else {
    name = firstName + " " + lastName;
  };
  
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
      name: name
    }
  });
  return user? user : null;
}


export async function authenticateUser(password: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await compare(password, hashedPassword);
  return isMatch;
}

export async function destroySession(token: string) {
  await session.remove(token);
}