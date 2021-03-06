import {showScreen} from './util';
import Loader from './data/loader';
import LoaderView from './views/loader-view';
import ModalConfirmView from './views/modal-confirm-view';
import ModalErrorView from './views/modal-error-view';
import IntroView from './views/intro-view';
import GreetingView from './views/greeting-view';
import RulesView from './views/rules-view';
import GameScreen from './game/game-screen';
import GameModel from './data/game-model';
import StatsView from './views/stats-view';

const ANIMATION_DURATION = 1000;
let levelData;

const loadData = async (cb) => {
  const loader = new Loader();
  loader.onError = (error) => Application.showModalError(error);
  loader.onLoaderViewInit = (length) => {
    const loaderView = new LoaderView(length);
    loaderView.onFinish = () => cb();
    showScreen(loaderView.element, false);
    loader.onProgress = () => loaderView.nextPhase();
  };
  levelData = await loader.loadGameData();
};
export default class Application {

  static showIntro() {
    const intro = new IntroView();
    const nextScreen = () => {
      intro.element.classList.add(`intro--blur`);
      setTimeout(() => Application.showGreeting(), ANIMATION_DURATION);
    };
    showScreen(intro.element);
    loadData(nextScreen);
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
    const gameScreen = new GameScreen(new GameModel(playerName, levelData));
    gameScreen.onBackClick = () => Application.showModalConfirm();
    gameScreen.onGameEnd = async (answers, lives, player, levelCount) => {
      const loader = new Loader();
      loader.onError = (error) => Application.showModalError(error);
      await loader.sendStats(answers, lives, player);
      Application.showStats(player, levelCount);
    };
    showScreen(gameScreen.element);
  }

  static async showStats(player, levelCount) {
    const loader = new Loader();
    loader.onError = (error) => Application.showModalError(error);
    const statsData = await loader.loadStats(player);
    const stats = new StatsView(statsData, levelCount);
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
