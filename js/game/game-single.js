import {gameFieldElement, getElementFromString} from '../util';
import {resize} from '../data/resize';
import {generateAnswersListTemplate} from '../game/answer-row';
import {onAnswer} from './game-screen';

const frame = {
  width: 705,
  height: 455
};

const debugMode = (window.location.hash === `#debug`);

const generateTemplate = (container, image, answers) => {
  return `
  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${image.src}" alt="Option 1" width="${resize(container, image).width}" height="${resize(container, image).height}">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${generateAnswersListTemplate(answers)}
  </section>`;
};

const initialize = (image) => {
  const gameOptions = document.querySelectorAll(`.game__answer`);

  const onRightAnswerClick = () => {
    onAnswer(true);
  };

  const onWrongAnswerClick = () => {
    onAnswer(false);
  };

  for (let item of gameOptions) {
    if (item.classList.contains(`game__answer--${image.type}`)) {
      item.control.addEventListener(`click`, onRightAnswerClick);
      if (debugMode) {
        item.style.outline = `solid 5px green`;
      }
    } else {
      item.control.addEventListener(`click`, onWrongAnswerClick);
    }
  }
};

export const renderGameSingle = (image, answers) => {
  const singleGameElement = getElementFromString(generateTemplate(frame, image[0], answers));
  gameFieldElement.appendChild(singleGameElement);
  initialize(image[0]);
};
