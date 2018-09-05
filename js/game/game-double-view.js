import AbstractView from '../views/abstract-view';
import AnswerRowView from './answer-row-view';
import {debugMode} from '../util';
import {resize} from '../data/resize';

const FRAME = {
  width: 468,
  height: 458
};

const generateTemplate = (images, answerRow) => {
  return `
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
  ${images.map((item, index) => {
    return `
    <div class="game__option">
    <img src="${item.src}" alt="Option ${index + 1}" width="${resize(FRAME, item).width}" height="${resize(FRAME, item).height}">
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
  constructor(images, answers) {
    super();
    this.images = images;
    this.answerRow = new AnswerRowView(answers).template;
  }

  get template() {
    return generateTemplate(this.images, this.answerRow);
  }

  bind() {
    const gameOptions = this.element.querySelectorAll(`.game__answer input`);
    const answers = [];

    const onAnswerClick = () => {
      const checkedAnswers = [...gameOptions].filter((item) => item.checked);
      if (checkedAnswers.length === this.images.length) {
        const result = answers.every((item) => item[0].checked);
        this.onAnswer(result);
      }
    };

    this.images.forEach((item, index) => {
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
  }

  onAnswer() {}
}
