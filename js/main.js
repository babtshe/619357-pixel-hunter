import IntroView from './intro';
import GreetingView from './greeting';
import RulesView from './rules';
import GameScreenView from './game/game-screen';
import StatsView from './stats';
import {showScreen} from './util';

const introView = new IntroView();
introView.onClick = () => showScreen(greetingView.element);

const greetingView = new GreetingView();
greetingView.onClick = () => showScreen(rulesView.element);

const rulesView = new RulesView();
rulesView.onHeaderClick = () => showScreen(greetingView.element);

const statsView = new StatsView();
statsView.onHeaderClick = () => showScreen(greetingView.element);
rulesView.onClick = () => {
  const gameScreenView = new GameScreenView();
  gameScreenView.onHeaderClick = () => showScreen(greetingView.element);
  gameScreenView.onGameEnd = (answers, lives) => {
    statsView.render(answers, lives);
    showScreen(statsView.element);
  };
  gameScreenView.bind();
};


showScreen(introView.element);

