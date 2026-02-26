# Pi Compatibility Discovery Scope

Updated: 2026-02-26
Phase: Discovery
Issue: `ov-wisp-56j`

## Scope Statement

This scope covers discovery-only analysis for Pi runtime compatibility in Overstory.  
No implementation artifacts, runtime wiring, or tool installs are part of this scope.

## In Scope

- Audit of current Overstory team features and runtime assumptions.
- Identification of Pi-incompatible behaviors.
- Per-feature decision:
  - adapt
  - gate
  - remove
- Definition of concrete implementation steps for the next phase.
- Definition of acceptance checks for validation phase.
- Creation/update of discovery meta-doc artifacts under `docs/pi-agent/meta-doc/`.

## Out of Scope (explicit non-goals)

- Code changes to `src/` behavior.
- Agent scaffolding changes for runtime execution.
- Hook/extension implementation for Pi.
- Template rewrites outside discovery docs.
- Verification reports.
- Running installs (`npm`, `bun add`, package managers, system packages).

## Hard Boundaries

- Write only inside `/home/zz/gt/overstory/crew/developer`.
- Do not edit `~/.agents/docs/meta-docs/*`.
- Do not install tools/packages without explicit approval.
- If a feature is unsupported by Pi, it must be gated or removed in planned execution.

## Scope Contraction Rules

If ambiguity appears, prefer narrower scope:
1. Keep discovery outputs documentation-only.
2. Record unknowns in `state.md` open questions.
3. Defer execution details to Specs phase rather than speculative code edits.

## Deliverables in This Scope

- `docs/pi-agent/meta-doc/state.md`
- `docs/pi-agent/meta-doc/scope.md`
- `docs/pi-agent/meta-doc/gt-execution-contract.md` (local mirror update due boundary conflict)

## Exit Criteria (Discovery Complete)

- Compatibility matrix exists and is complete for current team features.
- Every Pi-incompatible area has a disposition (`adapt`, `gate`, or `remove`).
- Implementation steps are concrete enough for Specs to convert to tasks/tests.
- Acceptance checks are explicit and runtime-split (`pi` vs `claude`).
