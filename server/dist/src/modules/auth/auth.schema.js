"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const emailFields = zod_1.default
    .string()
    .trim()
    .pipe(zod_1.default.email('Invalid email address'))
    .transform((email) => email.toLowerCase());
exports.registerSchema = zod_1.default.object({
    email: emailFields,
    password: zod_1.default.string().min(8, 'Password must be at least 8 characters long'),
    name: zod_1.default.string().trim().min(2, 'Name must be at least 2 characters long').max(100, 'Name must be at most 100 characters long')
});
exports.loginSchema = zod_1.default.object({
    email: emailFields,
    password: zod_1.default.string().min(1, 'Password is required'),
});
