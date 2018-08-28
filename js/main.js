import util from './util';
import intro from './intro';
import greeting from './greeting';
import rules from './rules';
import game from './game/game-template';
import stats from './stats';

const RESTART_SCREEN = 1;
const gameField = document.querySelector(`#main`);
const screens = [intro, greeting, rules, game, stats];

let currentScreen = 0;
const showScreen = (next = false) => {
  util.clearElement(gameField); // TODO: clear all except header
  if (!next) {
    currentScreen = RESTART_SCREEN;
  }
  const currentFragment = screens[currentScreen].element.cloneNode(true);
  gameField.appendChild(currentFragment);
  screens[currentScreen].init(showScreen);
  currentScreen++;
};

showScreen(true);
