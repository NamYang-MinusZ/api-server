const mongoose = require('mongoose');

const { Schema } = mongoose;
//const { Types: { ObjectId } } = Schema;
const busdataSchema = new Schema({
  bus_id: {
    type: String,
    required: true,
  },
  bus_name: {
    type: String,
    required: true,
  },
  concentration: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  create_time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Busdata', busdataSchema);