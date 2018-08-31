import {gameFieldElement, getElementFromString, debugMode} from '../util';
import {resize} from '../data/resize';
import {generateAnswersListTemplate} from '../game/answer-row';
import {onAnswer} from './game-screen';


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
  const gameOptions = document.querySelectorAll(`.game__answer input`);
  const answers = [];

  const onAnswerClick = () => {
    const checkedAnswers = [...gameOptions].filter((item) => item.checked);
    if (checkedAnswers.length === images.length) {
      const result = answers.every((item) => item[0].checked);
      onAnswer(result);
    }
  };

  images.forEach((item, index) => {
    const rightAnswer = [...gameOptions].find((option) => {
      return option.name === `question${index + 1}`
      && option.value === item.type;
    });
    answers.push([rightAnswer, true]);
    if (debugMode()) {
      rightAnswer.parentElement.style.outline = `solid 5px green`;
    }
  });

  for (const item of gameOptions) {
    item.addEventListener(`click`, onAnswerClick);
  }
};

export const renderGameDouble = (images, answers) => {
  const doubleGameElement = getElementFromString(generateTemplate(frame, images, answers));
  gameFieldElement.appendChild(doubleGameElement);
  initialize(images);
};
