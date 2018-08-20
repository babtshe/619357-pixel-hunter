const util = {
  getElementFromString: (value) => {
    return document.createRange().createContextualFragment(value);
  },

  clearElement: (item) => {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  },

  initRestart: (cbNextScreen) => {
    const onRestartGameElementClick = () => {
      restartGameElement.removeEventListener(`click`, onRestartGameElementClick);
      cbNextScreen(false);
    };
    const restartGameElement = document.querySelector(`button.back`);
    restartGameElement.addEventListener(`click`, onRestartGameElementClick);
  }
};

export default util;
