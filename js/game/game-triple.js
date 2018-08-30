import {gameFieldElement, getElementFromString} from '../util';
import {resize} from '../data/resize';
import {generateAnswersListTemplate} from '../game/answer-row';
import {ImageType, DEBUG_MODE} from '../game';
import {onAnswer} from './game-screen';

const frame = {
  width: 304,
  height: 455
};

const findSinglePictureType = (images) => {
  const isPhoto = images.reduce((total, item) => {
    if (item.type === ImageType.PAINTING) {
      return ++total;
    }
    return 0;
  }, -1);
  return isPhoto ? ImageType.PHOTO : ImageType.PAINTING;
};

const generateTemplate = (container, images, answers) => {
  return `
  <section class="game">
    <p class="game__task">Найдите ${findSinglePictureType(images) === ImageType.PHOTO ? `фотографию` : `рисунок`} среди изображений</p>
    <form class="game__content  game__content--triple">
  ${images.map((item, index) => {
    return `
      <div class="game__option${DEBUG_MODE ? ` game__option--${item.type}` : ``}">
        <img src="${item.src}" alt="Option ${index + 1}" width="${resize(container, item).width}" height="${resize(container, item).height}">
      </div>`;
  }).join(``)}
    </form>
    ${generateAnswersListTemplate(answers)}
  </section>`;
};

const checkAnswer = (answerImageSrc, images) => {
  let result = false;
  if (findSinglePictureType(images) === ImageType.PAINTING) {
    result = images.some((item) => item.src === answerImageSrc && item.type === ImageType.PAINTING);
  }
  if (findSinglePictureType(images) === ImageType.PHOTO) {
    result = images.some((item) => item.src === answerImageSrc && item.type === ImageType.PHOTO);
  }
  return result;
};

const initialize = (images) => {
  const gameOptions = document.querySelectorAll(`.game__option`);

  const onGameOptionClick = (evt) => {
    const optionSrc = evt.target.src ? evt.target.src : evt.target.firstElementChild.src;
    const answer = checkAnswer(optionSrc, images);
    onAnswer(answer);
  };

  for (let item of gameOptions) {
    item.addEventListener(`click`, onGameOptionClick, false);
  }
};

export const renderGameTriple = (images, answers) => {
  const doubleGameElement = getElementFromString(generateTemplate(frame, images, answers));
  gameFieldElement.appendChild(doubleGameElement);
  initialize(images);
};
