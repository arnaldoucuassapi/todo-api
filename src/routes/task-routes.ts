import { FastifyInstance } from "fastify";
import { TaskController } from '../controllers/task-controller';

export async function taskRoutes(fastify: FastifyInstance) {
  const taskController = new TaskController();
  
  fastify.post('/tasks/create', taskController.create);
  fastify.get('/tasks', taskController.list);
  fastify.get('/task?search', taskController.search);
  fastify.put('/tasks/update/:id', taskController.update);
  fastify.delete('/tasks/delete/:id', taskController.delete);
  fastify.delete('/tasks/done/:id', taskController.done);
}