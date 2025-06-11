import { Server } from 'socket.io';

const bootstrap = async ({ strapi }: { strapi: any }) => {
  const io = new Server(strapi.server.httpServer, {
    cors: {
      origin: ['http://localhost:3000'], // Cambia según tu frontend
      methods: ['GET', 'POST'],
    },
  });

  const nsp = io.of('/realtime');

  nsp.on('connection', (socket) => {
    strapi.log.info(`Cliente conectado: ${socket.id}`);

    socket.on('ping', () => {
      socket.emit('pong');
    });
  });

  (strapi as any).io = io;
};

export default bootstrap;
