import React, { useState, useEffect, useRef, createContext } from 'react';

export const WebsocketContext = createContext(false, null, () => {});
//                                            ready, value, send

// Make sure to put WebSocketProvider higher up in
// the component tree than any consumer.
export const WebSocketProvider = ({ children }: any) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);

  const ws = useRef(null);

  useEffect(() => {
    // const API_URL = 'ws://api.madi-ai.com/canvas/socket';
    const API_URL = 'ws://localhost:8000';
    const socket = new WebSocket(API_URL);

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);
    socket.onmessage = (event) => setVal(event.data);

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const ret = [isReady, val, ws.current?.send.bind(ws.current)];

  return (
    <WebsocketContext.Provider value={ret}>
      {children}
    </WebsocketContext.Provider>
  );
};
