const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => {
    if (!users) {
      throw new NotFoundError('Пользователи не найдены');
    }
    return res.status(200).send(users);
  })
  .catch(next);

module.exports.getUser = (req, res, next) => {
  const id = req.params.userId;
  return User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Невалидный id');
      }
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  return User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Информация о пользователе не найдена');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  console.log(req.body); // позже удалить!
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Данный email уже зарегистрирован');
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
      // if (err.name === 'MongoError' && err.code === 11000) {
      //   throw new ConflictError('Данный email уже зарегистрирован');
      // }
    })
    .catch(next);

  // bcrypt.hash(password, 10)
  //   .then((hash) => User.create({
  //     name, about, avatar, email, password: hash,
  //   }))
  //   .then((user) => res.status(200).send(user))
  //   .catch((err) => {
  //     if (err.name === 'ValidationError') {
  //       throw new BadRequestError('Переданы некорректные данные');
  //     }
  //     if (err.name === 'MongoError' && err.code === 11000) {
  //       throw new ConflictError('Данный email уже зарегистрирован');
  //     }
  //   })
  //   .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Передан некорректный URL');
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // res.cookie('jwt', token, {
      //   maxAge: 3600000,
      //   httpOnly: true,
      // })
      res.send({ message: 'Успешный логин', token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные email или пароль');
      }
    })
    .catch(next);
};
