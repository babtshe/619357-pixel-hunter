import {levelData} from '../data/level-data';

const gameTypes = [
  {
    type: `single`,
    task: `Угадай, фото или рисунок?`,
    formClass: `game__content--wide`,
    optionsCount: 1,
    controls: true,
    width: 705,
    height: 455
  },
  {
    type: `double`,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    formClass: ``,
    optionsCount: 2,
    controls: true,
    width: 468,
    height: 458
  },
  {
    type: `triple-paint`,
    task: `Найдите рисунок среди изображений`,
    formClass: `game__content--triple`,
    optionsCount: 3,
    controls: false,
    width: 304,
    height: 455
  },
  {
    type: `triple-photo`,
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

export const levels = generateLevels(levelData, gameTypes);
