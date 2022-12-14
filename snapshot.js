//import { ServerSnapshot } from 'react-prerender-it'
const { join } = require('path');
/**
 * @type {import('react-prerender-it')['ServerSnapshot']}
 */
let ServerSnapshot;
if (/dev/i.test(process.env.NODE_ENV)) {
  ServerSnapshot = require('../').ServerSnapshot;
} else {
  ServerSnapshot = require('react-prerender-it').ServerSnapshot;
}

ServerSnapshot({
  source: join(__dirname, 'build'),
  dest: join(__dirname, 'tmp/generated'),
  registerStatic: [],
  routes: [],
  autoRoutes: true,
  callback: function () {
    console.log('snapshot done', 'dev=' + /dev/i.test(process.env.NODE_ENV));
  }
});
