'use strict';
(function () {
  const gameField = document.querySelector(`#main`);
  const screens = Array.from(document.querySelectorAll(`template`));
  const INTRO_SCREEN_ID = `intro`;
  const Key = {
    LEFT: 37,
    RIGHT: 39
  };
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

  let currentScreen = 0;
  initialize();

  function initialize() {
    createNavigationControls();
    createNavigationListeners();
    showScreen(screens.map((elem) => elem.id).indexOf(INTRO_SCREEN_ID));
  }

  function showScreen(number) {
    number = (number === screens.length) ? 0 : number;
    number = (number < 0) ? screens.length - 1 : number;
    currentScreen = number;
    gameField.innerHTML = ``;
    gameField.appendChild(screens[number].content.cloneNode(true));
  }

  function createNavigationControls() {
    let fragment = document.createRange().createContextualFragment(SLIDE_NAVIGATION_CONTROLS);
    document.body.appendChild(fragment);
  }

  function createNavigationListeners() {
    const arrowButtons = document.querySelectorAll(`.arrows__btn`);
    arrowButtons[0].addEventListener(`click`, onPreviousSlideClick);
    arrowButtons[1].addEventListener(`click`, onNextSlideClick);
    document.addEventListener(`keydown`, onArrowKeyDown);
  }

  function onPreviousSlideClick(evt) {
    if (!evt.button) {
      evt.preventDefault();
      showScreen(currentScreen - 1);
    }
  }

  function onNextSlideClick(evt) {
    if (!evt.button) {
      evt.preventDefault();
      showScreen(currentScreen + 1);
    }
  }

  function onArrowKeyDown(evt) {
    switch (evt.keyCode) {
      case Key.LEFT:
        evt.preventDefault();
        showScreen(currentScreen - 1);
        break;
      case Key.RIGHT:
        evt.preventDefault();
        showScreen(currentScreen + 1);
        break;
    }
  }
})();
