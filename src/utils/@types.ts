import { FastifyReply, FastifyRequest } from "fastify";

type handlerRoute = (request: FastifyRequest, reply: FastifyReply) => unknown;

export interface IController {
  create: handlerRoute;
  update: handlerRoute;
  list: handlerRoute;
  delete: handlerRoute
}