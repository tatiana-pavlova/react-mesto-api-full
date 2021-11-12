function PopupWithForm (props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen? "popup_opened": ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" onSubmit={props.onSubmit} >
          {props.children}
          <button type="submit" className="popup__button" aria-label="Сохранить изменения">{props.buttonTitle}</button>
        </form>
        <button type="button" className="popup__close" onClick={props.onClose} aria-label="Закрыть попап"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;