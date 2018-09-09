const gameFieldElement = document.querySelector(`#main`);

const clearElement = (item) => {
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
};

export const getElementFromString = (value) => {
  const wrapper = document.createElement(`div`);
  wrapper.appendChild(document.createRange().createContextualFragment(value));
  return wrapper.firstElementChild;
};

export const debugMode = () => window.location.hash.toLowerCase() === `#debug`;

export const showScreen = (screenElement, clear = true) => {
  if (clear) {
    clearElement(gameFieldElement);
  }
  gameFieldElement.appendChild(screenElement);
};
