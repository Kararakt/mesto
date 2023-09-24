import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popupSelector.querySelector('.popup__form');
    this._formButtonSelector = this._popupSelector.querySelector(
      '.popup__submit-button'
    );
    this._formButtonTextContent = this._formButtonSelector.textContent;
  }

  _getInputValues() {
    const values = {};

    const inputList = Array.from(
      this._popupSelector.querySelectorAll('.popup__input')
    );
    inputList.forEach((inputElement) => {
      values[inputElement.id] = inputElement.value;
    });

    return values;
  }

  setEventListeners() {
    this._formSelector.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }

  close() {
    this._formSelector.reset();

    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      switch (
        this._popupSelector.classList.contains('popup_type_add-element')
      ) {
        case true:
          this._formButtonSelector.textContent = 'Создание...';
          break;
        case false:
          this._formButtonSelector.textContent = 'Сохранение...';
          break;
        default:
          console.log('Error loading');
      }
    } else {
      this._formButtonSelector.textContent = this._formButtonTextContent;
    }
  }
}
