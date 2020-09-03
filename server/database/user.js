const mongoose = require('mongoose');

module.exports = mongoose.model('users', new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  userTag: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  advertisements: {
    type: [{ 
      type: mongoose.Types.ObjectId,
      required: true,
    }],
  },
  adCount: {
    type: mongoose.SchemaTypes.Number,
    required: true,
    default: 0,
  }
}));