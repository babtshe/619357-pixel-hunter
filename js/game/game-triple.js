import {gameFieldElement, getElementFromString, debugMode} from '../util';
import {resize} from '../data/resize';
import {generateAnswersListTemplate} from '../game/answer-row';
import {ImageType} from '../game';
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
      <div class="game__option">
        <img src="${item.src}" alt="Option ${index + 1}" width="${resize(container, item).width}" height="${resize(container, item).height}">
      </div>`;
  }).join(``)}
    </form>
    ${generateAnswersListTemplate(answers)}
  </section>`;
};

const initialize = (images) => {
  const gameOptions = document.querySelectorAll(`.game__option`);

  const onRightAnswerClick = () => {
    onAnswer(true);
  };

  const onWrongAnswerClick = () => {
    onAnswer(false);
  };

  gameOptions.forEach((item, index) => {
    if (images[index].type === findSinglePictureType(images)) {
      item.addEventListener(`click`, onRightAnswerClick);
      if (debugMode()) {
        item.style.outline = `solid 5px green`;
      }
    } else {
      item.addEventListener(`click`, onWrongAnswerClick);
    }
  });
};

export const renderGameTriple = (images, answers) => {
  const doubleGameElement = getElementFromString(generateTemplate(frame, images, answers));
  gameFieldElement.appendChild(doubleGameElement);
  initialize(images);
};
