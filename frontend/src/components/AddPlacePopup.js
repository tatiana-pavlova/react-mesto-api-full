import React from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup (props) {
  const [cardName, setCardName] = React.useState('');
  const [cardUrl, setCardUrl] = React.useState('');

  function handleCardNameChange (e) {
    setCardName(e.target.value);
  }

  function handleCardUrlChange (e) {
    setCardUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: cardName,
      link: cardUrl
    });

    setCardName('');
    setCardUrl('');
  }

  return (
    <PopupWithForm name="new-card" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} 
                        buttonTitle="Создать">
      <div className="popup__input-field">
        <input id="place-input" type="text" value={cardName} onChange={handleCardNameChange} placeholder="Название" 
                className="popup__input popup__input_place-name" name="placeName" required minLength="2" maxLength="30"/>
        <span className="place-input-error"></span>
      </div>
      <div className="popup__input-field">
        <input id="link-input" type="url" value={cardUrl} onChange={handleCardUrlChange} placeholder="Ссылка на картинку"
                className="popup__input popup__input_place-link" name="placeLink" required/>
        <span className="link-input-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;