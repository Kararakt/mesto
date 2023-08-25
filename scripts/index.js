import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const formEditProfile = popupProfileEdit.querySelector('.popup__form');

const popupAddElement = document.querySelector('.popup_type_add-element');
const formAddElement = popupAddElement.querySelector('.popup__form');

const popupImage = document.querySelector('.popup_type_image');
const openImage = popupImage.querySelector('.popup__image');
const openImageCaption = popupImage.querySelector('.popup__caption');

const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_type_job');
const titleInput = popupAddElement.querySelector('.popup__input_type_title');
const imageInput = popupAddElement.querySelector('.popup__input_type_image');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

const container = document.querySelector('.elements__container');

const closeButtons = document.querySelectorAll('.popup__close');

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

const validationProfile = new FormValidator(validationObject, formEditProfile);

const validationCard = new FormValidator(validationObject, formAddElement);

const createCard = (cardInfo) => {
  const card = new Card(
    cardInfo,
    '.template',
    openPopup,
    popupImage,
    openImage,
    openImageCaption
  );
  return card.generateCard();
};

const renderInitialElements = () => {
  initialCards.forEach((item) => {
    container.append(createCard(item));
  });
};

const handleEditFormSubmit = (event) => {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupProfileEdit);
};

const handleAddElementFormSubmit = (event) => {
  event.preventDefault();
  const newElement = createCard({
    name: titleInput.value,
    link: imageInput.value,
  });
  formAddElement.reset();
  container.prepend(newElement);
  closePopup(popupAddElement);
};

const closePopupByKey = (event) => {
  const key = event.key;
  if (key === 'Escape') {
    const popupName = document.querySelector('.popup_opened');
    closePopup(popupName);
  }
};

const closePopupByOverlay = (event) => {
  const evt = event.target;
  const popupName = evt.closest('.popup');
  if (evt === popupName) {
    closePopup(popupName);
  }
};

export const openPopup = (popupName) => {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKey);
  document.addEventListener('click', closePopupByOverlay);
};
const closePopup = (popupName) => {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKey);
  document.removeEventListener('click', closePopupByOverlay);
};

const openEditPopup = () => {
  openPopup(popupProfileEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

const openAddPopup = () => {
  openPopup(popupAddElement);
  validationCard.disableSubmitButton();
};

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

editButton.addEventListener('click', openEditPopup);

addButton.addEventListener('click', openAddPopup);

formEditProfile.addEventListener('submit', handleEditFormSubmit);

formAddElement.addEventListener('submit', handleAddElementFormSubmit);

validationProfile.enableValidation();

validationCard.enableValidation();

renderInitialElements();
