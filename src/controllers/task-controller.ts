import { FastifyRequest, FastifyReply } from "fastify";
import { IController } from "../utils/@types";
import { prisma } from "../utils/prisma";

export class TaskController implements IController {
  async create(request: FastifyRequest, reply: FastifyReply) {

  };

  async list(request: FastifyRequest, reply: FastifyReply) {
    
  };

  async search() {

  }

  async update(request: FastifyRequest, reply: FastifyReply) {

  };

  async delete(request: FastifyRequest, reply: FastifyReply) {

  };

  async done() {

  }
}