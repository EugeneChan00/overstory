# Pi Compatibility Discovery State

Updated: 2026-02-26
Phase: Discovery (documentation only)
Issue: `ov-wisp-56j`

## Objective

Make Overstory work reliably with the Pi Agent runtime by auditing current team features and deciding, for each feature, whether to adapt, gate, or remove it.

Success for Discovery:
- A concrete compatibility matrix exists.
- Gating/removal decisions are explicit.
- Implementation steps and acceptance checks are ready for Specs.

## Runtime + Tool Context

- Runtime target: `pi`
- Bash allowed: `true`
- MCP servers used in discovery: none
- Skills used in discovery:
  - `beads`
  - `serena-first-search`

## Constraints (active)

- Do not write outside the overstory rig repo.
- Do not modify template directories under `~/.agents/docs/meta-docs`.
- Do not install tools/packages without explicit user approval.
- Do not keep agent-team features enabled when Pi cannot support them; gate or remove them.

## Key Findings (code audit)

1. Launch path is Claude-specific today.
- Evidence: `src/commands/sling.ts:424-427`, `src/commands/coordinator.ts:319-333`.
- Current behavior hardcodes `claude --model ... --dangerously-skip-permissions`.
- Decision: `ADAPT` via runtime launcher abstraction.

2. Hook deployment is Claude-file and Claude-event specific.
- Evidence: `src/commands/hooks.ts:4-40`, `src/agents/hooks-deployer.ts:481-537`, `templates/hooks.json.tmpl:3-85`.
- Current behavior writes `.claude/settings.local.json` and uses Claude hook event names.
- Decision: `GATE` in Pi mode until a Pi-native hook/extension adapter exists; keep Claude path intact for Claude mode.

3. Team-tool guarding assumes Claude native tools.
- Evidence: `src/agents/hooks-deployer.ts:446-449`.
- Current behavior blocks Claude team/task tool names directly.
- Decision: `ADAPT/REMOVE` by runtime:
  - Claude mode: keep guard behavior.
  - Pi mode: remove Claude-only tool-name guards (replace with Pi-relevant guards only).

4. Agent model schema is Claude-tier constrained.
- Evidence: `src/types.ts:54-57`.
- Current behavior allows only `"sonnet" | "opus" | "haiku"`.
- Decision: `ADAPT` to runtime-aware model/provider shape.

5. Cost/logging pipeline is Claude transcript dependent.
- Evidence: `src/commands/log.ts:183-200`, `src/metrics/transcript.ts:1-70`.
- Current behavior resolves `~/.claude/projects/...jsonl` and Claude-only pricing tiers.
- Decision: `GATE` for Pi until Pi metrics adapter exists (or implement adapter in later phase).

6. Overlay/docs are Claude-path centric.
- Evidence: `templates/overlay.md.tmpl`, `templates/CLAUDE.md.tmpl`.
- Current behavior references `.claude/CLAUDE.md` and Claude-oriented startup assumptions.
- Decision: `ADAPT` to runtime-specific overlay contract (keep existing Claude templates; add Pi variant).

## Compatibility Matrix (Discovery Decision)

| Feature Area | Status vs Pi | Decision |
|---|---|---|
| Agent spawn/session lifecycle (worktree + tmux + session DB) | Mostly runtime-neutral except launcher command | Adapt |
| Hook installation (`overstory hooks`, deployHooks) | Claude-specific file/events | Gate (Pi mode) then adapt |
| Agent role definitions and startup overlays | Claude-path assumptions | Adapt |
| Team-tool guard rules | Claude tool-name assumptions | Adapt/Remove per runtime |
| Cost/transcript ingestion | Claude-only source and pricing | Gate (Pi mode) then adapt |
| Mail, beads, merge queue, worktree manager | Runtime-neutral core | Keep enabled |

## Proposed Implementation Steps (for Specs/Execution)

1. Add runtime dimension in config (`runtime: claude|pi`) and propagate through command entry points.
2. Introduce `RuntimeLauncher` abstraction:
   - `buildCommand()`
   - `startupPromptInjection()`
   - `envContract()`
3. Split hook strategy by runtime:
   - Claude: existing `.claude/settings.local.json` behavior.
   - Pi: explicit unsupported gate first; later Pi extension/event mapping.
4. Split overlay/template rendering by runtime:
   - keep current Claude templates;
   - add Pi-specific overlay instructions/path conventions.
5. Relax agent model schema from Claude enum to runtime-aware model identifier.
6. Gate unsupported commands/features in Pi mode with explicit error text (no silent partial behavior).
7. Add runtime compatibility tests across `sling`, `coordinator`, `supervisor`, `monitor`, `hooks`, `log/cost`.

## Acceptance Checks (target for later phases)

- `runtime=pi`:
  - `overstory sling ...` launches a Pi session command and records session state.
  - No `.claude/settings.local.json` writes unless explicitly running Claude mode.
  - `overstory hooks install` returns a clear Pi-mode gate message or performs Pi-native install (if implemented).
  - Unsupported telemetry paths fail closed with clear diagnostics, not silent bad data.
- `runtime=claude`:
  - Existing behavior remains unchanged (regression-safe).

## Tool Install Plan (proposal only; not executed)

Pending explicit approval, proposed installs/enablement for validation:
1. Install/verify Pi CLI runtime in test environment.
2. Install/enable required Pi extension package(s) for event/hook parity.
3. Add runtime smoke scripts for Claude vs Pi launch and hook behavior.

No install actions were executed in Discovery.

## Open Questions

1. Source-of-truth Pi runtime target: `pi-mono` upstream vs `oh-my-pi` fork?
2. Should Pi mode initially ship as `experimental` (default-off) until hook parity is complete?
3. Should costs in Pi mode be disabled first, or approximated from provider/model metadata in phase 1?
4. Assignment text asks to update `/home/zz/.agents/docs/concepts/gt-execution-contract.md`, but this conflicts with the “write only inside repo” boundary and the target file is absent. Local mirror update was created at `docs/pi-agent/meta-doc/gt-execution-contract.md`.
