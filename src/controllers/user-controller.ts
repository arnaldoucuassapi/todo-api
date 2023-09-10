import { FastifyRequest, FastifyReply } from "fastify";
import { IController } from "../types/controller-contracts";

export class UserController implements IController {
  create(request: FastifyRequest, reply: FastifyReply) {

  };

  list(request: FastifyRequest, reply: FastifyReply) {
    console.log("users");

    return [{
      name: "Arnaldo",
      age: 14
    }]
  };

  update(request: FastifyRequest, reply: FastifyReply) {

  };

  delete(request: FastifyRequest, reply: FastifyReply) {

  };
}