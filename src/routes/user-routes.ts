import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user-controller";

export function userRoutes(fastify: FastifyInstance) {

  const userController = new UserController();
  
  fastify.post('/user', userController.create);
  fastify.get('/users', userController.list);
  fastify.put('/user', userController.update);
  fastify.delete('/user', userController.delete);
}