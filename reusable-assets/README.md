# 📚 Team Reusable AI Assets Library

**AI Leveling Accelerator · Week 4 · Activity 1: Build a Reusable Asset**

> **Objective**: Turn workflows you've rebuilt from scratch more than once into reusable, battle-tested templates someone else on the team can immediately pick up and use.

---

## 🏆 Floor Compliance Summary (The Minimum Bar)

| Floor Requirement | Asset 1: Vite CI Pipeline Generator | Asset 2: Test Gap Analyzer Skill |
| :--- | :--- | :--- |
| **1. Clear Name** | `vite-ci-pipeline-generator` | `test-gap-analyzer` |
| **2. One-Line Description** | *Use this prompt template when onboarding or refactoring any Vite-based web project to generate an optimized, production-ready GitHub Actions CI pipeline running Vitest and Cypress with parallelization, smart caching, and zero redundant steps.* | *Use this skill whenever you have existing source code alongside unit or integration tests, to identify unverified execution paths, missing edge cases, shallow assertions, and untested error handling.* |
| **3. Evidence Tested on 2nd Real Task** | ✅ **Task 1**: `fs-beeboard` (Svelte 5 + Vite 8 + npm)<br>✅ **Task 2**: `training-repo/web` (React 18 + TypeScript + Oxlint + Vitest + npm) | ✅ **Task 1**: `gameCategorizer.js` in `fs-beeboard` (Pure algorithmic logic)<br>✅ **Task 2**: `allocation.ts` in `training-repo/web` (Enterprise Zod schemas) |
| **4. Saved in Own Folder** | [`reusable-assets/vite-ci-pipeline-generator/`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/vite-ci-pipeline-generator/) | [`reusable-assets/test-gap-analyzer/`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/test-gap-analyzer/) & [`.agents/skills/test-gap-analyzer/`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/.agents/skills/test-gap-analyzer/) |

---

## 📁 Catalog of Reusable Assets

### 1. [Vite CI Pipeline Generator (Prompt Template)](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/vite-ci-pipeline-generator/)
- **Format**: Structured Prompt Template ([`prompt-template.md`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/vite-ci-pipeline-generator/prompt-template.md))
- **Key Features**:
  - Automatically scans package manager (`npm`, `pnpm`, `yarn`, `bun`), monorepo directory context, and custom server ports.
  - Generates parallel split jobs, dependency caching with path scoping, failure screenshot/video capture, and concurrency cancellation.
- **Testing Evidence**: Tested across `fs-beeboard` and `training-repo/web` in [`evidence-testing.md`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/vite-ci-pipeline-generator/evidence-testing.md).

### 2. [Test Gap Analyzer (Antigravity Agent Skill)](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/test-gap-analyzer/)
- **Format**: Antigravity Native Skill ([`SKILL.md`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/test-gap-analyzer/SKILL.md)) + Installed in [`.agents/skills/test-gap-analyzer/SKILL.md`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/.agents/skills/test-gap-analyzer/SKILL.md)
- **Key Features**:
  - 5-step behavioral audit protocol: Source logic extraction, assertion depth scrutiny, boundary value analysis, dead code detection, and actionable test generation.
  - Proven on both functional logic and complex enterprise data schemas.
- **Testing Evidence**: Tested across `gameCategorizer.js` and `training-repo/web/src/schemas/allocation.ts` in [`evidence-testing.md`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/test-gap-analyzer/evidence-testing.md).
