const LEVEL_COUNT = 10;

const testData = [
  [
    [`https://k42.kn3.net/CF42609C8.jpg`, `paint`, 600, 831] // разрешения картинок тут указанны временно, в дальнейшем будут вычисляться.
  ],
  [
    [`https://k42.kn3.net/CF42609C8.jpg`, `paint`, 600, 831],
    [`https://i.imgur.com/DiHM5Zb.jpg`, `photo`, 687, 1013]
  ],
  [
    [`https://k42.kn3.net/CF42609C8.jpg`, `paint`, 600, 831],
    [`https://i.imgur.com/DiHM5Zb.jpg`, `photo`, 687, 1013],
    [`https://k42.kn3.net/D2F0370D6.jpg`, `paint`, 468, 354]
  ],
  [
    [`https://k42.kn3.net/CF42609C8.jpg`, `paint`, 600, 831],
    [`https://i.imgur.com/DiHM5Zb.jpg`, `photo`, 687, 1013],
    [`http://i.imgur.com/1KegWPz.jpg`, `photo`, 1062, 708]
  ]
];

const generateTestLevels = (count, data) => {
  const result = [];
  for (let i = 0, j = 0; i < count; i++) {
    if (j === data.length) {
      j = 0;
    }
    result.push(data[j]);
    j++;
  }
  return result;
};

const generateImageObjects = (data) => {
  const result = [];
  for (const level of data) {
    result.push(level.map((item) => {
      return {
        src: item[0],
        type: item[1],
        width: item[2],
        height: item[3]
      };
    }));
  }
  return result;
};

export const levels = generateImageObjects(generateTestLevels(LEVEL_COUNT, testData));
