
const SHA256 = require('sha256');
const { v1 } = require('uuid');
let modelAddressWallet = require('../model/AddressWallet');

let BlockChain = require('../blockchain/BlockChain');

let blockchain = new BlockChain();
const checkWallet = require('../middleware');

exports.postCreateWallet = async (req, res) => {
    const privateKey = v1().split('-').join('');
    const address = {
        private: privateKey,
        public: SHA256(privateKey)
    };
    await modelAddressWallet.createAddress(address)
    await blockchain.addNewTransaction('system', address.public,1000);
    await blockchain.addNewBlock(null)
    res.json({
        status: 200,
        address: address.public,
        pk: privateKey
    })

}

exports.getInfo = async (req, res) => {
    checkWallet;
    const { address } = req.query;
    let info = await blockchain.getAddressData(address);
    return res.json(info);
}

exports.postSend = async (req, res) => {
    checkWallet;
    console.log(req.body);
    const {
        sender,
        recipient,
        amount
    } = req.body;
    let infoSender = await blockchain.getAddressData(sender);
    if (infoSender.addressBalance < amount) {
        return res.json({
            status: 404,
            message: 'Your wallet is not enough coin!'
        })
    }
    await blockchain.addNewTransaction(sender, recipient, amount);
    await blockchain.addNewTransaction('system', sender, 1);
    await blockchain.addNewBlock(null);
    return res.json({
        status: 200,
        message: 'Send transaction success'
    })
}

exports.getHistory = async (req, res) => {
    const { address } = req.query;
    if (address) {
        let param = {
            public: address
        }
        let result = await modelAddressWallet.getAddress(param);
        if (result.length === 0) res.json({
            status: 404,
            message: 'Your wallet not avaible'
        })
        let info = await blockchain.getAddressData(address);
        return res.json(info);
    }
    let result = await blockchain.getAddressAllData()
    res.json(result);
}