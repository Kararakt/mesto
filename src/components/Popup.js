export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    const key = event.key;
    if (key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    const evt = event.target;
    if (evt === evt.closest('.popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', (event) => {
      if (
        event.target.classList.contains('popup') ||
        event.target.classList.contains('popup__close')
      ) {
        this.close();
      }
    });
  }
}
