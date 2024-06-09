import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateCommentDto } from './dto/create-comment.dto';

@WebSocketGateway(3001, { cors: true })
export class CommentsGateway {
  private connectedClients: { [key: string]: string } = {};

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('registerSocketId')
  handleRegisterSocketId(@MessageBody() data: { socketId: string }) {
    // Lưu trữ socketId của client
    this.connectedClients[data.socketId] = data.socketId;
  }

  @SubscribeMessage('newComment')
  handleNewComment(
    @MessageBody() data: CreateCommentDto,
    @ConnectedSocket() socket: Socket,
  ) {
    // Nếu comment không phải của user hiện tại, broadcast nó đến tất cả các clients
    const socketIdOfComment = data.socketId;
    if (socketIdOfComment !== socket.id) {
      this.server.emit('newComment', data);
    }
  }
}
