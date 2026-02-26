# Pi Domain Agents

This directory contains execution-stage scaffolding for Pi-compatible domain-agent definitions.

## Current Artifacts

- `example-pi-domain-agent.md`: reference domain-agent definition aligned to the meta-doc contract.

## How To Run (Pi)

Source of truth for Pi runtime is `pi-mono`.

Example formula invocation:

```bash
gt sling /home/zz/gt/.beads/formulas/discovery.formula.toml --on ov-wisp-e4f \
  --var runtime_targets=pi \
  --var meta_doc_dir=docs/pi-agent/meta-doc \
  --var domain_agents_dir=docs/pi-agent/domain-agents
```

## How To Run (Codex)

Codex-targeted pass using the same formula contract:

```bash
gt sling /home/zz/gt/.beads/formulas/discovery.formula.toml --on ov-wisp-e4f \
  --var runtime_targets=codex \
  --var meta_doc_dir=docs/pi-agent/meta-doc \
  --var domain_agents_dir=docs/pi-agent/domain-agents
```

## Notes

- Discovery and Specs remain documentation-only phases.
- Installs remain explicit-user-approval gated.
