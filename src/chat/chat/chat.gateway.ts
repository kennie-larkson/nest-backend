import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins (you can restrict this in production)
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users: { [socketId: string]: string } = {}; // store connected users

  async handleConnection(socket: Socket) {
    console.log(`User connected: ${socket.id}`);
    this.users[socket.id] = 'Anonymous';
    this.server.emit('users', this.users);
  }

  async handleDisconnect(socket: Socket) {
    console.log(`User disconnected: ${socket.id}`);
    delete this.users[socket.id];
    this.server.emit('users', this.users); // Send updated user list to clients
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: { sender: string; text: string; time: Date },
    @ConnectedSocket() socket: Socket,
  ): void {
    console.log(
      `Message from ${message.sender}: ${message.text} || ${message.time}`,
    );
    this.server.emit('message', message); // Broadcast message to all clients
  }

  @SubscribeMessage('setUsername')
  handleSetUsername(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ): void {
    console.log(`User ${socket.id} set username to: ${username}`);
    this.users[socket.id] = username;
    this.server.emit('users', this.users); // Send updated user list to clients
  }
}
