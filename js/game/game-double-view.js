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
    this.images = images;
    this.answerRow = new AnswerRowView(answers, levelCount).template;
  }

  get template() {
    return generateTemplate(this.images, this.answerRow);
  }

  bind() {
    const gameOptionElements = this.element.querySelectorAll(`.game__answer input`);
    const answers = [];

    const onAnswerClick = () => {
      const checkedAnswers = [...gameOptionElements].filter((item) => item.checked);
      if (checkedAnswers.length === this.images.length) {
        const result = answers.every((item) => item[0].checked);
        this.onAnswer(result);
      }
    };

    this.images.forEach((item, index) => {
      const rightAnswer = [...gameOptionElements].find((option) => {
        return option.name === `question${index + 1}`
        && option.value === item.type;
      });
      answers.push([rightAnswer, true]);
      if (debugMode()) {
        rightAnswer.parentElement.style.outline = `solid 5px green`;
      }
    });

    for (const item of gameOptionElements) {
      item.addEventListener(`click`, onAnswerClick);
    }
  }

  onAnswer() {}
}
