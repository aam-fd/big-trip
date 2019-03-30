import {pointsList} from './consts';

export class Adapter {
  constructor(data) {

    this.id = +data[`id`] + 1 || ``;
    this.type = data[`type`] || ``;
    this.icon = pointsList[this.type].icon || ``;
    this.title = pointsList[this.type].title || ``;
    this.destination = data[`destination`].name || ``; // : {name: , description: , pictures: Array(5)}
    this.picture = data[`destination`].pictures || []; // переписать место рендеринга картинок
    this.description = data[`destination`].description || ``;

    this.time = {
      from: data[`date_from`] || ``,
      to: data[`date_to`] || ``,
    };

    this.price = data[`base_price`] || ``; // : 500
    this.offers = data[`offers`] || []; // : (3) [{…}, {…}, {…}]
    this.isDeleted = false; // отправлять ли на сервер инфу если событие удаление, is_deleted = true ???
    this.isFavorite = data[`is_favorite`] || false; // : true // в mock не было
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'destination': {
        name: this.destination,
        description: this.description,
        pictures: this.picture
      },
      'date_from': this.time.from,
      'date_to': this.time.to,
      'base_price': this.price,
      'offers': this.offers,
      'is_favorite': this.isFavorite,
    };
  }

  static parsePoint(data) {
    return new Adapter(data);
  }

  static parsePoints(data) {
    return data.map(Adapter.parsePoint);
  }

}
