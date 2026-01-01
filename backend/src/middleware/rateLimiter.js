import ratelimiting from "../config/upstash.js";

export default async function rateLimiter(req, res, next) {
  try {
    const { success } = await ratelimiting.limit("limitless");
    if (!success) {
      return res.status(429).json({ message: "Too many requests try again" });
    }
    next();
  } catch (error) {
    console.log("error in rate limiter", error);
    next();
  }
}
