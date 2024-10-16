"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.createPost = exports.signinBody = exports.signupBody = void 0;
const zod_1 = require("zod");
exports.signupBody = zod_1.z.object({
    email: zod_1.z.string().email().min(3),
    password: zod_1.z.string().min(3),
    name: zod_1.z.string().min(3),
});
exports.signinBody = zod_1.z.object({
    email: zod_1.z.string().email().min(3),
    password: zod_1.z.string().min(3),
});
exports.createPost = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updatePost = zod_1.z.object({
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
});
