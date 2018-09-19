import AbstractView from './abstract-view';
import HeaderView from './header-view';

const loadSavedName = (inputField, submitButton) => {
  const savedName = localStorage.getItem(`pixelhunterName`);
  if (savedName) {
    inputField.value = savedName;
    submitButton.disabled = false;
  }
  inputField.focus();
};

export default class RulesView extends AbstractView {
  constructor() {
    super();
    this._header = new HeaderView();
    this._header.onBackClick = () => this.onBackClick();
  }

  private _header
  private _customElement

  get template() {
    return `
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
  }

  get element() {
    if (this._customElement) {
      return this._customElement;
    }
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this._header.element);
    fragment.appendChild(this.render());
    this._customElement = fragment;
    this.bind();
    return this._customElement;
  }

  bind() {
    const formElement = this.element.querySelector(`.rules__form`);
    const submitButtonElement = this.element.querySelector(`.rules__button`);
    const nameInputElement = this.element.querySelector(`.rules__input`);

    // загружает имя пользователя, если он уже вводил его когда-то.
    loadSavedName(nameInputElement, submitButtonElement);

    const onNameInputInput = () => {
      submitButtonElement.disabled = !nameInputElement.value.length;
    };

    const onFormSubmit = (evt) => {
      evt.preventDefault();
      // сохраняет имя пользователя, чтобы не вводить заново при новой игре
      localStorage.setItem(`pixelhunterName`, nameInputElement.value);
      this.onStartClick(nameInputElement.value);
    };

    nameInputElement.addEventListener(`input`, onNameInputInput);
    formElement.addEventListener(`submit`, onFormSubmit);
  }

  onStartClick(playerName: string): void {}
  onBackClick() {}
}
