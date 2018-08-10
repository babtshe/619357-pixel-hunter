import util from './util';
const TEMPLATE = `
  <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>
  <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>`;
const ENTER_KEY = 13;
let userName = ``;

const initNameInput = (nextScreenElem) => {
  const nameInputElement = document.querySelector(`.rules__input`);

  const onNameInputElementKeyup = () => {
    if (nameInputElement.value.length) {
      enableSubmit();
      userName = nameInputElement.value;
    } else {
      disableSubmit();
    }
  };

  const enableSubmit = () => {
    if (nextScreenElem.disabled) {
      nextScreenElem.disabled = false;
    }
  };

  const disableSubmit = () => {
    if (!nextScreenElem.disabled) {
      nextScreenElem.disabled = true;
    }
  };

  // Зачем заставлять пользователя вводить имя каждый раз? Пусть компьютер запоминает.
  const savedName = localStorage.getItem(`pixelhunterName`);
  if (savedName) {
    nameInputElement.value = savedName;
    userName = nameInputElement.value;
    nextScreenElem.disabled = false;
    nextScreenElem.focus();
  } else {
    nameInputElement.focus();
  }

  nameInputElement.addEventListener(`keyup`, onNameInputElementKeyup);
};

// экспорт
const result = {
  element: util.getElementFromString(TEMPLATE),
  init: (cbNextScreen)=> {
    const nextScreenElement = document.querySelector(`.rules__button`);
    util.initRestart(cbNextScreen);

    const openNextScreen = (evt) => {
      evt.preventDefault();
      cbNextScreen(true);
      localStorage.setItem(`pixelhunterName`, userName);
      document.removeEventListener(`keypress`, onEnterKeypress);
      observer.disconnect();
    };

    const onEnterKeypress = (evt) => {
      if (evt.keyCode === ENTER_KEY && userName.length) {
        openNextScreen(evt);
      }
    };

    // Чтобы избежать дублирования проверок, следим за изменениями кнопки Go!
    const observer = new MutationObserver((mutations) => {
      for (let elem of mutations) {
        if (elem.target.disabled) {
          document.removeEventListener(`keypress`, onEnterKeypress);
        } else {
          document.addEventListener(`keypress`, onEnterKeypress);
        }
      }
    });
    observer.observe(nextScreenElement, {attributes: true});
    initNameInput(nextScreenElement);
    util.initNextScreen(nextScreenElement, cbNextScreen, openNextScreen);

  }
};

export default result;
