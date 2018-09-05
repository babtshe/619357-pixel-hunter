import AbstractView from './abstract-view';
const ANIMATION_DURATION = 1000;

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>`;
  }

  bind() {
    const introButton = this.element.querySelector(`.intro__asterisk`);
    const onButtonClick = () => {
      this._element.classList.add(`greeting`, `central--blur`);
      setTimeout(() => this.onButtonClick(), ANIMATION_DURATION);
    };
    introButton.addEventListener(`click`, onButtonClick);
  }

  onButtonClick() {}
}
