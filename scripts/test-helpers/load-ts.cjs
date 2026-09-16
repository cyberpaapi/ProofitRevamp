const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Run the actual server modules with only their external I/O boundaries replaced.
module.exports = function createLoader(overrides = {}) {
  const cache = new Map();
  function load(filename) {
    filename = path.resolve(filename);
    if (filename.endsWith('.json')) return JSON.parse(fs.readFileSync(filename, 'utf8'));
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    }).outputText;
    const localRequire = name => {
      if (Object.hasOwn(overrides, name)) return overrides[name];
      if (name === 'server-only') return {};
      if (name.startsWith('@/') || name.startsWith('.')) {
        let resolved = name.startsWith('@/') ? path.resolve(name.slice(2)) : path.resolve(path.dirname(filename), name);
        if (!path.extname(resolved)) resolved += '.ts';
        return load(resolved);
      }
      return require(name);
    };
    vm.runInThisContext(`(function(require,module,exports){${code}\n})`, { filename })(localRequire, module, module.exports);
    return module.exports;
  }
  return load;
};
