import { Server } from 'socket.io';

class SocketService {
  private static instance: SocketService;
  private io: Server | null = null;

  private constructor() { }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public initialize(socketIo: Server): void {
    this.io = socketIo;
  }

  public getIO(): Server | null {
    return this.io;
  }

  public emit(event: string, data: any): void {
    if (this.io) {
      this.io.emit(event, data);
    }
  }
}

export const socketService = SocketService.getInstance();
export const initSocketService = (io: Server) => socketService.initialize(io);
export const getSocketIO = () => socketService.getIO();
