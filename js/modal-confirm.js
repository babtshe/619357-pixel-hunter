import {getElementFromString, gameFieldElement} from './util';
const template = `
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

let modalElement;
let modalCloseElement;
let modalOkElement;
let modalCancelElement;
let callback;

const onCloseElementClick = (evt) => {
  hideModal();
  evt.preventDefault();
};

const onCancelElementClick = (evt) => {
  hideModal();
  evt.preventDefault();
};

const onOkElementClick = (evt) => {
  hideModal();
  evt.preventDefault();
  callback();
};

const onEscKeyDown = (evt) => {
  if (evt.key === `Escape`) {
    hideModal();
    evt.preventDefault();
  }
};

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

export const renderModalConfirm = (cb) => {
  if (!document.body.contains(modalElement)) {
    callback = cb;
    gameFieldElement.appendChild(getElementFromString(template));
    modalElement = document.querySelector(`.modal--confirm`);
    modalCloseElement = document.querySelector(`.modal__close`);
    modalCancelElement = document.querySelector(`.modal__btn:last-child`);
    modalOkElement = document.querySelector(`.modal__btn:first-child`);
  }
  showModal();
};
