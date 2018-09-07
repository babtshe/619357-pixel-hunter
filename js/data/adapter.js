import {ImageType} from '../game';

export const adapter = (data) => {
  const imageArray = [];
  const result = [];
  for (const level of data) {
    result.push(level.answers.map((item) => {
      imageArray.push(item.image.url);
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
