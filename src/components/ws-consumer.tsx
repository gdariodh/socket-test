import { useEffect, useContext } from 'react';
import { WebsocketContext } from '../context/ws-context';

// Very similar to the WsHook component above.
export const WsConsumer = () => {
  const [ready, val, send] = useContext(WebsocketContext); // use it just like a hook

  useEffect(() => {
    if (ready) {
      send('test message');
    }
  }, [ready, send]); // make sure to include send in dependency array

  return (
    <div>
      Ready: {JSON.stringify(ready)}, Value: {val}
    </div>
  );
};
