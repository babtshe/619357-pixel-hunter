import AbstractView from '../abstract-view';
import HeaderView from '../header-view';
import ModalConfirmView from '../modal-confirm-view';
import GameSingleView from './game-single-view';
import GameDoubleView from './game-double-view';
import GameTripleView from './game-triple-view';
import {INITIAL_GAME, changeLevel, addAnswer, calculateLives} from '../game';
import {levels} from '../data/level-data';

const GameModule = {
  SINGLE: 1,
  DOUBLE: 2,
  TRIPLE: 3
};

export default class GameScreenView extends AbstractView {
  constructor() {
    super();
    this.currentGame = INITIAL_GAME;
    this.modal = new ModalConfirmView();
    this.header = new HeaderView(this.currentGame.timer, this.currentGame.lives);
    this.header.onBackClick = () => this.modal.show();
    this.modal.onConfirm = () => this.onBackClick();
    this.game = this._getGameLevel(levels[this.currentGame.level]);
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.modal.element);
    this.root.appendChild(this.game.element);
  }

  get template() {
    return ``;
  }

  get element() {
    return this.root;
  }

  _getGameLevel(level) {
    if (!level || this.currentGame.lives < 0) {
      this.onGameEnd(this.currentGame.answers, this.currentGame.lives);
      return ``;
    }
    switch (level.length) {
      case GameModule.SINGLE:
        const gameSingle = new GameSingleView(level, this.currentGame.answers);
        gameSingle.onAnswer = (answer) => this._onAnswer(answer);
        return gameSingle;
      case GameModule.DOUBLE:
        const gameDouble = new GameDoubleView(level, this.currentGame.answers);
        gameDouble.onAnswer = (answer) => this._onAnswer(answer);
        return gameDouble;
      case GameModule.TRIPLE:
        const gameTriple = new GameTripleView(level, this.currentGame.answers);
        gameTriple.onAnswer = (answer) => this._onAnswer(answer);
        return gameTriple;
      default:
        return ``;
    }
  }

  updateHeader() {
    const newHeader = new HeaderView(this.currentGame.timer, this.currentGame.lives);
    this.root.replaceChild(newHeader.element, this.header.element);
    this.header = newHeader;
  }

  updateGame() {
    const newGame = this._getGameLevel(levels[this.currentGame.level]);
    if (newGame) {
      this.root.replaceChild(newGame.element, this.game.element);
      this.game = newGame;
    }
  }

  _onAnswer(answer) {
    this.currentGame = addAnswer(this.currentGame, answer);
    this.currentGame = calculateLives(this.currentGame, answer);
    this.currentGame = changeLevel(this.currentGame, this.currentGame.level + 1);
    this.updateHeader();
    this.updateGame();
  }

  onGameEnd() {}

  onBackClick() {}
}

