import { CommandContext, NodeCommand, SubCommand } from "..";
import { getConfig } from "../..";

export default class MCCommandInfo extends SubCommand {
    constructor(parent: NodeCommand) {
        super(
            "info",
            [],
            "Afficher le nom et le port du serveur surveillé",
            false,
            parent
        );
    }

    async execute(ctx: CommandContext): Promise<boolean> {
        if (ctx.args.length !== 0) return false;

        const config = getConfig();
        if (config) await ctx.message.reply(`${config.host}:${config.port}`);
        else await ctx.message.reply(`la configuration n'est pas définie. 🤷`);
        return true;
    }
}
