var mongoose = require('mongoose');

// Define a dynamic schema using Mongoose's Schema constructor
const dynamicSchema = new mongoose.Schema({}, { strict: false });

// Create a model based on the dynamic schema
module.exports = mongoose.model('DynamicModel', dynamicSchema);