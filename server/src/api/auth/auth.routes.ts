import { Router } from 'express';
import { userSignUpHandler, userSignInHandler, userSignOutHandler } from './auth.handlers.js';
import { validateBodyForAuth, validateSession } from '../../middlewares/authValidation.js'
const auth = Router();

auth.post('/sign-up', validateBodyForAuth, userSignUpHandler);
auth.post('/sign-in', validateBodyForAuth, userSignInHandler);
auth.post('/sign-out', validateSession, userSignOutHandler);  

export default auth;