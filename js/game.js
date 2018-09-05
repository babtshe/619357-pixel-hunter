export const MAX_LIVES = 3;
export const POINT_COST = 50;
export const INITIAL_GAME = {
  timer: 30,
  lives: 3,
  level: 0,
  answers: []
};
export const Answer = {
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
export const ImageType = {
  PHOTO: `photo`,
  PAINTING: `paint`
};

export const calculateScores = (answers, lives) => {
  if (lives < 0) {
    return 0;
  }
  return (answers.reduce((accumulator, item) => accumulator + item) + lives) * POINT_COST;
};

export const calculateLives = (game, answer) => {
  const lives = game.lives - !answer;
  return Object.assign({}, game, {lives});
};

export const calculateTimeLeft = (game, time) => {
  if (!time) {
    return game;
  }
  const timeLeft = Math.max(0, game.timer - time);
  return Object.assign({}, game, {timer: timeLeft});
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
  return Object.assign({}, game, {level});
};

export const addAnswer = (game, answer) => {
  const answerValue = answer * calculateAnswerType(game.timer);
  const answers = [...game.answers, answerValue];
  return Object.assign({}, game, {answers});
};
