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

// describe(`Player lives`, () => {
//   it(`should return 0 if no lifes left`, () => {
//     assert.equal(game.lives());
//   });
// });

describe(`game timer`, () => {
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
