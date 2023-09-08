export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeCard(event) {
    const likeButton = event.target.closest('.element__heart');
    likeButton.classList.toggle('element__heart_active');
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__delete')
      .addEventListener('click', () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this._handleCardClick();
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
