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

---

## 🎯 Test Run 2: Second, Different Real Task (`training-repo/web`)
- **Repository Location**: `C:\Users\Full Scale\training-repo\web`
- **Repository Context**: Monorepo sub-project (`web/`), React 18 + Redux Toolkit + Zod + Vite 8.2 + Vitest 4.1 + TypeScript + Oxlint + npm
- **Configuration Differences from Task 1**:
  - Directory Structure: Subfolder inside monorepo (`training-repo/web`)
  - Framework & Tooling: React 18 + TypeScript (`tsc -b`) + Oxlint (`oxlint`) instead of Svelte/Sass
  - Scripts: `"build": "tsc -b && vite build"`, `"lint": "oxlint"`, `"test": "vitest run"`
  - E2E: No Cypress installed in this subfolder; pure Vitest unit/component suite

### Tech Stack Scan Performed by Prompt:
1. Detected nested root: Configured `defaults.run.working-directory: ./web` or explicit `working-directory` commands.
2. Detected `oxlint`: Added fast linting step (`npm run lint`).
3. Detected TypeScript build: Added `npm run build` (`tsc -b && vite build`) to verify type stability.
4. Detected unit test script: Mapped `npm test` (`vitest run`).

### Generated Output:
```yaml
name: Web CI Pipeline

on:
  push:
    branches: [ "main", "master", "develop" ]
    paths:
      - 'web/**'
      - '.github/workflows/web-ci.yml'
  pull_request:
    branches: [ "main", "master", "develop" ]
    paths:
      - 'web/**'

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint-and-typecheck:
    name: Lint & Build (Oxlint + TSC)
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./web
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
          cache-dependency-path: web/package-lock.json

      - name: Install Dependencies
        run: npm ci

      - name: Run Oxlint
        run: npm run lint

      - name: TypeScript Build Verification
        run: npm run build

  unit-tests:
    name: Unit Tests (Vitest)
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./web
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
          cache-dependency-path: web/package-lock.json

      - name: Install Dependencies
        run: npm ci

      - name: Run Vitest
        run: npm run test
```

### Generalization Proof:
| Capability | Task 1 (`fs-beeboard`) | Task 2 (`training-repo/web`) | Generalization Verification |
| :--- | :--- | :--- | :--- |
| **Directory Context** | Root-level project | Monorepo sub-directory (`./web`) | Automatically scoped paths and working directories |
| **Framework & Lang** | Svelte 5 / JS | React 18 / TypeScript | Handled `tsc -b` build step and typed dependencies |
| **Linting Tool** | Standard / none | Oxlint (`npm run lint`) | Included modern linter stage without manual config |
| **Test Stack** | Vitest + Cypress E2E | Vitest Unit Suite | Flexibly adjusted jobs when E2E runner was not present |
| **Cache Scoping** | Root lockfile | `web/package-lock.json` | Used `cache-dependency-path` correctly for nested project |
