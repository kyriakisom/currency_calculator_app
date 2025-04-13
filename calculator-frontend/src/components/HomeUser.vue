<template>
  <div class="home">
    <!-- Header Section -->
    <HeaderSectionUser />

    <!-- Main Content Section -->
    <div class="main-content">
      <h2>Welcome to Currency Calculator</h2>
      <p class="description">
        Easily convert currencies with real-time exchange rates and simple calculations.
      </p>

      <!-- Currency Calculator Form -->
      <CurrencyCalculatorUser />
    </div>

    <!-- Footer Section -->
    <FooterSectionUser />
  </div>
</template>

<script>
import HeaderSectionUser from './HeaderSectionUser.vue';
import CurrencyCalculatorUser from './CurrencyCalculatorUser.vue';
import FooterSectionUser from './FooterSectionUser.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderSectionUser,
    CurrencyCalculatorUser,
    FooterSectionUser
  }
};
</script>

<style scoped>
.home {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #302b63, #302b63);
  padding: 0 15px;
  min-height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-content {
  text-align: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  padding: 40px 60px;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
  max-width: 500px;
  width: 100%;
  margin: 2px auto 0;
}

.main-content h2 {
  font-size: 2.4rem;
  font-weight: 600;
  color: #007bff;
  margin-bottom: 12px;
}

.main-content .description {
  font-size: 1.2rem;
  color: white;
  margin-bottom: 20px;
  line-height: 1.4;
  font-weight: 400;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    padding: 30px 25px;
    max-width: 85%;
  }

  .main-content h2 {
    font-size: 2.2rem;
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
    font-size: 1.8rem;
  }

  .main-content .description {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .main-content h2 {
    font-size: 1.6rem;
  }

  .main-content .description {
    font-size: 0.85rem;
  }
}
</style>
