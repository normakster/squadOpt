let express = require('express');
let router = express.Router();

const staticCtrl = require('../controllers/staticCtrl');
// const authController = require('../controllers/authController');

router.get('/home', staticCtrl.home);
router.get('/about', staticCtrl.about);
// router.get('/login', staticCtrl.login);
// router.get('/auth', staticCtrl.auth);
// router.get('/signup', staticCtrl.signup);
router.get('/', staticCtrl.home);

module.exports = router;
