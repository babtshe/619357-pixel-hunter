import AbstractView from './abstract-view';
import {MAX_LIVES} from './game';

const generateLivesTemplate = (lives, maxLives) => {
  const emptyLives = new Array(maxLives - Math.max(0, lives))
    .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`);
  const fullLives = new Array(Math.max(0, lives))
    .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`);

  return `
  <div class="game__lives">
  ${emptyLives.concat(fullLives).join(``)}
  </div>`;
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
    ${generateLivesTemplate(lives, MAX_LIVES)}`
    : ``}
  </header>`;
};

export default class HeaderView extends AbstractView {
  constructor(time, lives) {
    super();
    this.time = time;
    this.lives = lives;
  }

  get template() {
    return generateHeaderTemplate(this.time, this.lives);
  }

  bind() {
    const backElement = this.element.querySelector(`button.back`);
    backElement.addEventListener(`click`, this.onBackClick);
  }

  onBackClick() {}
}
