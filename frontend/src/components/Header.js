import logoPath from '../images/logo.svg';
import { Route, Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img src={logoPath} alt="Логотип Mesto Russia" className="header__logo"/>
      <Route exact path="/">
        <div className="header__account-info">
          <p className="header__account-email">{props.email}</p>
          <Link to="/sign-in" onClick={props.onSignOut} className="header__link">Выйти</Link>
        </div>
      </Route>

      <Route path="/sign-up">
        <Link to="/sign-in" className="header__link">Войти</Link>
      </Route>
                  
      <Route path="/sign-in">
        <Link to="/sign-up" className="header__link">Регистрация</Link>
      </Route>
    </header>
  );
}

export default Header;