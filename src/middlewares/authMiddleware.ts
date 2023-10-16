import { FastifyReply, FastifyRequest } from "fastify";
import { DecodedTokenResponseType, verifyToken } from "../utils/verify-token";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers['authorization'];

  if (!token) {
    return reply.status(401).send();
  }

  const tokenValues = verifyToken(token) as DecodedTokenResponseType;

  if (!tokenValues) {
    return reply.status(401).send();
  }
  
  reply.context.tokenValues = tokenValues;
}