export const gameFieldElement = document.querySelector(`#main`);

export const getElementFromString = (value) => {
  const wrapper = document.createElement(`div`);
  wrapper.appendChild(document.createRange().createContextualFragment(value));
  return wrapper.firstElementChild;
};

export const clearElement = (item) => {
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
};

export const debugMode = () => window.location.hash === `#debug`;

export const showScreen = (screenElements) => {
  clearElement(gameFieldElement);
  if (screenElements.length) {
    for (const item of screenElements) {
      gameFieldElement.appendChild(item);
    }
  } else {
    gameFieldElement.appendChild(screenElements);
  }
};
