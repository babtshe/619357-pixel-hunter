import util from './util';
const TEMPLATE = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`;

const introInit = (cb) => {
  const nextScreenElement = document.querySelector(`.intro__asterisk`);
  const onNextScreenElementClick = () => {
    cb(true);
  };
  nextScreenElement.addEventListener(`click`, onNextScreenElementClick);
};

const result = {
  element: util.getElementFromString(TEMPLATE),
  init: (cbNextScreen) => introInit(cbNextScreen)
};

export default result;
