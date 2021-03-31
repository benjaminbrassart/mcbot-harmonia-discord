import dgram, { Socket } from "dgram";

interface ServerQueryOption {
    maxRetries?: number;
    timeout?: number;
}

enum PacketType {}

class ResponsePacket {}

class ServerQuery {
    private static COUNTER: number = 0;
    private id;
    private retries: number = 0;
    private maxRetries: number;
    private timeout: number;

    constructor(
        public host: string,
        public port: number = 25565,
        options?: ServerQueryOption
    ) {
        this.id = ServerQuery.COUNTER++;
        this.maxRetries = options?.maxRetries || 0;
        this.timeout = options?.timeout || 0;
    }

    get name(): string {
        return `Query#${this.id}`;
    }

    get socket(): Socket {
        const sock = dgram.createSocket("udp4");

        sock.on("error", console.error);

        return sock;
    }

    private onMessage(msg: any, rinfo: any) {}
}
