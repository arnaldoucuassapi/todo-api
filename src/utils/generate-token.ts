import 'dotenv/config';
import jwt from "jsonwebtoken";

type PayloadType = { 
  id: string 
};

export function generateToken(payload: PayloadType) {
  const secretKey = process.env.JWT_SECRET_KEY as string;
  const expiresIn = Math.floor((Date.now() / 1000));

  const token = jwt.sign(payload, secretKey, {
    expiresIn
  });
  
  return token;
}