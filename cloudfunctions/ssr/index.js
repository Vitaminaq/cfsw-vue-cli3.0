const serverless = require('serverless-http');
const { createServer } = require('./server');

exports.main = async (event, context) => {
    const { app } = await createServer();
    return serverless(app, {
        binary: [
          'application/javascript',
          'application/octet-stream',
          'application/xml',
          'font/eot',
          'font/opentype',
          'font/otf',
          'image/*',
          'video/*',
          'audio/*',
          'text/comma-separated-values',
          'text/css',
          'text/javascript',
          'text/plain',
          'text/text',
          'text/xml',
        ],
      })(event, context);
};
