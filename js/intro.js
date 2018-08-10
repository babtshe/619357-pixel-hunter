import util from './util';
const TEMPLATE = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`;

const result = {
  element: util.getElementFromString(TEMPLATE),
  init: (cbNextScreen)=> {
    const nextScreenElement = document.querySelector(`.intro__asterisk`);
    util.initNextScreen(nextScreenElement, cbNextScreen);
  }
};

export default result;
