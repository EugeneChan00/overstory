# overstory-ahz-06 Command Verbiage Alignment

## Goal
Keep a similar slash/command interaction style but update wording to beads-friendly nouns.

## Mapping Examples
| Legacy style | Beads-friendly wording |
| --- | --- |
| `/run status` | `/epic status` |
| `/node create` | `/task create` |
| `/leaf close` | `/subtask close` |
| `/run plan` | `/epic plan` |

## Command Language Policy
- Command behaviors stay functionally similar.
- User-facing nouns follow terminology remap.
- Backward aliases may exist in transition, but new docs use beads nouns first.

## Migration Notes
1. Update command help text to show beads noun forms.
2. Keep alias table for old terms during migration.
3. Remove aliases only after conversion rollout confirms no dependency.
