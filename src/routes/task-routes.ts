import { FastifyInstance } from "fastify";
import { TaskController } from '../controllers/task-controller';
import { authMiddleware } from "../middlewares/authMiddleware";

export async function taskRoutes(fastify: FastifyInstance) {
  const taskController = new TaskController();
  
  fastify.post('/create', {
    preHandler: authMiddleware
  }, taskController.create);
  
  fastify.get('/', {
    preHandler: authMiddleware
  }, taskController.list);
  
  fastify.get('/?search', taskController.search);
  fastify.put('/update/:id', taskController.update);
  fastify.delete('/delete/:id', taskController.delete);
  fastify.delete('/done/:id', taskController.done);
}