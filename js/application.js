import {showScreen} from './util';
import ModalConfirmView from './modal-confirm-view';
import IntroView from './intro-view';
import GreetingView from './greeting-view';
import RulesView from './rules-view';
import GameScreenView from './game/game-screen';
import StatsView from './stats-view';


export default class Application {
  static showIntro() {
    const intro = new IntroView();
    intro.onButtonClick = () => Application.showGreeting();
    showScreen(intro.element);
  }

  static showGreeting() {
    const greeting = new GreetingView();
    greeting.onContinueButtonClick = () => Application.showRules();
    showScreen(greeting.element);
  }

  static showRules() {
    const rules = new RulesView();
    rules.onStartClick = () => Application.showGame();
    rules.onBackClick = () => Application.showModalConfirm();
    showScreen(rules.element);
  }

  static showGame() {
    const gameScreen = new GameScreenView();
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
    const modal = new ModalConfirmView();
    modal.onConfirm = () => Application.showGreeting();
    showScreen(modal.element, false);
  }
}