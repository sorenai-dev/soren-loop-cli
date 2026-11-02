#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { parseArgs } from 'node:util'

// Exit codes are a versioned surface (RFC 07 §2.1); only the ones used so far are named here.
const EXIT_OK = 0
const EXIT_USAGE = 2

const USAGE = 'usage: soren-loop [--version] <command> [options]'

function packageVersion(): string {
  const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { version: string }
  return manifest.version
}

function main(argv: string[]): number {
  let parsed
  try {
    parsed = parseArgs({ args: argv, options: { version: { type: 'boolean' } }, allowPositionals: true, strict: true })
  } catch (error) {
    console.error(`soren-loop: ${(error as Error).message}\n${USAGE}`)
    return EXIT_USAGE
  }
  if (parsed.values.version) {
    console.log(packageVersion())
    return EXIT_OK
  }
  console.error(USAGE)
  return EXIT_USAGE
}

process.exitCode = main(process.argv.slice(2))
