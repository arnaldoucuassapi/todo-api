import { FastifyInstance } from "fastify";
import { ItemController } from './../controllers/item-controller';

export async function itemRoutes(fastify: FastifyInstance) {

  const itemController = new ItemController();
  
  fastify.post('/item', itemController.create);
  fastify.get('/items', itemController.list);
  fastify.put('/item', itemController.update);
  fastify.delete('/item', itemController.delete);
}