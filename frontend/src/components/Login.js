import React from "react";

function Login ({onLogin}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  function handleChangeEmail (e) {
    setEmail(e.target.value);
  }

  function handleChangePassword (e) {
    setPassword(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    onLogin({password, email})
      .then (() => resetForm())
      .catch((err) => console.log(err))
  }

  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__input-field">
          <input id="email-input" type="email" className="register__input" value={email} onChange={handleChangeEmail} 
                 placeholder="Email" name="email" required/>
          <span className="email-input-error"></span>
        </div>
        <div className="register__input-field">
          <input id="password-input" type="password" className="register__input" value={password} onChange={handleChangePassword} 
                 placeholder="Пароль" name="password" required/>
          <span className="password-input-error"></span>
        </div>
        <button className="register__button" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;