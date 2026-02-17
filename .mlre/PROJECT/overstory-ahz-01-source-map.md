# overstory-ahz-01 Source Map

## Scope
Catalog MLRE and beads references used to build this analysis package.

## Source Inventory
| Source | Role | Notes |
| --- | --- | --- |
| `.mlre/CONCEPTS/XYZ-AXES.md` | Concept model | Preserves X/Y/Z execution coordinate semantics |
| `.mlre/CONCEPTS/INVARIANTS.md` | Guardrails | Provides non-negotiable execution constraints |
| `.mlre/CONCEPTS/RECURSION.md` | Decomposition behavior | Explains parent-child and depth behavior |
| `.mlre/QUADRANTS/01-PLAN/STEPS.md` | Plan workflow | P1-P4 ordering and planning gates |
| `.mlre/QUADRANTS/02-IMPLEMENT/STEPS.md` | Implement workflow | I1-I4 task execution preparation |
| `.mlre/QUADRANTS/03-EXECUTE/STEPS.md` | Execute workflow | E1-E4 integration and scope checks |
| `.mlre/QUADRANTS/04-VERIFY/STEPS.md` | Verify workflow | V1-V4 closure and evidence mapping |
| `.mlre/ARTIFACT-SCHEMA.md` | Artifact contract | Canonical path and identity conventions |
| `https://github.com/steveyegge/beads` | beads reference | Upstream project and concepts |
| `https://steveyegge.github.io/beads/` | beads docs | Docs portal and CLI workflow reference |

## Canonical vs Supporting
Canonical for this package:
- `.mlre/ARTIFACT-SCHEMA.md` for artifact identity/path constraints
- `overstory-ahz-canonical.md` for package-level decisions

Supporting:
- Concepts, quadrants, and beads docs inform semantics and terminology.

## Gaps and Risks
- Packet-level details under `.mlre/QUADRANTS/*/PACKETS/` are not fully modeled here.
- Conversion algorithm details are intentionally deferred to a follow-up implementation phase.
