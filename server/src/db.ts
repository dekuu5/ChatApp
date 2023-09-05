import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL;

const prisma = new PrismaClient();
const redisClient = createClient({
  url: REDIS_URL
});

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

export { prisma, redisClient };