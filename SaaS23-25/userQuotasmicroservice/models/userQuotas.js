/* Import mongoose */
var mongoose = require('mongoose');

/* Define schema */
const userQuotasSchema = new mongoose.Schema({
  userEmail: String,
  totalQuotas: {
    type: Number,
    min: 0
  }
});

/* Export the schema */
module.exports = mongoose.model('userQuotas', userQuotasSchema);