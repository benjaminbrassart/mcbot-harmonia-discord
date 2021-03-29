export type Motd = [string, string];

export interface ServerInfo {
    ip: string;
    port: number;
    online: boolean;
    motd: {
        raw: Motd;
        clean: Motd;
        html: Motd;
    };
    players: {
        online: number;
        max: number;
    };
}
