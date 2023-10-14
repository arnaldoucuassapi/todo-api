import 'dotenv/config';
import jwt from 'jsonwebtoken';

export function verifyToken(token: string) {
  const secretKey = process.env.JWT_SECRET_KEY as string;
  let response;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      response = null;
    } else {
      response = decoded;
    }
  });
  
  return response;
}