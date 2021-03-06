import {Component} from "./component";
import {createElement} from "./utils";

export class Sort extends Component {
  constructor(name) {
    super();
    this._name = name;

    this._onSort = null;
    this._onSortClick = this._onSortClick.bind(this);
  }

  get template() {
    return `
      <span>
        <input type="radio" name="trip-sorting" id="sorting-${this._name}" value="${this._name}" checked>
        <label class="trip-sorting__item trip-sorting__item--${this._name}" for="sorting-${this._name}">${this._name}</label>
      </span>
    `.trim();
  }

  set onSort(value) {
    this._onSort = value;
  }

  bind() {
    this._element.querySelector(`.trip-sorting__item`)
      .addEventListener(`click`, this._onSortClick);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();

    const sortContainer = document.querySelector(`.trip-sorting`);
    const offerSort = sortContainer.querySelector(`.trip-sorting__item--offers`);
    sortContainer.insertBefore(this._element, offerSort);
  }

  _onSortClick(evt) {
    return typeof this._onSort === `function` && this._onSort(evt.target.innerHTML);
  }

}
