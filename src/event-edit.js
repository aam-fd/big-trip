import {createElement} from './utils';

export class EventEdit {
  constructor(date, data) {
    this._date = date;
    this._icon = data.event.icon;
    this._title = data.event.title;
    this._location = data.event.location;
    this._picture = data.picture;
    this._description = data.description;
    this._time = data.time;
    this._price = data.price;
    this._offers = data.offers;

    this._element = null;
    this._onSubmit = null;
    this._onReset = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onResetButtonClick = this._onResetButtonClick.bind(this);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }

  _onResetButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onReset === `function` && this._onReset();
  }

  get element() {
    return this._element;
  }

  set onSubmit(value) {
    this._onSubmit = value;
  }

  set onReset(value) {
    this._onReset = value;
  }

  makeOffers(offersData) {
    const offers = [];
    offersData.forEach((offer) => {
      offers.push(`
        <input class="point__offers-input visually-hidden" type="checkbox" id="add-luggage" name="offer" value="add-luggage">
        <label for="add-luggage" class="point__offers-label">
          <span class="point__offer-service">${offer}</span> + €<span class="point__offer-price">30</span>
        </label>
      `);
    });

    return offers.join(``);
  }


  get template() {
    return `
      <article class="point">
        <form action="" method="get">
          <header class="point__header">
            <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="${this._date}" name="day">
            </label>
      
            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">${this._icon}</label>
      
              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
      
              <div class="travel-way__select">
                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi">
                  <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus">
                  <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train">
                  <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="train" checked>
                  <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
                </div>
      
                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in">
                  <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing">
                  <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
                </div>
              </div>
            </div>
      
            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">${this._title}</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._location}" name="destination">
              <datalist id="destination-select">
                <option value="airport"></option>
                <option value="Geneva"></option>
                <option value="Chamonix"></option>
                <option value="hotel"></option>
              </datalist>
            </div>
      
            <label class="point__time">
              choose time
              <input class="point__input" type="text" value="${this._time.from} — ${this._title.to}" name="time" placeholder="${this._time.from} — ${this._title.to}">
            </label>
      
            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="${this._price}" name="price">
            </label>
      
            <div class="point__buttons">
              <button class="point__button point__button--save" type="submit">Save</button>
              <button class="point__button" type="reset">Delete</button>
            </div>
      
            <div class="paint__favorite-wrap">
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>
      
          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>
      
              <div class="point__offers-wrap">
                ${this.makeOffers(this._offers)}
              </div>
      
            </section>
            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${this._description}</p>
              <div class="point__destination-images">
                <img src="${this._picture}" alt="picture from place" class="point__destination-image">
              </div>
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>
    `.trim();
  }

  bind() {
    this._element.querySelector(`form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`form`)
      .addEventListener(`reset`, this._onResetButtonClick);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unbind() {
    this._element.querySelector(`form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`form`)
      .removeEventListener(`reset`, this._onResetButtonClick);
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

}