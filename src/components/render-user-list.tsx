const RenderUserList = ({ users }: { users: any }) => {
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

export default RenderUserList;
