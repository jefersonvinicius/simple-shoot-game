type PointAttrs = {
  x: number;
  y: number;
};

export class Point {
  readonly x: number;
  readonly y: number;

  constructor(data: PointAttrs) {
    this.x = data.x;
    this.y = data.y;
  }
}
