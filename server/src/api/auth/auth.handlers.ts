import { Request, Response } from "express";
import { userExists, authenticateUser, destroySession, createNewUser, findUserWithEmailOrUsernameOrId} from "./auth.controllers.js"
import { createSession } from "../../utils/sessions.js";
import { User } from "@prisma/client";



/*
* 1. body should be validated from the middleware
* 2. pass the body to cheak if the user exists
* 3. then pass the body to create a user if the user does not exist
* 4. create a session for the user
* 5. send the response with a header authorization bearer token
*/
export async function userSignUpHandler(req: Request, res: Response) {
  let validatedBody = req.body;
  let doseUserExists = await userExists(validatedBody.username);
  console.log(doseUserExists);
  
  if (doseUserExists){
    return  res.status(409).json({
      message: "User already exists"
    });
  }
  let newUser = await createNewUser(validatedBody.username, validatedBody.email, validatedBody.password, validatedBody.firstName, validatedBody.lastName);
  if (!newUser){
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
  let userSession = await createSession(newUser as User);
  res.setHeader("Authorization", "Bearer " + userSession);
  res.status(201).json({
    message: "User created successfully",
  });
}


/*
* 1. body should be validated from the middleware
* 2. find if the user exists with email or the username
* 3. if the user exists then check the hashed password
* 4. if the password is correct then create a session for the user
* 5. send the response with a header authorization bearer token
*/
export async function userSignInHandler(req: Request, res: Response) {
  let validatedBody = req.body;
  let user = await findUserWithEmailOrUsernameOrId(validatedBody.email, validatedBody.username);
  if (user === null){
    return res.status(404).json({
      message: "User not found"
    });
  }
  let hashedPassword = (user as User).password;
  let isPasswordCorrect = await authenticateUser(validatedBody.password, hashedPassword);
  if (!isPasswordCorrect){
    return res.status(401).json({
      message: "Incorrect credentials"
    });
  }
  let userSession = await createSession(user as User);
  res.setHeader("Authorization", "Bearer " + userSession);
  res.status(200).json({
    message: "User signed in successfully",
  });
}

/*
* 1. get the authorization bearer token from the header
* 2. destroy the session
* 3. send a response with a 200 status code
*/
export async function userSignOutHandler(req: Request, res: Response) {
  await destroySession(req.body.token);
  res.status(200).json({
    message: "User signed out successfully",
  });
}
