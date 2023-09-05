import { Request, Response } from 'express';

export const displayUserProfileHandler = (req: Request, res: Response) => {
  res.json({
    message: 'displayUserProfileHandler',
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

