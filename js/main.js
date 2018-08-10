import util from './util';
import intro from './intro';
import greeting from './greeting';
import rules from './rules';
import gameDouble from './game-double';
import gameSingle from './game-single';
import gameTriple from './game-triple';
import stats from './stats';

const gameField = document.querySelector(`#main`);
const screens = [intro, greeting, rules, gameDouble, gameSingle, gameTriple, stats];
let currentScreen = 0;
const greetingScreen = 1;

const showScreen = (next = false) => {
  util.clearElement(gameField);
  if (!next) {
    currentScreen = greetingScreen;
  }
  const currentFragment = screens[currentScreen].element.cloneNode(true);
  gameField.appendChild(currentFragment);
  screens[currentScreen].init(showScreen);
  currentScreen++;
};

showScreen(true);
