var express = require("express");
var router = express.Router();
const blockchainController = require("../controller/blockchain");

router.post('/create-wallet', blockchainController.postCreateWallet);

router.get('/my-wallet', blockchainController.getInfo);

router.get('/history', blockchainController.getHistory);

router.post('/send', blockchainController.postSend);


module.exports = router;