import {MAX_LIVES} from './game';
import {getElementFromString, gameFieldElement} from './util';
import {renderGreeting} from './greeting';
import {renderModalConfirm} from './modal-confirm';

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
    ${new Array(MAX_LIVES - Math.max(0, lives))
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
      .join(``)}
    ${new Array(Math.max(0, lives))
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
      .join(``)}
    </div>` : ``}
  </header>`;
};

const addListener = (noModal) => {
  const onRestartElementClick = () => {
    if (noModal) {
      renderGreeting();
    } else {
      renderModalConfirm(renderGreeting);
    }

  };
  const restartElement = document.querySelector(`button.back`);
  restartElement.addEventListener(`click`, onRestartElementClick);
};

export const renderHeader = (time, lives, noModal) => {
  const template = getElementFromString(generateHeaderTemplate(time, lives));
  gameFieldElement.appendChild(template);
  addListener(noModal);
};

