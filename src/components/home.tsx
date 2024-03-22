import React, { useEffect, useMemo, useRef } from 'react';
import { Cursor } from './cursor';
import useWebSocket from 'react-use-websocket';
import throttle from 'lodash.throttle';

const renderCursors = (users: any) => {
  return Object.keys(users).map((uuid) => {
    const user = users[uuid];
    const userColor = user?.color || 'red';

    return (
      <Cursor
        key={uuid}
        userId={uuid}
        point={[user.state.x, user.state.y]}
        userColor={userColor}
      />
    );
  });
};

const renderUsersList = (users) => {
  return (
    <ul className="flex flex-row gap-2">
      {Object.keys(users).map((uuid) => {
        const user = users[uuid];

        console.log({ user });

        const firstLetter = user.username[0].toUpperCase();
        const userColor = user?.color || 'red';

        return (
          <li key={uuid} className="flex flex-col gap-2">
            <div
              style={{ backgroundColor: userColor }}
              className="flex w-[32px] h-[32px] text-white flex-col items-center justify-center p-4 rounded-full"
            >
              {firstLetter}
            </div>
            <div>
              <p>state:</p>

              <pre>{JSON.stringify(user.state, null, 2)}</pre>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export function Home({ username }: any) {
  const WS_URL = `ws://127.0.0.1:8000`;
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    queryParams: { username },
  });

  const THROTTLE = 50;
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0,
    });
    window.addEventListener('mousemove', (e) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  if (lastJsonMessage) {
    return (
      <div>
        <div className="absolute top-0 right-0 px-12 py-4 border rounded-lg">
          {renderUsersList(lastJsonMessage)}
        </div>
        <div>{renderCursors(lastJsonMessage)}</div>
      </div>
    );
  }
}
