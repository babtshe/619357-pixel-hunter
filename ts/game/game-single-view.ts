import AbstractView from '../views/abstract-view';
import AnswerRowView from './answer-row-view';
import {debugMode} from '../util';
import {resize} from '../data/resize';

const Frame = {
  WIDTH: 705,
  HEIGHT: 455
};

const generateTemplate = (image, answerRow) => {
  return `
  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${image.src}" alt="Option 1" width="${resize(Frame, image).width}" height="${resize(Frame, image).height}">
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
    this._image = image[0];
    this._answerRow = new AnswerRowView(answers, levelCount).template;
  }
  private _image
  private _answerRow

  get template() {
    return generateTemplate(this._image, this._answerRow);
  }

  bind() {
    const gameOptionElements: NodeListOf<HTMLInputElement> = this.element.querySelectorAll(`.game__answer input`);
    const onRightAnswerClick = () => {
      this.onAnswer(true);
    };

    const onWrongAnswerClick = () => {
      this.onAnswer(false);
    };

    for (const item of gameOptionElements) {
      const labelElement = item.parentElement;
      if (labelElement && labelElement.classList.contains(`game__answer--${this._image.type}`)) {
        item.addEventListener(`click`, onRightAnswerClick);
        if (debugMode()) {
          labelElement.style.outline = `solid 5px green`;
        }
      } else {
        item.addEventListener(`click`, onWrongAnswerClick);
      }
    }
  }

  onAnswer(answer: boolean): void {}
}
