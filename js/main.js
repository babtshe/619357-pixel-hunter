'use strict';
(() => {
  const INITIAL_SCREEN_ID = 0;
  const SLIDE_NAVIGATION_CONTROLS =
  `<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
      z-index: 2;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>`;
  const Key = {
    LEFT: 37,
    RIGHT: 39
  };
  const gameField = document.querySelector(`#main`);
  const screens = [
    `intro`,
    `greeting`,
    `rules`,
    `game-1`,
    `game-2`,
    `game-3`,
    `stats`
  ].map((id) => document.querySelector(`template#${id}`));
  let currentScreen = INITIAL_SCREEN_ID;

  const clearElement = (elem) => {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  };

  const showScreen = (number) => {
    currentScreen = Math.min(screens.length - 1, Math.max(0, number));
    clearElement(gameField);
    const currentFragment = screens[currentScreen].content.cloneNode(true);
    gameField.appendChild(currentFragment);
  };

  const createNavigationControls = () => {
    const fragment = document.createRange()
      .createContextualFragment(SLIDE_NAVIGATION_CONTROLS);
    document.body.appendChild(fragment);
  };

  const createNavigationListeners = () => {
    const arrowButtons = document.querySelectorAll(`.arrows__btn`);
    arrowButtons[0].addEventListener(`click`, onPreviousSlideClick);
    arrowButtons[1].addEventListener(`click`, onNextSlideClick);
    document.addEventListener(`keydown`, onArrowKeyDown);
  };

  const onPreviousSlideClick = () => {
    showScreen(currentScreen - 1);
  };

  const onNextSlideClick = () => {
    showScreen(currentScreen + 1);
  };

  const onArrowKeyDown = (evt) => {
    switch (evt.keyCode) {
      case Key.LEFT:
        showScreen(currentScreen - 1);
        break;
      case Key.RIGHT:
        showScreen(currentScreen + 1);
        break;
    }
  };

  createNavigationControls();
  createNavigationListeners();
  showScreen(currentScreen);
})();
