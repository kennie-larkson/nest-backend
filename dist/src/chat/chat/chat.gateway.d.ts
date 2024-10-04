import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private users;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): Promise<void>;
    handleMessage(message: {
        sender: string;
        text: string;
        time: Date;
    }, socket: Socket): void;
    handleSetUsername(username: string, socket: Socket): void;
}
