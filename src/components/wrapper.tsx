import { useState, useEffect, useContext } from 'react';
import { Home } from './home';
import { Login } from './login';
// import { WebsocketContext } from '../context/ws-context';
const Wrapper = () => {
  const [username, setUsername] = useState('');

  // const [ready, val, send] = useContext(WebsocketContext); // use it just like a hook

  // console.log({ ready, val, send });

  // useEffect(() => {
  //   if (ready) {
  //     send('test message');
  //   }
  // }, [ready, send]); // make sure to include send in dependency array

  return (
    <div className="w-full h-full h-screen">
      {/* <div>
        Ready: {JSON.stringify(ready)}, Value: {val}
      </div> */}
      {username ? (
        <Home username={username} />
      ) : (
        <Login onSubmit={setUsername} />
      )}
    </div>
  );
};

export default Wrapper;
