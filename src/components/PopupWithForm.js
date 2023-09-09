import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popupSelector.querySelector('.popup__form');
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
}
