import React, { useState, useEffect, useRef, createContext } from 'react';
import { uid } from 'uid';

export const WebsocketContext = createContext(false, null, () => {});

export const WebSocketProvider = ({ children }: any) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);

  const [uuid, setUuid] = useState('');
  const [positions, setPositions] = useState({});
  const topic = 'cursors';
  const ws = useRef(null);
  const socket = new WebSocket('ws://localhost:8080/socket');

  useEffect(() => {
    setUuid(uid());
    setupSocket();
  }, []);

  const setupSocket = () => {
    socket.addEventListener('open', () => {
      socket.send(
        JSON.stringify({
          action: 'subscribe',
          topic: topic,
        })
      );
    });

    socket.addEventListener('message', (event) => {
      try {
        const receivedPositions = JSON.parse(event.data);
        setPositions(receivedPositions);
      } catch (e) {
        setPositions({});
      }
    });

    socket.addEventListener('close', () => {
      socket.send(
        JSON.stringify({
          action: 'unsubscribe',
          topic: topic,
        })
      );
    });
  };

  const publishPosition = (e) => {
    const newPosition = {
      ...positions,
      [uuid]: {
        x: e.pageX,
        y: e.pageY,
      },
    };

    setPositions(newPosition);

    console.log(JSON.stringify(newPosition));

    socket.send(
      JSON.stringify({
        action: 'publish',
        topic: topic,
        message: JSON.stringify(newPosition),
      })
    );
  };

  const ret = [isReady, val, ws.current?.send.bind(ws.current)];

  return (
    <WebsocketContext.Provider value={ret}>
      {children}
    </WebsocketContext.Provider>
  );
};
