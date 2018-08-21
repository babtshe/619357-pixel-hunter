import {assert} from 'chai';
import game from '../game';

describe(`Scores count`, () => {
  it(`should return 0 if less than 0 lives`, () => {
    assert.equal(game.calculateScores([3, 3, 3, 0, 0, 2, 1, 0, 0, 2], -1), 0);
  });
  it(`should return 1650 if maximum score`, () =>{
    assert.equal(game.calculateScores([3, 3, 3, 3, 3, 3, 3, 3, 3, 3], 3), 1650);
  });
  it(`should return 350 if minimum score`, () =>{
    assert.equal(game.calculateScores([0, 0, 0, 1, 1, 1, 1, 1, 1, 1], 0), 350);
  });
  it(`should return 0 if all answers are wrong`, () => {
    assert.equal(game.calculateScores([0, 0, 0, 0], -1), 0);
  });
  it(`should return 850 if all types of answers are present`, () => {
    assert.equal(game.calculateScores([3, 2, 1, 0, 2, 3, 0, 1, 3, 1], 1), 850);
  });
});

describe(`Lives count`, () => {
  it(`should return 0 if right answer and no lifes left`, () => {
    assert.equal(game.calculateLives(1, 0), 0);
  });
  it(`should return -1 if wrong answer and no lives left`, () => {
    assert.equal(game.calculateLives(0, 0), -1);
  });
  it(`should return 3 if right answer and max lives left`, () => {
    assert.equal(game.calculateLives(3, 1), 3);
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
  it(`should return maxLevel if value >= maxLevel`, () => {
    assert.equal(game.changeLevel(9), 9);
    assert.equal(game.changeLevel(10), 9);
  });
  it(`should return 0 if value <= minLevel`, ()=>{
    assert.equal(game.changeLevel(0), 0);
    assert.equal(game.changeLevel(-1), 0);
  });
  it(`should return 5 if value is 5`, ()=>{
    assert.equal(game.changeLevel(5), 5);
  });
});
