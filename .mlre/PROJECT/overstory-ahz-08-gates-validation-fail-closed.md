# overstory-ahz-08 Gates, Validation, and Fail-Closed Rules

## Purpose
Define quality gates and fail-closed behavior for this spec package and for the later conversion phase.

## Validation Gates
1. File gate: all canonical + supplementary files exist.
2. Schema gate: every task artifact includes `task_id` and valid `kind`.
3. Dependency gate: all dependency references resolve.
4. Terminology gate: remapped nouns are consistently applied.
5. Canonicality gate: no supplementary rule may override canonical file.

## Fail-Closed Policy
If any gate fails:
- stop progression,
- mark package status as blocked,
- append blocking details to open-questions/backlog file.

## Evidence Requirements
Each gate should emit evidence:
- check timestamp,
- checker identity,
- pass/fail,
- actionable remediation notes.

## Escalation
- Subagent-detected contradictions escalate to parent/domain agent.
- Parent agent records decision in canonical file and reference issue notes.
