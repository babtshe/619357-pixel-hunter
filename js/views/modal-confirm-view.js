import AbstractView from './abstract-view';
export default class ModalConfirmView extends AbstractView {
  constructor(currentDocument) {
    super();
    this._document = currentDocument;
  }

  get template() {
    return `
    <section class="modal modal--confirm">
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
    this._document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._element.remove();
  }

  bind() {
    this._modalCloseElement = this.element.querySelector(`.modal__close`);
    this._modalCancelElement = this.element.querySelector(`.modal__btn:last-child`);
    this._modalOkElement = this.element.querySelector(`.modal__btn:first-child`);
    const onCloseElementClick = (evt) => {
      this.hide();
      evt.preventDefault();
      this.onCancel();
    };

    const onCancelElementClick = (evt) => {
      this.hide();
      evt.preventDefault();
      this.onCancel();
    };

    const onOkElementClick = (evt) => {
      this.hide();
      evt.preventDefault();
      this.onConfirm();
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape`) {
        this.hide();
        evt.preventDefault();
        this.onCancel();
      }
    };

    this._modalCloseElement.addEventListener(`click`, onCloseElementClick);
    this._modalCancelElement.addEventListener(`click`, onCancelElementClick);
    this._modalOkElement.addEventListener(`click`, onOkElementClick);
    this._modalOkElement.focus();
    this._document.addEventListener(`keydown`, onEscKeyDown);
  }

  onConfirm() {}

  onCancel() {}
}
