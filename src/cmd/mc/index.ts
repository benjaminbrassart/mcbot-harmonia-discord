import { NodeCommand } from "..";
import MCCommandInfo from "./info";
import MCCommandPort from "./port";
import MCCommandReload from "./reload";
import MCCommandServer from "./server";
import MCCommandUpdate from "./update";

export default class MCCommand extends NodeCommand {
    constructor() {
        super("minecraft", ["mc"], false, null, ["MANAGE_ROLES"]);
        this.subCommands.push(
            new MCCommandReload(this),
            new MCCommandServer(this),
            new MCCommandPort(this),
            new MCCommandInfo(this),
            new MCCommandUpdate(this)
        );
    }
}
