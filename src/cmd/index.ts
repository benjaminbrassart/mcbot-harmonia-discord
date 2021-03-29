import { Guild, GuildMember, Message, User } from "discord.js";

export class CommandContext {
    constructor(
        public readonly message: Message,
        public readonly label: string,
        public readonly args: string[],
        public readonly parent?: CommandContext
    ) {}

    get user(): User {
        return this.message.author;
    }

    get member(): GuildMember {
        return this.server.member(this.user)!;
    }

    get server(): Guild {
        return this.message.guild!;
    }

    get child(): CommandContext {
        return new CommandContext(
            this.message,
            this.args.shift() || "",
            this.args,
            this
        );
    }
}

export abstract class Command {
    constructor(
        public readonly name: string,
        public readonly aliases: string[],
        public readonly allowBot: boolean
    ) {}

    abstract execute(ctx: CommandContext): Promise<boolean>;
}

export abstract class SubCommand extends Command {
    constructor(
        name: string,
        aliases: string[],
        allowBot: boolean = false,
        protected readonly parent: NodeCommand | null = null
    ) {
        super(name, aliases, allowBot);
    }
}

export abstract class NodeCommand extends SubCommand {
    protected readonly subCommands: SubCommand[] = [];

    constructor(
        name: string,
        aliases: string[],
        allowBot: boolean = false,
        parent: NodeCommand | null = null
    ) {
        super(name, aliases, allowBot, parent);
    }

    async execute(ctx: CommandContext) {
        const name = ctx.args.shift();
        let cmd;
        if (name) {
            cmd = this.subCommands.find((cmd) =>
                [...cmd.aliases, cmd.name].includes(name)
            );
            if (cmd && (cmd.allowBot || !ctx.user.bot)) {
                return cmd.execute(ctx.child);
            }
        }
        this.executeDefault(ctx);
        return true;
    }

    async executeDefault(ctx: CommandContext): Promise<void> {}
}

export const COMMAND_REGEX = /^!(.+)(?: (.+)+)?/;
const commands: Command[] = [];

export function addCommands(...cmds: Command[]) {
    commands.push(...cmds);
}

export async function handleCommand(message: Message) {
    const match = message.content.match(COMMAND_REGEX);
    let cmd: Command | undefined;
    let args: string[];
    let label: string;

    if (message.guild && match) {
        args = match[1].split(" ");
        label = args.shift() || "";
        cmd = commands.find(
            (cmd) =>
                [...cmd.aliases, cmd.name].findIndex(
                    (s) => s.toLowerCase() === label.toLowerCase()
                ) >= 0
        );
        if (cmd && (cmd.allowBot || !message.author.bot))
            cmd.execute(new CommandContext(message, label, args));
    }
}
