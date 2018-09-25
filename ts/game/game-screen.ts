import HeaderView from '../views/header-view';
import GameSingleView from './game-single-view';
import GameDoubleView from './game-double-view';
import GameTripleView from './game-triple-view';

const TIMER_INTERVAL = 1000;
const BLINK_TIME = 5;
const GameModule = {
  SINGLE: 1,
  DOUBLE: 2,
  TRIPLE: 3
};

export default class GameScreen {
  constructor(model) {
    this._model = model;
    this._header = new HeaderView(this._model.state.timer, this._model.state.lives);
    this._header.onBackClick = () => this.onBackClick();
    this._game = this._getLevelView(this._model.currentLevel);
    this._root = document.createElement(`div`);
    this._root.appendChild(this._header.element);
    this._root.appendChild(this._game.element);
    this.startTimer();
  }

  private _model
  private _header
  private _game
  private _root
  private _interval

  get element() {
    return this._root;
  }

  startTimer() {
    this._interval = setInterval(() => {
      this._model.tick();
      if (this._model.state.timer === BLINK_TIME) {
        this._header.blink(true);
      }
      if (!this._model.state.timer) {
        this._onAnswer(false);
      } else {
        this.updateHeader();
      }
    }, TIMER_INTERVAL);
  }

  stopTimer() {
    clearInterval(this._interval);
    this._header.blink(false);
    this._model.resetTimer();
  }

  updateHeader() {
    this._header.update(this._model.state.timer, this._model.state.lives);
  }

  updateGame() {
    const newGame = this._getLevelView(this._model.currentLevel);
    if (newGame) {
      this._root.replaceChild(newGame.element, this._game.element);
      this._game = newGame;
      this.startTimer();
    }
  }

  _getLevelView(level) {
    if (this._model.gameOver) {
      this._onAnswer = () => {};
      this.onGameEnd(this._model.state.answers, this._model.state.lives, this._model.playerName, this._model.totalLevels);
      return ``;
    }
    switch (level.length) {
      case GameModule.SINGLE:
        const gameSingle = new GameSingleView(level, this._model.state.answers, this._model.totalLevels);
        gameSingle.onAnswer = (answer) => this._onAnswer(answer);
        return gameSingle;
      case GameModule.DOUBLE:
        const gameDouble = new GameDoubleView(level, this._model.state.answers, this._model.totalLevels);
        gameDouble.onAnswer = (answer) => this._onAnswer(answer);
        return gameDouble;
      case GameModule.TRIPLE:
        const gameTriple = new GameTripleView(level, this._model.state.answers, this._model.totalLevels);
        gameTriple.onAnswer = (answer) => this._onAnswer(answer);
        return gameTriple;
      default:
        return ``;
    }
  }

  _onAnswer(answer: boolean) {
    this._model.addAnswer(answer);
    this.stopTimer();
    this.updateHeader();
    this.updateGame();
  }

  onGameEnd(answers: Array<number>, lives: number, playerName: string, totalLevels: number): void {}

  onBackClick(): void {}
}

