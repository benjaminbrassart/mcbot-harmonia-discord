import { NodeCommand } from "..";
import MCCommandReload from "./reload";

export default class MCCommand extends NodeCommand {
    constructor() {
        super("minecraft", ["mc"]);
        this.subCommands.push(new MCCommandReload(this));
    }
}
