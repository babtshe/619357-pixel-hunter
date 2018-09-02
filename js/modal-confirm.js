import AbstractView from './abstract-view';
export default class ModalConfirmView extends AbstractView {
  constructor() {
    super();
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

  bind() {
    const modalElement = this.element.querySelector(`.modal--confirm`);
    const modalCloseElement = this.element.querySelector(`.modal__close`);
    const modalCancelElement = this.element.querySelector(`.modal__btn:last-child`);
    const modalOkElement = this.element.querySelector(`.modal__btn:first-child`);

    const hideModal = () => {
      modalElement.classList.add(`modal__hidden`);
      document.removeEventListener(`keydown`, onEscKeyDown);
      modalCloseElement.removeEventListener(`click`, onCloseElementClick);
      modalCancelElement.removeEventListener(`click`, onCancelElementClick);
      modalOkElement.removeEventListener(`click`, onOkElementClick);
    };

    const showModal = () => {
      modalElement.classList.toggle(`modal__hidden`, false);
      modalCloseElement.addEventListener(`click`, onCloseElementClick);
      modalCancelElement.addEventListener(`click`, onCancelElementClick);
      modalOkElement.addEventListener(`click`, onOkElementClick);
      modalOkElement.focus();
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const onCloseElementClick = (evt) => {
      hideModal();
      evt.preventDefault();
      this.onCancel();
    };

    const onCancelElementClick = (evt) => {
      hideModal();
      evt.preventDefault();
      this.onCancel();
    };

    const onOkElementClick = (evt) => {
      hideModal();
      evt.preventDefault();
      this.onConfirm();
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape`) {
        hideModal();
        evt.preventDefault();
      }
    };

    showModal();
  }

  onConfirm() {}

  onCancel() {}
}
