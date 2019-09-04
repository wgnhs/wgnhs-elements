import minify from 'rollup-plugin-minify-es';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';

import { readdirSync } from 'fs';
import { join } from 'path';

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const rootDir = 'src';
const outDir = 'dist';

const extras = {
  'common' : {},
  'notfound': {
    external: [
      'lit-element',
      'wgnhs-common',
      'wgnhs-layout',
    ],
    globals: {
      'lit-element': 'wgnhs-common',
      'wgnhs-common': 'wgnhs-common',
      'wgnhs-layout': 'wgnhs-layout',
    }
  }
}
function getExtras(name) {
  return extras[name] || extras['notfound'];
}


function buildPlugins({min=false}) {
  let result = [];
  result.push(resolve());

  if (min) {
    result.push(minifyHTML());
    result.push(minify({
      output: {
        wrap_iife: true
      }
    }));
  }
  result.push(filesize());
  return result;
}

function buildScripts({dir, filename='index', min=false, format='umd'}) {
  let minifyToken = (min) ? '.min': '';
  let result = {
    input: join(rootDir, dir, `${filename}.js`),
    plugins: buildPlugins({dir, min}),
    external: getExtras(dir).external,
    output: {
      file: join(outDir, `${dir}${minifyToken}.js`),
      format: format,
      name: `wgnhs-${dir}`,
      sourcemap: min,
      globals: getExtras(dir).globals
    }
  }
  return result;
}


export default getDirectories(join(__dirname, rootDir)).reduce((agg, name) => {
  agg.push(buildScripts({dir: name}));
  agg.push(buildScripts({dir: name, min: true}));
  return agg;
}, []);

// export default [
//   buildScripts({dir: 'common'}),
//   buildScripts({dir: 'common', min: true}),
//   buildScripts({dir: 'layout'}),
//   buildScripts({dir: 'layout', min: true})
// ];
