import {INITIAL_GAME, changeLevel, calculateTimeLeft, addAnswer, calculateLives} from '../game';
const TICK_DURATION = 1;

export default class GameModel {
  constructor(playerName, levelData) {
    this._levelData = levelData;
    this._state = INITIAL_GAME;
    this.playerName = playerName;
  }

  get state() {
    return this._state;
  }

  get gameOver() {
    return (this.state.lives < 0 || !this.currentLevel);
  }

  get currentLevel() {
    return this._levelData[this.state.level];
  }

  tick() {
    this._state = calculateTimeLeft(this._state, TICK_DURATION);
  }

  resetTimer() {
    this._state = Object.assign({}, this._state, {timer: INITIAL_GAME.timer});
  }

  addAnswer(answer) {
    this._state = addAnswer(this._state, answer);
    this._state = calculateLives(this._state, answer);
    this._state = changeLevel(this._state, this._state.level + 1);
  }
}
