import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user-controller";

export async function userRoutes(fastify: FastifyInstance) {
  const userController = new UserController();
  
  fastify.post('/users', userController.create);
  fastify.get('/users', userController.list);
  fastify.get('/users/:id', userController.get);
  fastify.put('/users', userController.update);
  fastify.delete('/users', userController.delete);
}