import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleConfirmDelete) {
    super(popupSelector);
    this._handleConfirmDelete = handleConfirmDelete;
    this._formSelector = this._popupSelector.querySelector('.popup__form');
  }

  switchSubmitForm(value) {
    this._handleConfirmDelete = value;
  }

  setEventListeners() {
    this._formSelector.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleConfirmDelete();
    });

    super.setEventListeners();
  }
}
