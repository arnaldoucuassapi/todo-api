import { FastifyInstance } from "fastify";
import { Authentication } from "../controllers/auth-controller";

export async function authRoutes(app: FastifyInstance) {
  const auth = new Authentication();

  app.post("/login", auth.login);
}