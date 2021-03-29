import Axios from "axios";
import { Client } from "discord.js";
import fs from "fs/promises";
import { addCommands, handleCommand } from "./cmd";
import MCCommand from "./cmd/mc";
import { BotConfig } from "./config";
import "./config.json";
import { ServerInfo } from "./server";

const bot = new Client();
let config: BotConfig | undefined;

export function reload(): Promise<BotConfig>;

export function reload(callback: (conf: BotConfig) => void): void;

export async function reload(
    callback?: (conf: BotConfig) => void
): Promise<BotConfig | undefined | void> {
    const path = require.resolve("./config.json");
    const newConfig: BotConfig | undefined = JSON.parse(
        await fs.readFile(path, {
            encoding: "utf-8",
        })
    ) as BotConfig;
    if (!newConfig) throw "failed to load config";
    config = newConfig;
    if (callback) {
        callback(config);
        return;
    }
    return config;
}

async function fetch(): Promise<ServerInfo> {
    return (
        await Axios.get<ServerInfo>(
            `https://api.mcsrvstat.us/2/${config?.host}:${config?.port}`
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
addCommands(new MCCommand());

bot.on("message", handleCommand).on("ready", () => {
    console.info(`Logged as ${bot.user?.tag}`);
    update();
    setInterval(update, 1000 * 60 * 5);
});
