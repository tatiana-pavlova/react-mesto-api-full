import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup (props) {
  const avatarRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    e.target.reset();
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
                   buttonTitle="Сохранить">
      <div className="popup__input-field">
        <input id="avatar-input" type="url" ref={avatarRef} className="popup__input popup__input_avatar-link" placeholder="Добавьте ссылку на аватар" 
                name="avatar" required/>
        <span className="avatar-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;