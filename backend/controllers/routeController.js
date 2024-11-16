const Route = require('../models/Route');
const cacheService = require('../services/cacheService');

exports.getRoutes = async (req, res) => {
  const cacheKey = 'routes';

  cacheService.getCache(cacheKey, async (cachedRoutes) => {
    if (cachedRoutes) {
      return res.status(200).json(cachedRoutes);
    } else {
      const routesFromDb = await Route.find();
      cacheService.setCache(cacheKey, routesFromDb); // Stockage dans le cache
      return res.status(200).json(routesFromDb);
    }
  });
};
