import { CommandContext, NodeCommand, SubCommand } from "..";
import { reload } from "../..";

export default class MCCommandReload extends SubCommand {
    constructor(parent: NodeCommand) {
        super("reload", ["rl"], false, parent);
    }

    async execute(ctx: CommandContext): Promise<boolean> {
        // TODO find a better way to check for permission
        if (
            ctx.user &&
            ctx.member.roles.cache.some((role) =>
                [
                    "608834575879372800",
                    "517307283944767489",
                    "516666391357816851",
                ].includes(role.id)
            )
        ) {
            if (ctx.args.length !== 0) return false;

            let reaction = "👍";
            try {
                const conf = await reload();

                if (!conf) reaction = "👎";
            } catch (e) {
                reaction = "❌";
                console.error("Failed to load config.");
            }

            try {
                ctx.message.react(reaction);
            } catch (e) {
                console.error(e);
            }
        }
        return true;
    }
}
