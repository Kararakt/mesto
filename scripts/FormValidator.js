export class FormValidator {
  constructor(validationObject, validationForm) {
    this._validationObject = validationObject;
    this._validationForm = validationForm;
    this._inputList = Array.from(
      this._validationForm.querySelectorAll(
        this._validationObject.inputSelector
      )
    );
    this._buttonElement = this._validationForm.querySelector(
      this._validationObject.submitButtonSelector
    );
  }

  _showInputError(inputElement) {
    const errorElement = this._validationForm.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._validationObject.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validationObject.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._validationForm.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._validationObject.inputErrorClass);
    errorElement.classList.remove(this._validationObject.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableSubmitButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(
      this._validationObject.inactiveButtonClass
    );
  }

  _enableSubmitButton() {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(
      this._validationObject.inactiveButtonClass
    );
  }

  _toggleButtonState() {
    this._hasInvalidInput()
      ? this.disableSubmitButton()
      : this._enableSubmitButton();
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._validationForm.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }
}
