const debug = require('debug')('app:staticController');
const os = require("os");


exports.home = async function (req, res) {
  const msg = "secret msg";
  const hostname = os.hostname();
  res.render('home', { msg, title: 'Garage - Home', hostname });
}

exports.about = async function (req, res) {
  const msg = "secret msg";
  const hostname = os.hostname();
  res.render('about', { msg, title: 'Garage - About', hostname });
}

exports.signup = async function (req, res) {
  const msg = "secret msg";
  const hostname = os.hostname();
  res.render('signup', { msg, title: 'Garage - Sign Up', hostname });
}

exports.login = async function (req, res) {
  const msg = "secret msg";
  const hostname = os.hostname();
  res.render('login', { msg, title: 'Garage - Login', hostname });
}

exports.auth = async function (req, res) {
  const msg = "secret msg";
  const hostname = os.hostname();
  res.render('auth', { msg, title: 'Garage - Auth', hostname });
}
