export const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export const userInfoObject = {
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__image',
};

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.profile__avatar-edit');

export const popupImage = document.querySelector('.popup_type_image');

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
export const formEditProfile = popupProfileEdit.querySelector('.popup__form');
export const titleInput = popupProfileEdit.querySelector(
  '.popup__input_type_title'
);
export const jobInput = popupProfileEdit.querySelector(
  '.popup__input_type_job'
);

const popupAddElement = document.querySelector('.popup_type_add-element');
export const formAddElement = popupAddElement.querySelector('.popup__form');

const popupAddAvatar = document.querySelector('.popup_type_avatar');
export const formAddAvatar = popupAddAvatar.querySelector('.popup__form');
