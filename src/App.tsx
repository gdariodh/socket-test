// import Whiteboard from './components/whiteboard';
// import { WsConsumer } from './components/ws-consumer';
import Wrapper from './components/wrapper';
import { WebSocketProvider } from './context/ws-context';

function App() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      {/* <WsConsumer /> */}
      <Wrapper />
    </div>
  );
}

export default App;
