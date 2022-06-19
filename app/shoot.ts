import { TARGET } from './config.js';
import { Target } from './target.js';

export class Shoot {
  private _x: number = -1;
  private _y: number = -1;

  updateFromMouseEvent(event: MouseEvent) {
    this._x = event.offsetX;
    this._y = event.offsetY;
  }

  checkHit(target: Target) {
    if (!this.isValid()) return false;

    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < target.radius;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  private isValid() {
    return this._x !== -1 && this._y !== -1;
  }
}
