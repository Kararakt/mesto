import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { Api } from '../components/Api.js';
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-76',
  headers: {
    authorization: 'f0dba71b-d2b0-43ce-9b43-97ba5085a42c',
    'Content-Type': 'application/json',
  },
});

const aboutUser = new UserInfo(userInfoObject);
let userId = '';

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    aboutUser.setUserInfo(userInfo);
    userId = userInfo._id;
    console.log(userId);
    cardsSection.renderItems(cards);
  })
  .catch((err) => {
    console.log('Ошибка получения данных пользователя или карточек', err);
  });

const createCard = (cardInfo) => {
  const card = new Card(cardInfo, userId, '.template', {
    handleCardClick: () => {
      popupImage.open(cardInfo);
    },
    handleDeleteCard: (cardId) => {
      popupConfirm.open();
      popupConfirm.switchSubmitForm(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            popupConfirm.close();
          })
          .catch((err) => {
            console.log('Ошибка удаления карточки:', err);
          });
      });
    },
    handleAddLike: (cardId) => {
      api
        .addLike(cardId)
        .then((data) => {
          card.handleUpdateLike(data);
        })
        .catch((err) => {
          console.log('Ошибка постановки лайка:', err);
        });
    },
    handleRemoveLike: (cardId) => {
      api
        .removeLike(cardId)
        .then((data) => {
          card.handleUpdateLike(data);
        })
        .catch((err) => {
          console.log('Ошибка снятия лайка:', err);
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

const popupImage = new PopupWithImage('.popup_type_image');

const popupProfile = new PopupWithForm(
  '.popup_type_profile-edit',
  (inputValues) => {
    popupProfile.renderLoading(true);
    api
      .editUserProfile(inputValues.title, inputValues.job)
      .then((res) => {
        aboutUser.setUserInfo(res);
        popupProfile.close();
      })
      .catch((err) => {
        console.log('Ошибка изменения профиля пользователя:', err);
      })
      .finally(() => {
        popupProfile.renderLoading(false);
      });
  }
);

const popupAddCard = new PopupWithForm(
  '.popup_type_add-element',
  (inputValues) => {
    popupAddCard.renderLoading(true);
    api
      .addCard(inputValues.name, inputValues.link)
      .then((res) => {
        const newElement = createCard(res);
        cardsSection.addItem(newElement);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log('Ошибка добавления карточки:', err);
      })
      .finally(() => {
        popupAddCard.renderLoading(false);
      });
  }
);

const popupAvatar = new PopupWithForm('.popup_type_avatar', (inputValues) => {
  popupAvatar.renderLoading(true);
  api
    .editUserAvatar(inputValues.avatar)
    .then((res) => {
      aboutUser.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log('Ошибка изменения аватара пользователя:', err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
});

const popupConfirm = new PopupWithConfirm('.popup_type_confirm', () => {});

const validationProfile = new FormValidator(validationObject, formEditProfile);

const validationCard = new FormValidator(validationObject, formAddElement);

const validationAvatar = new FormValidator(validationObject, formAddAvatar);

const openEditPopup = () => {
  popupProfile.open();
  const user = aboutUser.getUserInfo();
  titleInput.value = user.title;
  jobInput.value = user.job;
  validationProfile.resetValidation();
};

const openAddPopup = () => {
  popupAddCard.open();
  validationCard.resetValidation();
};

const openAvatarPopup = () => {
  popupAvatar.open();
  validationAvatar.resetValidation();
};

editButton.addEventListener('click', openEditPopup);

addButton.addEventListener('click', openAddPopup);

avatarEditButton.addEventListener('click', openAvatarPopup);

popupImage.setEventListeners();

popupProfile.setEventListeners();

popupAddCard.setEventListeners();

popupAvatar.setEventListeners();

popupConfirm.setEventListeners();

validationProfile.enableValidation();

validationCard.enableValidation();

validationAvatar.enableValidation();
