import { CommandContext, NodeCommand } from "..";
import MCCommandInfo from "./info";
import MCCommandPort from "./port";
import MCCommandReload from "./reload";
import MCCommandServer from "./server";
import MCCommandUpdate from "./update";

export default class MCCommand extends NodeCommand {
    constructor() {
        super("minecraft", ["mc"], "Gérer le bot", false, null, [
            "MANAGE_ROLES",
        ]);
        this.subCommands.push(
            new MCCommandReload(this),
            new MCCommandServer(this),
            new MCCommandPort(this),
            new MCCommandInfo(this),
            new MCCommandUpdate(this)
        );
    }

    async executeDefault(ctx: CommandContext) {
        const names: string[] = [];
        let longest = 0;
        const message = ["```"];
        this.subCommands.forEach((c) => {
            if (c.name.length > longest) longest = c.name.length;
            names.push(c.name);
        });
        this.subCommands.forEach((c) => {
            message.push(
                `${c.name}${" ".repeat(longest - c.name.length)} – ${
                    c.description
                }`
            );
        });
        message.push("```");
        ctx.message.reply(message.join("\n"));
    }
}
