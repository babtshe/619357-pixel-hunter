export const gameFieldElement = document.querySelector(`#main`);

export const getElementFromString = (value) => {
  return document.createRange().createContextualFragment(value);
};

export const clearElement = (item) => {
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
};

export const debugMode = () => window.location.hash === `#debug`;
