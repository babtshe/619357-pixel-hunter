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
    this.model = model;
    this.header = new HeaderView(this.model.state.timer, this.model.state.lives);
    this.header.onBackClick = () => this.onBackClick();
    this.game = this._getLevelView(this.model.currentLevel);
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.game.element);
    this.startTimer();
  }

  get element() {
    return this.root;
  }

  _getLevelView(level) {
    if (this.model.gameOver) {
      this.onGameEnd(this.model.state.answers, this.model.state.lives);
      return ``;
    }
    switch (level.length) {
      case GameModule.SINGLE:
        const gameSingle = new GameSingleView(level, this.model.state.answers);
        gameSingle.onAnswer = (answer) => this._onAnswer(answer);
        return gameSingle;
      case GameModule.DOUBLE:
        const gameDouble = new GameDoubleView(level, this.model.state.answers);
        gameDouble.onAnswer = (answer) => this._onAnswer(answer);
        return gameDouble;
      case GameModule.TRIPLE:
        const gameTriple = new GameTripleView(level, this.model.state.answers);
        gameTriple.onAnswer = (answer) => this._onAnswer(answer);
        return gameTriple;
      default:
        return ``;
    }
  }

  startTimer() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.state.timer === BLINK_TIME) {
        this.header.blink(true);
      }
      if (!this.model.state.timer) {
        this._onAnswer(false);
      } else {
        this.updateHeader();
      }
    }, TIMER_INTERVAL);
  }

  stopTimer() {
    clearInterval(this._interval);
    this.header.blink(false);
    this.model.resetTimer();
  }

  updateHeader() {
    this.header.update(this.model.state.timer, this.model.state.lives);
  }

  updateGame() {
    const newGame = this._getLevelView(this.model.currentLevel);
    if (newGame) {
      this.root.replaceChild(newGame.element, this.game.element);
      this.game = newGame;
      this.startTimer();
    }
  }

  _onAnswer(answer) {
    this.model.addAnswer(answer);
    this.stopTimer();
    this.updateHeader();
    this.updateGame();
  }

  onGameEnd() {}

  onBackClick() {}
}

