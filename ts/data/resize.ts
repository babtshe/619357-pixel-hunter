export const resize = (container, image) => {
  const frame = {
    width: container.width || container.WIDTH,
    height: container.height || container.HEIGHT
  };
  const widthRatio = image.width / frame.width;
  const heightRatio = image.height / frame.height;
  const multiplier = Math.max(widthRatio, heightRatio);
  return {
    width: Math.floor(image.width / multiplier),
    height: Math.floor(image.height / multiplier),
  };
};
