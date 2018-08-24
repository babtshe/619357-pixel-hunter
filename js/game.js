const POINT_COST = 50;
// const TICK_DURATION = 1;
const Answer = {
  Type: {
    WRONG: 0,
    SLOW: 1,
    NORMAL: 2,
    FAST: 3
  },
  Timing: {
    WRONG: 0,
    SLOW: 10,
    NORMAL: 20
  }
};
export const INITIAL_GAME = {
  timer: 30,
  lives: 3,
  level: 0,
  answers: []
};

// let currentGame = INITIAL_GAME;

export const calculateScores = (game) => {
  if (game.lives < 0) {
    return 0;
  }
  const result = (game.answers.reduce((accumulator, item) => accumulator + item) + game.lives) * POINT_COST;
  return result;
};

export const calculateLives = (currentValue, answerType) => {
  return currentValue - !answerType;
};

export const calculateTimeLeft = (game, time) => {
  if (!time) {
    return game;
  }
  const timeLeft = Math.max(0, game.timer - time);
  const newGame = Object.assign({}, game, {timer: timeLeft});
  return newGame;
};

export const calculateAnswerType = (timeLeft) => {
  if (timeLeft <= Answer.Timing.WRONG) {
    return Answer.Type.WRONG;
  }
  if (timeLeft < Answer.Timing.SLOW) {
    return Answer.Type.SLOW;
  }
  if (timeLeft <= Answer.Timing.NORMAL) {
    return Answer.Type.NORMAL;
  }
  return Answer.Type.FAST;
};

export const changeLevel = (game, level) => {
  if (level <= game.level) {
    return game;
  }
  const newGame = Object.assign({}, game, {level});
  return newGame;
};

export const addAnswer = (game, answer) => {
  // функция проверки ответов подъедет попозже. Пока предположим что ответ приходит в виде:
  // 0 - неправильный
  // 1 -  правильный
  const answerValue = answer * calculateAnswerType(game.timer);
  const lives = calculateLives(game.lives, answerValue);
  const answers = [...game.answers, answerValue];
  const newGame = Object.assign({}, game, {lives}, {answers});
  return newGame;
};

// export const gameLoop = () => {
//   return setInterval(() => {
//     currentGame = calculateTimeLeft(currentGame, TICK_DURATION);
//   },
//   TICK_DURATION * 1000);
// };
