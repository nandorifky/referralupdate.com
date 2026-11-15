import { readdir, readFile } from 'node:fs/promises';
import { basename, dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isMap, isScalar, isSeq, parse, parseDocument } from 'yaml';
import type { Loader } from 'astro/loaders';

type Logger = { warn: (message: string) => void };

/** Mengumpulkan jalur field yang memakai blok lipat `>-` tetapi berisi baris kosong. */
function foldedParagraphFields(node: unknown, path: string[], out: string[]) {
  if (isScalar(node)) {
    if (node.type === 'BLOCK_FOLDED' && typeof node.value === 'string' && node.value.includes('\n')) {
      out.push(path.join('.'));
    }
    return;
  }
  if (isMap(node)) {
    for (const item of node.items) {
      const key = isScalar(item.key) ? String(item.key.value) : String(item.key);
      foldedParagraphFields(item.value, [...path, key], out);
    }
    return;
  }
  if (isSeq(node)) {
    node.items.forEach((item, index) => foldedParagraphFields(item, [...path, String(index)], out));
  }
}

/**
 * Blok lipat YAML (`>-`) melipat satu baris kosong menjadi satu baris baru saja,
 * sehingga pemisah paragraf yang ditulis penulis hilang tanpa peringatan.
 * Fungsi ini melaporkan scalar `>-` yang tetap mengandung baris baru setelah
 * dilipat: itu tandanya penulis berniat memisahkan paragraf dan harus memakai
 * blok literal (`|-`).
 */
export function warnFoldedParagraphs(contents: string, label: string, logger: Logger) {
  const fields: string[] = [];
  foldedParagraphFields(parseDocument(contents).contents, [], fields);
  for (const field of fields) {
    logger.warn(
      `${label}: field ${field} memakai blok lipat ">-" tetapi berisi baris kosong. ` +
        'Blok lipat hanya menghasilkan satu baris baru, jadi paragraf tidak terpisah. Pakai "|-" agar tiap baris kosong menjadi paragraf.',
    );
  }
}

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
        warnFoldedParagraphs(contents, `${base}/${file}`, logger);
        const raw = parse(contents);
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
          throw new Error(`Entry ${base}/${file} must be a YAML object.`);
        }
        const id = basename(file, '.yaml');
        const filePath = relative(fileURLToPath(config.root), fileURLToPath(fileUrl));
        const data = await parseData({
          id,
          data: raw as Record<string, unknown>,
          filePath,
        });
        store.set({ id, data, filePath, digest: generateDigest(contents) });
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
