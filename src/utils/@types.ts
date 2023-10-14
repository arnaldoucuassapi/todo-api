import { FastifyReply, FastifyRequest } from "fastify";

type handlerRoute = (request: FastifyRequest, reply: FastifyReply) => unknown;

interface IController {
  create: handlerRoute;
  update: handlerRoute;
  list: handlerRoute;
  delete: handlerRoute
}

interface IAuth {
  login: handlerRoute
}

export {
  IController,
  IAuth
}