import { generateUUID } from './utils';

export class WebsocketHandler {
  topic = 'cursors';
  uuid = generateUUID();
  socket: WebSocket | null = null;
  positions: Record<string, { x: number; y: number }> = {};

  setupSocket() {
    this.socket = new WebSocket('ws://api.madi-ai.com/canvas/socket');

    this.socket.addEventListener('open', () => {
      this.socket?.send(
        JSON.stringify({
          action: 'subscribe',
          topic: this.topic,
        })
      );
    });

    this.socket.addEventListener('message', (event) => {
      try {
        this.positions = JSON.parse(event.data);
      } catch (e) {
        this.positions = {};
      }

      const p = document.getElementById('positions');
      p!.innerHTML = this.positions[this.uuid]
        ? JSON.stringify(this.positions)
        : 'No position yet';

      const canvas = document.getElementById('board') as HTMLCanvasElement;
      const context = canvas.getContext('2d');

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (const [key, value] of Object.entries(this.positions)) {
          if (key !== this.uuid) {
            context.beginPath();
            context.arc(value.x, value.y, 10, 0, Math.PI * 2);
            context.fillStyle = generateColor();
            context.fill();
            context.closePath();
          }
        }
      }
    });

    this.socket.addEventListener('close', () => {
      this.socket?.send(
        JSON.stringify({
          action: 'unsubscribe',
          topic: this.topic,
        })
      );
    });
  }

  publishPosition(e: MouseEvent) {
    this.positions[this.uuid] = {
      x: e.pageX,
      y: e.pageY,
    };

    this.socket?.send(
      JSON.stringify({
        action: 'publish',
        topic: this.topic,
        message: JSON.stringify(this.positions),
      })
    );
  }
}
