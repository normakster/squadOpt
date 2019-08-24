let express = require('express');
let router = express.Router();

const apiCtrl = require('../controllers/apiCtrl');

// Main Route off "/squadOpt/api/"
router.post('/add', apiCtrl.add);
router.get('/list', apiCtrl.list);

module.exports = router;
