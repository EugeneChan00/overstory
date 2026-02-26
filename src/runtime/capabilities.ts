import type { OverstoryConfig, RuntimeTarget } from "../types.ts";
import { resolveRuntimeTarget } from "./launcher.ts";

export interface RuntimeCapabilities {
	target: RuntimeTarget;
	supportsClaudeHooks: boolean;
	supportsClaudeTranscriptMetrics: boolean;
	supportsClaudeNativeTeamTools: boolean;
}

export function resolveRuntimeCapabilities(config: OverstoryConfig): RuntimeCapabilities {
	const target = resolveRuntimeTarget(config);
	const claudeCompatible = target === "claude";
	return {
		target,
		supportsClaudeHooks: claudeCompatible,
		supportsClaudeTranscriptMetrics: claudeCompatible,
		supportsClaudeNativeTeamTools: claudeCompatible,
	};
}
