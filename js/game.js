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
  pointCost: 50,
  lives: 3,
  level: 0
};
const TICK_DURATION = 1;

let currentGame = INITIAL_GAME;

export const calculateScores = (answers, lives, game) => {
  if (lives < 0) {
    return 0;
  }
  const result = (answers.reduce((accumulator, item) => accumulator + item) + lives) * game.pointCost;
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

const gameTick = (duration) => {
  const newGame = calculateTimeLeft(currentGame, duration);
  currentGame = newGame;
};

export const gameLoop = () => {
  return setInterval(() => gameTick(TICK_DURATION, currentGame), TICK_DURATION * 1000);
};
