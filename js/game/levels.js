import {levelData} from '../data/level-data';
import {GameType} from '../game';

const gameSettingsByType = [
  {
    type: GameType.SINGLE,
    task: `Угадай, фото или рисунок?`,
    formClass: `game__content--wide`,
    optionsCount: 1,
    controls: true,
    width: 705,
    height: 455
  },
  {
    type: GameType.DOUBLE,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    formClass: ``,
    optionsCount: 2,
    controls: true,
    width: 468,
    height: 458
  },
  {
    type: GameType.TRIPLE_PAINT,
    task: `Найдите рисунок среди изображений`,
    formClass: `game__content--triple`,
    optionsCount: 3,
    controls: false,
    width: 304,
    height: 455
  },
  {
    type: GameType.TRIPLE_PHOTO,
    task: `Найдите фотографию среди изображений`,
    formClass: `game__content--triple`,
    optionsCount: 3,
    controls: false,
    width: 304,
    height: 455
  }
];

const generateLevels = (data, types) => {
  let result = [];
  for (let item of data) {
    result.push(Object.assign({}, item, types[item.type - 1]));
  }
  return result;
};

export const levels = generateLevels(levelData, gameSettingsByType);
