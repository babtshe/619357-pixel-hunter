import AbstractView from '../abstract-view';
import {debugMode} from '../util';
import {resize} from '../data/resize';
import {generateAnswersListTemplate} from '../game/answer-row';
import {ImageType} from '../game';

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

export default class GameTripleView extends AbstractView {
  constructor(images, answers) {
    super();
    this.images = images;
    this.answers = answers;
  }

  get template() {
    return generateTemplate(frame, this.images, this.answers);
  }

  bind() {
    const gameOptions = this.element.querySelectorAll(`.game__option`);

    const onRightAnswerClick = () => {
      this.onAnswer(true);
    };

    const onWrongAnswerClick = () => {
      this.onAnswer(false);
    };

    gameOptions.forEach((item, index) => {
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
