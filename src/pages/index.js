import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import {
  initialCards,
  validationObject,
  formEditProfile,
  formAddElement,
  userInfoObject,
  titleInput,
  jobInput,
  editButton,
  addButton,
} from '../utils/constants.js';

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newElement = createCard(item);
      cardsSection.addItem(newElement);
    },
  },
  '.elements__container'
);

const createCard = (cardInfo) => {
  const card = new Card(cardInfo, '.template', () => {
    popupImageClass.open(cardInfo);
  });
  return card.generateCard();
};

const userInfoClass = new UserInfo(userInfoObject);

const popupImageClass = new PopupWithImage('.popup_type_image');

const popupProfileClass = new PopupWithForm(
  '.popup_type_profile-edit',
  (inputValues) => {
    userInfoClass.setUserInfo(inputValues);
    popupProfileClass.close();
  }
);

const popupAddCardClass = new PopupWithForm(
  '.popup_type_add-element',
  (inputValues) => {
    const newElement = createCard(inputValues);
    cardsSection.addItem(newElement);
    popupAddCardClass.close();
  }
);

const validationProfile = new FormValidator(validationObject, formEditProfile);

const validationCard = new FormValidator(validationObject, formAddElement);

const openEditPopup = () => {
  popupProfileClass.open();
  const user = userInfoClass.getUserInfo();
  titleInput.value = user.title;
  jobInput.value = user.job;
};

const openAddPopup = () => {
  popupAddCardClass.open();
  validationCard.disableSubmitButton();
};

editButton.addEventListener('click', openEditPopup);

addButton.addEventListener('click', openAddPopup);

popupImageClass.setEventListeners();

popupProfileClass.setEventListeners();

popupAddCardClass.setEventListeners();

validationProfile.enableValidation();

validationCard.enableValidation();

cardsSection.renderItems();
