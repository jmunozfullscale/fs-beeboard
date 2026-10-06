# 🔬 Testing Evidence: Vite + Vitest + Cypress CI Generator

This document provides empirical evidence that the `vite-ci-pipeline-generator` prompt template meets the Activity 1 Floor requirement:
> **Floor Requirement**: Evidence it was tested on a second, different real task — not just the original.

---

## 🎯 Test Run 1: Original Task (`fs-beeboard`)
- **Repository Context**: Svelte 5 + Vite 8.3 + Vitest 5.0 + Cypress 16.1 + npm
- **Target File**: `fs-beeboard/.github/workflows/ci.yml`

### Execution Details:
The prompt analyzed `package.json`, `vite.config.js`, and `cypress.config.js`:
- Detected Package Manager: `npm` (via `package-lock.json`)
- Detected Unit Test Script: `npm run test:unit` (`vitest run`)
- Detected E2E Test Script: `npm run test:e2e` (`cypress run`)
- Detected Dev Server: `npm run dev` running on `http://localhost:5173`

### Generated Output:
```yaml
name: CI Tests

on:
  push:
    branches: [ "main", "master", "develop" ]
  pull_request:
    branches: [ "main", "master", "develop" ]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  unit-tests:
    name: Run Unit Tests (Vitest)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Vitest
        run: npm run test:unit

  e2e-tests:
    name: Run E2E Tests (Cypress)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Cypress E2E Testing
        uses: cypress-io/github-action@v6
        with:
          start: npm run dev
          wait-on: 'http://localhost:5173'
          wait-on-timeout: 120

      - name: Upload Cypress Screenshots
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots
          if-no-files-found: ignore
```

### Observations & Validation:
- Correctly avoided using `npm start` (which fails in Vite apps) and used `npm run dev`.
- Properly configured `wait-on: 'http://localhost:5173'`.
- Added concurrency controls to terminate outdated runs immediately.

---

## 🎯 Test Run 2: Second, Different Real Task (`react-ts-portal`)
- **Repository Context**: React 19 + TypeScript + Vite + PNPM + Vitest (in-source & component tests) + Cypress E2E with custom port `3000`
- **Configuration Differences from Task 1**:
  - Package Manager: `pnpm` with `pnpm-lock.yaml` (requires `pnpm/action-setup`)
  - Node version: `20.x`
  - Scripts: `"test": "vitest run --coverage"`, `"cy:run": "cypress run"`, `"dev": "vite --port 3000"`
  - Port: `3000` instead of default `5173`
  - TypeScript checking step: `"typecheck": "tsc --noEmit"`

### Tech Stack Scan Performed by Prompt:
1. Detected `pnpm-lock.yaml` -> Switched runner strategy to use `pnpm/action-setup@v3` + `cache: 'pnpm'`.
2. Detected custom port `3000` in `vite.config.ts` -> Set `wait-on: 'http://localhost:3000'`.
3. Detected `typecheck` script -> Added pre-flight type checking to unit test job to catch compile errors before test execution.

### Generated Output:
```yaml
name: CI Pipeline

on:
  push:
    branches: [ "main", "master", "develop" ]
  pull_request:
    branches: [ "main", "master", "develop" ]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint-and-unit:
    name: Typecheck & Vitest
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Typecheck
        run: pnpm run typecheck

      - name: Run Vitest with Coverage
        run: pnpm run test

  e2e-tests:
    name: Cypress E2E
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Cypress E2E Testing
        uses: cypress-io/github-action@v6
        with:
          install: false
          command: pnpm run cy:run
          start: pnpm run dev
          wait-on: 'http://localhost:3000'
          wait-on-timeout: 120

      - name: Upload Cypress Screenshots
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: cypress-screenshots-react
          path: cypress/screenshots
          if-no-files-found: ignore

      - name: Upload Cypress Videos
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: cypress-videos-react
          path: cypress/videos
          if-no-files-found: ignore
```

### Generalization Proof:
| Capability | Task 1 (Svelte + npm) | Task 2 (React TS + pnpm) | Generalization Verification |
| :--- | :--- | :--- | :--- |
| **Package Manager** | `npm` / `npm ci` | `pnpm` / `pnpm install --frozen-lockfile` | Successfully adapted without manual editing |
| **Port Detection** | `5173` | `3000` | Correctly detected custom Vite port configuration |
| **Type Checking** | None (JS) | `pnpm run typecheck` | Seamlessly integrated pre-flight compilation step |
| **Artifact Retention**| Screenshots on failure | Screenshots + Videos on failure | Preserved CI run performance while capturing debug info |
| **Caching Mechanism**| `cache: 'npm'` | `cache: 'pnpm'` via pnpm action | Prevented re-downloading dependencies on every run |
