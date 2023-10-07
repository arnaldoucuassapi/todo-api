import 'dotenv/config';
import { UserType } from "./@types";
import jwt from "jsonwebtoken";

export function generateToken(payload: UserType) {
  const secretKey = process.env.JWT_SECRET_KEY as string;
  const expiresIn = Math.floor((Date.now() / 1000));

  const token = jwt.sign(payload, secretKey, {
    expiresIn
  });
  
  return token;
}