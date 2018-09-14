import AbstractView from './abstract-view';
import HeaderView from './header-view';
import {generateAnswersListTemplate} from '../game/answer-row-view';
import {calculateScores, POINT_COST, Answer} from '../game';
const LAST_GAME = 0;
const Titles = {
  WIN: `Победа!`,
  LOSE: `Поражение!`
};

const generateTemplate = (stateList) => {
  const gameScores: Array<string> = [];
  stateList.forEach((state, index) => {
    gameScores.push(`<table class="result__table">
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr>
      <td class="result__number">${index + 1}.</td>
      <td colspan="2">
      ${state.answerList}
      </td>
      ${state.score.total ? `<td class="result__points">× ${state.score.normal.price}` : `<td class="result__total">`}</td>
      <td class="result__total ${state.score.total ? `">${state.score.normal.total}` : `result__total--final">FAIL`}</td>
    </tr>
  ${state.score.total ? `
    ${state.score.fast.count ?
    `<tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${state.score.fast.count} <span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">× ${state.score.fast.price}</td>
      <td class="result__total">${state.score.fast.total}</td>
    </tr>` : ``}
    ${state.score.lives.count ?
    `<tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${state.score.lives.count} <span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× ${state.score.lives.price}</td>
      <td class="result__total">${state.score.lives.total}</td>
    </tr>` : ``}
    ${state.score.slow.count ?
    `<tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${state.score.slow.count} <span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× ${state.score.slow.price}</td>
      <td class="result__total">${state.score.slow.total}</td>
    </tr>` : ``}
    <tr>
      <td colspan="5" class="result__total  result__total--final">${state.score.total}</td>
    </tr>` : ``}
  </table>`);
  });

  return `
  <section class="result">
    <h2 class="result__title">${stateList.length ? stateList[LAST_GAME].title : ``}</h2>
    ${gameScores.join(``)}
  </section>`;
};

const calculateStatistics = (answers, lives, levelCount) => {
  const scores = calculateScores(answers, lives);
  return Object.assign({},
      {
        title: scores ? Titles.WIN : Titles.LOSE,
        answerList: generateAnswersListTemplate(answers, levelCount),
        score: {
          normal: {
            count: answers.reduce((total, item) => total + (item !== Answer.Type.WRONG), 0),
            price: Answer.Type.NORMAL * POINT_COST,
            total: answers.reduce((total, item) => total + (item !== Answer.Type.WRONG), 0) * Answer.Type.NORMAL * POINT_COST
          },
          fast: {
            count: answers.reduce((total, item) => total + (item === Answer.Type.FAST), 0),
            price: POINT_COST,
            total: answers.reduce((total, item) => total + (item === Answer.Type.FAST), 0) * POINT_COST
          },
          lives: {
            count: lives,
            price: POINT_COST,
            total: lives * POINT_COST
          },
          slow: {
            count: answers.reduce((total, item) => total + (item === Answer.Type.SLOW), 0),
            price: POINT_COST,
            total: answers.reduce((total, item) => total + (item === Answer.Type.SLOW), 0) * -POINT_COST
          },
          total: scores
        }
      });
};

export default class StatsView extends AbstractView {
  constructor(results, levelCount) {
    super();
    this._levelCount = levelCount;
    this._scoresStorage = [];
    for (const item of results) {
      this._scoresStorage.unshift(calculateStatistics(item.answers, item.lives, this._levelCount));
    }
    this._header = new HeaderView();
    this._header.onBackClick = () => this.onBackClick();
  }

  private _levelCount
  private _scoresStorage
  private _header
  private _customElement

  get template() {
    return generateTemplate(this._scoresStorage);
  }

  get element() {
    if (this._customElement) {
      return this._customElement;
    }
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this._header.element);
    fragment.appendChild(this.render());
    this._customElement = fragment;
    this.bind(this._customElement);
    return this._customElement;
  }

  onBackClick() {}
}
