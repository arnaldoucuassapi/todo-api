import { FastifyInstance } from "fastify";
import { TaskController } from '../controllers/task-controller';

export async function taskRoutes(fastify: FastifyInstance) {
  const taskController = new TaskController();
  
  fastify.post('/tasks', taskController.create);
  fastify.get('/tasks', taskController.list);
  fastify.put('/tasks', taskController.update);
  fastify.delete('/tasks', taskController.delete);
}