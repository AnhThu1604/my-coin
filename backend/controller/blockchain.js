const bodyParser = require('body-parser');
const SHA256 = require('sha256');
const { v1 } = require('uuid');
const modeAddressWallet = require('../model/AddressWallet');

let BlockChain = require('../blockchain/BlockChain');

let blockchain = new BlockChain();
const checkWallet = require('../middleware');

exports.postCreateWallet = (req, res) => {
    const privateKey = v1().split('-').join('');
    const address = {
        private: privateKey,
        public: SHA256(privateKey)
    };

    modeAddressWallet.createAddress(address)
    blockchain.addNewTransaction('system-admin', address.public, 1000)
    blockChain.addNewBlock(null)
    res.json({
        status: 'ok',
        address: address.public,
        pk: privateKey
    })

}

exports.getInfo = (req, res) => {
    checkWallet;
    const { address = '' } = req.query;
    let info = blockchain.getAddressData(address);
    return res.json(info);
}

exports.postMining = (req, res) => {
    checkWallet;
    const { address = '' } = req.query;
    blockchain.addNewTransaction('system-admin', address, 100);
    blockChain.addNewBlock(null, 2);
    return res.json({ status: 'success', coin: 100 });
}

exports.postSend = (req, res) => {
    checkWallet;
    const {
        sender ='', 
        recipient = '',
        amount
    } = req.body;
    let infoSender = blockchain.getAddressData(sender);
    if(infoSender.addressBalance < + amount){
        return res.json({
            status: 'error',
            message: 'Your wallet is not enough coin!'
        })
    }
    blockchain.addNewTransaction(sender, recipient, amount);
     blockchain.addNewTransaction('system', sender, 2);
     blockchain.addNewBlock(null);
    return res.json({
        status: 'ok',
        message: 'Send transaction success'
    })
}

exports.getHistory = (req, res) => {
    const {address = ''} = req.query;
    if(address){
        let param = {
            public: address
        }
        let result =  modeAddressWallet.getAddress(param);
        if(result.length === 0) res.json({
            status: 'error',
            message: 'Your wallet not avaible'
        })
        let info = blockchain.getAddressData(address);
        return res.json(info);
    }
    let result = blockChain.getAddressData()
    res.json(result);
}