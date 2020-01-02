const { ReactLoadablePlugin } = require('react-loadable/webpack');
var BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');

module.exports = {
  modify: (config, { target }) =>
    target === 'web'
      ? {
          ...config,
          plugins: [
            ...config.plugins,
            new ReactLoadablePlugin({
              filename: './build/react-loadable.json',
            }),
            new BrotliGzipPlugin({
              asset: '/br/[path][query]',
              // asset: '[path].br[query]',
              algorithm: 'brotli',
              test: /\.(js|css|html|svg)$/,
              threshold: 1024,
              minRatio: 0.7,
              quality: 11
          })
        //   new BrotliGzipPlugin({
        //     asset: '/gzip/[path]',
        //     // asset: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     test: /\.(js|css|html|svg)$/,
        //     threshold: 10240,
        //     minRatio: 1
        // })
          ],
        }
      : config,
};
