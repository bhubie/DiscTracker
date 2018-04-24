const colorToRGBA = color => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

const isScrolledIntoView = (el) => {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;

  // Only completely visible elements return true:
  // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  const isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
};

export {
  colorToRGBA,
  isScrolledIntoView,
};
