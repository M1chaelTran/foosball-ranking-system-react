const toRegExp = require('path-to-regexp');

function escape(text) {
  return text.replace('\'', '\\\'').replace('\\', '\\\\');
}

/**
 * Converts application routes from JSON to JavaScript. For example, a route like
 *
 *   {
 *     "path": "/about",
 *     "page": "./about"
 *   }
 *
 * becomes
 *
 *   {
 *     path: '/about',
 *     pattern: /^\\/about(?:\/(?=$))?$/i,
 *     keys: [],
 *     page: './about',
 *     load: function () { return new Promise(resolve => require(['./about'], resolve)); }
 *   }
 */
module.exports = function routesLoader(source) {
  this.cacheable();

  const output = ['[\n'];
  const routes = JSON.parse(source);

  for (const route of routes) { // eslint-disable-line no-restricted-syntax
    const keys = [];
    const pattern = toRegExp(route.path, keys);
    const require = route.chunk && route.chunk === 'main' ?
      module => `Promise.resolve(require('${escape(module)}').default)` :
      module => `new Promise(function (resolve, reject) {
        try {
          require.ensure(['${escape(module)}'], function (require) {
            resolve(require('${escape(module)}').default);
          }${typeof route.chunk === 'string' ? `, '${escape(route.chunk)}'` : ''});
        } catch (err) {
          reject(err);
        }
      })`;
    output.push('  {\n');
    output.push(`    path: '${escape(route.path)}',\n`);
    output.push(`    pattern: ${pattern.toString()},\n`);
    output.push(`    keys: ${JSON.stringify(keys)},\n`);
    output.push(`    page: '${escape(route.page)}',\n`);
    if (route.players) {
      output.push(`    data: ${JSON.stringify(route.players)},\n`);
    }
    output.push(`    load() {\n      return ${require(route.page)};\n    },\n`); // eslint-disable-line import/no-dynamic-require
    output.push('  },\n');
  }

  output.push(']');

  return `export default ${output.join('')};`;
};
