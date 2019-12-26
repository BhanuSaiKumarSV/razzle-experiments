import * as expressStaticGzip from 'express-static-gzip'

import App from './App';
import React from 'react';
import { Capture } from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import stats from '../build/react-loadable.json';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(process.env.RAZZLE_PUBLIC_DIR, expressStaticGzip(process.env.RAZZLE_PUBLIC_DIR, {
    enableBrotli: true,
    orderPreference: ['gz', 'br'],
    serveStatic: {
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000')
      }
    }
  }
 ))
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const modules = [];
    const markup = renderToString(
      <Capture report={moduleName => modules.push(moduleName)}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Capture>,
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      const bundles = getBundles(stats, modules);
      const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'));

      res.status(200).send(
        `<!doctype html>
<html lang="">
  <head>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <title>Welcome to Razzle</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${assets.client.css
      ? `<link rel="stylesheet" href="https://s3.eu-west-3.amazonaws.com/assets.auto-poc-razzle.co/public${assets.client.css}">`
      : ''}
  </head>
  <body>
    <div id="root">${markup}</div>
    ${process.env.NODE_ENV === 'production'
      ? `<script src="https://s3.eu-west-3.amazonaws.com/assets.auto-poc-razzle.co/public${assets.client.js}"></script>`
      : `<script src="https://s3.eu-west-3.amazonaws.com/assets.auto-poc-razzle.co/public${assets.client.js}"></script>`}
    ${chunks.map(chunk => `<script src="https://s3.eu-west-3.amazonaws.com/assets.auto-poc-razzle.co/public/${chunk.file}"></script>`).join('\n')}
  </body>
</html>`,
      );
    }
  });

export default server;
