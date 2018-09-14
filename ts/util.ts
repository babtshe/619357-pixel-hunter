const gameFieldElement = document.querySelector(`#main`);

const clearElement = (item) => {
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
};

export const getElementFromString = (value: string): HTMLElement => {
  const wrapper = document.createElement(`div`);
  wrapper.appendChild(document.createRange().createContextualFragment(value));
  return wrapper.firstElementChild as HTMLElement;
};

export const debugMode = () => window.location.hash.toLowerCase() === `#debug`;

export const showScreen = (screenElement: HTMLElement, clear = true) => {
  if (gameFieldElement) {
    if (clear) {
      clearElement(gameFieldElement);
    }
    gameFieldElement.appendChild(screenElement);
  }
};
