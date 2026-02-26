import { afterEach, describe, expect, test } from "bun:test";
import { DEFAULT_CONFIG } from "../config.ts";
import { ValidationError } from "../errors.ts";
import { createRuntimeLauncher, resolveRuntimeTarget } from "./launcher.ts";

const originalRuntimeEnv = process.env.OVERSTORY_RUNTIME;
const originalPiCommandEnv = process.env.OVERSTORY_PI_COMMAND;

afterEach(() => {
	if (originalRuntimeEnv === undefined) delete process.env.OVERSTORY_RUNTIME;
	else process.env.OVERSTORY_RUNTIME = originalRuntimeEnv;

	if (originalPiCommandEnv === undefined) delete process.env.OVERSTORY_PI_COMMAND;
	else process.env.OVERSTORY_PI_COMMAND = originalPiCommandEnv;
});

describe("resolveRuntimeTarget", () => {
	test("defaults to claude when unset", () => {
		delete process.env.OVERSTORY_RUNTIME;
		const config = structuredClone(DEFAULT_CONFIG);
		delete config.runtime;

		expect(resolveRuntimeTarget(config)).toBe("claude");
	});

	test("uses env override", () => {
		process.env.OVERSTORY_RUNTIME = "pi";
		const config = structuredClone(DEFAULT_CONFIG);
		config.runtime = { target: "claude" };

		expect(resolveRuntimeTarget(config)).toBe("pi");
	});

	test("throws on invalid runtime target", () => {
		process.env.OVERSTORY_RUNTIME = "invalid-runtime";
		const config = structuredClone(DEFAULT_CONFIG);

		expect(() => resolveRuntimeTarget(config)).toThrow(ValidationError);
	});
});

describe("createRuntimeLauncher", () => {
	test("builds claude command with escaped prompt", () => {
		delete process.env.OVERSTORY_RUNTIME;
		const config = structuredClone(DEFAULT_CONFIG);
		config.runtime = { target: "claude" };
		const launcher = createRuntimeLauncher(config);

		const command = launcher.buildInteractiveCommand({
			model: "opus",
			appendSystemPrompt: "a 'quoted' prompt",
		});

		expect(launcher.target).toBe("claude");
		expect(command).toContain("claude --model opus --dangerously-skip-permissions");
		expect(command).toContain("--append-system-prompt 'a '\\''quoted'\\'' prompt'");
	});

	test("builds pi command from config seam", () => {
		process.env.OVERSTORY_RUNTIME = "pi";
		delete process.env.OVERSTORY_PI_COMMAND;
		const config = structuredClone(DEFAULT_CONFIG);
		config.runtime = { target: "pi", piCommand: "pi-mono-agent" };
		const launcher = createRuntimeLauncher(config);

		const command = launcher.buildInteractiveCommand({ model: "sonnet" });

		expect(launcher.target).toBe("pi");
		expect(command).toBe("pi-mono-agent --model sonnet");
	});

	test("pi launcher fails closed on unsupported appendSystemPrompt", () => {
		process.env.OVERSTORY_RUNTIME = "pi";
		const config = structuredClone(DEFAULT_CONFIG);
		const launcher = createRuntimeLauncher(config);

		expect(() =>
			launcher.buildInteractiveCommand({
				model: "opus",
				appendSystemPrompt: "not yet supported",
			}),
		).toThrow(ValidationError);
	});
});
