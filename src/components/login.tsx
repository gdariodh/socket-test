import { useState } from 'react';

export function Login({ onSubmit }: { onSubmit: (username: string) => void }) {
  const [username, setUsername] = useState('');
  return (
    <div className="flex flex-col gap-4">
      <h1>Welcome</h1>
      <p>What should people call you?</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(username);
        }}
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            className="border px-4 py-2 bg-neutral-200  border-neutral-400 "
          />
          <input
            className=" bg-madi-vivid-orchid px-4 py-2 text-white rounded-md"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
