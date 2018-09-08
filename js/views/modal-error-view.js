import AbstractView from './abstract-view';

export default class ModalErrorView extends AbstractView {
  constructor(message) {
    super();
    this._message = message;
  }

  get template() {
    return `
    <section class="modal">
      <div class="modal__inner">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text modal__text--error">${this._message ? this._message : `Произошла неизвестная ошибка.`}
        <br>Пожалуйста, перезагрузите страницу.</p>
      </div>
    </section>`;
  }
}
