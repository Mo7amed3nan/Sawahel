import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();
// Create a new ratelimiter, that allows 100 requests per 10 minutes
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '10 m'),
});

export default ratelimit;
