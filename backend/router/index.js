var express = require("express");
var router = express.Router();
const blockchainController = require("../controller/blockchain");

router.post('/create-wallet', blockchainController.postCreateWallet);

router.get('/my-wallet', blockchainController.getInfo);

router.get('/history-transaction', blockchainController.getHistory);

router.post('/send-transaction', blockchainController.postSend);

router.post('/mining', blockchainController.postMining);

module.exports = router;