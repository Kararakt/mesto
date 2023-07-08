const heart = document.querySelector(".element__heart");
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup__close");
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");

heart.addEventListener("click", () => {
  heart.classList.toggle("element__heart_active");
});

const popupToggle = () => {
  popup.classList.toggle("popup_opened");
};

editButton.addEventListener("click", () => {
  popupToggle();
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});
closePopup.addEventListener("click", popupToggle);

const handleFormSubmit = (e) => {
  e.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupToggle();
};

formElement.addEventListener("submit", handleFormSubmit);
