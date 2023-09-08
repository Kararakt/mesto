import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._openImage = document.querySelector('.popup__image');
    this._openImageCaption = document.querySelector('.popup__caption');
  }
  open(data) {
    this._openImage.src = data.link;
    this._openImage.alt = `Фото ${data.name}`;

    this._openImageCaption.textContent = data.name;

    super.open();
  }
}
