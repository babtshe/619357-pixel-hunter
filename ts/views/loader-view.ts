import AbstractView from './abstract-view';
const DASH_ARRAY = 251;

export default class LoaderView extends AbstractView {
  constructor(phases) {
    super();
    this._phases = phases;
    this._currentPhase = 0;
    this._loaderBarElement = this.element.querySelector(`.loader__bar`);
    this._loaderTextElement = this.element.querySelector(`.loader__text`);
    this._setStrokeDashOffset();
  }

  private _phases: number
  private _currentPhase: number
  private _loaderBarElement: HTMLElement|null
  private _loaderTextElement: HTMLElement|null


  get template() {
    return `
    <svg class="loader" height="100" width="100">
      <circle class="loader__background" cx="50" cy="50" r="40" />
      <circle class="loader__bar" cx="50" cy="50" r="40" />
      <text class="loader__text"
      x="50%"
      y="50%"
      text-anchor="middle"
      dy=".3em">${this.progress}%</text>
    </svg>`;
  }

  get progress() {
    return Math.floor(this._currentPhase / this._phases * 100);
  }

  _setStrokeDashOffset() {
    const offset = DASH_ARRAY - DASH_ARRAY % this._phases - Math.floor(DASH_ARRAY / this._phases) * this._currentPhase;
    if (this._loaderBarElement){
      this._loaderBarElement.setAttribute(`stroke-dashoffset`, String(offset));
    }
  }

  nextPhase() {
    this._currentPhase++;
    if (this._currentPhase > this._phases) {
      return;
    }
    this._setStrokeDashOffset();
    if (this._loaderTextElement) {
      this._loaderTextElement.textContent = `${this.progress}%`;
    }
    if (this._currentPhase === this._phases) {
      this.onFinish();
    }
  }

  onFinish() {}
}
