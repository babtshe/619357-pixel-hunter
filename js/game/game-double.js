import {gameFieldElement, getElementFromString} from '../util';
import {resize} from '../data/resize';
import {generateAnswersListTemplate} from '../game/answer-row';
import {onAnswer} from './game-screen';

const debugMode = (window.location.hash === `#debug`);

const frame = {
  width: 468,
  height: 458
};
const generateTemplate = (container, images, answers) => {
  return `
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
  ${images.map((item, index) => {
    return `
    <div class="game__option">
    <img src="${item.src}" alt="Option ${index + 1}" width="${resize(container, item).width}" height="${resize(container, item).height}">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`;
  }).join(``)}
    </form>
    ${generateAnswersListTemplate(answers)}
  </section>`;
};

const initialize = (images) => {
  const gameOptions = document.querySelectorAll(`.game__answer`);
  const answers = [];

  const onAnswerClick = () => {
    const checkedAnswers = answers.filter((item) => item[0].checked);
    if (checkedAnswers.length === images.length) {
      const result = checkedAnswers.every((item) => item[1] === true);
      onAnswer(result);
    }
  };

  gameOptions.forEach((item, index) => {
    let imageIndex = Math.floor(index / (gameOptions.length / images.length));
    if (item.classList.contains(`game__answer--${images[imageIndex].type}`)) {
      answers.push([item.control, true]);
      if (debugMode) {
        item.style.outline = `solid 5px green`;
      }
    } else {
      answers.push([item.control, false]);
    }
    item.control.addEventListener(`click`, onAnswerClick);
  });
};

export const renderGameDouble = (images, answers) => {
  const doubleGameElement = getElementFromString(generateTemplate(frame, images, answers));
  gameFieldElement.appendChild(doubleGameElement);
  initialize(images);
};
