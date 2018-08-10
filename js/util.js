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
  },

  checkIsIterable: (item) => {
    return typeof (item[Symbol.iterator]) === `function`;
  },

  initNextScreen: (elements, cbNextScreen, eventHandler) => {
    const onNextScreenElementClick = (evt) => {
      if (eventHandler) {
        eventHandler(evt, cbNextScreen);
      } else {
        cbNextScreen(true);
      }
    };

    if (util.checkIsIterable(elements)) {
      for (let elem of elements) {
        elem.addEventListener(`click`, onNextScreenElementClick);
      }
    } else {
      elements.addEventListener(`click`, onNextScreenElementClick);
    }
  }
};

export default util;
