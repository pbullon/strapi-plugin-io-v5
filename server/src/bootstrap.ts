import { Server } from 'socket.io';

const bootstrap = async ({ strapi }: { strapi: any }) => {
  const allowedOrigins = strapi.config.get(
    'plugin.io-v5.allowedOrigins', ['http://localhost:4321'] // URL de tu app Astro
  );

  const io = new Server(strapi.server.httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST'],
    },
  });

  const nsp = io.of('/realtime');

  nsp.on('connection', (socket) => {
    strapi.log.info(`Cliente conectado: ${socket.id}`);

    socket.on('user-online', (data) => {
      strapi.log.info(`Usuario conectado: ${JSON.stringify(data)}`);

      // Puedes emitir un mensaje a todos los clientes conectados:
      nsp.emit('alert', 'Estás trabajando online');
    });

    socket.on('disconnect', () => {
      strapi.log.info(`Cliente desconectado: ${socket.id}`);
    });
  });

  // Guardamos io para poder usarlo en otros lugares si se necesita
  (strapi as any).io = io;
};

export default bootstrap;

