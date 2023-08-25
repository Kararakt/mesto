export class Card {
  constructor(
    data,
    templateSelector,
    openPopup,
    popupImage,
    openImage,
    openImageCaption
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
    this._popupImage = popupImage;
    this._openImage = openImage;
    this._openImageCaption = openImageCaption;
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

  _handleOpenPopupImage() {
    this._openPopup(this._popupImage);

    this._openImage.src = this._link;
    this._openImage.alt = this._name;

    this._openImageCaption.textContent = this._name;
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
