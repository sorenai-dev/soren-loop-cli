# Runtime Dependencies

The CLI runs next to the owner's source code and their Claude login, so every runtime dependency
must be justified here (RFC `02` §2). `scripts/check-deps.mjs` fails CI when a package in
`dependencies` is missing from this table. Development dependencies are not listed.

| Package | Why | Source |
|---------|-----|--------|
| `@sorenai/loop-schema` | Shared API types and canonical hashing vectors with the server | `sorenai-dev/soren-loop`, linked locally until the go-public gate (decision 35) |
