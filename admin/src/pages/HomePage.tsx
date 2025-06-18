import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:1337/realtime'; // Cambia a producción si es necesario

export const HomePage = () => {
  const [onlineMessage, setOnlineMessage] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, { transports: ['websocket'] });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setOnlineMessage('¡Estás trabajando online!');
      console.log('Conectado a WebSocket con id:', newSocket.id);
      newSocket.emit('user-online', { userId: 'usuario123' });
    });

    newSocket.on('disconnect', () => {
      setOnlineMessage('⚠️ Estás desconectado del servidor');
    });

    newSocket.on('alert', (msg: string) => {
      alert(msg);
    });

    // Detectar desconexión de red
    const handleOffline = () => {
      setIsOnline(false);
      setOnlineMessage('🔌 Sin conexión a Internet');
    };

    const handleOnline = () => {
      setIsOnline(true);
      setOnlineMessage('¡Conexión restaurada! Reconectando...');
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      newSocket.disconnect();
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);
};
