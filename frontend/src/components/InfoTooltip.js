function InfoTooltip (props) {
  return (
    <div className={`popup ${props.isOpen? "popup_opened": ""}`}>
      <div className="popup__container">
        <div className="popup__info">
          <img className="popup__ico" src={props.icoPath} alt="tick" />
          <h2 className="popup__info-title">{props.title}</h2>
        </div>
        <button className="popup__close" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;