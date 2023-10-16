import { FastifyRequest, FastifyReply } from "fastify";
import { IController } from "../utils/@types";
import { prisma } from "../utils/prisma";
import { z } from "zod";
import { DecodedTokenResponseType, verifyToken } from "../utils/verify-token";

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
    const users = await prisma.user.findMany({
      select: {
        avatar: true,
        name: true,
        email: true
      }
    });

    return users;
  };

  async get(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.context.tokenValues;

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id
        }
      });

      return user;
    } catch (err) {
      return reply.status(401).send(err);
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string().uuid()
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      avatar: z.string(),
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    });

    const { avatar, name, email, password } = bodySchema.parse(request.body);

    await prisma.user.update({
      where: {
        id
      },
      data: {
        avatar,
        name,
        email,
        password
      }
    })

    return reply.status(204).send();
  };

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string().uuid()
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.user.delete({
      where: {
        id
      }
    });

    return reply.status(204).send();
  };
}