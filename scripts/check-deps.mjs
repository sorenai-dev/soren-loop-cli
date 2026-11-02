#!/usr/bin/env node
// Fails when a runtime dependency is not justified in DEPENDENCIES.md (RFC 02 §2: a small,
// auditable dependency tree for the code that runs next to source and the Claude login).
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

export function findUndocumentedDependencies(manifest, markdown) {
  const listed = new Set([...markdown.matchAll(/`([^`]+)`/g)].map((match) => match[1]))
  return Object.keys(manifest.dependencies ?? {}).filter((name) => !listed.has(name))
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const manifest = JSON.parse(readFileSync('package.json', 'utf8'))
  const missing = findUndocumentedDependencies(manifest, readFileSync('DEPENDENCIES.md', 'utf8'))
  for (const name of missing) console.error(`${name} is a runtime dependency but is not listed in DEPENDENCIES.md`)
  process.exit(missing.length > 0 ? 1 : 0)
}
