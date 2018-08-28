const LEVEL_COUNT = 10;

const testData = [
  {
    type: 1,
    images: [
      [`https://k42.kn3.net/CF42609C8.jpg`, `paint`]
    ]
  },
  {
    type: 2,
    images: [
      [`https://k42.kn3.net/CF42609C8.jpg`, `paint`],
      [`https://i.imgur.com/DiHM5Zb.jpg`, `photo`]
    ]
  },
  {
    type: 3,
    images: [
      [`https://k42.kn3.net/CF42609C8.jpg`, `paint`],
      [`https://i.imgur.com/DiHM5Zb.jpg`, `photo`],
      [`https://k42.kn3.net/D2F0370D6.jpg`, `paint`]
    ]
  },
  {
    type: 4,
    images: [
      [`https://k42.kn3.net/CF42609C8.jpg`, `paint`],
      [`https://i.imgur.com/DiHM5Zb.jpg`, `photo`],
      [`https://k32.kn3.net/5C7060EC5.jpg`, `paint`]
    ]
  }
];

const generateTestLevels = (count, data) => {
  const result = [];
  for (let i = 0, j = 0; i < count; i++) {
    if (j === data.length) {
      j = 0;
    }
    result.push(Object.assign({}, data[j]));
    j++;
  }
  return result;
};

export const levelData = generateTestLevels(LEVEL_COUNT, testData);
