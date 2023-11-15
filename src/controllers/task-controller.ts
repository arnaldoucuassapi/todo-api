import { FastifyRequest, FastifyReply } from "fastify";
import { IController } from "../types";
import { prisma } from "../utils/prisma";
import { z } from "zod";

export class TaskController implements IController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { id: userId } = request.context.tokenValues;
    
    const bodySchema = z.object({
      title: z.string(),
      description: z.string().or(z.undefined())
    });

    const { title, description } = bodySchema.parse(request.body);

    await prisma.task.create({
      data: {
        title,
        description,
        User: {
          connect: {
            id: userId
          }
        }
      },
    });

    return reply.status(201).send();
  };

  async list(request: FastifyRequest, reply: FastifyReply) {
    const { id: userId } = request.context.tokenValues;
    
    const tasks = await prisma.task.findMany({
      where: {
        userId
      },
      select: {
        id: true,
        title: true,
        description: true,
        done: true
      }
    });
    
    return tasks;
  };

  async search() {};

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id: userId } = request.context.tokenValues;

    const paramsSchema = z.object({ id: z.string().uuid() });
    const bodySchema = z.object({
      title: z.string(),
      description: z.string().or(z.undefined()),
      done: z.boolean().or(z.undefined())
    });

    const { id } = paramsSchema.parse(request.params);
    const data = bodySchema.parse(request.body);

    await prisma.task.update({
      data,
      where: {
        id,
        userId
      }
    });

    return reply.status(200).send();
  };

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id: userId } = request.context.tokenValues;

    const paramsSchema = z.object({
      id: z.string().uuid()
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.task.delete({
      where: {
        id,
        userId
      }
    });

    return reply.status(204).send();
  };

  async done(request: FastifyRequest, reply: FastifyReply) {
    const { id: userId } = request.context.tokenValues;
    
    const paramsSchema = z.object({
      id: z.string().uuid()
    });

    const bodySchema = z.object({
      done: z.boolean()
    });

    const { id } = paramsSchema.parse(request.params);
    const { done } = bodySchema.parse(request.body);

    await prisma.task.update({
      data: {
        done
      },
      where: {
        id,
        userId
      }
    });

    return reply.status(200).send();
  };
}