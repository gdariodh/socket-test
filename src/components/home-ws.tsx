import React, { useEffect, useRef, useState } from 'react';
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
      sendJsonMessage({
        action: 'subscribe',
        topic: 'cursors',
        message: JSON.stringify({
          ...positions,
          [id.current]: {
            x: 0,
            y: 0,
          },
        }),
      });
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
        // setPositions({});
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
  };

  useEffect(() => {
    sendJsonMessageThrottled.current({
      action: 'publish',
      topic: 'cursors',
      message: JSON.stringify(positions),
    });
  }, [positions]);

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
