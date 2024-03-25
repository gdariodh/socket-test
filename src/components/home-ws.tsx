import React, { useState, useRef, useEffect } from 'react';
import { uid } from 'uid';
import useWebSocket from 'react-use-websocket';
import throttle from 'lodash.throttle';
import RenderUserList from './render-user-list';
import RenderCursors from './render-cursors';

const THROTTLE = 50;
const WS_URL = `ws://localhost:8080/socket`;

export function HomeWs() {
  const id = useRef(uid());
  const [positions, setPositions] = useState({});

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    onOpen: (event) => {
      sendJsonMessageThrottled.current({
        action: 'subscribe',
        topic: 'cursors',
        message: JSON.stringify({
          [id.current]: {
            x: 0,
            y: 0,
          },
        }),
      });
      setPositions({});
    },
    onMessage: (event) => {
      try {
        const receivedPositions = JSON.parse(event?.data);
        setPositions((prev) => {
          return {
            ...prev,
            ...receivedPositions,
          };
        });
      } catch (e) {
        setPositions({});
      }
    },
  });

  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  const handleMouseMove = (e) => {
    setPositions((prev) => ({
      ...prev,
      [id.current]: {
        x: e.clientX,
        y: e.clientY,
      },
    }));

    sendJsonMessageThrottled.current({
      action: 'publish',
      topic: 'cursors',
      message: JSON.stringify(positions),
    });
  };

  // we add this useEffect to avoid the duplicated sockets,
  // this problem is caused by the reload of the page, because the id is generated again by uid()
  // and we can avoid this behavior with the idStorage
  useEffect(() => {
    const idStorage = localStorage.getItem('id');
    if (idStorage) {
      id.current = idStorage;
    } else {
      localStorage.setItem('id', id.current);
    }
  }, []);

  if (lastJsonMessage) {
    return (
      <div
        onMouseMove={handleMouseMove}
        className="border h-screen bg-neutral-100 p-4"
      >
        <h2>Pipelines - Proof of concept</h2>
        <p>Your user: {id.current.slice(-3)}</p>
        <div className="absolute top-0 right-0 px-12 py-4 border rounded-lg">
          <RenderUserList users={lastJsonMessage} />
        </div>

        <div>
          <RenderCursors users={lastJsonMessage} currentUserId={id.current} />
        </div>
      </div>
    );
  }
}
