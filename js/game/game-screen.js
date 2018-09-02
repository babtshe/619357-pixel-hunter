import AbstractView from '../abstract-view';
import {gameFieldElement, clearElement} from '../util';
import HeaderView from '../header';
import {INITIAL_GAME, changeLevel, addAnswer, calculateLives} from '../game';
import {levels} from '../data/level-data';
// import {renderStats} from '../stats';
import GameSingleView from './game-single';
import GameDoubleView from './game-double';
import GameTripleView from './game-triple';

const GameModule = {
  SINGLE: 1,
  DOUBLE: 2,
  TRIPLE: 3
};

export default class GameScreenView extends AbstractView {
  constructor() {
    super();
    this.currentGame = INITIAL_GAME;
  }

  _renderGameLevel(level) {
    if (!level || this.currentGame.lives < 0) {
      this.onGameEnd(this.currentGame.answers, this.currentGame.lives);
      return;
    }
    clearElement(gameFieldElement);
    const headerView = new HeaderView(this.currentGame.timer, this.currentGame.lives);
    headerView.onClick = () => this.onHeaderClick();
    gameFieldElement.appendChild(headerView.element);
    switch (level.length) {
      case GameModule.SINGLE:
        const gameSingleView = new GameSingleView(level, this.currentGame.answers);
        gameSingleView.onAnswer = (answer) => this._onAnswer(answer);
        gameFieldElement.appendChild(gameSingleView.element);
        break;
      case GameModule.DOUBLE:
        const gameDoubleView = new GameDoubleView(level, this.currentGame.answers);
        gameDoubleView.onAnswer = (answer) => this._onAnswer(answer);
        gameFieldElement.appendChild(gameDoubleView.element);
        break;
      case GameModule.TRIPLE:
        const gameTripleView = new GameTripleView(level, this.currentGame.answers);
        gameTripleView.onAnswer = (answer) => this._onAnswer(answer);
        gameFieldElement.appendChild(gameTripleView.element);
        break;
    }
  }

  get template() {
    return ``;
  }

  _onAnswer(answer) {
    this.currentGame = addAnswer(this.currentGame, answer);
    this.currentGame = calculateLives(this.currentGame, answer);
    this.currentGame = changeLevel(this.currentGame, this.currentGame.level + 1);
    this._renderGameLevel(levels[this.currentGame.level]);
  }

  bind() {
    this._renderGameLevel(levels[this.currentGame.level]);
  }

  onGameEnd() {}

  onHeaderClick() {}
}

