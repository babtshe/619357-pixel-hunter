import AbstractView from '../views/abstract-view';
import {Answer} from '../game';

const getStatClassByAnswerType = (answerType?) => {
  switch (answerType) {
    case Answer.Type.WRONG:
      return `stats__result--wrong`;
    case Answer.Type.SLOW:
      return `stats__result--slow`;
    case Answer.Type.NORMAL:
      return `stats__result--correct`;
    case Answer.Type.FAST:
      return `stats__result--fast`;
    default:
      return `stats__result--unknown`;
  }
};

const fillUndefinedAnswers = (answers, levelCount) => {
  return new Array(levelCount - answers.length)
    .fill(`<li class="stats__result ${getStatClassByAnswerType()}"></li>`);
};

export const generateAnswersListTemplate = (answers, levelCount) => {
  let statsItems: Array<string> = [];
  for (const item of answers) {
    statsItems.push(`<li class="stats__result ${getStatClassByAnswerType(item)}"></li>`);
  }
  statsItems = statsItems.concat(fillUndefinedAnswers(answers, levelCount));
  return `
  <ul class="stats">
   ${statsItems.join(``)}
  </ul>`;
};

export default class AnswerRowView extends AbstractView {
  constructor(answers, levelCount) {
    super();
    this._answers = answers;
    this._levelCount = levelCount;
  }

  private _answers: Array<number>
  private _levelCount: number

  get template() {
    return generateAnswersListTemplate(this._answers, this._levelCount);
  }
}
