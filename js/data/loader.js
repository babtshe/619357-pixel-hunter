import {adapter} from './adapter';
const LOAD_TIMEOUT = 20000;
const QUESTIONS_URL = `https://es.dump.academy/pixel-hunter/questions`;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
const getJSON = (response) => response.json();
const getPreloadImageElement = (src) => {
  const image = document.createElement(`img`);
  image.src = src;
  image.width = 0;
  image.height = 0;
  image.visibility = `hidden`;
  return image;
};

export default class Loader {
  constructor() {
    this._preloadContainerElement = document.querySelector(`.central`);
    fetch(QUESTIONS_URL)
    .then(checkStatus)
    .then(getJSON)
    .then((data) => {
      this._data = adapter(data);
      return this._data;
    })
    .then(this.preload.bind(this))
    .catch((error) => this.onError(error));
  }

  preload(data) {
    const imagePromises = [];
    const container = document.createElement(`div`);
    for (const level of data) {
      level.map((image) => {
        const currentElement = getPreloadImageElement(image.src);

        const imageLoad = new Promise((resolve, reject) => {
          const notLoaded = setTimeout(() => reject(`Не удалось загрузить данные за отведенное время.`), LOAD_TIMEOUT);
          const onImageLoad = () => {
            clearTimeout(notLoaded);
            resolve(currentElement);
          };
          currentElement.addEventListener(`load`, onImageLoad);
        });
        imageLoad.then((element) => {
          this.onProgress();
          image.width = element.naturalWidth;
          image.height = element.naturalHeight;
        });
        imageLoad.catch((message) => this.onError(message));
        imagePromises.push(imageLoad);

        container.appendChild(currentElement);
      });
    }
    this._preloadContainerElement.appendChild(container);
    this.loaderViewInit(imagePromises.length);

    Promise.all(imagePromises).then(() => {
      this.onDataResponse(this._data);
    });
  }

  loaderViewInit() {}
  onProgress() {}
  onDataResponse() {}
  onError() {}
}
