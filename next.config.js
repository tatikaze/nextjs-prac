module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
        'date-fns': 'empty'
      }
    }

    return config
  }
}
