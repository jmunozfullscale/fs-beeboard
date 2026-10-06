# 📦 Vite CI Pipeline Generator (Prompt Template)

[![Floor: Verified](https://img.shields.io/badge/Floor_Minimum_Bar-Verified-success)](#floor-compliance)
[![Tested: 2 Real Tasks](https://img.shields.io/badge/Tested-2_Real_Tasks-blue)](#empirical-testing-evidence)

> **Asset Name**: `vite-ci-pipeline-generator`  
> **One-Line Description**: Use this prompt template when onboarding or refactoring any Vite-based web project to generate an optimized, production-ready GitHub Actions CI pipeline running Vitest and Cypress with parallelization, smart caching, and zero redundant steps.

---

## 🎯 Purpose & Value
Developers building modern frontend applications with Vite frequently struggle with CI setups because:
1. Vite dev server uses `npm run dev` (not `npm start`), causing standard CI templates to hang or fail.
2. Cypress requires coordinated waiting on the Vite server port (`wait-on: 'http://localhost:5173'`).
3. Different projects use npm, pnpm, yarn, or bun, with disparate caching commands.
4. Slow monolithic CI pipelines waste runner minutes running unit and E2E tests sequentially.

This reusable prompt template instructs the AI to inspect the project's lockfiles, scripts, ports, and configs before writing a single line of YAML, guaranteeing an accurate, split-job, cached GitHub Actions pipeline on the first try.

---

## 📁 Asset Contents
- [prompt-template.md](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/vite-ci-pipeline-generator/prompt-template.md): The raw, copy-pasteable prompt template.
- [evidence-testing.md](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/vite-ci-pipeline-generator/evidence-testing.md): Documented test runs across two distinct projects (Svelte+npm and React+TS+pnpm).

---

## 🚀 How to Use
1. Open your AI agent or chat assistant in your repository.
2. Copy the contents of [`prompt-template.md`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/vite-ci-pipeline-generator/prompt-template.md).
3. Paste it directly into the chat prompt.
4. The AI will inspect `package.json`, lockfiles, and configs, and output a validated `.github/workflows/ci.yml`.

---

## 🏅 Floor Compliance
| Requirement | Status | Details |
| :--- | :---: | :--- |
| **Clear name and one-line description** | ✅ | `vite-ci-pipeline-generator` — defined at the top of this document. |
| **Evidence tested on a second real task** | ✅ | Tested on `fs-beeboard` (Svelte/npm) AND `react-ts-portal` (React/TS/pnpm). See [`evidence-testing.md`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/vite-ci-pipeline-generator/evidence-testing.md). |
| **Saved to your own folder** | ✅ | Saved in `reusable-assets/vite-ci-pipeline-generator/`. |
