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
const Level = {
  INITIAL: 0,
  MAX: 9
};

// const MAX_LIVES = 3;
// const TIME = 30;
const POINT_COST = 50;

const calculateScores = (answers, lives) => {
  if (lives < 0) {
    return 0;
  }
  const result = (answers.reduce((accumulator, item) => accumulator + item) + lives) * POINT_COST;
  return result;
};

const calculateLives = (currentValue, answerType) => {
  return currentValue - !answerType;
};

const calculateAnswerType = (timeLeft) => {
  if (timeLeft <= Answer.Timing.WRONG) {
    return Answer.Type.WRONG;
  } else if (timeLeft < Answer.Timing.SLOW) {
    return Answer.Type.SLOW;
  } else if (timeLeft <= Answer.Timing.NORMAL) {
    return Answer.Type.NORMAL;
  } else {
    return Answer.Type.FAST;
  }
};

const changeLevel = (value) => {
  if (value <= Level.INITIAL) {
    return Level.INITIAL;
  }
  if (value >= Level.MAX) {
    return Level.MAX;
  }
  return value;
};

const game = {
  calculateScores: (answers, lives) => calculateScores(answers, lives),
  calculateLives: (current, answer) => calculateLives(current, answer),
  calculateAnswerType: (time) => calculateAnswerType(time),
  changeLevel: (id) => changeLevel(id)
};

export default game;
