import React from 'react';
import { Cursor } from './cursor';

interface IRenderCursors {
  users: any;
  currentUserId?: string | number;
}

const RenderCursors = ({ users, currentUserId }: IRenderCursors) => {
  return (
    Object.keys(users)
      // filter for hiding the current user's cursor
      .filter((id) => id !== currentUserId)
      .map((uuid) => {
        const user = users[uuid];

        return <Cursor key={uuid} userId={uuid} point={[user.x, user.y]} />;
      })
  );
};

export default RenderCursors;
