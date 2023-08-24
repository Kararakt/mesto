import { openPopup } from './index.js';

const popupImage = document.querySelector('.popup_type_image');

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteCard(event) {
    const el = event.target.closest('.element');
    el.remove();
  }

  _handleOpenPopupImage() {
    openPopup(popupImage);

    const openImage = popupImage.querySelector('.popup__image');
    openImage.src = this._link;
    openImage.alt = this._name;

    popupImage.querySelector('.popup__caption').textContent = this._name;
  }

  _handleLikeCard(event) {
    const likeButton = event.target.closest('.element__heart');
    likeButton.classList.toggle('element__heart_active');
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__delete')
      .addEventListener('click', (event) => {
        this._handleDeleteCard(event);
      });

    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this._handleOpenPopupImage();
      });

    this._element
      .querySelector('.element__heart')
      .addEventListener('click', (event) => {
        this._handleLikeCard(event);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = `Фото ${this._name}`;

    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}
