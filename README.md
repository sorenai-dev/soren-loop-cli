# soren-loop CLI

The command-line half of [soren-loop](https://github.com/sorenai-dev/soren-loop): it builds an
approved feature request on the owner's machine with Claude Code, inside a sandbox, and opens the
pull request. It also ships the Claude Code plugin (`plugin/`) with the `tdd-pair` skill and the
Ada and Zod reviewers.

> **Status:** pre-release, macOS and Linux only. Nothing is published yet.

## Development

Requires Node 24 (`.nvmrc`), pnpm (pinned in `package.json`), and a checkout of
`sorenai-dev/soren-loop` **next to this one**: until the release gate, `@sorenai/loop-schema`
is linked from `../soren-loop/packages/schema` rather than installed from npm.

```bash
pnpm install
pnpm run ci        # lint + typecheck + tests + build
node dist/index.js --version
```

Every runtime dependency must be justified in [`DEPENDENCIES.md`](DEPENDENCIES.md); CI enforces it.

## License

[Apache-2.0](LICENSE)
