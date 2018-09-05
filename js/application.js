import {showScreen} from './util';
import ModalConfirmView from './views/modal-confirm-view';
import ModalErrorView from './views/modal-error-view';
import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';
import GameScreen from './game/game-screen';
import GameModel from './data/game-model';
import StatsView from './views/stats-view';

const ANIMATION_DURATION = 1000;
export default class Application {
  static showIntro() {
    const intro = new IntroView();
    intro.onButtonClick = () => {
      intro.element.classList.add(`intro--blur`);
      setTimeout(() => Application.showGreeting(), ANIMATION_DURATION);
    };
    showScreen(intro.element);
  }

  static showGreeting() {
    const greeting = new GreetingView();
    greeting.onContinueButtonClick = () => Application.showRules();
    showScreen(greeting.element);
  }

  static showRules() {
    const rules = new RulesView();
    rules.onStartClick = (playerName) => Application.showGame(playerName);
    rules.onBackClick = () => Application.showModalConfirm();
    showScreen(rules.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(playerName));
    gameScreen.onBackClick = () => Application.showModalConfirm();
    gameScreen.onGameEnd = (answers, lives) => Application.showStats(answers, lives);
    showScreen(gameScreen.element);
  }

  static showStats(answers, lives) {
    const stats = new StatsView(answers, lives);
    stats.onBackClick = () => Application.showGreeting();
    showScreen(stats.element);
  }

  static showModalConfirm() {
    const modal = new ModalConfirmView(document);
    modal.onConfirm = () => Application.showGreeting();
    showScreen(modal.element, false);
  }

  static showModalError(message) {
    const modal = new ModalErrorView(message);
    showScreen(modal.element, false);
  }
}
