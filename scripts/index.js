const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const formEditProfile = popupProfileEdit.querySelector('.popup__form');

const popupAddElement = document.querySelector('.popup_type_add-element');
const formAddElement = popupAddElement.querySelector('.popup__form');

const popupImage = document.querySelector('.popup_type_image');

const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_type_job');
const titleInput = popupAddElement.querySelector('.popup__input_type_title');
const imageInput = popupAddElement.querySelector('.popup__input_type_image');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

const elementTemplate = document.querySelector('.template');
const container = document.querySelector('.elements__container');

const closeButtons = document.querySelectorAll('.popup__close');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const renderInitialElements = () => {
  initialCards.forEach((item) => {
    container.append(createElement(item));
  });
};

const createElement = (data) => {
  const element = elementTemplate.content.cloneNode(true);

  const elementDelete = element.querySelector('.element__delete');
  elementDelete.addEventListener('click', (event) => {
    const el = event.target.closest('.element');
    el.remove();
  });

  const elementImage = element.querySelector('.element__image');
  elementImage.src = data.link;
  elementImage.alt = `Фото ${data.name}`;
  elementImage.addEventListener('click', () => {
    openPopup(popupImage);

    const openImage = popupImage.querySelector('.popup__image');
    openImage.src = data.link;
    openImage.alt = `Фото ${data.name}`;

    const openImageCaption = popupImage.querySelector('.popup__caption');
    openImageCaption.textContent = data.name;
  });

  const elementTitle = element.querySelector('.element__title');
  elementTitle.textContent = data.name;

  const elementHeart = element.querySelector('.element__heart');
  elementHeart.addEventListener('click', (event) => {
    const likeButton = event.target.closest('.element__heart');
    likeButton.classList.toggle('element__heart_active');
  });

  return element;
};

const handleEditFormSubmit = (event) => {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupProfileEdit);
};

const handleAddElementFormSubmit = (event) => {
  event.preventDefault();
  const newElement = createElement({
    name: titleInput.value,
    link: imageInput.value,
  });
  formAddElement.reset();
  container.prepend(newElement);
  closePopup(popupAddElement);
};

const closePopupByKey = (event) => {
  const key = event.key;
  const popup = document.querySelector('.popup_opened');
  if (key === 'Escape') {
    closePopup(popup);
  }
};

const closePopupByOverlay = (event) => {
  const evt = event.target;
  const popup = evt.closest('.popup');
  if (evt === popup) {
    closePopup(popup);
  }
};

const openPopup = (popupName) => {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKey);
  document.addEventListener('click', closePopupByOverlay);
};
const closePopup = (popupName) => {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKey);
  document.removeEventListener('click', closePopupByOverlay);
};

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

editButton.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

addButton.addEventListener('click', () => {
  openPopup(popupAddElement);
});

formEditProfile.addEventListener('submit', handleEditFormSubmit);

formAddElement.addEventListener('submit', handleAddElementFormSubmit);

renderInitialElements();
