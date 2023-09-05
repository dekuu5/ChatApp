import { Router } from 'express';
import auth from './auth/auth.routes.js';
import users from './users/users.routes.js';
import friends from './friends/friends.routes.js';
const api = Router();


api.use('/auth', auth);
api.use('/users', users);
api.use('/friends', friends);
api.get('/', (req, res) =>{
  res.json({
    massage:"hello"
  })
}
);

export default api;