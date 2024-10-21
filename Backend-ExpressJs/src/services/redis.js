import redis from 'redis';
import { CONFIG } from '../utils/Constants.js';

// connect to redis
const redisClient = redis.createClient({
    socket: {
        port: CONFIG.REDIS_PORT,
        host: CONFIG.REDIS_HOST,
    },
});

const redisConnect = async () => {
    redisClient.on('error', (err) => console.error('Redis client error:', err));
    redisClient.on('ready', () => console.log('Redis client connected:'));

    return redisClient.connect();
};

const setValue = (key, value) => {
    redisClient.set(key, value);
};
const getValue = async (key) => {
    const valueRedis = await redisClient.get(key);
    return valueRedis;
};

export { redisClient, redisConnect, getValue, setValue };
