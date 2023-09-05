import { Router } from 'express';
import { displayUserProfileHandler,
   editUserProfileHandler, 
   displayOtherUserProfileHandler } 
   from './users.handlers.js';


const users = Router();


users.get('/my-profile', displayUserProfileHandler);
users.put('/my-profile/edit', editUserProfileHandler);

users.get('profile/:username', displayOtherUserProfileHandler);


export default users;
