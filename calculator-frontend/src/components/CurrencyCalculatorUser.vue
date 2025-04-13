<template>
  <div class="currency-calculator">
    <!-- Currency Conversion Section -->
    <div class="convert-section">
      <h3>Convert Currency</h3>
      <form @submit.prevent="convertCurrency">
        <!-- From Currency -->
        <div class="form-group">
          <label for="fromCurrency">From Currency:</label>
          <select v-model="fromCurrency" required>
            <option disabled value="">Select a currency</option>
            <option v-for="currency in currencies" :key="currency._id" :value="currency.code">
              {{ currency.name }} ({{ currency.code }})
            </option>
          </select>
        </div>

        <!-- To Currency -->
        <div class="form-group">
          <label for="toCurrency">To Currency:</label>
          <select v-model="toCurrency" required>
            <option disabled value="">Select a currency</option>
            <option v-for="currency in currencies" :key="currency._id" :value="currency.code">
              {{ currency.name }} ({{ currency.code }})
            </option>
          </select>
        </div>

        <!-- Amount -->
        <div class="form-group">
          <label for="amount">Amount:</label>
          <input type="number" step="0.01" v-model.number="amount" required />
        </div>

        <button type="submit">Convert</button>
      </form>

      <!-- Converted Output -->
      <div v-if="convertedAmount !== null">
        <p>Converted Amount: {{ convertedAmount.toFixed(4) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      fromCurrency: '',
      toCurrency: '',
      amount: 0,
      convertedAmount: null,
      currencies: [] // store fetched currencies here
    };
  },
  methods: {
    async fetchCurrencies() {
      try {
        const response = await axios.get('http://localhost:5000/currencies/all');
        this.currencies = response.data;
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        alert('Failed to load currencies: ' + message);

        // If unauthorized, redirect to login
        if (error.response?.status === 401) {
          this.$router.push('/login');
        }
      }
    },

    async convertCurrency() {
      try {
        const response = await axios.post('http://localhost:5000/currencies/exchange/convert', {
          from: this.fromCurrency.toUpperCase(),
          to: this.toCurrency.toUpperCase(),
          amount: this.amount
        });

        this.convertedAmount = parseFloat(response.data.convertedAmount);
      } catch (error) {
        alert('Error during conversion: ' + (error.response?.data?.message || error.message));
      }
    }
  },
  mounted() {
    this.fetchCurrencies();
  }
};
</script>

<style scoped>
/* Global Styles */
.currency-calculator {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  max-width: 1000px;
  margin: 40px auto;
  padding: 40px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-radius: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Headers */
h1 {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 30px;
  color: #004aad;
  font-weight: 700;
  letter-spacing: 1px;
}

h3 {
  font-size: 1.75rem;
  color: #1f2937;
  margin-bottom: 15px;
  border-left: 5px solid #004aad;
  padding-left: 12px;
}

/* Forms */
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form div {
  display: flex;
  flex-direction: column;
}

form label {
  font-size: 1rem;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

form input {
  padding: 14px;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  background: #f0f4f8;
  transition: all 0.3s ease;
  box-shadow: inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff;
}

form input:focus {
  outline: none;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
}

/* Buttons */
button {
  padding: 14px 22px;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 123, 255, 0.2);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 18px rgba(0, 123, 255, 0.3);
}

button:active {
  transform: scale(0.97);
}

/* Sections */
.convert-section {
  flex: 2;
  padding: 30px 40px;
  background: rgba(255, 255, 255, 0.65);
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Action Buttons */
.action-buttons {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.action-buttons button {
  background: #1e3a8a;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

.action-buttons button:hover {
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
}

/* Output Text */
p {
  font-size: 1.1rem;
  color: #111827;
  background: rgba(0, 191, 255, 0.15);
  padding: 15px 20px;
  border-left: 5px solid #00bfff;
  border-radius: 10px;
  margin-top: 20px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 191, 255, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .currency-calculator {
    flex-direction: column;
  }

  .convert-section {
    margin-bottom: 30px;
  }

  .action-buttons {
    flex-direction: row;
    gap: 10px;
    justify-content: space-around;
  }
}

/* Global Styles */
/* Global Styles */
.currency-calculator {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  max-width: 1200px; /* Increased width */
  margin: 40px auto;
  padding: 40px;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-radius: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Headers */
h1 {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 30px;
  color: #004aad;
  font-weight: 700;
  letter-spacing: 1px;
}

h3 {
  font-size: 1.75rem;
  color: #1f2937;
  margin-bottom: 15px;
  border-left: 5px solid #004aad;
  padding-left: 12px;
}

/* Forms */
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form div {
  display: flex;
  flex-direction: column;
}

form label {
  font-size: 1rem;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

form input {
  padding: 14px;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  background: #f0f4f8;
  transition: all 0.3s ease;
  box-shadow: inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff;
}

form input:focus {
  outline: none;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
}

/* Buttons */
button {
  padding: 14px 22px;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 123, 255, 0.2);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 18px rgba(0, 123, 255, 0.3);
}

button:active {
  transform: scale(0.97);
}

/* Sections */
.convert-section {
  flex: 2;
  padding: 30px 40px;
  background: rgba(255, 255, 255, 0.65);
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Action Buttons */
.action-buttons {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.action-buttons button {
  background: #1e3a8a;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

.action-buttons button:hover {
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
}

/* Output Text */
p {
  font-size: 1.1rem;
  color: #111827;
  background: rgba(0, 191, 255, 0.15);
  padding: 15px 20px;
  border-left: 5px solid #00bfff;
  border-radius: 10px;
  margin-top: 20px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 191, 255, 0.15);
}

/* Responsive */
@media (max-width: 1200px) {
  .currency-calculator {
    flex-direction: column;
  }

  .convert-section {
    margin-bottom: 30px;
  }

  .action-buttons {
    flex-direction: row;
    gap: 10px;
    justify-content: space-around;
  }
}

@media (max-width: 768px) {
  .currency-calculator {
    padding: 20px;
  }

  .action-buttons {
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
  }

  h1 {
    font-size: 2.5rem;
  }

  h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 600px) {
  .currency-calculator {
    padding: 15px;
  }

  h1 {
    font-size: 2.2rem;
  }

  h3 {
    font-size: 1.4rem;
  }
}


/* Headers */
h1 {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 30px;
  color: #004aad;
  font-weight: 700;
  letter-spacing: 1px;
}

h3 {
  font-size: 1.75rem;
  color: #1f2937;
  margin-bottom: 15px;
  border-left: 5px solid #004aad;
  padding-left: 12px;
}

/* Forms */
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form div {
  display: flex;
  flex-direction: column;
}

form label {
  font-size: 1rem;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

form input {
  padding: 14px;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  background: #f0f4f8;
  transition: all 0.3s ease;
  box-shadow: inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff;
}

form input:focus {
  outline: none;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
}

/* Buttons */
/* Buttons */
button {
  padding: 14px 22px;
  background: linear-gradient(to right, #007bff,rgb(90, 150, 246)); /* Gradient with two shades of blue */
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px #3b82f6; /* Neon-like shadow effect */
}

/* Adding neon effect on hover */
button:hover {
  background: linear-gradient(to right,rgb(54, 113, 207), #007bff); /* Neon blue gradient */
  box-shadow: 0 0 10px rgb(54, 113, 207), 0 0 20px rgb(86, 141, 228); /* Neon glow effect */
}


button:active {
  transform: scale(0.97);
}

/* Sections */
.convert-section,
.add-currency,
.add-rate,
.update-currency,
.delete-currency,
.update-rate,
.delete-rate {
  margin-bottom: 40px;
  padding: 25px 30px;
  background: rgba(255, 255, 255, 0.65);
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 30px;
}

.action-buttons button {
  flex: 1;
  min-width: 140px;
  background: #1e3a8a;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

.action-buttons button:hover {
  background: linear-gradient(135deg, #2563eb 0%, #007bff 100%);
}

/* Output Text */
p {
  font-size: 1.1rem;
  color: #111827;
  background: rgba(0, 191, 255, 0.15);
  padding: 15px 20px;
  border-left: 5px solid #00bfff;
  border-radius: 10px;
  margin-top: 20px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 191, 255, 0.15);
}

/* Responsive */
@media (max-width: 600px) {
  .currency-calculator {
    padding: 20px;
  }

  .action-buttons {
    flex-direction: column;
  }

  h1 {
    font-size: 2.2rem;
  }

  h3 {
    font-size: 1.4rem;
  }
}

form select {
  padding: 14px;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  background: #f0f4f8;
  box-shadow: inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff;
  transition: all 0.3s ease;
}

form select:focus {
  outline: none;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
}


</style>
