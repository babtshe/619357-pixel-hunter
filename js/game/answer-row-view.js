import AbstractView from '../views/abstract-view';
import {Answer} from '../game';
import {levels} from '../data/level-data';

const getStatClassByAnswerType = (answerType) => {
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

const fillUndefinedAnswers = (answers) => {
  return new Array(levels.length - answers.length)
    .fill(`<li class="stats__result ${getStatClassByAnswerType()}"></li>`);
};

export const generateAnswersListTemplate = (answers) => {
  let statsItems = [];
  for (const item of answers) {
    statsItems.push(`<li class="stats__result ${getStatClassByAnswerType(item)}"></li>`);
  }
  statsItems = statsItems.concat(fillUndefinedAnswers(answers));
  return `
  <ul class="stats">
   ${statsItems.join(``)}
  </ul>`;
};

export default class AnswerRowView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
  }

  get template() {
    return generateAnswersListTemplate(this.answers);
  }
}
