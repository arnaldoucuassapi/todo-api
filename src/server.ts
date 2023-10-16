import { fastify } from "fastify";
import { userRoutes } from "./routes/user-routes";
import { taskRoutes } from "./routes/task-routes";
import { authRoutes } from "./routes/authentication";

const address = 3333;

const app = fastify({
  logger: true
});

app.register(userRoutes);
app.register(authRoutes);

app.register(taskRoutes, {
  prefix: "/tasks"
});

const start = async () => {
  await app.listen({
    port: address,
    host: '0.0.0.0'
  });
  
  console.log(`Server running in port ${address} 🚀`);
}

start();