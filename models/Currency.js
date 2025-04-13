const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Currency Schema
const CurrencySchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    description: 'The unique currency code, e.g., "EUR", "USD", etc.'
  }
}, { timestamps: true });  // Adding timestamps to track when each currency is added

// Create the model from the schema
const Currency = mongoose.model('Currency', CurrencySchema);

module.exports = Currency;
