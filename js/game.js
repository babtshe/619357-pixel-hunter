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
  level: {
    current: 0,
    max: 9
  }
};

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

// display - элемент в котором показываем обратный отсчёт,
// callback - функция, которая отвечает за обработку ответа игрока.
export const timer = {
  start(display, callback, game) {
    this._value = game.timer;
    display.textContent = this._value;
    this._id = setInterval(() => {
      this._value--;
      display.textContent = this._value;
      if (this._value === 0) {
        clearInterval(this._id);
        callback(this._value);
      }
    }, 1000);
  },
  stop() {
    clearInterval(this._id);
    return this._value;
  },
  _id: 0,
  _value: 0
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

export const changeLevel = (game, value) => {
  let returnValue = value;
  if (value <= game.level.current) {
    returnValue = game.level.current;
  }
  if (value >= game.level.max) {
    returnValue = game.level.max;
  }
  const newGame = Object.assign({}, game, {
    level: Object.assign({}, game.level, {
      current: returnValue
    })
  });
  return newGame;
};
