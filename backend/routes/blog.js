import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPost, updatePost } from "@amitesh252/common-medium";

export const blogRouter = new Hono();

blogRouter.use("/blog/*", async (c, next) => {
  const authToken = c.req.header("Authorization");
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return c.json(
      {
        message: "Token not found or Invalid token",
      },
      403
    );
  }
  const token = authToken.split(" ")[1];
  const decoded = await verify(token, c.env.JWT_SECRET);
  c.set("jwtPayload", decoded.id);
  await next();
});
blogRouter.get("/blog/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  const blogs = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  if (!blogs) {
    return c.json({
      message: "Blogs not found",
    });
  }
  return c.json({
    blogs,
  });
});
blogRouter.get("/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({});
  if (!blogs) {
    return c.json({
      message: "Blogs not found",
    });
  }
  return c.json({
    blogs,
  });
});
blogRouter.post("/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const authId = c.get("jwtPayload");
  if (!authId) {
    return c.json({
      message: "you are not authenticated for posting blogs",
    });
  }
  const body = await c.req.json();
  const { success } = createPost.safeParse(body);
  if (!success) {
    return c.json({
      message: "Invalid inputs",
    });
  }
  const newBlog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authId,
    },
  });
  return c.json({
    message: "New blog created",
    newBlog,
  });
});
blogRouter.put("/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const authId = c.get("jwtPayload");
  if (!authId) {
    return c.json({
      message: "you are not authenticated for posting blogs",
    });
  }
  const body = await c.req.json();
  const { success } = updatePost.safeParse(body);
  if (!success) {
    return c.json({
      message: "Invalid inputs",
    });
  }
  const editedBlog = await prisma.post.update({
    where: {
      id: body.id,
      authorId: authId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    message: "Blog edited",
    editedBlog,
  });
});
blogRouter.delete("/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const authId = c.get("jwtPayload");
  if (!authId) {
    return c.json({
      message: "you are not authenticated for deleting blogs",
    });
  }
  const body = await c.req.json();
  if (!body) {
    return c.json({
      message: "body is required",
    });
  }
  try {
    const deletedBlog = await prisma.post.delete({
      where: {
        id: body.id,
      },
    });
    return c.json({
      message: "Blog deleted successfully",
      deletedBlog,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return c.json(
      {
        message: "Internal Server Error",
      },
      500
    );
  }
});
