<template>
  <div class="register-container">
    <button @click="goHome" class="return-home-button">Return to Home Page</button>

    <div class="glass-card">
      <h2 class="title">Create Your Account</h2>
      <form @submit.prevent="register">
        <!-- Username Field -->
        <div class="input-group">
          <label for="username">Username</label>
          <input
            type="text"
            v-model="username"
            placeholder="Enter your username"
            required
            class="input-field"
          />
        </div>

        <!-- Full Name Field -->
        <div class="input-group">
          <label for="fullname">Full Name</label>
          <input
            type="text"
            v-model="fullname"
            placeholder="Enter your full name"
            required
            class="input-field"
          />
        </div>

        <!-- Email Field -->
        <div class="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            required
            class="input-field"
          />
        </div>

        <!-- Password Field -->
        <div class="input-group">
          <label for="password">Password</label>
          <div class="password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Enter your password"
              required
              class="input-field"
            />
            <button type="button" @click="togglePassword" class="password-toggle">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <!-- Display Password Error Message -->
          <p v-if="passwordErrorMessage" class="error">{{ passwordErrorMessage }}</p>
        </div>

        <!-- Role Selection Field -->
        <div class="input-group">
          <label for="role">Role</label>
          <select v-model="role" required class="input-field">
            <option disabled value="">Select role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <!-- Admin Access Code (only show if role is Admin) -->
        <div v-if="role === 'Admin'" class="input-group">
          <label for="adminAccessCode">Admin Access Code</label>
          <input
            type="text"
            v-model="adminAccessCode"
            placeholder="Enter admin access code"
            required
            class="input-field"
          />
        </div>

        <!-- Loading Spinner -->
        <div v-if="loading" class="spinner"></div>

        <!-- Submit Button -->
        <button type="submit" :disabled="loading" class="submit-btn">Sign Up</button>
      </form>

      <!-- Error Message -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <!-- Redirect to Login -->
      <p class="redirect">
        Already have an account?
        <router-link to="/login" class="redirect-link">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignUpPage',
  data() {
    return {
      username: '',
      fullname: '',
      email: '',
      password: '',
      role: '',
      adminAccessCode: '',
      errorMessage: '',
      passwordErrorMessage: '', // Add this line for the password error
      loading: false,
      showPassword: false
    };
  },
  methods: {
    // Toggle password visibility
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    // Navigate to the home page
    goHome() {
      this.$router.push('/main');
    },

    // Register user
    async register() {
      this.loading = true;
      this.errorMessage = '';
      this.passwordErrorMessage = '';  // Initialize the password error message

      // Password validation logic
      const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
      if (!passwordValidation.test(this.password)) {
        this.passwordErrorMessage = 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.';
        this.loading = false;
        return;
      }

      try {
        const payload = {
          username: this.username,
          fullname: this.fullname,
          email: this.email,
          password: this.password,
          role: this.role,
        };

        // Only include adminAccessCode if the role is Admin
        if (this.role === 'Admin') {
          if (!this.adminAccessCode) {
            throw new Error('Admin access code is required for Admin role');
          }
          payload.adminAccessCode = this.adminAccessCode;
        }

        console.log('Sending payload:', payload);  // For debugging
        
        // Send the registration data to the backend
        await axios.post('http://localhost:5000/users/register', payload);

        alert('Registration successful!');
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Background Gradient Animation */
.register-container {
  height: 100vh;
  background: linear-gradient(120deg, #0f0c29, #302b63, #24243e);
  background-size: 400% 400%;
  animation: aurora 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}
.return-home-button {
  position: absolute;
  top: 15px; /* You can keep this or adjust */
  left: 15px; /* You can keep this or adjust */
  background-color: #00c6ff;
  color: white;
  padding: 12px 24px; /* Increased padding for bigger button */
  font-size: 1rem; /* Increased font size */
  border: none;
  border-radius: 20px; /* Increased border radius for a more rounded look */
  cursor: pointer;
  transition: background-color 0.3s;
}

.return-home-button:hover {
  background-color: #0072ff;
}

.return-home-button:focus {
  outline: none;
}
/* Glass-style card */
.glass-card {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-radius: 12px; /* Decreased border radius */
  padding: 1.5rem; /* Decreased padding */
  width: 100%;
  max-width: 400px; /* Decreased max width */
  color: white;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.15), 0 0 30px rgba(0, 200, 255, 0.1);
  animation: fadeIn 1s ease-out;
}

.title {
  font-size: 1.8rem; /* Decreased font size */
  text-align: center;
  margin-bottom: 1.2rem; /* Decreased bottom margin */
  font-weight: 700;
  color: #ffffff;
}

/* Label styling with margin-bottom for gap */
.input-group label {
  display: block;
  margin-bottom: 6px; /* Decreased margin */
  font-size: 0.875rem; /* Decreased font size */
  color: #e2e8f0;
}

/* Style for select element */
.input-group select {
  color: black;
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 0.875rem; /* Decreased font size */
  padding: 10px; /* Decreased padding */
  margin-bottom: 12px; /* Decreased margin */
}

/* Style for option elements inside select */
.input-group select option {
  color: black;
  background-color: rgba(255, 255, 255, 0.1);
}

/* Form Inputs */
.input-field {
  width: 100%;
  padding: 10px; /* Decreased padding */
  border: none;
  border-radius: 8px; /* Decreased border radius */
  font-size: 0.875rem; /* Decreased font size */
  background: rgba(255, 255, 255, 0.1);
  color: white;
  outline: none;
  transition: all 0.3s ease;
  margin-bottom: 12px; /* Decreased margin */
}

.input-field:focus {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 2px rgba(0, 200, 255, 0.4);
}

/* Password Input */
.password-input {
  position: relative;
}
.password-toggle {
  position: absolute;
  right: 8px; /* Decreased right margin */
  top: 40%; /* Increase this value to move the button higher */
  transform: translateY(-50%); /* Keeps the button centered vertically */
  background: none;
  border: none;
  color: #00e0ff;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem; /* Decreased font size */
  outline: none;
}


.password-toggle:focus {
  outline: none;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 12px; /* Decreased padding */
  font-size: 1rem; /* Decreased font size */
  border-radius: 20px; /* Decreased border radius */
  background: linear-gradient(to right, #00c6ff, #0072ff);
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
  margin-top: 12px; /* Decreased margin-top */
}

.submit-btn:hover:enabled {
  box-shadow: 0 0 10px #00c6ff, 0 0 20px #0072ff;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Spinner */
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #00e0ff;
  border-radius: 50%;
  width: 24px; /* Decreased spinner size */
  height: 24px; /* Decreased spinner size */
  margin: 8px auto;
  animation: spin 1s linear infinite;
}

/* Error Message */
.error {
  color: #ff6b6b;
  text-align: center;
  margin-top: 1rem; /* Decreased margin-top */
  font-weight: 500;
  font-size: 0.875rem; /* Decreased font size */
}

/* Redirect */
.redirect {
  text-align: center;
  margin-top: 1.5rem; /* Decreased margin-top */
  font-size: 0.875rem; /* Decreased font size */
  color: #e2e8f0;
}

.redirect-link {
  color: #00e0ff;
  text-decoration: none;
  font-weight: 600;
}

.redirect-link:hover {
  text-decoration: underline;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes aurora {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 600px) {
  .glass-card {
    padding: 1.2rem; /* Decreased padding */
  }
  .title {
    font-size: 1.6rem; /* Decreased title font size */
  }
  .return-home-button {
    top: 10px;
    left: 10px;
    padding: 6px 12px; /* Decreased padding */
    font-size: 0.75rem; /* Decreased font size */
  }
}


</style>
