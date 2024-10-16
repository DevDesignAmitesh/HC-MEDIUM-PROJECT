import { Hono } from "hono";
import { userRouter } from "../routes/user";
import { blogRouter } from "../routes/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    jwtPayload: string;
  };
}>();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app;
