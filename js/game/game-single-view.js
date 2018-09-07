import AbstractView from '../views/abstract-view';
import AnswerRowView from './answer-row-view';
import {debugMode} from '../util';
import {resize} from '../data/resize';

const FRAME = {
  width: 705,
  height: 455
};

const generateTemplate = (image, answerRow) => {
  return `
  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${image.src}" alt="Option 1" width="${resize(FRAME, image).width}" height="${resize(FRAME, image).height}">
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
    ${answerRow}
  </section>`;
};

export default class GameSingleView extends AbstractView {
  constructor(image, answers, levelCount) {
    super();
    this.image = image[0];
    this.answerRow = new AnswerRowView(answers, levelCount).template;
  }

  get template() {
    return generateTemplate(this.image, this.answerRow);
  }

  bind() {
    const gameOptions = this.element.querySelectorAll(`.game__answer`);
    const onRightAnswerClick = () => {
      this.onAnswer(true);
    };

    const onWrongAnswerClick = () => {
      this.onAnswer(false);
    };

    for (let item of gameOptions) {
      if (item.classList.contains(`game__answer--${this.image.type}`)) {
        item.control.addEventListener(`click`, onRightAnswerClick);
        if (debugMode()) {
          item.style.outline = `solid 5px green`;
        }
      } else {
        item.control.addEventListener(`click`, onWrongAnswerClick);
      }
    }
  }

  onAnswer() {}
}
