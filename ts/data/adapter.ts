import {ImageType} from '../game';

export const adapter = (data) => {
  const results: Array<Object> = [];
  for (const level of data) {
    results.push(level.answers.map((item) => {
      return {
        src: item.image.url,
        type: ImageType[item.type.toUpperCase()],
        width: item.image.width,
        height: item.image.height
      };
    }));
  }
  return results;
};
