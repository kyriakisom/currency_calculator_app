const express = require('express');
const router = express.Router();
const Currency = require('../models/Currency');
const ExchangeRate = require('../models/ExchangeRate');
const { isAuthenticated } = require('../middleware/auth');


// In-memory storage
const currencies = new Set();
const exchangeRates = {};
const sessions = new Set();


// --- ADD CURRENCY ---
router.post('/add',isAuthenticated, async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: 'Currency code is required' });
  
    try {
      const existingCurrency = await Currency.findOne({ code: code.toUpperCase() });
      if (existingCurrency) return res.status(400).json({ message: 'Currency already exists' });
  
      const newCurrency = new Currency({ code: code.toUpperCase() });
      await newCurrency.save();
      res.json({ message: 'Currency added', currency: newCurrency });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  // --- UPDATE CURRENCY (Rename) --- 
router.put('/update',isAuthenticated, async (req, res) => {
    const { oldCode, newCode } = req.body;

    if (!oldCode || !newCode) {
        return res.status(400).json({ message: 'Old and new currency codes are required' });
    }

    try {
        // Find the currency by its old code
        const currency = await Currency.findOne({ code: oldCode.toUpperCase() });
        if (!currency) {
            return res.status(404).json({ message: 'Currency not found' });
        }

        // Update the currency code in the Currency collection
        currency.code = newCode.toUpperCase();
        await currency.save();

        // Update the exchange rates that reference the old code
        await ExchangeRate.updateMany(
            { $or: [{ from: oldCode.toUpperCase() }, { to: oldCode.toUpperCase() }] },
            [
                {
                    $set: {
                        from: {
                            $cond: {
                                if: { $eq: ["$from", oldCode.toUpperCase()] },
                                then: newCode.toUpperCase(),
                                else: "$from"
                            }
                        },
                        to: {
                            $cond: {
                                if: { $eq: ["$to", oldCode.toUpperCase()] },
                                then: newCode.toUpperCase(),
                                else: "$to"
                            }
                        }
                    }
                }
            ]
        );

        res.json({ message: 'Currency updated successfully', currency });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

  // --- DELETE CURRENCY ---
  router.delete('/delete',isAuthenticated, async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: 'Currency code is required' });
  
    try {
      const currency = await Currency.findOneAndDelete({ code: code.toUpperCase() });
      if (!currency) return res.status(404).json({ message: 'Currency not found' });
  
      // Remove associated exchange rates
      await ExchangeRate.deleteMany({ $or: [{ from: code.toUpperCase() }, { to: code.toUpperCase() }] });
  
      res.json({ message: 'Currency and related rates deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  // --- GET ALL CURRENCIES --- 
router.get('/all',isAuthenticated, async (req, res) => {
    try {
        // Fetch all currencies from the database
        const currencies = await Currency.find();
        // If no currencies found
        if (currencies.length === 0) {
            return res.status(404).json({ message: 'No currencies found' });
        }
        // Return the list of currencies
        res.json(currencies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

  // --- ADD EXCHANGE RATE ---
router.post('/exchange/add',isAuthenticated, async (req, res) => {
    const { from, to, rate } = req.body;

    if (!from || !to || !rate) {
        return res.status(400).json({ message: 'From, to currency codes and rate are required' });
    }

    try {
        // Ensure that both currencies exist
        const fromCurrency = await Currency.findOne({ code: from.toUpperCase() });
        const toCurrency = await Currency.findOne({ code: to.toUpperCase() });

        if (!fromCurrency || !toCurrency) {
            return res.status(400).json({ message: 'Invalid currencies' });
        }

        const existingRate = await ExchangeRate.findOne({ from: from.toUpperCase(), to: to.toUpperCase() });
        if (existingRate) {
            return res.status(400).json({ message: 'Exchange rate already exists' });
        }

        const exchangeRate = new ExchangeRate({ from: from.toUpperCase(), to: to.toUpperCase(), rate });
        await exchangeRate.save();

        res.json({ message: 'Exchange rate added', exchangeRate });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// --- UPDATE EXCHANGE RATE ---
router.put('/exchange/update',isAuthenticated, async (req, res) => {
    const { from, to, rate } = req.body;
  
    if (!from || !to || !rate) {
      return res.status(400).json({ message: 'From, to currency codes, and rate are required' });
    }
  
    try {
      // Check if the exchange rate exists
      const exchangeRate = await ExchangeRate.findOne({
        from: from.toUpperCase(),
        to: to.toUpperCase()
      });
  
      if (!exchangeRate) {
        return res.status(404).json({ message: 'Exchange rate not found' });
      }
  
      // Update the exchange rate
      exchangeRate.rate = rate;
      await exchangeRate.save();
  
      // Respond with the updated exchange rate
      res.json({
        message: 'Exchange rate updated successfully',
        exchangeRate
      });
    } catch (error) {
      console.error('Error updating exchange rate:', error);
      res.status(500).json({
        message: 'Server error',
        error: error.message
      });
    }
  });
  // --- DELETE EXCHANGE RATE --- 
router.delete('/exchange/delete',isAuthenticated, async (req, res) => {
    const { from, to } = req.body;
  
    if (!from || !to) {
      return res.status(400).json({ message: 'From and to currency codes are required' });
    }
  
    try {
      // Find and delete the exchange rate
      const exchangeRate = await ExchangeRate.findOneAndDelete({
        from: from.toUpperCase(),
        to: to.toUpperCase()
      });
  
      if (!exchangeRate) {
        return res.status(404).json({ message: 'Exchange rate not found' });
      }
  
      // Log the deleted exchange rate for monitoring
      console.log(`Deleted exchange rate: ${from.toUpperCase()} to ${to.toUpperCase()} at rate ${exchangeRate.rate}`);
  
      // Return a success message with the deleted exchange rate info
      res.json({
        message: 'Exchange rate deleted successfully',
        exchangeRate
      });
    } catch (error) {
      // Log the error and respond with the error message
      console.error('Error deleting exchange rate:', error);
      res.status(500).json({
        message: 'Server error',
        error: error.message
      });
    }
  });
  // --- GET ALL EXCHANGE RATES ---
  router.get('/exchange', async (req, res) => {
    try {
      const exchangeRates = await ExchangeRate.find();
  
      if (exchangeRates.length === 0) {
        return res.status(404).json({ message: 'No exchange rates found' });
      }
  
      // Format each exchange rate: keep everything, but convert rate
      const formattedRates = exchangeRates.map(rate => ({
        ...rate._doc, // spread all fields like _id, from, to, etc.
        rate: rate.rate.toString(), // convert Decimal128 to string
      }));
  
      res.json({ message: 'Exchange rates retrieved', exchangeRates: formattedRates });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  // Map of userId => array of conversions
const userConversionHistory = {};

  router.post('/exchange/convert', isAuthenticated, async (req, res) => {
    const { from, to, amount } = req.body;
    const userId = req.session.userId; // From session

    if (!from || !to || !amount) {
        return res.status(400).json({ message: 'From, to currency codes, and amount are required' });
    }

    try {
        const exchangeRate = await ExchangeRate.findOne({
            from: from.toUpperCase(),
            to: to.toUpperCase()
        });

        if (!exchangeRate) {
            return res.status(400).json({ message: 'Exchange rate does not exist between the specified currencies' });
        }

        const convertedAmount = amount * exchangeRate.rate;

        const conversionData = {
            from: from.toUpperCase(),
            to: to.toUpperCase(),
            amount,
            convertedAmount,
            rate: exchangeRate.rate,
            timestamp: new Date()
        };

        // Initialize if not already present
        if (!userConversionHistory[userId]) {
            userConversionHistory[userId] = [];
        }

        userConversionHistory[userId].push(conversionData);

        res.json({ message: 'Conversion successful', convertedAmount, conversionData });
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
  // --- Get all conversion histories of the current signed in user ---
router.get('/exchange/history', isAuthenticated, (req, res) => {
  const userId = req.session.userId;

  const history = userConversionHistory[userId] || [];

  res.json({
      message: 'Conversion history retrieved successfully',
      history
  });
});


module.exports = router;
