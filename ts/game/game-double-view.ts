import AbstractView from '../views/abstract-view';
import AnswerRowView from './answer-row-view';
import {debugMode} from '../util';
import {resize} from '../data/resize';

const Frame = {
  WIDTH: 468,
  HEIGHT: 458
};

const generateTemplate = (images, answerRow) => {
  return `
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
  ${images.map((item, index) => {
    return `
    <div class="game__option">
    <img src="${item.src}" alt="Option ${index + 1}" width="${resize(Frame, item).width}" height="${resize(Frame, item).height}">
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
    ${answerRow}
  </section>`;
};

export default class GameDoubleView extends AbstractView {
  constructor(images, answers, levelCount) {
    super();
    this._images = images;
    this._answerRow = new AnswerRowView(answers, levelCount).template;
  }
  private _images
  private _answerRow

  get template() {
    return generateTemplate(this._images, this._answerRow);
  }

  bind() {
    const gameOptionElements: NodeList = this.element.querySelectorAll(`.game__answer input`);
    const rightAnswers: Array<HTMLInputElement> = [];

    const onAnswerClick = () => {
      const checkedAnswers = [...gameOptionElements].filter((item: HTMLInputElement) => item.checked);
      if (checkedAnswers.length === this._images.length) {
        const result = rightAnswers.every((item) => item.checked);
        this.onAnswer(result);
      }
    };

    this._images.forEach((item, index) => {
      const rightAnswer = [...gameOptionElements].find((option: HTMLInputElement) => {
        return option.name === `question${index + 1}`
        && option.value === item.type;
      }) as HTMLInputElement;
      rightAnswers.push(rightAnswer);
      if (debugMode()) {
        const labelElement = rightAnswer.parentElement as HTMLElement;
        labelElement.style.outline = `solid 5px green`;
      }
    });

    for (const item of gameOptionElements) {
      item.addEventListener(`click`, onAnswerClick);
    }
  }

  onAnswer(answer: boolean):void {}
}
