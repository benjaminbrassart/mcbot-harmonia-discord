import { CommandContext, NodeCommand } from "@/cmd";
import MCCommandInfo from "@/cmd/mc/info";
import MCCommandPort from "@/cmd/mc/port";
import MCCommandReload from "@/cmd/mc/reload";
import MCCommandServer from "@/cmd/mc/server";
import MCCommandUpdate from "@/cmd/mc/update";

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
