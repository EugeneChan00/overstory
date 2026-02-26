# Pi Compatibility Discovery Scope

Updated: 2026-02-26
Phase: Discovery + Specs
Issues: `ov-wisp-56j`, `ov-wisp-qg1`

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

## Final Boundaries (Specs Lock)

- Required future output location for generated domain-agent artifacts:
  - `docs/pi-agent/domain-agents/`
- Subagent representation is constrained to:
  - additional files under `agents/`, or
  - files inside `docs/pi-agent/domain-agents/`
- No runtime behavior changes are permitted in Specs.
- No scaffold generation is permitted in Specs.

## Safety Model

Safety policy for Pi compatibility work:
1. Runtime explicitness:
   - all behavior must branch on declared runtime (`claude|pi`), never implicit file paths.
2. Fail-closed gating:
   - unsupported Pi features must return explicit diagnostics rather than partial behavior.
3. Install gating:
   - installs are disallowed until explicit approval; after approval, install set must be predeclared.
4. Regression boundary:
   - Claude runtime behavior remains unchanged unless explicitly targeted by approved execution tasks.

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

## Exit Criteria (Specs Complete)

- `specs.md` defines:
  - inputs→choices→outputs contract
  - output folder contract (`docs/pi-agent/domain-agents`)
  - subagent representation contract
  - system prompt policy
  - approval-gated install policy
- `scope.md` contains final boundaries and safety model for execution handoff.
