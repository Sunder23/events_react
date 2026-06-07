"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createEventSchema = zod_1.default.object({
    title: zod_1.default.string().trim().min(2).max(200),
    description: zod_1.default.string().trim().min(1),
    capacity: zod_1.default.number().int().nonnegative(),
    address: zod_1.default.string().trim().min(1).max(255),
    startDate: zod_1.default.string().transform((date) => new Date(date)),
    endDate: zod_1.default.string().transform((date) => new Date(date)),
});
