import 'dotenv/config';
import jwt from 'jsonwebtoken';

type DecodedTokenType = {
  id: string, 
  iat: number, 
  exp: number
};

type ResponseType = null | string | DecodedTokenType | jwt.JwtPayload | undefined;

function verifyToken(token: string): ResponseType {
  const secretKey = process.env.JWT_SECRET_KEY as string;
  let response: ResponseType;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      response = null;
    } else {
      response = decoded as DecodedTokenType;
    }
  });
  
  return response;
}

export {
  DecodedTokenType as DecodedTokenResponseType,
  verifyToken
}