let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AddressWallet = new Schema({
  private: {
    type: Schema.Types.String
  },
  public: {
    type: Schema.Types.String
  },
  password: {
    type: Schema.Types.String
  },
});
let Collection = mongoose.model('AddressWallet', AddressWallet);


module.exports = {
  createAddress: async function (prama) {
    return await Collection.insertMany(prama)
  },
  getAddress: async function (prama) {
    return await Collection.find(prama)
  }
}