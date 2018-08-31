import {getElementFromString, clearElement, gameFieldElement} from './util';
import {renderGreeting} from './greeting';
const template = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`;

const addListener = () => {
  const introButton = document.querySelector(`.intro__asterisk`);
  const onIntroButtonClick = () => {
    renderGreeting();
  };
  introButton.addEventListener(`click`, onIntroButtonClick);
};

export const renderIntro = () => {
  clearElement(gameFieldElement);
  gameFieldElement.appendChild(getElementFromString(template));
  addListener();
};
