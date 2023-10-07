import { FastifyReply, FastifyRequest } from "fastify";

type handlerRoute = (request: FastifyRequest, reply: FastifyReply) => unknown;
interface IController {
  create: handlerRoute;
  update: handlerRoute;
  list: handlerRoute;
  delete: handlerRoute
}

type UserType = {
  id: string,
  name: string,
  email: string,
}

export {
  IController,
  UserType
}