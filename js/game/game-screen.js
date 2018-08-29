import {gameFieldElement, clearElement} from '../util';
import {renderHeader} from '../header';
import {INITIAL_GAME, changeLevel, addAnswer, calculateLives} from '../game';
import {levels} from '../data/level-data';
import {renderStats} from '../stats';
import {renderGameSingle} from './game-single';
import {renderGameDouble} from './game-double';
import {renderGameTriple} from './game-triple';

const GameModule = {
  SINGLE: 1,
  DOUBLE: 2,
  TRIPLE: 3
};

let currentGame = INITIAL_GAME;

export const onAnswer = (answer) => {
  currentGame = addAnswer(currentGame, answer);
  currentGame = calculateLives(currentGame, answer);
  currentGame = changeLevel(currentGame, currentGame.level + 1);
  renderGameLevel(levels[currentGame.level]);
};

const renderGameLevel = (level) => {
  if (!level || currentGame.lives < 0) {
    renderStats(currentGame.answers, currentGame.lives);
    return;
  }
  clearElement(gameFieldElement);
  renderHeader(currentGame.timer, currentGame.lives);
  switch (level.length) {
    case GameModule.SINGLE:
      renderGameSingle(level, currentGame.answers);
      break;
    case GameModule.DOUBLE:
      renderGameDouble(level, currentGame.answers);
      break;
    case GameModule.TRIPLE:
      renderGameTriple(level, currentGame.answers);
      break;
  }
};

export const renderGame = () => {
  currentGame = INITIAL_GAME;
  renderGameLevel(levels[currentGame.level]);
};

