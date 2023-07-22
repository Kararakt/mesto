const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupProfileEdit = document.querySelector(".popup_type_profile-edit");
const closePopupProfileEdit = popupProfileEdit.querySelector(".popup__close");
const formEditProfile = popupProfileEdit.querySelector(".popup__form");

const popupAddElement = document.querySelector(".popup_type_add-element");
const closePopupAddElement = popupAddElement.querySelector(".popup__close");
const formAddElement = popupAddElement.querySelector(".popup__form");

const popupImage = document.querySelector(".popup_type_image");
const closePopupImage = popupImage.querySelector(".popup__close");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const titleInput = document.querySelector(".popup__input_type_title");
const imageInput = document.querySelector(".popup__input_type_image");

const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");

const cardTemplate = document.querySelector(".template");
const container = document.querySelector(".elements__container");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const renderElement = () => {
  initialCards.forEach((item) => {
    container.append(createElement(item));
  });
};

const createElement = (data) => {
  const element = cardTemplate.content.cloneNode(true);

  const elementDelete = element.querySelector(".element__delete");
  elementDelete.addEventListener("click", (e) => {
    const el = e.target.closest(".element");
    el.remove();
  });

  const elementImage = element.querySelector(".element__image");
  elementImage.src = data.link;
  elementImage.alt = `Фото ${data.name}`;
  elementImage.addEventListener("click", () => {
    popupToggle(popupImage);

    const openImage = popupImage.querySelector(".popup__image");
    openImage.src = data.link;
    openImage.alt = `Фото ${data.name}`;

    const openImageCaption = popupImage.querySelector(".popup__caption");
    openImageCaption.textContent = data.name;
  });

  const elementTitle = element.querySelector(".element__title");
  elementTitle.textContent = data.name;

  const elementHeart = element.querySelector(".element__heart");
  elementHeart.addEventListener("click", (e) => {
    const el = e.target.closest(".element__heart");
    el.classList.toggle("element__heart_active");
  });

  return element;
};

const popupToggle = (popupName) => {
  popupName.classList.toggle("popup_opened");
};

editButton.addEventListener("click", () => {
  popupToggle(popupProfileEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});
closePopupProfileEdit.addEventListener("click", () => {
  popupToggle(popupProfileEdit);
});

addButton.addEventListener("click", () => {
  popupToggle(popupAddElement);
});
closePopupAddElement.addEventListener("click", () => {
  popupToggle(popupAddElement);
});

closePopupImage.addEventListener("click", () => {
  popupToggle(popupImage);
});

const handleFormSubmit = (e) => {
  e.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupToggle(popupProfileEdit);
};

const addNewElement = (e) => {
  e.preventDefault();
  const newElement = createElement({
    name: titleInput.value,
    link: imageInput.value,
  });
  titleInput.value = "";
  imageInput.value = "";
  container.prepend(newElement);
  popupToggle(popupAddElement);
};

formEditProfile.addEventListener("submit", handleFormSubmit);

formAddElement.addEventListener("submit", addNewElement);

renderElement();
