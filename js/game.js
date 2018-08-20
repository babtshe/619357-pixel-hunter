const AnswerType = {
  WRONG: 0,
  SLOW: 1,
  NORMAL: 2,
  FAST: 3
};
const AnswerTiming = {
  WRONG: 0,
  SLOW: 10,
  NORMAL: 20
};
// const MAX_LIVES = 3;
const POINT_COST = 50;

const calculateScores = (answers, lives) => {
  if (lives < 0) {
    return 0;
  }
  const result = (answers.reduce((accumulator, item) => accumulator + item) + lives) * POINT_COST;
  return result;
};

const calculateAnswerType = (timeLeft) => {
  if (timeLeft <= AnswerTiming.WRONG) {
    return AnswerType.WRONG;
  } else if (timeLeft < AnswerTiming.SLOW) {
    return AnswerType.SLOW;
  } else if (timeLeft <= AnswerTiming.NORMAL) {
    return AnswerType.NORMAL;
  } else {
    return AnswerType.FAST;
  }
};

const game = {
  calculateScores: (answers, lives) => calculateScores(answers, lives),
  calculateAnswerType: (time) => calculateAnswerType(time)
};

export default game;
