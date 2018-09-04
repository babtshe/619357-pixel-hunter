import AbstractView from './abstract-view';
export default class ModalConfirmView extends AbstractView {
  constructor() {
    super();
    this._modalCloseElement = this.element.querySelector(`.modal__close`);
    this._modalCancelElement = this.element.querySelector(`.modal__btn:last-child`);
    this._modalOkElement = this.element.querySelector(`.modal__btn:first-child`);
  }

  get template() {
    return `
    <section class="modal modal--confirm modal__hidden">
      <form class="modal__inner">
        <button class="modal__close" type="button">
          <span class="visually-hidden">Закрыть</span>
        </button>
        <h2 class="modal__title">Подтверждение</h2>
        <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal__button-wrapper">
          <button class="modal__btn">Ок</button>
          <button class="modal__btn">Отмена</button>
        </div>
      </form>
    </section>`;
  }

  hide() {
    this._element.classList.add(`modal__hidden`);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._modalCloseElement.removeEventListener(`click`, this._onCloseElementClick);
    this._modalCancelElement.removeEventListener(`click`, this._onCancelElementClick);
    this._modalOkElement.removeEventListener(`click`, this._onOkElementClick);
  }

  show() {
    this._element.classList.toggle(`modal__hidden`, false);
    this._modalCloseElement.addEventListener(`click`, this._onCloseElementClick.bind(this));
    this._modalCancelElement.addEventListener(`click`, this._onCancelElementClick.bind(this));
    this._modalOkElement.addEventListener(`click`, this._onOkElementClick.bind(this));
    this._modalOkElement.focus();
    document.addEventListener(`keydown`, this._onEscKeyDown.bind(this));
  }

  _onCloseElementClick(evt) {
    this.hide();
    evt.preventDefault();
    this.onCancel();
  }

  _onCancelElementClick(evt) {
    this.hide();
    evt.preventDefault();
    this.onCancel();
  }

  _onOkElementClick(evt) {
    this.hide();
    evt.preventDefault();
    this.onConfirm();
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape`) {
      this.hide();
      evt.preventDefault();
    }
  }

  onConfirm() {}

  onCancel() {}
}
