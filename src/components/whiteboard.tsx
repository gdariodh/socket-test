import React, { useEffect, useState } from 'react';
import { generateUUID } from '../utils';
import { WebsocketHandler } from '../socket';

const WebsocketComponent: React.FC = () => {
  useEffect(() => {
    const ws = new WebsocketHandler();
    ws.setupSocket();
  }, []);

  const handleMouseMove = (event: MouseEvent) => {
    console.log('event', event);
    ws.publishPosition(event);
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <h1>Mouse tracker</h1>
      <h2>proof of concept for the canvas server</h2>
      <main id="main"></main>
      <br />
      <form>
        <p id="positions"></p>
      </form>
      <div id="info"></div>
      <canvas id="board" width="1200" height="500"></canvas>
    </div>
  );
};

export default WebsocketComponent;
