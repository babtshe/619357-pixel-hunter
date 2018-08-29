export const resize = (frame, image) => {
  const widthRatio = image.width / frame.width;
  const heightRatio = image.height / frame.height;
  const multiplier = Math.max(widthRatio, heightRatio);
  return {
    width: Math.floor(image.width / multiplier),
    height: Math.floor(image.height / multiplier),
  };
};
