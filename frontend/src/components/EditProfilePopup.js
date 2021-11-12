import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup (props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  

  function handleNameChange (e) {
    setName(e.target.value);
  }

  function handleDescriptionChange (e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }


  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
                        buttonTitle="Сохранить"> 
      <div className="popup__input-field">
        <input id="name-input" type="text" value={name} onChange={handleNameChange} className="popup__input popup__input_edit_name" name="name"
              placeholder="Имя" required minLength="2" maxLength="40"/>
        <span className="name-input-error"></span>
      </div>
      <div className="popup__input-field">
        <input id="job-input" type="text" value={description} onChange={handleDescriptionChange} className="popup__input popup__input_edit_job" name="job" 
              placeholder="Вид деятельности" required minLength="2" maxLength="200"/>
        <span className="job-input-error"></span>
      </div>
    </PopupWithForm> 
  );
}

export default EditProfilePopup;