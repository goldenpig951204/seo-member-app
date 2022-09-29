const express = require("express");
const bodyParser = express.json();
const router = express.Router();
const authorizeCtrl = require("../controllers/authorizeCtrl");
const langCtrl = require("../controllers/langCtrl");
const {
    authMiddleware,
    memberMiddleware,
    jsonMiddleware,
    nextMiddleware,
    applyMiddleware
} = require("../middlewares/index");



router.use('/authorize', authMiddleware, authorizeCtrl.index);
router.get('/lang/semrush', langCtrl.semrush);
router.get('/lang/spyfu', langCtrl.spyfu);

router.use('/', memberMiddleware, jsonMiddleware, bodyParser, nextMiddleware, applyMiddleware);


module.exports = router;