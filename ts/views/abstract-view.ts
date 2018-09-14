import {getElementFromString} from '../util';

export default abstract class AbstractView {
  private _element: HTMLElement

  abstract get template(): string

  get element(): HTMLElement {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  protected render(): HTMLElement {
    return getElementFromString(this.template);
  }

  bind(element: HTMLElement): void {}
}
