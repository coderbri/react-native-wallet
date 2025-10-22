import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        // In a real-world app, you'd use a userId or IP address as a key.
        const { success } = await ratelimit.limit("my-rate-limit")
        
        if (!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later."
            })
        }
        
        next();
    } catch (error) {
        console.log("Rate limit error:", error);
        next(error);
    }
}

export default rateLimiter;