import { warnFoldedParagraphs } from '../src/lib/yaml-loader.ts';

const cases = {
  'folded + blank line (harus WARN)': 'summary: >-\n  paragraf satu.\n\n  paragraf dua.\n',
  'folded tanpa blank line (aman)': 'summary: >-\n  satu\n  paragraf saja.\n',
  'literal + blank line (aman)': 'summary: |-\n  paragraf satu.\n\n  paragraf dua.\n',
  'literal tanpa blank line (aman)': 'summary: |-\n  baris satu\n  baris dua.\n',
  'nested faq folded + blank line (harus WARN)':
    'faqs:\n  - q: tanya\n    a: >-\n      paragraf satu.\n\n      paragraf dua.\n',
  'nested faq literal (aman)': 'faqs:\n  - q: tanya\n    a: |-\n      paragraf satu.\n\n      paragraf dua.\n',
};

let failures = 0;
for (const [name, yaml] of Object.entries(cases)) {
  const warnings = [];
  warnFoldedParagraphs(yaml, 'probe.yaml', { warn: (m) => warnings.push(m) });
  const expectWarn = name.includes('harus WARN');
  const got = warnings.length > 0;
  const ok = got === expectWarn;
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}  -> warn=${got}`);
  if (warnings.length) console.log('      ', warnings[0]);
}
console.log(failures === 0 ? 'ALL PASS' : `${failures} FAILED`);
process.exit(failures === 0 ? 0 : 1);
