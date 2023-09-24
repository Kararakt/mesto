export class Card {
  constructor(
    data,
    userId,
    templateSelector,
    { handleCardClick, handleDeleteCard, handleAddLike, handleRemoveLike }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
  }

  _checkDelete() {
    if (this._ownerId !== this._userId) {
      this._elementDelete.style.display = 'none';
    }
  }

  _userLike() {
    return this._likes.find((user) => this._userId === user._id);
  }

  _checkCardLike() {
    if (this._userLike()) {
      this._elementHeart.classList.add('element__heart_active');
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementDelete.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId);
    });

    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this._handleCardClick();
      });

    this._elementHeart.addEventListener('click', () => {
      if (this._userLike()) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleAddLike(this._cardId);
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementDelete = this._element.querySelector('.element__delete');

    this._elementCount = this._element.querySelector('.element__count');
    this._elementCount.textContent = this._likes.length;

    this._elementHeart = this._element.querySelector('.element__heart');

    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = `Фото ${this._name}`;

    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();
    this._checkDelete();
    this._checkCardLike();

    return this._element;
  }

  handleUpdateLike(data) {
    this._likes = data.likes;
    this._elementCount = this._element.querySelector('.element__count');

    this._elementCount.textContent = this._likes.length;

    this._elementHeart.classList.toggle('element__heart_active');
  }
}
