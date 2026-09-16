import { relative } from 'node:path'

// Vault content is Enveloppe-managed and excluded from formatting/linting;
// commits that only touch content/ must not fail here for lack of files.
// lint-staged passes absolute paths, so compare against the repo-relative path.
const EXCLUDED_DIRS = ['content', '.velite', 'public/static']

const isExcluded = (file) => {
  const rel = relative(process.cwd(), file)
  return EXCLUDED_DIRS.some((dir) => rel === dir || rel.startsWith(`${dir}/`))
}

const editableFiles = (files) => files.filter((f) => !isExcluded(f))

const shellQuote = (f) => `'${f.replace(/'/g, `'\\''`)}'`

const withFiles = (command, files) => `${command} ${files.map(shellQuote).join(' ')}`

const oxfmt = (files) => {
  const editable = editableFiles(files)
  return editable.length ? [withFiles('bun --bun oxfmt', editable)] : []
}

const oxlintAndFmt = (files) => {
  const editable = editableFiles(files)
  if (!editable.length) return []
  return [withFiles('bun --bun oxlint --fix', editable), withFiles('bun --bun oxfmt', editable)]
}

const config = {
  '*.md': oxfmt,
  '**/*.{js,jsx,mjs,cjs,ts,tsx}': oxlintAndFmt,
  '**/*.{json,css}': oxfmt,
}

export default config
