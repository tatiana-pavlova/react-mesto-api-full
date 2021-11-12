import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";


function Main (props) {
  

  const currentUser = React.useContext(CurrentUserContext);

  
  return (
    <main>
      <section className="profile">
        <div className="profile__user">
          <div className="profile__avatar-overlay" onClick={props.onEditAvatar}><div className="profile__avatar" 
                          style={{ backgroundImage: `url(${currentUser.avatar})`, backgroundSize: "cover" }} /></div>
          <div className="profile__info">
            <div className="profile__name-info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button type="button" className="profile__edit" onClick={props.onEditProfile} aria-label="Редактировать профайл"></button>
            </div>
            <p className="profile__job-info">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add" onClick={props.onAddPlace} aria-label="Добавить фото"></button>
      </section>

      <section className="places">
        {props.cards.map((card) => {
          return (<Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} 
                        onCardDelete={props.onCardDelete} />)
        })}
      </section>
    </main> 
  );
}

export default Main;