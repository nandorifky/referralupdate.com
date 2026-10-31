import { readdir, readFile } from 'node:fs/promises';
import { basename, dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import type { Loader } from 'astro/loaders';

/**
 * Astro's glob loader only registers JSON as a data entry type, so one YAML
 * file per entry needs this small loader. Same contract: one file, one entry,
 * id from the file name.
 */
export function yamlCollection(base: string): Loader {
  return {
    name: 'yaml-collection',
    load: async ({ config, store, parseData, generateDigest, logger, watcher }) => {
      const dir = new URL(base.endsWith('/') ? base : `${base}/`, config.root);
      const dirPath = fileURLToPath(dir);

      async function sync(file: string) {
        const fileUrl = new URL(file, dir);
        const contents = await readFile(fileUrl, 'utf8');
        const raw = parse(contents);
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
          throw new Error(`Entry ${base}/${file} must be a YAML object.`);
        }
        const id = basename(file, '.yaml');
        const data = await parseData({
          id,
          data: raw as Record<string, unknown>,
          filePath: relative(fileURLToPath(config.root), fileURLToPath(fileUrl)),
        });
        store.set({ id, data, digest: generateDigest(contents) });
      }

      const files = (await readdir(dirPath)).filter((file) => file.endsWith('.yaml')).sort();
      if (files.length === 0) {
        logger.warn(`No YAML entries found in ${base}`);
      }
      for (const file of files) {
        await sync(file);
      }

      if (watcher) {
        watcher.add(dirPath);
        watcher.on('change', async (changed) => {
          if (resolve(dirname(changed)) !== resolve(dirPath) || !changed.endsWith('.yaml')) return;
          try {
            await sync(basename(changed));
          } catch (error) {
            logger.error(`Failed to reload ${changed}: ${(error as Error).message}`);
          }
        });
      }
    },
  };
}
