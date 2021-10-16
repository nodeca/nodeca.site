// Static file handler. Serves all of the files from `public/root` directory
// under the main application root path.

'use strict';


const path         = require('path');
const send         = require('send');
const { pipeline } = require('stream/promises');

module.exports = function (N) {
  let root = path.join(__dirname, '../../../../static');


  N.validate('server_bin:nodeca-site.static', {
    // DON'T validate unknown params - those can exists,
    // if someone requests '/myfile.txt?xxxx' instead of '/myfile.txt/
    additionalProperties: true,
    properties: {
      path: {
        type: 'string',
        required: true
      }
    }
  });


  N.wire.on('server_bin:nodeca-site.static', async function static_file_send(env) {
    let req = env.origin.req,
        res = env.origin.res;

    if (req.method !== 'GET' && req.method !== 'HEAD') throw N.io.BAD_REQUEST;

    try {
      const ss = send(req, env.params.path, { root, index: false, maxAge: '1y' });

      try {
        await pipeline(ss, res);
      } catch (err) {
        // Suppress "premature close" errors (if client stops reading)
        if (err.code !== 'ERR_STREAM_PREMATURE_CLOSE') throw err;
      }
      if (res.statusCode) env.status = res.statusCode;

    } catch (err) {
      // Errors with status are not fatal,
      // rethrow those up as code, not as Error
      throw err.status || err;
    }
  });
};
