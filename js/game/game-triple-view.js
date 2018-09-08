import AbstractView from '../views/abstract-view';
import {debugMode} from '../util';
import {resize} from '../data/resize';
import AnswerRowView from './answer-row-view';
import {ImageType} from '../game';

const Frame = {
  WIDTH: 304,
  HEIGHT: 455
};

const findSinglePictureType = (images) => {
  const isPhoto = images.reduce((total, item) => {
    if (item.type === ImageType.PAINTING) {
      return total + 1;
    }
    return total;
  }, -1);
  return isPhoto ? ImageType.PHOTO : ImageType.PAINTING;
};

const generateTemplate = (images, answerRow) => {
  return `
  <section class="game">
    <p class="game__task">Найдите ${findSinglePictureType(images) === ImageType.PHOTO ? `фотографию` : `рисунок`} среди изображений</p>
    <form class="game__content  game__content--triple">
  ${images.map((item, index) => {
    return `
      <div class="game__option">
        <img src="${item.src}" alt="Option ${index + 1}" width="${resize(Frame, item).width}" height="${resize(Frame, item).height}">
      </div>`;
  }).join(``)}
    </form>
    ${answerRow}
  </section>`;
};

export default class GameTripleView extends AbstractView {
  constructor(images, answers, levelCount) {
    super();
    this.images = images;
    this.answerRow = new AnswerRowView(answers, levelCount).template;
  }

  get template() {
    return generateTemplate(this.images, this.answerRow);
  }

  bind() {
    const gameOptionElements = this.element.querySelectorAll(`.game__option`);

    const onRightAnswerClick = () => {
      this.onAnswer(true);
    };

    const onWrongAnswerClick = () => {
      this.onAnswer(false);
    };

    gameOptionElements.forEach((item, index) => {
      if (this.images[index].type === findSinglePictureType(this.images)) {
        item.addEventListener(`click`, onRightAnswerClick);
        if (debugMode()) {
          item.style.outline = `solid 5px green`;
        }
      } else {
        item.addEventListener(`click`, onWrongAnswerClick);
      }
    });
  }
}
