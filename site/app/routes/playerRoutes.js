let express = require('express');
let router = express.Router();

// Main Route off "/squadOpt/player/"
const playerCtrl = require('../controllers/playerCtrl');

router.get('/add', playerCtrl.renderAdd);
router.post('/add', playerCtrl.create);

router.get('/edit/:_id', playerCtrl.renderEdit);
router.post('/edit/', playerCtrl.commitEdit);

// router.post('/delete/:_id', playerCtrl.renderEdit);

router.get('/', playerCtrl.renderList);


module.exports = router;
