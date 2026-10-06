---
name: test-gap-analyzer
description: >-
  Given source code and its existing tests, performs behavioral and boundary analysis
  to identify untested execution paths, shallow assertions, missing edge cases,
  unhandled error branches, and unreachable code. Generates ready-to-run test cases.
---

# Test Gap Analyzer Skill

Use this skill whenever you have an existing source file and its test file (or lack thereof) and need to identify what behavior is **not** actually verified.

Unlike naive code coverage tools (which only measure whether a line was touched), this analyzer evaluates **behavioral coverage, assertion depth, boundary invariants, and failure modes**.

---

## When to Use This Skill
- **Refactoring Guardrails**: Before modifying legacy or critical logic, find what existing tests missed.
- **Pull Request Review**: Audit new PRs to verify tests validate requirements rather than just asserting `true`.
- **Bug Prevention**: Probe edge cases, type boundaries, empty states, and error handling before production deploy.
- **Test Suite Modernization**: Upgrade shallow "smoke" tests into robust regression suites.

---

## Analysis Protocol (5-Step Workflow)

### Step 1: Source Logic & Behavioral Extraction
Parse the implementation to build a mental map of:
1. **Inputs & Invariants**: Accepted data types, shape, range, default values, and pre-conditions.
2. **Execution Paths**: Every `if`, `else`, `switch`, ternary, logical short-circuit (`&&`, `||`, `??`), and early return.
3. **State & Side Effects**: Mutations, reactive variable assignments, network/database calls, and event emissions.
4. **Error Handling**: `try/catch` blocks, rejected promises, custom exceptions, fallback return values, and cleanup logic.

### Step 2: Test Suite Audit (Assertion Scrutiny)
Examine existing test files:
1. **Map Test Coverage**: Link each test block (`it`/`test`) to specific source paths.
2. **Detect Shallow Assertions**:
   - Tests that check only that a function doesn't crash (`expect(fn).not.toThrow()`).
   - Tests that check DOM presence without verifying dynamic props or text content.
   - Tests that mock everything to the point where the actual integration logic is unverified.
3. **Detect False Confidence**:
   - Assertions that pass by accident or test the mock rather than real behavior.

### Step 3: Boundary Value & Equivalence Partitioning
Identify missing test matrices:
- **Zero / Empty / Null**: `null`, `undefined`, `""`, `0`, `[]`, `{}`.
- **Boundary Off-by-One**: For conditions like `x <= 30`, test `29`, `30`, and `31`.
- **Reversed / Inverted / Malformed Data**: Inverted intervals (e.g. `min > max`), unexpected whitespace, casing variations.
- **Type Coercion & Parse Failures**: Strings containing non-digit characters, negative numbers, floats, NaN.

### Step 4: Dead Code / Unreachable Branch Detection
Identify logic paths in the source code that can **never** execute due to upstream filters, regex patterns, or impossible conditions. Flag these as either:
- A latent bug in upstream filtering, or
- Redundant dead code that should be pruned.

### Step 5: Generate Gap Report & Proposed Tests
Output a structured report with:
1. **Executive Summary**: Behavioral coverage score (High/Medium/Low) and risk level.
2. **Gap Matrix Table**: Path/Feature | Existing Status | Risk | Missing Scenario.
3. **High-Value Test Implementations**: Drop-in Vitest / Jest / Playwright test cases that immediately close the identified gaps.

---

## Output Template

When running this analysis, format your output according to this structure:

```markdown
# 🧪 Test Gap Analysis Report: `<Target File>`

## 1. Executive Summary
- **Source File**: `path/to/source`
- **Test File**: `path/to/test`
- **Behavioral Coverage**: [High / Moderate / Low / Critical Gap]
- **Key Vulnerabilities**: [1-2 sentence takeaway]

## 2. Behavioral Gap Matrix
| Category | Source Location | Existing Coverage | Identified Gap / Risk | Priority |
| :--- | :--- | :--- | :--- | :--- |
| Boundary | `line X` | Tested `30` | Missing `31` transition point | Medium |
| Error Path | `line Y` | None | Rejection in async API swallowed | High |
| Dead Code | `line Z` | Fake assertion | Condition unreachable due to regex | Low / Cleanup |

## 3. Detailed Gaps & Root Cause
- **Gap 1: <Name>**
  - *Code Branch*: ...
  - *Current Behavior*: ...
  - *Risk*: ...

## 4. Proposed Test Suite Additions
```javascript
// Ready-to-paste Vitest / Jest test blocks
```
```
