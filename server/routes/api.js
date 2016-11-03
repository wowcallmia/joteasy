const express = require('express');
const router = express.Router();


router.use('/topics', require('./topics'));
router.use('/resources', require('./resources'));
router.use('/notes', require('./notes'));


module.exports = router;
