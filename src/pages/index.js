import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { api } from '../components/Api.js';
import {
  validationObject,
  formEditProfile,
  formAddElement,
  formAddAvatar,
  userInfoObject,
  titleInput,
  jobInput,
  editButton,
  addButton,
  avatarEditButton,
} from '../utils/constants.js';

const userInfoClass = new UserInfo(userInfoObject);
let userId = '';

api.getUserInfo().then((res) => {
  userInfoClass.setUserInfo(res);
  userId = res._id;
  console.log(userId);
});

const createCard = (cardInfo) => {
  const card = new Card(cardInfo, userId, '.template', {
    handleCardClick: () => {
      popupImageClass.open(cardInfo);
    },
    handleDeleteCard: (cardId) => {
      popupConfirmClass.open();
      popupConfirmClass.switchSubmitForm(() => {
        api.deleteCard(cardId).then(() => {
          card.deleteCard();
          popupConfirmClass.close();
        });
      });
    },
    handleAddLike: (cardId) => {
      api.addLike(cardId).then((data) => {
        card.handleUpdateLike(data);
      });
    },
    handleRemoveLike: (cardId) => {
      api.removeLike(cardId).then((data) => {
        card.handleUpdateLike(data);
      });
    },
  });
  return card.generateCard();
};

const cardsSection = new Section(
  {
    renderer: (card) => {
      cardsSection.addItem(createCard(card));
    },
  },
  '.elements__container'
);

api.getInitialCards().then((cards) => {
  cardsSection.renderItems(cards);
});

const popupImageClass = new PopupWithImage('.popup_type_image');

const popupProfileClass = new PopupWithForm(
  '.popup_type_profile-edit',
  (inputValues) => {
    popupProfileClass.renderLoading(true);
    api
      .editUserProfile(inputValues.title, inputValues.job)
      .then((res) => {
        userInfoClass.setUserInfo(res);
        popupProfileClass.close();
      })
      .finally(() => {
        popupProfileClass.renderLoading(false);
      });
  }
);

const popupAddCardClass = new PopupWithForm(
  '.popup_type_add-element',
  (inputValues) => {
    popupAddCardClass.renderLoading(true);
    api
      .addCard(inputValues.name, inputValues.link)
      .then((res) => {
        const newElement = createCard(res);
        cardsSection.addItem(newElement);
        popupAddCardClass.close();
      })
      .finally(() => {
        popupAddCardClass.renderLoading(false);
      });
  }
);

const popupAvatarClass = new PopupWithForm(
  '.popup_type_avatar',
  (inputValues) => {
    popupAvatarClass.renderLoading(true);
    api
      .editUserAvatar(inputValues.avatar)
      .then((res) => {
        userInfoClass.setUserInfo(res);
        popupAvatarClass.close();
      })
      .finally(() => {
        popupAvatarClass.renderLoading(false);
      });
  }
);

const popupConfirmClass = new PopupWithConfirm('.popup_type_confirm', () => {});

const validationProfile = new FormValidator(validationObject, formEditProfile);

const validationCard = new FormValidator(validationObject, formAddElement);

const validationAvatar = new FormValidator(validationObject, formAddAvatar);

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

const openAvatarPopup = () => {
  popupAvatarClass.open();
  validationAvatar.disableSubmitButton();
};

editButton.addEventListener('click', openEditPopup);

addButton.addEventListener('click', openAddPopup);

avatarEditButton.addEventListener('click', openAvatarPopup);

popupImageClass.setEventListeners();

popupProfileClass.setEventListeners();

popupAddCardClass.setEventListeners();

popupAvatarClass.setEventListeners();

popupConfirmClass.setEventListeners();

validationProfile.enableValidation();

validationCard.enableValidation();

validationAvatar.enableValidation();
