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
  },

  resize: (frame, image) => {
    const widthRatio = image.width / frame.width;
    const heightRatio = image.height / frame.height;
    const multiplier = Math.max(widthRatio, heightRatio);
    return {
      width: Math.floor(image.width / multiplier),
      height: Math.floor(image.height / multiplier),
    };
  }
};

export default util;
