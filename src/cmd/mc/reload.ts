import { CommandContext, NodeCommand, SubCommand } from "..";
import { reload } from "../..";

export default class MCCommandReload extends SubCommand {
    constructor(parent: NodeCommand) {
        super("reload", ["rl"], false, parent);
    }

    async execute(ctx: CommandContext): Promise<boolean> {
        if (ctx.args.length !== 0) return false;

        let reaction = "✅";
        try {
            await reload();
        } catch (e) {
            reaction = "❌";
            console.error(e);
        }
        await ctx.message.react(reaction).catch(console.error);
        return true;
    }
}
