# 🔍 Test Gap Analyzer (AI Skill)

[![Floor: Verified](https://img.shields.io/badge/Floor_Minimum_Bar-Verified-success)](#floor-compliance)
[![Tested: 2 Real Tasks](https://img.shields.io/badge/Tested-2_Real_Tasks-blue)](#empirical-testing-evidence)

> **Asset Name**: `test-gap-analyzer`  
> **One-Line Description**: Use this skill whenever you have existing source code alongside unit or integration tests, to identify unverified execution paths, missing edge cases, shallow assertions, and untested error handling.

---

## 🎯 Purpose & Value
Standard code coverage reports (line, statement, branch) give developers a false sense of security:
- A line can be 100% "covered" by a test that makes no assertions.
- Complex conditions can execute without checking boundary inflection points (e.g. testing `30` on `<= 30`, but never checking `31`).
- Dead code paths or logical contradictions (e.g. checking `x < 0` after an unsigned regex match) remain undetected.

The `test-gap-analyzer` evaluates **behavioral depth, assertion fidelity, boundary transitions, and failure modes**, providing an actionable gap matrix and drop-in test cases.

---

## 📁 Asset Contents
- [SKILL.md](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/test-gap-analyzer/SKILL.md): Complete Antigravity skill specification containing the 5-step analysis protocol and standardized output schema.
- [evidence-testing.md](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/test-gap-analyzer/evidence-testing.md): Documented test runs across two real tasks: a pure algorithmic module (`gameCategorizer.js`) and a stateful reactive UI component (`Admin.svelte`).
- Active Agent Skill: Registered directly at [`.agents/skills/test-gap-analyzer/SKILL.md`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/.agents/skills/test-gap-analyzer/SKILL.md) for native IDE discovery.

---

## 🚀 How to Use

### Method A: Native Antigravity Skill Invocation
Because this skill is installed in `.agents/skills/test-gap-analyzer/SKILL.md`, you can simply ask your agent in the IDE or CLI:
> *"Run a test gap analysis on `src/lib/gameCategorizer.js` and its test file."*  
> Or: *"Analyze test gaps for `src/lib/components/Admin.svelte`."*

The agent will automatically load the skill and output the standardized gap matrix.

### Method B: Manual / Custom Prompting
Copy the contents of [`SKILL.md`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/test-gap-analyzer/SKILL.md) into any AI assistant along with the source file and test file you wish to audit.

---

## 🏅 Floor Compliance
| Requirement | Status | Details |
| :--- | :---: | :--- |
| **Clear name and one-line description** | ✅ | `test-gap-analyzer` — defined at top of this document and in `SKILL.md`. |
| **Evidence tested on a second real task** | ✅ | Tested on `gameCategorizer.js` (pure logic) AND `Admin.svelte` (stateful UI). See [`evidence-testing.md`](file:///c:/Users/Full%20Scale/L3%20Accelerator/fs-beeboard/reusable-assets/test-gap-analyzer/evidence-testing.md). |
| **Saved to your own folder** | ✅ | Saved in `reusable-assets/test-gap-analyzer/` and `.agents/skills/test-gap-analyzer/`. |
