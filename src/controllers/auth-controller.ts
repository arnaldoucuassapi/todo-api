import { FastifyReply, FastifyRequest } from "fastify";
import { IAuth } from "../utils/@types";
import { z } from "zod";
import { prisma } from "../utils/prisma";
import { generateToken } from '../utils/generate-token';

export class Authentication implements IAuth {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string()
    });

    const { email, password } = bodySchema.parse(request.body);

    const userId = await prisma.user.findUnique({
      where: {
        email,
        password
      },
      select: {
        id: true
      }
    });

    if (!userId) {
      return reply.status(404).send();
    }

    const token = generateToken(userId);

    return {
      token
    };
  }
}