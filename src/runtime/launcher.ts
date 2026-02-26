import { ValidationError } from "../errors.ts";
import type { OverstoryConfig, RuntimeTarget } from "../types.ts";

export interface RuntimeLaunchOptions {
	model: string;
	appendSystemPrompt?: string;
}

export interface RuntimeLauncher {
	target: RuntimeTarget;
	buildInteractiveCommand(options: RuntimeLaunchOptions): string;
}

/**
 * Resolve runtime target with explicit override precedence:
 * 1) OVERSTORY_RUNTIME env
 * 2) config.runtime.target
 * 3) default "claude"
 */
export function resolveRuntimeTarget(config: OverstoryConfig): RuntimeTarget {
	const raw = process.env.OVERSTORY_RUNTIME ?? config.runtime?.target ?? "claude";
	if (raw === "claude" || raw === "pi") {
		return raw;
	}
	throw new ValidationError("Invalid runtime target. Expected 'claude' or 'pi'", {
		field: "runtime.target",
		value: raw,
	});
}

function escapeSingleQuotes(input: string): string {
	return input.replace(/'/g, "'\\''");
}

class ClaudeRuntimeLauncher implements RuntimeLauncher {
	target: RuntimeTarget = "claude";

	buildInteractiveCommand(options: RuntimeLaunchOptions): string {
		const model = options.model.trim();
		if (model.length === 0) {
			throw new ValidationError("Runtime launch model must be non-empty", {
				field: "model",
				value: options.model,
			});
		}

		let cmd = `claude --model ${model} --dangerously-skip-permissions`;
		if (options.appendSystemPrompt !== undefined && options.appendSystemPrompt.length > 0) {
			const escaped = escapeSingleQuotes(options.appendSystemPrompt);
			cmd += ` --append-system-prompt '${escaped}'`;
		}
		return cmd;
	}
}

class PiRuntimeLauncher implements RuntimeLauncher {
	target: RuntimeTarget = "pi";
	private readonly piCommand: string;

	constructor(piCommand: string) {
		this.piCommand = piCommand;
	}

	buildInteractiveCommand(options: RuntimeLaunchOptions): string {
		const model = options.model.trim();
		if (model.length === 0) {
			throw new ValidationError("Runtime launch model must be non-empty", {
				field: "model",
				value: options.model,
			});
		}

		if (options.appendSystemPrompt !== undefined && options.appendSystemPrompt.length > 0) {
			throw new ValidationError(
				"Pi runtime launcher seam is active, but append-system-prompt wiring is not implemented yet",
				{
					field: "runtime.pi.appendSystemPrompt",
					value: "unsupported",
				},
			);
		}

		return `${this.piCommand} --model ${model}`;
	}
}

export function createRuntimeLauncher(config: OverstoryConfig): RuntimeLauncher {
	const target = resolveRuntimeTarget(config);
	if (target === "claude") {
		return new ClaudeRuntimeLauncher();
	}

	const rawPiCommand = process.env.OVERSTORY_PI_COMMAND ?? config.runtime?.piCommand ?? "pi";
	const piCommand = rawPiCommand.trim();
	if (piCommand.length === 0) {
		throw new ValidationError("Pi runtime command must be non-empty", {
			field: "runtime.piCommand",
			value: rawPiCommand,
		});
	}

	return new PiRuntimeLauncher(piCommand);
}
