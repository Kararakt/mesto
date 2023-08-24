export class FormValidator {
  constructor(validationObject, validationForm) {
    this._validationObject = validationObject;
    this._validationForm = validationForm;
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

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._validationObject.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(
        this._validationObject.inactiveButtonClass
      );
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._validationForm.querySelectorAll(
        this._validationObject.inputSelector
      )
    );
    const buttonElement = this._validationForm.querySelector(
      this._validationObject.submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    const formList = Array.from(
      document.querySelectorAll(this._validationObject.formSelector)
    );
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
      });
      this._setEventListeners();
    });
  }
}
