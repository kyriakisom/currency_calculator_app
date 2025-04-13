const mongoose = require('mongoose');

// Define schema for exchange rates between currencies
const ExchangeRateSchema = new mongoose.Schema({
  from: { 
    type: String,           // Source currency code (e.g., 'USD')
    required: true 
  },
  to: { 
    type: String,           // Target currency code (e.g., 'EUR')
    required: true 
  },
  rate: { 
    type: mongoose.Schema.Types.Decimal128, // Exchange rate value with high precision
    required: true 
  }
});

// Export the model to be used in the app (e.g., for CRUD operations)
module.exports = mongoose.model('ExchangeRate', ExchangeRateSchema);
