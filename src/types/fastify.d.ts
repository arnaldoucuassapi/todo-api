import { FastifyRequest, FastifyReply, FastifyContext } from "fastify";
import { DecodedTokenResponseType } from "../utils/verify-token";

declare module 'fastify' {
  interface FastifyContext {
    tokenValues: DecodedTokenResponseType
  }
}