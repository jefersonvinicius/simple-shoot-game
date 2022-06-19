export class Pointer {
  private _x: number = 0;
  private _y: number = 0;

  updateFromMouseEvent(event: MouseEvent) {
    this._x = event.offsetX;
    this._y = event.offsetY;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}
