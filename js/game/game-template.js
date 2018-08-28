import util from '../util';
import {generateHeaderTemplate} from '../header';
import {Answer, INITIAL_GAME, changeLevel, addAnswer, calculateLives} from '../game';
import {levels} from './levels';


let currentGame = INITIAL_GAME;
let gameTaskElement = ``;
let gameStatsElements = ``;
let screensCallback = ``;
const generateImageControls = (number) => {
  return `<label class="game__answer  game__answer--photo">
    <input class="visually-hidden" name="question${number}" type="radio" value="photo">
    <span>Фото</span>
  </label>
  <label class="game__answer  game__answer--paint">
    <input class="visually-hidden" name="question${number}" type="radio" value="paint">
    <span>Рисунок</span>
  </label>`;
};

const updateTask = (data) => {
  gameTaskElement.textContent = data;
};

export const getStatClassByAnswerType = (answerType) => {
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

const updateStats = (level, answerType) => {
  gameStatsElements[level].classList.replace(getStatClassByAnswerType(), getStatClassByAnswerType(answerType));
};

const generateGameContent = (state) => {
  const options = [];
  for (let i = 0; i < state.optionsCount; i++) {
    options.push(
        `<div class="game__option">
      <img src="${state.images[i][0]}" alt="Option ${i + 1}" width="${state.width}" height="${state.height}">
      ${state.controls ? generateImageControls(i + 1) : ``}
      </div>`
    );
  }
  return `
  <form class="game__content ${state.formClass}">
  ${options.join(``)}
  </form>`;
};

const checkAnswerTriple = (answer, type, levelImages) => {
  let result = 0;
  if (type === `triple-paint`) {
    result = levelImages.some((item) => item[0] === answer && item[1] === `paint`);
  }
  if (type === `triple-photo`) {
    result = levelImages.some((item) => item[0] === answer && item[1] === `photo`);
  }
  return result;
};

const checkAnswer = (answerList, levelImages) => {
  return levelImages.reduce((accumulator, item, index) => {
    return accumulator * (item[1] === answerList[index]);
  }, 1);
};

const addListeners = (type) => {
  let gameOptions;
  let gameAnswers;
  switch (type) {
    case `single`:
      gameAnswers = document.querySelectorAll(`.game__answer`);
      break;
    case `double`:
      gameAnswers = document.querySelectorAll(`.game__answer`);
      break;
    case `triple-paint`:
      gameOptions = document.querySelectorAll(`.game__option`);
      break;
    case `triple-photo`:
      gameOptions = document.querySelectorAll(`.game__option`);
      break;
  }

  const onGameOptionClick = (evt) => {
    const optionSrc = evt.target.src ? evt.target.src : evt.target.firstElementChild.src;
    const answer = checkAnswerTriple(optionSrc, levels[currentGame.level].type, levels[currentGame.level].images);
    currentGame = addAnswer(currentGame, answer);
    currentGame = calculateLives(currentGame, answer);
    evt.preventDefault();
    updateStats(currentGame.level, currentGame.answers[currentGame.level]);
    renderGameLevel(currentGame.level + 1);
  };

  const onAnswerRadioClick = () => {
    const questionsAnswered = [...gameAnswers].filter((item) => item.control.checked);
    if (questionsAnswered.length === gameAnswers.length / 2) {
      const answers = [];
      for (let item of questionsAnswered) {
        if (item.classList.contains(`game__answer--photo`)) {
          answers.push(`photo`);
        }
        if (item.classList.contains(`game__answer--paint`)) {
          answers.push(`paint`);
        }
      }
      const answer = checkAnswer(answers, levels[currentGame.level].images);
      currentGame = addAnswer(currentGame, answer);
      currentGame = calculateLives(currentGame, answer);
      updateStats(currentGame.level, currentGame.answers[currentGame.level]);
      renderGameLevel(currentGame.level + 1);
    }
  };

  if (gameAnswers) {
    for (let item of gameAnswers) {
      item.addEventListener(`click`, onAnswerRadioClick);
    }
  }
  if (gameOptions) {
    for (let item of gameOptions) {
      item.addEventListener(`click`, onGameOptionClick, false);
    }
  }
};

const renderGameLevel = (level) => {
  const levelData = levels[level];
  if (!levelData || currentGame.lives < 0) {
    screensCallback(true);
    return;
  }
  currentGame = changeLevel(currentGame, level);
  const gameHeader = document.querySelector(`.header`);
  const updatedHeader = util.getElementFromString(generateHeaderTemplate(currentGame)).cloneNode(true);
  gameHeader.parentNode.replaceChild(updatedHeader, gameHeader);
  util.initRestart(screensCallback);
  const gameContent = document.querySelector(`.game__content`);
  const newLevel = util.getElementFromString(generateGameContent(levelData)).cloneNode(true);
  gameContent.parentNode.replaceChild(newLevel, gameContent);
  updateTask(levelData.task);
  addListeners(levelData.type);
};

const createGameTemplate = (levelCount) => {
  return `
  ${generateHeaderTemplate()}
  <section class="game">
    <p class="game__task"></p>
    <form class="game__content"></form>
    <ul class="stats">
      ${new Array(levelCount)
        .fill(`<li class="stats__result stats__result--unknown"></li>`)
        .join(``)}
    </ul>
  </section>`;
};

const gameInit = (cb) => {
  util.initRestart(cb); // TODO: move this to header
  currentGame = INITIAL_GAME;
  screensCallback = cb;
  gameTaskElement = document.querySelector(`.game__task`);
  gameStatsElements = document.querySelectorAll(`.stats__result`);
  renderGameLevel(currentGame.level);
};

const result = {
  element: util.getElementFromString(createGameTemplate(levels.length)),
  init: (cbNextScreen)=> gameInit(cbNextScreen)
};

export const getResults = () => [currentGame.answers, currentGame.lives, levels.length].slice();
export default result;
