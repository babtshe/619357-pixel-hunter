import {gameFieldElement, getElementFromString} from '../util';
import {resize} from '../data/resize';
import {generateAnswersListTemplate} from '../game/answer-row';
import {ImageType} from '../game';
import {onAnswer} from './game-screen';

const frame = {
  width: 705,
  height: 455
};

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

const checkAnswer = (image, answer) => {
  return image.type === answer;
};

const initialize = (image) => {
  const gameOptions = document.querySelectorAll(`.game__answer`);

  const onAnswerRadioClick = () => {
    const questionsAnswered = [...gameOptions].filter((item) => item.control.checked);
    for (let item of questionsAnswered) {
      if (item.classList.contains(`game__answer--photo`)) {
        onAnswer(checkAnswer(image, ImageType.PHOTO));
      }
      if (item.classList.contains(`game__answer--paint`)) {
        onAnswer(checkAnswer(image, ImageType.PAINTING));
      }
    }
  };

  for (let item of gameOptions) {
    item.addEventListener(`click`, onAnswerRadioClick);
  }
};

export const renderGameSingle = (image, answers) => {
  const singleGameElement = getElementFromString(generateTemplate(frame, image[0], answers));
  gameFieldElement.appendChild(singleGameElement);
  initialize(image[0]);
};
