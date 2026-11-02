import { describe, expect, test } from 'vitest'
import { findUndocumentedDependencies } from '../check-deps.mjs'

const doc = `# Runtime dependencies

| Package | Why | Owner |
|---------|-----|-------|
| \`@sorenai/loop-schema\` | Shared API types | soren-loop |
`

describe('findUndocumentedDependencies', () => {
  test('[T002-4] passes when every runtime dependency is listed', () => {
    expect(findUndocumentedDependencies({ dependencies: { '@sorenai/loop-schema': 'link:x' } }, doc)).toEqual([])
  })

  test('[T002-5] reports a runtime dependency missing from DEPENDENCIES.md', () => {
    const pkg = { dependencies: { '@sorenai/loop-schema': 'link:x', 'left-pad': '^1.0.0' } }
    expect(findUndocumentedDependencies(pkg, doc)).toEqual(['left-pad'])
  })

  test('[T002-6] ignores devDependencies and treats a mere substring as not listed', () => {
    const pkg = { dependencies: { '@sorenai/loop': '^1.0.0' }, devDependencies: { vitest: '^5.0.0' } }
    expect(findUndocumentedDependencies(pkg, doc)).toEqual(['@sorenai/loop'])
  })

  test('[T002-7] passes with no dependencies field', () => {
    expect(findUndocumentedDependencies({}, doc)).toEqual([])
  })
})
