import type { Plugin } from 'esbuild';
import { promises as Fs } from 'fs';
import * as Path from 'path';
import { loaderForPath } from '../loaderForPath';

export function decorateDeferredImportsBrowserPlugin(options: { rootDir: string }): Plugin {
  const name = 'decorate-deferred-imports-browser-plugin';
  const rx = /\(\)\s*=>\s*import\(\s*(['"])([^)]+)\1\s*\)/gm;

  return {
    name,
    setup(build) {
      build.onLoad({ filter: /.*/, namespace: 'file' }, async ({ path }) => {
        if (/\/node_modules\//.test(path)) {
          return;
        }

        let contents = await Fs.readFile(path, 'utf8');

        if (!rx.test(contents)) {
          return;
        }

        return {
          loader: loaderForPath(path),
          contents: contents.replace(rx, (_match: string, _quote: string, spec: string) => {
            const lazyImport = Path.resolve(Path.dirname(path), spec);

            return `Object.assign(() => import(${JSON.stringify(
              spec
            )}), { lazyImport: ${JSON.stringify(Path.relative(options.rootDir, lazyImport))} })`;
          }),
        };
      });
    },
  };
}