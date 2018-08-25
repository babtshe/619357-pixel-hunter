import {assert} from 'chai';
import * as game from '../game';

describe(`Scores count`, () => {
  it(`should return 0 if less than 0 lives`, () => {
    assert.equal(game.calculateScores([
      game.Answer.Type.FAST,
      game.Answer.Type.FAST,
      game.Answer.Type.FAST,
      game.Answer.Type.WRONG,
      game.Answer.Type.WRONG,
      game.Answer.Type.NORMAL,
      game.Answer.Type.SLOW,
      game.Answer.Type.WRONG,
      game.Answer.Type.WRONG,
      game.Answer.Type.NORMAL
    ], -1), 0);
  });
  it(`should return 1650 if maximum score`, () =>{
    assert.equal(game.calculateScores([
      game.Answer.Type.FAST,
      game.Answer.Type.FAST,
      game.Answer.Type.FAST,
      game.Answer.Type.FAST,
      game.Answer.Type.FAST,
      game.Answer.Type.FAST,
      game.Answer.Type.FAST,
      game.Answer.Type.FAST,
      game.Answer.Type.FAST,
      game.Answer.Type.FAST
    ], 3), 1650);
  });
  it(`should return 350 if minimum score`, () =>{
    assert.equal(game.calculateScores([
      game.Answer.Type.WRONG,
      game.Answer.Type.WRONG,
      game.Answer.Type.WRONG,
      game.Answer.Type.SLOW,
      game.Answer.Type.SLOW,
      game.Answer.Type.SLOW,
      game.Answer.Type.SLOW,
      game.Answer.Type.SLOW,
      game.Answer.Type.SLOW,
      game.Answer.Type.SLOW
    ], 0), 350);
  });
  it(`should return 0 if all answers are wrong`, () => {
    assert.equal(game.calculateScores([
      game.Answer.Type.WRONG,
      game.Answer.Type.WRONG,
      game.Answer.Type.WRONG,
      game.Answer.Type.WRONG
    ], 0), 0);
  });
  it(`should return 850 if all types of answers are present`, () => {
    assert.equal(game.calculateScores([
      game.Answer.Type.FAST,
      game.Answer.Type.NORMAL,
      game.Answer.Type.SLOW,
      game.Answer.Type.WRONG,
      game.Answer.Type.NORMAL,
      game.Answer.Type.FAST,
      game.Answer.Type.WRONG,
      game.Answer.Type.SLOW,
      game.Answer.Type.FAST,
      game.Answer.Type.SLOW
    ], 1), 850);
  });
  it(`should return 1150 if all lives and normal speed`, () => {
    assert.equal(game.calculateScores([
      game.Answer.Type.NORMAL,
      game.Answer.Type.NORMAL,
      game.Answer.Type.NORMAL,
      game.Answer.Type.NORMAL,
      game.Answer.Type.NORMAL,
      game.Answer.Type.NORMAL,
      game.Answer.Type.NORMAL,
      game.Answer.Type.NORMAL,
      game.Answer.Type.NORMAL,
      game.Answer.Type.NORMAL
    ], 3), 1150);
  });
});

describe(`Lives count`, () => {
  it(`should return 0 if right answer and no lifes left`, () => {
    const currentGame = Object.assign({}, game.INITIAL_GAME, {lives: 0});
    assert.equal(game.calculateLives(currentGame, game.Answer.Type.FAST).lives, 0);
  });
  it(`should return -1 if wrong answer and no lives left`, () => {
    const currentGame = Object.assign({}, game.INITIAL_GAME, {lives: 0});
    assert.equal(game.calculateLives(currentGame, game.Answer.Type.WRONG).lives, -1);
  });
  it(`should return 3 if right answer and max lives left`, () => {
    const currentGame = Object.assign({}, game.INITIAL_GAME, {lives: 3});
    assert.equal(game.calculateLives(currentGame, game.Answer.Type.SLOW).lives, 3);
  });
});

describe(`Answer value based on answer speed`, () => {
  it(`should return answer type 0 if time runs out`, () => {
    assert.equal(game.calculateAnswerType(0), 0);
    assert.equal(game.calculateAnswerType(-1), 0);
  });
  it(`should return 3 if value > 20`, () => {
    assert.equal(game.calculateAnswerType(20.5), 3);
    assert.equal(game.calculateAnswerType(30), 3);
  });
  it(`should return 1 if value < 10`, () => {
    assert.equal(game.calculateAnswerType(0.01), 1);
    assert.equal(game.calculateAnswerType(9.99), 1);
  });
  it(`should return 2 if timer value is normal`, () => {
    assert.equal(game.calculateAnswerType(10), 2);
    assert.equal(game.calculateAnswerType(15), 2);
    assert.equal(game.calculateAnswerType(20), 2);
  });
});

describe(`Game change levels`, () => {
  it(`should return 0 if value 0`, ()=>{
    assert.equal(game.changeLevel(game.INITIAL_GAME, 0).level, 0);
  });
  it(`should return 5 if value is 5`, ()=>{
    assert.equal(game.changeLevel(game.INITIAL_GAME, 5).level, 5);
  });
});

describe(`Game calculate time`, () => {
  it(`should return 0 if no time left`, () => {
    assert.equal(game.calculateTimeLeft(game.INITIAL_GAME, 40).timer, 0);
  });
  it(`should return 30 if time full`, () => {
    assert.equal(game.calculateTimeLeft(game.INITIAL_GAME, 0).timer, 30);
  });
  it(`should return 10 if 20 seconds passed`, () => {
    assert.equal(game.calculateTimeLeft(game.INITIAL_GAME, 0).timer, 30);
  });
});

describe(`Game add answer`, () => {
  it(`answers array[2] should be 0 if wrong answer`, () => {
    const currentGame = Object.assign({}, game.INITIAL_GAME, {answers: [
      game.Answer.Type.FAST,
      game.Answer.Type.NORMAL
    ]}, {lives: 3}, {timer: 20});
    assert.equal(game.addAnswer(currentGame, 0).answers[2], 0);
  });
  it(`answers array[4] should be 3 if fast and right answer`, () => {
    const currentGame = Object.assign({}, game.INITIAL_GAME, {answers: [
      game.Answer.Type.FAST,
      game.Answer.Type.NORMAL,
      game.Answer.Type.SLOW,
      game.Answer.Type.NORMAL
    ]}, {lives: 3}, {timer: 25});
    assert.equal(game.addAnswer(currentGame, 1).answers[4], 3);
  });
});
