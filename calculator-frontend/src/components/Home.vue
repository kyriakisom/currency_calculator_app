<template>
  <div class="home">
    <!-- Header Section -->
    <HeaderSection />

    <!-- Main Content Section -->
    <div class="main-content">
      <h2>Welcome to Currency Calculator</h2>
      <p class="description">
        Easily convert currencies with real-time exchange rates and simple calculations.
      </p>

      <!-- Currency Calculator Form -->
      <CurrencyCalculator />
    </div>

    <!-- Footer Section -->
    <FooterSection />
  </div>
</template>

<script>
// Importing the Header, Currency Converter, and Footer components
import HeaderSection from './HeaderSection.vue';
import CurrencyCalculator from './CurrencyCalculator.vue';
import FooterSection from './FooterSection.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderSection,
    CurrencyCalculator,
    FooterSection
  }
};
</script>

<style scoped>
/* Base Styling */
.home {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #302b63, #302b63); /* Darker gradient from teal to deep blue */
  padding: 0 15px;
  min-height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Main Content Section */
.main-content {
  text-align: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); /* New background gradient */
 padding: 40px 60px; /* Increased padding for larger spacing */
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 2px; /* Slightly increased for more breathing room */
  animation: fadeIn 1s ease-in-out;
  max-width: 1150px; /* Increased max-width */
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.main-content h2 {
  font-size: 2.4rem; /* Slightly smaller font size */
  font-weight: 600; /* Slightly lighter font weight */
  color: #007bff;
  margin-bottom: 12px;
}

.main-content .description {
  font-size: 1.2rem; /* Reduced font size */
  color: white; /* Change text color to white */
  margin-bottom: 20px; /* Reduced margin */
  line-height: 1.4; /* Slightly reduced line-height */
  font-weight: 400;
}


/* Footer Section */
footer {
  margin-top: 40px; /* Reduced margin-top */
  text-align: center;
  padding: 15px;
  background-color: #333;
  color: white;
  font-size: 0.9rem; /* Reduced font size */
  border-top: 2px solid #007bff;
  box-shadow: 0px -5px 20px rgba(0, 0, 0, 0.1);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-15px); /* Reduced the slide distance */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    padding: 30px 25px; /* Adjusted padding */
    max-width: 85%; /* Reduced max-width for medium screens */
  }
  .main-content h2 {
    font-size: 2.2rem; /* Slightly smaller for mid-sized screens */
  }
  .main-content .description {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 25px 15px;
    max-width: 90%;
  }
  .main-content h2 {
    font-size: 1.8rem; /* Smaller for mobile screens */
  }
  .main-content .description {
    font-size: 0.95rem; /* Reduced font size */
  }
}

@media (max-width: 480px) {
  .main-content h2 {
    font-size: 1.6rem; /* Smaller font size */
  }
  .main-content .description {
    font-size: 0.85rem; /* Reduced font size */
  }
}
</style>
