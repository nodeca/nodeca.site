// Static file handler. Serves all of the files from `public/root` directory
// under the main application root path.

'use strict';


const path    = require('path');
const send    = require('send');
const Promise = require('bluebird');
const eos     = require('end-of-stream');


module.exports = function (N) {
  var root = path.join(__dirname, '../../../../static');


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


  N.wire.on('server_bin:nodeca-site.static', function* static_file_send(env) {
    var req = env.origin.req,
        res = env.origin.res;

    if (req.method !== 'GET' && req.method !== 'HEAD') throw N.io.BAD_REQUEST;

    yield new Promise((resolve, reject) => {
      send(req, env.params.path, { root, index: false, maxAge: '7d' })
        // Errors with status are not fatal,
        // rethrow those up as code, not as Error
        .on('error', err => reject(err.status || err))
        // On success - wait until res no longer writable
        .on('end', () => eos(res, () => resolve()))
        .pipe(res);
    });
  });
};
