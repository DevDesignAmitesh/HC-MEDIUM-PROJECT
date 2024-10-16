import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupBody, signinBody } from "@amitesh252/common-medium";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    jwtPayload: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupBody.safeParse(body);

  if (!success) {
    return c.json({
      message: "Invalid inputs",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existingUser) {
    return c.json({
      message: "User already exists",
    });
  }

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  });

  const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);

  return c.json({
    message: "User created successfully",
    token,
  });
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinBody.safeParse(body);

  if (!success) {
    return c.json({
      message: "Invalid inputs",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return c.json({
      message: "User does not exist",
    });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    token,
  });
});
