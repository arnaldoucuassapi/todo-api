import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user-controller";
import { authMiddleware } from "../middlewares/authMiddleware";

export async function userRoutes(fastify: FastifyInstance) {
  const userController = new UserController();
  
  fastify.post('/users', userController.create);
  fastify.get('/users', userController.list);

  fastify.get('/user', {
    preHandler: authMiddleware
  }, userController.get);
  
  fastify.put('/users/:id', userController.update);
  fastify.delete('/users/:id', userController.delete);
}