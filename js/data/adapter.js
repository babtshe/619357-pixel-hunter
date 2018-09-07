import {ImageType} from '../game';

export const adapter = (data) => {
  const result = [];
  for (const level of data) {
    result.push(level.answers.map((item) => {
      return {
        src: item.image.url,
        type: ImageType[item.type.toUpperCase()],
        width: item.image.width,
        height: item.image.height
      };
    }));
  }
  return result;
};
