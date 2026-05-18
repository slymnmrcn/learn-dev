# Contributing

## Local Flow

1. Install dependencies with `npm install`.
2. Run `npm run typecheck` before opening a PR.
3. Run `npm run lint` and `npm run format:check`.
4. Keep content changes in JSON data files unless a UI behavior change is required.

## Data Rules

- `src/data/modules/*.json` is the source of truth for learning modules.
- Keep topic and lesson records consistent with `src/types.ts`.
- Do not duplicate module content in screen files.
- Code examples should display raw source code, not HTML-escaped entities.

## Pull Request Scope

Keep PRs focused: data update, UI behavior change, navigation change, or tooling change. When a PR touches shared components or navigation types, include a short risk note in the PR description.
