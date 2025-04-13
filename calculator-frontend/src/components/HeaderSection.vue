<template>
  <!-- Header section containing the logo and user info -->
  <header class="header">
    <div class="logo">
      <!-- Logo and subtitle section -->
      <h1>Currency Converter</h1>
      <p>Effortless currency exchange calculations</p>
    </div>
    <div class="user-info">
      <!-- User greeting and action buttons -->
      <p>Welcome, <strong>{{ fullname }}</strong></p>
      <div class="buttons">
        <!-- Profile and logout buttons -->
        <button @click="goToProfile" class="profile-btn">My Profile</button>
        <button @click="logOut" class="logout-btn">Log Out</button>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HeaderSection', // The name of the component
  data() {
    return {
      fullname: '' // Store the fullname of the user
    };
  },
  async created() {
    try {
      // Fetch the user's fullname from the server using Axios
      const response = await axios.get('http://localhost:5000/users/fullname', { withCredentials: true });
      this.fullname = response.data.fullname;
      localStorage.setItem('fullname', this.fullname); // Optional: Caching the fullname in localStorage
    } catch (error) {
      // If fetching fails, log the error and redirect the user to the login page
      console.error('Failed to fetch fullname:', error);
      this.fullname = '';
      localStorage.removeItem('fullname'); // Clean up the cached fullname
      this.$router.push('/login'); // Redirect to the login page if unauthenticated
    }
  },
  methods: {
    async logOut() {
      try {
        // Send logout request to the server
        const response = await axios.post('http://localhost:5000/users/logout', {}, { withCredentials: true });
        if (response.status === 200) {
          this.fullname = ''; // Clear the fullname upon successful logout
          localStorage.removeItem('fullname'); // Remove the cached fullname
          this.$router.push('/main'); // Redirect to the main page after logout
        }
      } catch (error) {
        console.error('Error during logout:', error); // Log error if logout fails
      }
    },
    goToProfile() {
      // Navigate to the user's profile page
      this.$router.push('/profile');
    }
  }
};
</script>

<style scoped>
/* Header layout and styling */
.header {
  display: flex;
  justify-content: space-between; /* Aligns the logo and user info on opposite sides */
  align-items: center; /* Vertically center the content */
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); /* Beautiful background gradient */
  backdrop-filter: blur(12px); /* Apply a blur effect to the background */
  -webkit-backdrop-filter: blur(12px); /* For Safari support */
  color: rgb(180, 200, 233); /* Light color for text */
  padding: 25px 40px; /* Space around the content */
  border-radius: 20px; /* Rounded corners for the header */
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.1); /* Soft box shadow for a glowing effect */
  width: 100%;
  max-width: 1200px; /* Limit the maximum width */
  margin: 40px auto; /* Center the header */
  position: relative;
  overflow: hidden; /* Prevent content overflow */
  z-index: 10; /* Ensure the header is above other elements */
}

/* Logo styling */
.header .logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align logo content to the left */
  max-width: 60%; /* Limit logo width */
}

.header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, #0ff, #3b82f6, #0ff); /* Neon gradient effect */
  animation: neon-glide 5s linear infinite; /* Neon glow animation */
  opacity: 0.8;
}

@keyframes neon-glide {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

/* Logo text styles */
.header .logo h1 {
  font-size: 2.2rem; /* Large header font */
  font-weight: 900; /* Bold font */
  margin: 0;
  color: #ffffff; /* White color for the title */
  text-shadow: 0 0 5px #3b82f6, 0 0 15px rgb(21, 55, 108); /* Glowing shadow effect */
}

.header .logo p {
  font-size: 1rem;
  font-weight: 400; /* Regular font weight for the subtitle */
  margin: 5px 0 0;
  color: rgba(255, 255, 255, 0.8); /* Lighter color for subtitle */
  letter-spacing: 0.8px;
}

/* User info styling */
.header .user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align user info to the right */
  justify-content: center;
}

.header .user-info p {
  font-size: 1.2rem;
  color: #3b82f6; /* Blue color for the user greeting */
  margin: 0;
}

.header .user-info strong {
  color: #3b82f6;
  font-weight: 700; /* Bold the user's name */
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Unified Button Style (Profile and Logout buttons) */
.profile-btn, .logout-btn {
  padding: 12px 28px; /* Comfortable padding for both buttons */
  font-size: 1.1rem; /* Larger, readable font size */
  border: none;
  border-radius: 35px; /* Rounded corners */
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease; /* Smooth transition for hover effects */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.15); /* Depth for button */
}

/* Profile Button specific styling */
.profile-btn {
  background-color: #3b82f6;
  color: white;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3); /* Light blue shadow */
}

.profile-btn:hover {
  background-color: #2563eb; /* Darker blue on hover */
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.4); /* Enhanced shadow on hover */
  transform: translateY(-3px); /* Slight hover effect */
}

/* Logout Button specific styling */
.logout-btn {
  background-color: #ff4d4d; /* Red color for logout */
  color: white;
  box-shadow: 0 8px 16px rgba(255, 77, 77, 0.3); /* Red shadow */
}

.logout-btn:hover {
  background-color: #ff1f1f; /* Darker red on hover */
  box-shadow: 0 12px 24px rgba(255, 42, 42, 0.4); /* Enhanced shadow on hover */
  transform: translateY(-3px); /* Slight hover effect */
}

/* Add styles for buttons container */
.user-info .buttons {
  display: flex;
  gap: 20px; /* Increased gap between buttons */
  margin-top: 20px;
  justify-content: center;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .header {
    padding: 15px 25px; /* Adjust padding for medium screens */
    margin-top: 30px;
  }
  .header .logo h1 {
    font-size: 1.8rem; /* Adjust logo size */
  }
  .header .logo p {
    font-size: 0.9rem;
  }
  .header .user-info p {
    font-size: 1.1rem;
  }
  .logout-btn {
    margin-top: 8px;
    font-size: 1rem;
  }
}

@media (max-width: 1024px) {
  .header {
    flex-direction: column;
    padding: 15px 20px;
    text-align: center;
    margin-top: 30px;
  }
  .header .logo h1 {
    font-size: 1.6rem;
  }
  .header .logo p {
    font-size: 0.9rem;
  }
  .header .user-info p {
    font-size: 1rem;
  }
  .logout-btn {
    margin-top: 8px;
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 10px 15px; /* Smaller padding for mobile */
    margin-top: 25px;
  }
  .header .logo h1 {
    font-size: 1.5rem;
  }
  .header .logo p {
    font-size: 0.85rem;
  }
  .header .user-info p {
    font-size: 0.9rem;
  }
  .logout-btn {
    margin-top: 6px;
    font-size: 0.9rem;
  }
}
</style>
