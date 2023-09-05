import { Request, Response } from 'express';
import { findUserWithEmailOrUsernameOrId } from '../auth/auth.controllers.js';
import { filterUserData } from './users.controllers.js';
import { User } from '@prisma/client';

/*
* WHEN THE REQUEST COMES TO this point it should have a body 
* with the userid to query with prisma and get the user and filter the data
* and send it back to the user
*/
export const displayUserProfileHandler = async (req: Request, res: Response) => {
  let user: User | null= await findUserWithEmailOrUsernameOrId(req.body.userid);
  console.log(user);
  if(!user){
    res.status(404).json({error: "User not found"});
  }
  let userData = filterUserData(user as User);
  res.status(200).json({
    user: userData
  });
  
  
}

export const editUserProfileHandler = (req: Request, res: Response) => {
  res.json({
    message: 'editUserProfileHandler',
  });
}

export const displayUserFriendsHandler = (req: Request, res: Response) => {
  res.json({
    message: 'displayUserFriendsHandler',
  });
}

export const displayOtherUserProfileHandler = (req: Request, res: Response) => {
  res.json({
    message: 'displayOtherUserProfileHandler',
  });
}
