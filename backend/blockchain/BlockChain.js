let hash = require('object-hash');
const { v1 } = require('uuid'); 
const SHA256 = require('sha256');
const concat = require('lodash/concat');
let blockChainModel = require('../model/BlockChain');

class BlockChain {
    constructor() {
        this.chain = [];
        this.curr_transaction = [];
    }
}

BlockChain.prototype.getLastBlock = async function() {
    return await blockChainModel.getLastSchema;
}

BlockChain.prototype.mining = async function(level, prevHash, currHash){
    let nonce = 0;
    let hash = this.hashBlock(prevHash, currHash, nonce);
    while(hash.substring(0,level)!=Array(level+1).join("0")){
        nonce++;
        hash = this.hashBlock(prevHash, currHash, nonce);
    };
}

BlockChain.prototype.hashBlock = async function(prevHash, block, nonce){
    return SHA256(prevHash + nonce.toString() + JSON.stringify(block));
}

BlockChain.prototype.proofOfWork = async function(prevHash, currHash){
    let nonce = 0;
    let hash = this.hashBlock(prevHash, currHash, nonce);
    while((await hash).substring(0,4) !== '0000') {
        nonce++;
        hash = this.hashBlock(prevHash, currHash, nonce);

    }
    return nonce;
}

BlockChain.prototype.addNewBlock = async function(prevHash, type = 1){
    let block ={
        index: 0,
        timesttamp: Date.now(),
        transaction: this.curr_transaction,
        prevHash: prevHash
    }

    const lastBlock = await this.getLastBlock();
    let nonce
    if(lastBlock){
        block.prevHash = lastBlock.hash;
        block.index = lastBlock.index + 1;
        nonce = tupy === 1 ? this.proofOfWork(lastBlock.hash, block) : await this.mining(5, lastBlock.hask, block)
    }else{
        nonce = this.proofOfWork('', block);
    }
    let hash = this.hashBlock(prevHash, block, nonce);
    block.nonce = nonce;
    block.hash = hash;
    let result = await blockChainModel.createBlockChain(block);
    this.chain.push(result);
    this.curr_transaction = [];
    return result;

}

BlockChain.prototype.addNewTransaction = function (sender, recipient, amount){
    this.curr_transaction.push({
        transactionId: v1().split('-').join(''),
        sender, 
        recipient,
        amount
    })
}

BlockChain.prototype.lastBlock = async function(){
    return this.chain.slice(-1)[0];
}

BlockChain.prototype.isEmpty = async function(){
    return this.cjain.length === 0;
}

BlockChain.prototype.getAddressData = async function(address){
    let blocks = await blockChainModel.getAll();
    const addressTransaction = [];
    const addressBlocks = [];

    blocks.forEach(({timesttamps, transaction, index, prevHash, hash, nonce}) => {
        transaction.forEach(transaction =>{
            if(transaction.sender === address || transaction.recipient === address){
                addressTransaction.push({...transaction, timesttamps});
                addressBlocks.push({index, prevHash, hash, nonce, timesttamps})
            }
        })
        
    });
    if(addressTransaction == null)
    return false;
    var amountArr = [];
    let balance = 0;
    addressTransaction.forEach(transaction => {
        if(transaction.recipient === address){
            balance += transaction.amount;
            amountArr.push(balance);
        }
        else if(transaction.sender === address){
            balance -= transaction.amount;
            amountArr.push(balance);
        }
    })
    return {
        transaction: addressTransaction,
        addressBalance: balance,
        amountArr: amountArr,
        blocks: addressBlocks
    }
}

BlockChain.prototype.getAddressAllData = async function() {
    let block = await blockChainModel.getLastSchema();
    let resultBlock = block.map(({timesttamps, index, prevHash, hash, nonce}) => 
    ({timesttamps, index, prevHash, hash, nonce}));
    let resultTransaction = block.map(({timesttamps, transactions})=> transactions.map(item => ({...item, timesttamps})))

    return {
        transaction: concat(...resultTransaction), 
        block: resultBlock
    }
}

module.exports = BlockChain