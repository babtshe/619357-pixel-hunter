import AbstractView from './abstract-view';
import {MAX_LIVES} from '../game';

const generateLivesTemplate = (lives, maxLives) => {
  const emptyLives = new Array(maxLives - Math.max(0, lives))
    .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`);
  const fullLives = new Array(Math.max(0, lives))
    .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`);

  return emptyLives.concat(fullLives).join(``);
};

const generateHeaderTemplate = (time, lives) => {
  return `<header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  ${time !== undefined && lives !== undefined ?
    `<div class="game__timer">${time}</div>
    <div class="game__lives">
    ${generateLivesTemplate(lives, MAX_LIVES)}
    </div>`
    : ``}
  </header>`;
};

export default class HeaderView extends AbstractView {
  constructor(time, lives) {
    super();
    this._time = time;
    this._lives = lives;
  }

  get template() {
    return generateHeaderTemplate(this._time, this._lives);
  }

  update(time, lives) {
    if (time !== this._time) {
      this._timeElement.textContent = time;
      this._time = time;
    }
    if (lives !== this.lives) {
      this._livesElement.innerHTML = generateLivesTemplate(lives, MAX_LIVES);
      this._lives = lives;
    }
  }

  blink(start) {
    if (start) {
      this._timeElement.classList.add(`game__timer--blink`);
    } else {
      this._timeElement.classList.remove(`game__timer--blink`);
    }
  }

  bind() {
    this._timeElement = this.element.querySelector(`.game__timer`);
    this._livesElement = this.element.querySelector(`.game__lives`);
    const backElement = this.element.querySelector(`button.back`);
    backElement.addEventListener(`click`, this.onBackClick);
  }

  onBackClick() {}
}
