import { getConfig, save } from "../..";
import { CommandContext, NodeCommand, SubCommand } from "..";

export default class MCCommandPort extends SubCommand {
    constructor(parent: NodeCommand) {
        super(
            "port",
            [],
            "Afficher ou définir le port du serveur à surveiller",
            false,
            parent
        );
    }

    async execute(ctx: CommandContext): Promise<boolean> {
        if (ctx.args.length < 2) {
            const config = getConfig();
            if (config)
                if (ctx.args.length === 0) {
                    await ctx.message.reply(`:${config.port}`);
                } else {
                    config.port = parseInt(ctx.args[0]);
                    let reaction = "✅";
                    try {
                        await save();
                    } catch (e) {
                        reaction = "❌";
                        console.error(e);
                    }
                    await ctx.message.react(reaction).catch(console.error);
                }
            else
                await ctx.message.reply(
                    `la configuration n'est pas définie. 🤷`
                );
            return true;
        }
        return false;
    }
}
