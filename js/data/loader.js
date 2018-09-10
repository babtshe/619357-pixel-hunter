import {adapter} from './adapter';
const LOAD_TIMEOUT = 20000;
const APP_ID = 619357;
const DEFAULT_USER = `User`;
const Url = {
  QUESTIONS: `https://es.dump.academy/pixel-hunter/questions`,
  STATS: `https://es.dump.academy/pixel-hunter/stats/${APP_ID}-`
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};
const getJSON = (response) => response.json();
const getPreloadImageElement = (src) => {
  const imageElement = new Image();
  imageElement.src = src;
  return imageElement;
};
const sanitizeString = (value) => {
  return value.replace(/[^A-Za-zА-Яа-я0-9ё]/g, ``);
};
const getUserName = (name) => {
  return sanitizeString(name) ? sanitizeString(name) : DEFAULT_USER;
};

export default class Loader {
  loadGameData() {
    fetch(Url.QUESTIONS)
    .then(checkStatus)
    .then(getJSON)
    .then(adapter)
    .then(this._preloadImages.bind(this))
    .catch((error) => this.onError(error));
  }

  sendStats(answers, lives, userName) {
    const data = Object.assign({}, {answers}, {lives});
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${Url.STATS}${getUserName(userName)}`, requestSettings)
    .then(checkStatus)
    .catch((error) => this.onError(error));
  }

  loadStats(userName) {
    return fetch(`${Url.STATS}${getUserName(userName)}`)
    .then(checkStatus)
    .then(getJSON)
    .catch((error) => this.onError(error));
  }

  _preloadImages(data) {
    const imagePromises = [];
    for (const level of data) {
      level.map((image) => {
        const imageElement = getPreloadImageElement(image.src);
        const imageLoad = new Promise((resolve, reject) => {
          const notLoaded = setTimeout(() => reject(`Не удалось загрузить данные за отведенное время.`), LOAD_TIMEOUT);
          const onImageLoad = () => {
            clearTimeout(notLoaded);
            resolve(imageElement);
            imageElement.removeEventListener(`load`, onImageLoad);
          };
          imageElement.addEventListener(`load`, onImageLoad);
        });
        imageLoad.then((element) => {
          this.onProgress();
          image.width = element.naturalWidth;
          image.height = element.naturalHeight;
        });
        imageLoad.catch((message) => this.onError(message));
        imagePromises.push(imageLoad);
      });
    }
    this.onLoaderViewInit(imagePromises.length);
    Promise.all(imagePromises).then(() => this.onDataResponse(data));
  }

  onLoaderViewInit() {}
  onProgress() {}
  onDataResponse() {}
  onError() {}
}
