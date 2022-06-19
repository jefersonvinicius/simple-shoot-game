import { SCREEN, TARGET } from './config.js';
import { rand } from './utils.js';

const INITIAL_TIMEOUT_TIME = 5000;
const DECREASE_TIMEOUT_PERCENT = 1 / 100;
const MIN_TIMEOUT_TIME = 1000;
const DECREASE_RADIUS_PERCENT = 1 / 100;
const MIN_RADIUS = 8;

export class Target {
  private timeout: number | undefined = undefined;
  private callbackOnTimeout: (() => void) | null = null;
  private timeoutTime = INITIAL_TIMEOUT_TIME;

  private _x: number = 0;
  private _y: number = 0;
  private _radius: number = TARGET.RADIUS;

  constructor() {
    this.updatePosition();
  }

  get secondsUntilTimeout() {
    return this.timeoutTime / 1000;
  }

  refresh() {
    clearTimeout(this.timeout);
    this.updatePosition();
    this.decreaseTimeoutTime();
    this.decreaseRadius();
    this.timeout = setTimeout(() => {
      this.callbackOnTimeout?.();
    }, this.timeoutTime);
  }

  onTimeout(callback: () => void) {
    if (this.callbackOnTimeout) {
      throw Error('onTimeout callback already defined');
    }
    this.callbackOnTimeout = callback;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get radius() {
    return this._radius;
  }

  private updatePosition() {
    this._x = rand({ min: this.radius, max: SCREEN.WIDTH - this.radius });
    this._y = rand({ min: this.radius, max: SCREEN.HEIGHT - this.radius });
  }

  private decreaseRadius() {
    this._radius = this.decreasePercent(
      this._radius,
      DECREASE_RADIUS_PERCENT,
      MIN_RADIUS
    );
  }

  private decreaseTimeoutTime() {
    this.timeoutTime = this.decreasePercent(
      this.timeoutTime,
      DECREASE_TIMEOUT_PERCENT,
      MIN_TIMEOUT_TIME
    );
  }

  private decreasePercent(
    current: number,
    percentToDecrease: number,
    minValue: number
  ) {
    if (current <= minValue) return minValue;

    const valueToDecrease = current * percentToDecrease;
    if (current - valueToDecrease <= minValue) {
      return minValue;
    } else {
      return current - valueToDecrease;
    }
  }
}
