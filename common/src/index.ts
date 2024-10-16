import { z } from "zod";

export const signupBody = z.object({
  email: z.string().email().min(3),
  password: z.string().min(3),
  name: z.string().min(3),
});

export type signupParams = z.infer< typeof signupBody >;


export const signinBody = z.object({
  email: z.string().email().min(3),
  password: z.string().min(3),
});

export type signinParams = z.infer< typeof signinBody >;


export const createPost = z.object({
  title: z.string(),
  content: z.string(),
});

export type createPostParams = z.infer< typeof createPost >;


export const updatePost = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export type updatePostParams = z.infer< typeof updatePost >;
