import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card (props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`place__delete ${isOwn ? 'place__delete_visible' : 'place__delete_hidden'}`);
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like ${isLiked ? 'place__like_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card);
  } 

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  
  return (
    <article className="place"> 
      <div onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})`, backgroundSize: "cover" }} className="place__pic"/>
      <div className="place__description">
        <h2 className="place__name">{props.card.name}</h2>
        <div className="place__like-wrapper">
          <button type="button" className={cardLikeButtonClassName} aria-label="Нравится фото места" onClick={handleLikeClick}></button>
          <p className="place__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button type="button" className={cardDeleteButtonClassName} aria-label="Удалить фото" onClick={handleDeleteClick}></button>
    </article>
  );
}

export default Card;