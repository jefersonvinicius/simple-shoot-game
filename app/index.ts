import { SCREEN } from './config.js';
import { Painter } from './painter.js';
import { Pointer } from './pointer.js';
import { Shoot } from './shoot.js';
import { Target } from './target.js';

document.addEventListener('DOMContentLoaded', () => {
  const screen = document.querySelector<HTMLCanvasElement>('#screen')!;
  const pointsLabel = document.querySelector('#points')!;
  const secondsLabel = document.querySelector('#seconds')!;
  screen.height = SCREEN.HEIGHT;
  screen.width = SCREEN.WIDTH;

  const target = new Target();
  const pointer = new Pointer();
  const shoot = new Shoot();

  let points = 0;

  target.onTimeout(() => {
    alert(`You make ${points} points!`);
    document.location.reload();
  });

  document.addEventListener('mousemove', (event) => {
    pointer.updateFromMouseEvent(event);
  });

  document.addEventListener('mouseup', (event) => {
    shoot.updateFromMouseEvent(event);
    if (shoot.checkHit(target)) {
      target.refresh();
      points++;
    } else {
      points--;
    }
  });

  const painter = new Painter(screen);
  setInterval(() => {
    pointsLabel.textContent = String(points);
    secondsLabel.textContent = `${target.secondsUntilTimeout.toFixed(2)}s`;

    painter.clear();
    painter.drawTarget(target);
    painter.drawPointer(pointer);
  }, 60 / 1000);
});
