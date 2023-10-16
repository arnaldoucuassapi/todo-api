import { FastifyInstance } from "fastify";
import { TaskController } from '../controllers/task-controller';

export async function taskRoutes(fastify: FastifyInstance) {
  const taskController = new TaskController();
  
  fastify.post('/create', taskController.create);
  fastify.get('/', taskController.list);
  fastify.get('/?search', taskController.search);
  fastify.put('/update/:id', taskController.update);
  fastify.delete('/delete/:id', taskController.delete);
  fastify.delete('/done/:id', taskController.done);
}