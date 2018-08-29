import {gameFieldElement, clearElement, getElementFromString} from './util';
import {renderHeader} from './header';
import {renderGame} from './game/game-screen';
const template = `
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

const loadSavedName = (inputField, submitButton) => {
  const savedName = localStorage.getItem(`pixelhunterName`);
  if (savedName) {
    inputField.value = savedName;
    submitButton.disabled = false;
  }
  inputField.focus();
};

const initialize = () => {
  const form = document.querySelector(`.rules__form`);
  const submitButton = document.querySelector(`.rules__button`);
  const nameInput = document.querySelector(`.rules__input`);

  // загружает имя пользователя, если он уже вводил его когда-то.
  loadSavedName(nameInput, submitButton);

  const onNameInputInput = () => {
    submitButton.disabled = !nameInput.value.length;
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    // сохраняет имя пользователя, чтобы не вводить заново при новой игре
    localStorage.setItem(`pixelhunterName`, nameInput.value);
    renderGame();
  };

  nameInput.addEventListener(`input`, onNameInputInput);
  form.addEventListener(`submit`, onFormSubmit);
};

export const renderRules = () => {
  clearElement(gameFieldElement);
  renderHeader();
  gameFieldElement.appendChild(getElementFromString(template));
  initialize();
};
