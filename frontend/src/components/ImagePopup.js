function ImagePopup(props) {
  return (
    <div className={`popup popup_type_photo ${props.card._id? "popup_opened":""} `} >
      <div className="picture">
        <figure className="picture__container">
          <img src={props.card.link} alt={props.card.name} className="picture__view"/>
          <figcaption className="picture__name">{props.card.name}</figcaption>
        </figure>
        <button onClick={props.onClose} type="button" className="popup__close" aria-label="Закрыть попап"></button>
      </div>
    </div>
  );
}

export default ImagePopup;