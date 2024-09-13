const redis = require('redis');
const { REDIS_HOST, REDIS_PORT } = require('../utils/Constants');

// connect to redis
const redisClient = redis.createClient({
  socket: {
    port: REDIS_PORT,
    host: REDIS_HOST,
  },
});

const redisConnect = async () => {
  redisClient.on('error', err =>
    console.error('Redis client error:', err)
  );
    redisClient.on('ready', () => 
    console.log('Redis client connected:')
  );

  return redisClient.connect();
};

const setValue = (key, value) => {
  redisClient.set(key, value);
};
const getValue = async (key) => {
  const valueRedis = await redisClient.get(key);
  return valueRedis;
};

module.exports = {
  redisClient,
  redisConnect,
  getValue,
  setValue,
};
