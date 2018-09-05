import {getElementFromString} from './util';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }
  get template() {
    throw new Error(`Template нужно переопределить!`);
  }

  render() {
    return getElementFromString(this.template);
  }

  bind() {}

  get element() {
    if (this._element && this._element.children.length) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }
}
