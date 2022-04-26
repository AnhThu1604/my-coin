let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BlockChainSchema = new Schema({
    index: {
        type: Schema.Types.Number
    },
    timetamps: {
        type: Schema.Types.Date,
        default: Date.now()
    },
    transaction: {
        type: Schema.Types.Array
    },
    prevHash:{
        type: Schema.Types.String
    },
    hash:{
        type: Schema.Types.String
    },
    nonce: {
        type: Schema.Types.Number
    }
})

let Collection = mongoose.model('BlockChainSchema', BlockChainSchema);
module.exports = {
    createBlockChain: async function(block){
        return await Collection.insertMany(block)
    },
    getLastSchema: async function(){
        return await Collection.findOne({}, null, {sort: {_id: -1}, limit: 1})
    },
    getAll: async function(){
        return await Collection.find()
    },
    getLastAllSchema: async function(){
        return await Collection.find({}, null, {sort: {_id: -1}, limit: 10})
    }
}