'use strict';

const profileEditBtn = document.querySelector('.profile__edit-btn'),
      popupProfile = document.querySelector('#popup_profile'),
      popupProfileClosed = popupProfile.querySelector('.popup__close'),
      formProfile = popupProfile.querySelector('.popup__form'),
      popupSaveProfile = popupProfile.querySelector('.popup__btn'),

      nameInput = document.querySelector('input[name=name]'),
      jobInput = document.querySelector('input[name=status]'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),

      profileAddBtn = document.querySelector('.profile__add-btn'),
      popupCards = document.querySelector('#popup_cards'),
      popupCardsClosed = popupCards.querySelector('.popup__close'),
      formCards = popupCards.querySelector('.popup__form'),
      popupSaveCards = popupCards.querySelector('.popup__btn'),

      placeInput = document.querySelector('input[name=place_name]'),
      linkInput = document.querySelector('input[name=place_link]'),

      popupPhoto = document.querySelector('#popup_photo'),
      popupPhotoClosed = popupPhoto.querySelector('.popup__close'),
      popupImage = popupPhoto.querySelector('.popup__image'),
      popupCaption = popupPhoto.querySelector('.popup__caption'),

      cardsList = document.querySelector('.elements__list');

//profile's popup

function openPopup(btn, popup) {
  btn.addEventListener('click', () => {
    popup.classList.add('popup_opened');
  })
}

function closePopup(btn, popup) {
  btn.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
  })
}

function submitFormProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

formProfile.addEventListener('submit', submitFormProfile);

openPopup(profileEditBtn, popupProfile);

closePopup(popupProfileClosed, popupProfile);

closePopup(popupSaveProfile, popupProfile);

// card's popup

function createCard(title, link) {
  const cardTemplate = document.querySelector('#card-template').content,
        cardElement = cardTemplate.querySelector('.element').cloneNode(true),
        elementImage = cardElement.querySelector('.element__image'),
        elementTitle = cardElement.querySelector('.element__title'),
        cardLikeBtn = cardElement.querySelector('.element__like-btn'),
        cardDeleteBtn = cardElement.querySelector('.element__delete-btn'),
        open = openPopup(elementImage, popupPhoto);

  elementTitle.textContent = title;
  elementImage.setAttribute('src', link);
  elementImage.setAttribute('alt', title);

  cardLikeBtn.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-btn_active');
  });

  cardDeleteBtn.addEventListener('click', function() {
    cardElement.remove();
  });

  elementImage.addEventListener('click', () => {
    popupImage.setAttribute('src', link);
    popupImage.setAttribute('alt', title);
    popupCaption.textContent = title;

    open;

    closePopup(popupPhotoClosed, popupPhoto);
  }) ;

  return cardElement
}

function addCard(title, link, cardContainer) {
  const card = createCard(title, link);

  cardContainer.prepend(card);
}

function showDefaultCards() {
  initialCards.reverse();

  initialCards.forEach ((item) => {
    const title = item.name,
          link = item.link;

    addCard(title, link, cardsList);
  });
}

formCards.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const title = placeInput.value,
        link = linkInput.value;

  addCard(title, link, cardsList);

  formCards.reset();
});

openPopup(profileAddBtn, popupCards);

closePopup(popupCardsClosed, popupCards);

closePopup(popupSaveCards, popupCards);

showDefaultCards();
