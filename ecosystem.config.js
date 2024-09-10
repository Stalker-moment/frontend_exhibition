module.exports = {
    apps: [
      {
        name: 'frontend-exhibition',
        exec_mode: 'cluster',
        instances: 4, // Or a number of instances
        script: 'node_modules/next/dist/bin/next',
        args: 'start',
        env: {
          NODE_ENV: 'production',
          PORT: 3060,
        },
      }
    ]
  }