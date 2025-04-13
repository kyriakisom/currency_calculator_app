<template>
  <div class="login-container">
    <!-- Return to Home Page button -->
    <button @click="goHome" class="return-home-button">Return to Home Page</button>

    <div class="glass-card">
      <h2 class="login-title">Sign In</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="Enter your username"
            class="input-field"
          />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <div class="password-container">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              placeholder="Enter your password"
              class="input-field"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="toggle-password-btn"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <div v-if="loading" class="spinner"></div>
        <button type="submit" :disabled="loading" class="login-button">
          Sign In
        </button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p class="signup-link">
        Don't have an account? <router-link to="/register">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignInPage',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      loading: false,
      showPassword: false // To toggle password visibility
    };
  },
  methods: {
    // Navigate to the home page when the button is clicked
    goHome() {
      this.$router.push('/main');
    },
    // Toggle password visibility
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  async login() {
  this.loading = true;
  this.errorMessage = '';
  try {
    // Send a POST request to login the user
    const response = await axios.post('http://localhost:5000/users/login', {
      username: this.username,
      password: this.password
    });

    // On successful login, store the user information in localStorage
    const user = response.data.user; // assuming 'user' is returned from the backend
    localStorage.setItem('user', JSON.stringify(user)); // Store the user object in localStorage

    // Redirect based on the role
    const role = user.role;
    if (role === 'User') {
      this.$router.push('/homeuser');
    } else if (role === 'Admin') {
      this.$router.push('/home');
    }

  } catch (error) {
    // Handle error if login fails
    if (error.response) {
      this.errorMessage = error.response.data.message;
    } else {
      this.errorMessage = 'An error occurred. Please try again.';
    }
  } finally {
    this.loading = false;
  }
}

  }
};
</script>

<style scoped>
/* Animated background */
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  position: relative; /* Allow the button to be positioned absolutely */
}

/* Return to Home Page button styling */
.return-home-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #00c6ff;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.return-home-button:hover {
  background-color: #0072ff;
}

.return-home-button:focus {
  outline: none;
}

/* Glassmorphism card */
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 3rem;
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
  color: #fff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  text-align: center;
  animation: fadeIn 1.2s ease;
}

.login-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

/* Input styling */
.input-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #ccc;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: 0.3s ease;
}

.input-field:focus {
  border-color: #00c6ff;
  box-shadow: 0 0 10px rgba(0, 198, 255, 0.4);
}

/* Password container */
.password-container {
  position: relative;
}

.toggle-password-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #00c6ff;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.toggle-password-btn:hover {
  color: #0072ff;
}

/* Button styling */
.login-button {
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
  border-radius: 30px;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
  margin-top: 10px;
}

.login-button:hover:enabled {
  box-shadow: 0 0 12px #00c6ff, 0 0 24px #0072ff;
}

.login-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Loading spinner */
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #00c6ff;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

/* Error message */
.error {
  color: #ff4d4d;
  margin-top: 1rem;
}

/* Signup link */
.signup-link {
  margin-top: 1.5rem;
  color: #ccc;
}

.signup-link a {
  color: #00c6ff;
  text-decoration: none;
  font-weight: 600;
}

.signup-link a:hover {
  text-decoration: underline;
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 600px) {
  .glass-card {
    padding: 2rem;
  }

  .login-title {
    font-size: 2rem;
  }

  .return-home-button {
    top: 10px;
    left: 10px;
  }
}
</style>
