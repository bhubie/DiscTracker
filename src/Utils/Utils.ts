import { Observable, Subscription } from 'rxjs';

const colorToRGBA = (color: any) => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

const isScrolledIntoView = (el: any) => {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;

  // Only completely visible elements return true:
  // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  const isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
};

function onEmit<T>(source$:Observable<T>, nextFn:(value: T) => void): Subscription {
  return source$.subscribe(nextFn, console.error);
}

export {
  colorToRGBA,
  isScrolledIntoView,
  onEmit
};
