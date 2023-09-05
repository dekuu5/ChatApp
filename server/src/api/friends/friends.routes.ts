import { Router } from "express";
import { displayFriendsListWithUsernameHandler, 
  displayAvailableFriendsToAddHandler, 
  displayUserFriendsListHandler, 
  searchFriendsListHandler, 
  removeFriendHandler,
  displayUserFriendsRequestHandler,
  addFriendHandler
 } from './friends.handlers.js';

const friends = Router();

const friendsList = Router();
const friendsRequest = Router();

// get the firends list of the user
friendsList.get('/:username', displayFriendsListWithUsernameHandler);

// get the firends list that is avilabe 
friendsList.get('/add', displayAvailableFriendsToAddHandler);

// get the current user friends list
friendsList.get('/me', displayUserFriendsListHandler);

// search for a friend
friendsList.get('/search/:name', searchFriendsListHandler);

// unfrind a friend
friendsList.delete('/un-friend/:username', removeFriendHandler);


// groub the the firends list routes
friends.use('/friends-list', friendsList);


// get the firends request of the user
friendsRequest.get('/me', displayUserFriendsRequestHandler);

// create a friend request to a user
friendsRequest.post('/add/:username', addFriendHandler);


// groub the the firends request routes
friends.use('/friends-request', friendsRequest);


export default friends;