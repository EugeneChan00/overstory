# overstory-ahz-10 Open Questions for Conversion

## Purpose
Track unresolved decisions intentionally deferred from this analysis package.

## Open Questions
1. Should converter-generated ids be deterministic slugs only, or slug plus collision suffix policy?
2. Should legacy command aliases be accepted indefinitely or sunset after a fixed version window?
3. What is the exact strategy for cycle handling if future dependency graphs require loop semantics?
4. Which `.mlre/QUADRANTS/*/PACKETS/` fields become mandatory in generated task/subtask metadata?
5. What validator command shape should enforce canonical + supplementary consistency in CI?

## Deferred Follow-up Work
- Implement converter from MLRE source set to beads artifacts.
- Add schema validator for `task_id`, `kind`, and dependency resolution.
- Add command/help wording migration implementation.
- Add acceptance tests for parallel/sequential dependency interpretation.

## Beads Backlog Recommendation
Create follow-up beads tasks from each open question and link them to epic `overstory-ahz` before implementation starts.
