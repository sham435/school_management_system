import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, { socketId: string; tenantId?: string; userId?: string }> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.connectedClients.set(client.id, { socketId: client.id });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('joinTenant')
  handleJoinTenant(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { tenantId: string },
  ) {
    client.join(`tenant:${data.tenantId}`);
    const clientData = this.connectedClients.get(client.id);
    if (clientData) {
      clientData.tenantId = data.tenantId;
    }
    console.log(`Client ${client.id} joined tenant: ${data.tenantId}`);
    return { event: 'joined', data: { tenantId: data.tenantId } };
  }

  @SubscribeMessage('joinClass')
  handleJoinClass(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { classId: string },
  ) {
    client.join(`class:${data.classId}`);
    console.log(`Client ${client.id} joined class: ${data.classId}`);
    return { event: 'joined', data: { classId: data.classId } };
  }

  @SubscribeMessage('leaveTenant')
  handleLeaveTenant(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { tenantId: string },
  ) {
    client.leave(`tenant:${data.tenantId}`);
    console.log(`Client ${client.id} left tenant: ${data.tenantId}`);
  }

  @SubscribeMessage('noticeCreated')
  handleNoticeCreated(
    @MessageBody() data: { tenantId: string; notice: any },
  ) {
    this.server.to(`tenant:${data.tenantId}`).emit('notice:new', data.notice);
  }

  @SubscribeMessage('noticeUpdated')
  handleNoticeUpdated(
    @MessageBody() data: { tenantId: string; notice: any },
  ) {
    this.server.to(`tenant:${data.tenantId}`).emit('notice:updated', data.notice);
  }

  @SubscribeMessage('noticeDeleted')
  handleNoticeDeleted(
    @MessageBody() data: { tenantId: string; noticeId: string },
  ) {
    this.server.to(`tenant:${data.tenantId}`).emit('notice:deleted', { noticeId: data.noticeId });
  }

  @SubscribeMessage('attendanceMarked')
  handleAttendanceMarked(
    @MessageBody() data: { classId: string; date: string; attendance: any[] },
  ) {
    this.server.to(`class:${data.classId}`).emit('attendance:updated', data);
  }

  @SubscribeMessage('notification')
  handleNotification(
    @MessageBody() data: { userId: string; notification: any },
  ) {
    for (const [socketId, clientData] of this.connectedClients.entries()) {
      if (clientData.userId === data.userId) {
        this.server.to(socketId).emit('notification:new', data.notification);
      }
    }
  }

  emitToTenant(tenantId: string, event: string, data: any) {
    this.server.to(`tenant:${tenantId}`).emit(event, data);
  }

  emitToClass(classId: string, event: string, data: any) {
    this.server.to(`class:${classId}`).emit(event, data);
  }

  emitToUser(userId: string, event: string, data: any) {
    for (const [socketId, clientData] of this.connectedClients.entries()) {
      if (clientData.userId === userId) {
        this.server.to(socketId).emit(event, data);
      }
    }
  }
}
