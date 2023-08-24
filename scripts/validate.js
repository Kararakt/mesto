// const showInputError = (
//   formElement,
//   inputElement,
//   errorMessage,
//   validationObject
// ) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(validationObject.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(validationObject.errorClass);
// };

// const hideInputError = (formElement, inputElement, validationObject) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(validationObject.inputErrorClass);
//   errorElement.classList.remove(validationObject.errorClass);
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement, validationObject) => {
//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       validationObject
//     );
//   } else {
//     hideInputError(formElement, inputElement, validationObject);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const toggleButtonState = (inputList, buttonElement, validationObject) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.setAttribute('disabled', true);
//     buttonElement.classList.add(validationObject.inactiveButtonClass);
//   } else {
//     buttonElement.removeAttribute('disabled');
//     buttonElement.classList.remove(validationObject.inactiveButtonClass);
//   }
// };

// const setEventListeners = (formElement, validationObject) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(validationObject.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(
//     validationObject.submitButtonSelector
//   );

//   toggleButtonState(inputList, buttonElement, validationObject);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, validationObject);
//       toggleButtonState(inputList, buttonElement, validationObject);
//     });
//   });
// };

// const enableValidation = (validationObject) => {
//   const formList = Array.from(
//     document.querySelectorAll(validationObject.formSelector)
//   );
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (event) => {
//       event.preventDefault();
//     });
//     setEventListeners(formElement, validationObject);
//   });
// };

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__submit-button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error_active',
// });
