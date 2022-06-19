import { POINTER, TARGET } from './config.js';
import { Point } from './point.js';
import { Pointer } from './pointer.js';
import { Target } from './target.js';

type CircleParams = {
  color?: string;
  x: number;
  y: number;
  radius: number;
};

type LineParams = {
  from: Point;
  to: Point;
};

export class Painter {
  private context: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!;
  }

  setContext(value: CanvasRenderingContext2D) {
    this.context = value;
  }

  drawTarget(target: Target) {
    this.circle({ x: target.x, y: target.y, radius: target.radius });
  }

  drawPointer(pointer: Pointer) {
    this.line({
      from: new Point({ x: pointer.x - POINTER.CROSS_SIZE, y: pointer.y }),
      to: new Point({ x: pointer.x + POINTER.CROSS_SIZE, y: pointer.y }),
    });
    this.line({
      from: new Point({ x: pointer.x, y: pointer.y - POINTER.CROSS_SIZE }),
      to: new Point({ x: pointer.x, y: pointer.y + POINTER.CROSS_SIZE }),
    });
    this.circle({
      x: pointer.x,
      y: pointer.y,
      radius: POINTER.RADIUS,
      color: '#f00',
    });
  }

  clear() {
    this.context?.clearRect(0, 0, screen.width, screen.height);
  }

  private circle({ color, x, y, radius }: CircleParams) {
    color ||= '#000';
    this.context?.beginPath();
    this.context.fillStyle = color;
    this.context?.arc(x, y, radius, 0, 2 * Math.PI);
    this.context?.fill();
  }

  private line({ from, to }: LineParams) {
    this.context.beginPath();
    this.context.moveTo(from.x, from.y);
    this.context.lineTo(to.x, to.y);
    this.context.stroke();
  }
}
