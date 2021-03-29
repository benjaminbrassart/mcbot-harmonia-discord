import { CommandContext, NodeCommand, SubCommand } from "..";
import { update } from "../..";

export default class MCCommandUpdate extends SubCommand {
    constructor(parent: NodeCommand) {
        super(
            "update",
            ["refresh"],
            "Forcer la mise à jour des données",
            false,
            parent
        );
    }

    async execute(ctx: CommandContext): Promise<boolean> {
        if (ctx.args.length !== 0) return false;
        let reaction = "✅";

        try {
            await update();
        } catch (e) {
            reaction = "❌";
            console.error(e);
        }
        await ctx.message.react(reaction).catch(console.error);
        return true;
    }
}
