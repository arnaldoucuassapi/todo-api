import { fastify } from "fastify";
import { userRoutes } from "./routes/user-routes";
import { itemRoutes } from "./routes/item-routes";

const address = 3333;

const app = fastify({
  logger: true
});

app.register(userRoutes);
app.register(itemRoutes);

const start = async () => {
  await app.listen({
    port: address,
    host: '0.0.0.0'
  });
  
  console.log(`Server running in port ${address} 🚀`);
}

start();