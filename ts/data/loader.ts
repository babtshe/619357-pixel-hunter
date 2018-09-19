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
const getPreloadImageElement = (src): HTMLImageElement => {
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
  async loadGameData() {
    try {
      const response = await fetch(Url.QUESTIONS);
      const data = checkStatus(response);
      const dataJSON = await getJSON(data);
      const adaptedData = adapter(dataJSON);
      return await this._preloadImages(adaptedData);
    } catch (error) {
      this.onError(error);
      return error;
    }
  }

  async sendStats(answers, lives, userName) {
    const data = Object.assign({}, {answers}, {lives});
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-type': `application/json`
      },
      method: `POST`
    };
    try {
      const response = await fetch(`${Url.STATS}${getUserName(userName)}`, requestSettings);
      return checkStatus(response);
    } catch (error) {
      this.onError(error);
      return error;
    }
  }

  async loadStats(userName) {
    try {
      const response = await fetch(`${Url.STATS}${getUserName(userName)}`);
      const data = checkStatus(response);
      return await getJSON(data);
    } catch (error) {
      this.onError(error);
      return error;
    }
  }

  async _preloadImages(data) {
    const imagePromises: Array<Promise<HTMLImageElement>> = [];
    for (const level of data) {
      level.map(async (image) => {
        const imageElement = getPreloadImageElement(image.src);
        const imageLoad: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
          const notLoaded = setTimeout(() => reject(`Не удалось загрузить данные за отведенное время.`), LOAD_TIMEOUT);
          const onImageLoad = () => {
            clearTimeout(notLoaded);
            resolve(imageElement);
            imageElement.removeEventListener(`load`, onImageLoad);
          };
          imageElement.addEventListener(`load`, onImageLoad);
        });
        imagePromises.push(imageLoad);
        try {
          const element = await imageLoad as HTMLImageElement;
          this.onProgress();
          image.width = element.naturalWidth;
          image.height = element.naturalHeight;
        } catch (error) {
          this.onError(error);
        }
      });
    }
    this.onLoaderViewInit(imagePromises.length);
    await Promise.all(imagePromises);
    return data;
  }

  onLoaderViewInit(imagesCount: number) {}
  onProgress() {}
  onError(error: string):void {}
}
