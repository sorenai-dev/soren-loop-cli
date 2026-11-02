import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { expect, test } from 'vitest'

const ENTRY = fileURLToPath(new URL('../src/index.ts', import.meta.url))
const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as { version: string }

function cli(...args: string[]) {
  return spawnSync(process.execPath, [ENTRY, ...args], { encoding: 'utf8' })
}

test('[T002-1] --version prints the package version and exits 0', () => {
  const run = cli('--version')
  expect(run.status).toBe(0)
  expect(run.stdout.trim()).toBe(version)
})

test('[T002-2] an unknown option is a usage error: exit 2 with the reason on stderr', () => {
  const run = cli('--no-such-flag')
  expect(run.status).toBe(2)
  expect(run.stdout).toBe('')
  expect(run.stderr).toMatch(/no-such-flag/)
})

test('[T002-3] no command is a usage error: exit 2 with usage on stderr', () => {
  const run = cli()
  expect(run.status).toBe(2)
  expect(run.stderr).toMatch(/usage: soren-loop/)
})
