import 'dotenv/config';
import jwt from "jsonwebtoken";
import { z } from 'zod';

type PayloadType = { 
  id: string 
};

export function generateToken(payload: PayloadType) {
  const payloadSchema = z.object({
    id: z.string().uuid()
  });

  payload = payloadSchema.parse(payload);

  const secretKey = process.env.JWT_SECRET_KEY as string;
  const expiresIn = '10m';

  const token = jwt.sign(payload, secretKey, {
    expiresIn
  });
  
  return token;
}