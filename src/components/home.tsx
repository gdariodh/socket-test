import React, { useEffect, useRef, useState } from 'react';
import { Cursor } from './cursor';
import useWebSocket from 'react-use-websocket';
import throttle from 'lodash.throttle';
import { uid } from 'uid';

const renderCursors = (users: any, currentUserId: any) => {
  return (
    Object.keys(users)
      // filter for hiding the current user's cursor
      // .filter((id) => id !== currentUserId)
      .map((uuid) => {
        const user = users[uuid];

        return <Cursor key={uuid} userId={uuid} point={[user.x, user.y]} />;
      })
  );
};

const renderUsersList = (users) => {
  return (
    <ul className="flex flex-row gap-2">
      {Object.keys(users).map((uuid) => {
        const user = users[uuid];
        const lastThreeLetters = uuid.slice(-3);
        const userColor = 'red';

        const positions = {
          x: user.x,
          y: user.y,
        };

        return (
          <li key={uuid} className="flex flex-col gap-2">
            <div
              style={{ backgroundColor: userColor }}
              className="flex w-[32px] h-[32px] text-white flex-col items-center justify-center p-4 rounded-full"
            >
              {lastThreeLetters}
            </div>
            <div>
              <p>state:</p>

              <pre>{JSON.stringify(positions, null, 2)}</pre>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export function Home() {
  const [positions, setPositions] = useState({});
  const WS_URL = `ws://localhost:8080/socket`;
  const { sendJsonMessage, lastJsonMessage, lastMessage } = useWebSocket(
    WS_URL,
    {
      share: true,
    }
  );

  console.log(lastJsonMessage);
  const id = useRef(uid());

  const THROTTLE = 50;
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    if (lastMessage) {
      try {
        const receivedPositions = JSON.parse(lastMessage?.data);
        setPositions((prev) => {
          return {
            ...prev,
            ...receivedPositions,
          };
        });
      } catch (e) {
        setPositions({});
      }
    }
  }, [lastMessage?.data]);

  useEffect(() => {
    sendJsonMessageThrottled.current({
      action: 'publish',
      topic: 'cursors',
      message: JSON.stringify(positions),
    });
  }, [positions]);

  useEffect(() => {
    const initialPositions = {
      ...positions,
      [id.current]: {
        x: 0,
        y: 0,
      },
    };

    sendJsonMessage({
      action: 'subscribe',
      topic: 'cursors',
      message: JSON.stringify(initialPositions),
    });
  }, []);

  const handleMouseMove = (e) => {
    setPositions((prev) => ({
      ...prev,
      [id.current]: {
        x: e.clientX,
        y: e.clientY,
      },
    }));
  };

  if (lastJsonMessage) {
    return (
      <div
        onMouseMove={handleMouseMove}
        className="border h-screen bg-neutral-100 p-4"
      >
        <h2>Pipelines - Proof of concept</h2>
        <p>Your user: {id.current.slice(-3)}</p>
        <div className="absolute top-0 right-0 px-12 py-4 border rounded-lg">
          {renderUsersList(lastJsonMessage)}
        </div>

        <div>{renderCursors(lastJsonMessage, id.current)}</div>
      </div>
    );
  }
}
