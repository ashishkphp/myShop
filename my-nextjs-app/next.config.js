module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false;
    }
    return config;
  },
};
module.exports = {
  basePath: '/my-shop',
  trailingSlash: true, 
};
