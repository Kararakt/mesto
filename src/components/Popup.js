export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClose);
  }

  _handleEscClose(event) {
    const key = event.key;
    if (key === 'Escape') {
      this.close();
      console.log('esc');
    }
  }

  _handleOverlayClose(event) {
    const evt = event.target;
    if (evt === evt.closest('.popup')) {
      this.close();
      console.log('overlay');
    }
  }

  setEventListeners() {
    this._popupSelector
      .querySelector('.popup__close')
      .addEventListener('click', () => {
        this.close();
      });
  }
}
