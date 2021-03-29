import Axios from "axios";
import { Client } from "discord.js";
import { BotConfig } from "./config";
import { ServerInfo } from "./server";

const bot = new Client();
let config: BotConfig;

async function reload(callback?: (config: BotConfig) => void) {
    config = (await import("./config.json")) as BotConfig;
    if (callback) callback(config);
}

async function fetch(): Promise<ServerInfo> {
    return (
        await Axios.get<ServerInfo>(
            `https://api.mcsrvstat.us/2/${config.host}:${config.port}`
        )
    ).data;
}

async function update() {
    const info = await fetch();
    let status: string;

    if (info.ip) {
        bot.user?.setStatus("online");
        status = `${info.players.online} joueur${
            info.players.online > 1 ? "s" : ""
        } sur ${info.players.max}`;
    } else {
        bot.user?.setStatus("dnd");
        status = "un serveur offline";
    }

    bot.user?.setActivity({
        name: status,
        type: "WATCHING",
    });
}

reload((conf) => bot.login(conf.token));

bot.on("ready", () => {
    console.info(`Logged as ${bot.user?.tag}`);
    update();
    setInterval(update, 1000 * 60 * 5);
});
