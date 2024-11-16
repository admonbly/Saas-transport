// services/cacheService.js
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

module.exports = {
  setCache: (key, data, expiry = 3600) => {
    client.setex(key, expiry, JSON.stringify(data));
  },
  getCache: (key, callback) => {
    client.get(key, (err, data) => {
      if (err) throw err;
      if (data) {
        callback(JSON.parse(data));
      } else {
        callback(null);
      }
    });
  }
};
