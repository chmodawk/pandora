'use strict';
const pkg = require('../index');

exports[pkg.pluginName] = {
  enable: true,
  components: {
    fileLoggerService: {
      path: require.resolve('@pandorajs/component-file-logger-service'),
    },
    reporterFile: {
      path: require.resolve('@pandorajs/component-reporter-file'),
    },
    instrumentEgg: {
      path: require.resolve('@pandorajs/component-instrument-egg'),
    },
    instrumentNode: {
      path: require.resolve('@pandorajs/component-instrument-node'),
    },
    logger: {
      path: require.resolve('@pandorajs/component-logger'),
    },
    metric: {
      path: require.resolve('@pandorajs/component-metric'),
    },
    trace: {
      path: require.resolve('@pandorajs/component-trace'),
    },
  },
  trace: {
    plugins: {
      http: {
        enabled: true,
        path: require.resolve('@opentelemetry/plugin-http'),
      },
      https: {
        enabled: true,
        path: require.resolve('@opentelemetry/plugin-https'),
      },
    },
  },
};
