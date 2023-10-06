import { FastifyRequest, FastifyReply } from "fastify";
import { IController } from "../utils/@types";
import { prisma } from "../utils/prisma";
import { z } from "zod";

export class UserController implements IController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      avatar: z.string().or(z.undefined()),
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8, "The password has ")
    });

    const { avatar, name, email, password } = bodySchema.parse(request.body);

    await prisma.user.create({
      data: {
        avatar,
        name,
        email,
        password
      }
    });

    return reply.status(201).send();
  };

  async list(request: FastifyRequest, reply: FastifyReply) {
    const users = await prisma.user.findMany();

    return users;
  };

  async get(request: FastifyRequest) {
    const paramsSchema = z.object({
      id: z.string().uuid()
    });

    const { id } = paramsSchema.parse(request.params);

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    });

    return user;
  }

  update(request: FastifyRequest, reply: FastifyReply) {

  };

  delete(request: FastifyRequest, reply: FastifyReply) {

  };
}