const util = {
  getElementFromString: (value) => {
    return document.createRange().createContextualFragment(value);
  },

  clearElement: (elem) => {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
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
