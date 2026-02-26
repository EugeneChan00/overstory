import { describe, expect, test } from "bun:test";
import { DEFAULT_CONFIG } from "../config.ts";
import { resolveRuntimeCapabilities } from "./capabilities.ts";

describe("resolveRuntimeCapabilities", () => {
	test("claude runtime enables Claude-specific features", () => {
		const config = structuredClone(DEFAULT_CONFIG);
		config.runtime = { target: "claude" };
		const caps = resolveRuntimeCapabilities(config);
		expect(caps.target).toBe("claude");
		expect(caps.supportsClaudeHooks).toBe(true);
		expect(caps.supportsClaudeTranscriptMetrics).toBe(true);
		expect(caps.supportsClaudeNativeTeamTools).toBe(true);
	});

	test("pi runtime disables Claude-specific features", () => {
		const config = structuredClone(DEFAULT_CONFIG);
		config.runtime = { target: "pi", piCommand: "pi-mono-agent" };
		const caps = resolveRuntimeCapabilities(config);
		expect(caps.target).toBe("pi");
		expect(caps.supportsClaudeHooks).toBe(false);
		expect(caps.supportsClaudeTranscriptMetrics).toBe(false);
		expect(caps.supportsClaudeNativeTeamTools).toBe(false);
	});
});
