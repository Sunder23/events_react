"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.validateEnv = validateEnv;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.env = {
    nodeEnv: process.env.NODE_ENV || "development",
    host: process.env.HOST || "0.0.0.0",
    port: Number(process.env.PORT || 3000),
    databaseUrl: process.env.DATABASE_URL || "",
    jwtSecret: process.env.JWT_SECRET || "",
};
function validateEnv() {
    if (!exports.env.databaseUrl) {
        throw new Error("DATABASE_URL is not defined");
    }
    if (!exports.env.jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }
}
;
