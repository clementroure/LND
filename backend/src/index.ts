import { Elysia } from 'elysia'
//
import { userRoutes } from './routes'
import { error, logger } from './middlewares'

// Create Elysia instance
const app = new Elysia()

// Middlewares
app.use(logger())
app.use(error())

// Root Routes
app.get("/", () => "The backend is running");

// User Routes [api/v1/]
app.use(userRoutes)

// WEBSOCKET
app.ws('/ws', {
  message(ws, message) {
      console.log("Received message: ", message);
      ws.send("Echo: " + message); 
  }
})

// Start the server
app.listen(Bun.env.PORT || 8080)

console.log(
  `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
)