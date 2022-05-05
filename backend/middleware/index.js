let modeAddressWallet = require('../model/AddressWallet');
const SHA256 = require('sha256');

const checkWallet = async (req, res, next) => {
    try{
        let{address, sender} = req.bode.address || req.body.sender ?req.body : req.query;
        const addressCurrent = address ? address : sender;
        let param = {
            public: addressCurrent
        }
        let result = await modeAddressWallet.getAddress(param);
        if(result.length === 0){
        return res.json({
            status: 404,
            message: 'Your wallet not avaible'
        })
        }else{
            next();
        }
    }catch(err){console.log(err)}
}

module.exports = checkWallet