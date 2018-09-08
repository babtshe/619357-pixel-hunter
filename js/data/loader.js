import {adapter} from './adapter';
const LOAD_TIMEOUT = 20000;
const APP_ID = 619357;
const DEFAULT_USER = `User`;
const Url = {
  QUESTIONS: `https://es.dump.academy/pixel-hunter/questions`,
  RESULTS: `https://es.dump.academy/pixel-hunter/stats/${APP_ID}-`
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
const getJSON = (response) => response.json();
const getPreloadImageElement = (src) => {
  const imageElement = document.createElement(`img`);
  imageElement.src = src;
  imageElement.alt = `Image preload`;
  imageElement.width = 0;
  imageElement.height = 0;
  imageElement.visibility = `hidden`;
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
    return fetch(`${Url.RESULTS}${getUserName(userName)}`, requestSettings)
    .then(checkStatus)
    .catch((error) => this.onError(error));
  }

  loadStats(userName) {
    return fetch(`${Url.RESULTS}${getUserName(userName)}`)
    .then(checkStatus)
    .then(getJSON)
    .catch((error) => this.onError(error));
  }

  _preloadImages(data) {
    /* Прелоадер вставляет картинки в DOM. Оптимальнее было бы предзагружать картинки
    с помощью fetch или Image, но часть серверов, которые хранят картинки из списка с сайта академии,
    не возвращает заголовок Access-Control-Allow-Origin и CORS блокирует загрузку скриптом.
    Кроме того, предзагрузка нужна для определения правильных размеров.
    */
    const preloadContainerElement = document.querySelector(`.central`);
    const imagePromises = [];
    const containerElement = document.createElement(`div`);
    for (const level of data) {
      level.map((image) => {
        const currentElement = getPreloadImageElement(image.src);
        const imageLoad = new Promise((resolve, reject) => {
          const notLoaded = setTimeout(() => reject(`Не удалось загрузить данные за отведенное время.`), LOAD_TIMEOUT);
          const onImageLoad = () => {
            clearTimeout(notLoaded);
            resolve(currentElement);
            currentElement.removeEventListener(`load`, onImageLoad);
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

        containerElement.appendChild(currentElement);
      });
    }
    preloadContainerElement.appendChild(containerElement);
    this.onLoaderViewInit(imagePromises.length);

    Promise.all(imagePromises).then(() => this.onDataResponse(data));
  }

  onLoaderViewInit() {}
  onProgress() {}
  onDataResponse() {}
  onError() {}
}
