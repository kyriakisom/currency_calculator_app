<template>
  <header class="header">
    <!-- Logo Section -->
    <div class="logo">
      <h1>Currency Converter</h1>
      <p>Effortless currency exchange calculations</p>
    </div>
    
    <!-- User Information Section -->
    <div class="user-info">
      <!-- Displaying the welcome message with the user's full name -->
      <p>Welcome, <strong>{{ fullname }}</strong></p>
      <!-- Buttons for profile navigation and logout -->
      <div class="buttons">
        <button @click="goToProfile" class="profile-btn">My Profile</button>
        <button @click="logOut" class="logout-btn">Log Out</button>
      </div>
    </div>
  </header>
</template>

<script>
// Importing axios for API calls
import axios from 'axios';

export default {
  name: 'HeaderSection',
  data() {
    return {
      fullname: '' // Placeholder for user's full name
    };
  },
  async created() {
    try {
      // Fetching the user's full name from the backend API
      const response = await axios.get('http://localhost:5000/users/fullname', { withCredentials: true });
      this.fullname = response.data.fullname;
      // Caching the full name in local storage for future use
      localStorage.setItem('fullname', this.fullname);
    } catch (error) {
      // Handling any errors, such as user not being authorized
      console.error('Failed to fetch fullname:', error);
      this.fullname = ''; // Clear the name if failed to fetch
      localStorage.removeItem('fullname'); // Remove cached name
      this.$router.push('/login'); // Redirect to login page if not authorized
    }
  },
  methods: {
    // Method to handle logout
    async logOut() {
      try {
        // Sending a logout request to the backend API
        const response = await axios.post('http://localhost:5000/users/logout', {}, { withCredentials: true });
        if (response.status === 200) {
          // Clear user data and navigate to the main page after logging out
          this.fullname = '';
          localStorage.removeItem('fullname');
          this.$router.push('/main');
        }
      } catch (error) {
        // Handling any errors during logout
        console.error('Error during logout:', error);
      }
    },
    // Method to navigate to the user profile page
    goToProfile() {
      this.$router.push('/profile');
    }
  }
};
</script>

<style scoped>
/* Header layout and styling */
.header {
  display: flex;
  justify-content: space-between; /* Align elements to space out logo and user info */
  align-items: center; /* Vertically center the items */
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); /* Gradient background for the header */
  backdrop-filter: blur(12px); /* Apply blur effect for background */
  -webkit-backdrop-filter: blur(12px); /* For Safari support */
  color: rgb(180, 200, 233); /* Light color for text */
  padding: 25px 40px; /* Padding around the content */
  border-radius: 20px; /* Rounded corners */
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.1); /* Soft shadow for the header */
  width: 100%; /* Full width of the screen */
  max-width: 1200px; /* Maximum width for the header */
  margin: 40px auto; /* Center the header horizontally */
  position: relative;
  overflow: hidden; /* Hide overflow */
  z-index: 10; /* Ensure it is above other content */
}

/* Logo styling */
.header .logo {
  display: flex;
  flex-direction: column; /* Stack the logo text vertically */
  align-items: flex-start;
  max-width: 60%; /* Limit the width of the logo */
}

/* Neon light animation for the header's top border */
.header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, #0ff, #3b82f6, #0ff); /* Neon gradient effect */
  animation: neon-glide 5s linear infinite; /* Smooth sliding neon effect */
  opacity: 0.8;
}

/* Keyframe animation for neon light */
@keyframes neon-glide {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

/* Styling for the header logo's title */
.header .logo h1 {
  font-size: 2.2rem; /* Large font size for title */
  font-weight: 900; /* Bold text */
  margin: 0;
  color: #ffffff; /* White text color */
  text-shadow: 0 0 5px #3b82f6, 0 0 15px rgb(21, 55, 108); /* Neon glow effect */
}

/* Styling for the description under the logo */
.header .logo p {
  font-size: 1rem;
  font-weight: 400; /* Normal weight for description */
  margin: 5px 0 0;
  color: rgba(255, 255, 255, 0.8); /* Light, slightly transparent text */
  letter-spacing: 0.8px; /* Spacing between letters */
}

/* User info styling */
.header .user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align user info to the right */
  justify-content: center;
}

/* Welcome text styling */
.header .user-info p {
  font-size: 1.2rem; /* Slightly larger text */
  color: #3b82f6; /* Blue color for text */
  margin: 0;
}

/* Styling for the strong tag in user info (name) */
.header .user-info strong {
  color: #3b82f6; /* Blue color */
  font-weight: 700; /* Bold font */
  font-size: 1.4rem; /* Larger font size */
  text-transform: uppercase; /* Uppercase text */
  letter-spacing: 1px; /* Spacing between letters */
}

/* Common button styling for both profile and logout buttons */
.profile-btn, .logout-btn {
  padding: 12px 28px; /* Larger padding for both buttons */
  font-size: 1.1rem; /* Consistent font size */
  border: none;
  border-radius: 35px; /* More rounded corners */
  font-weight: 600;
  letter-spacing: 1px; /* Letter spacing for a neat appearance */
  text-transform: uppercase; /* Uppercase text */
  cursor: pointer; /* Pointer cursor for clickability */
  transition: all 0.3s ease; /* Smooth transition for hover effect */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.15); /* Shadow for depth */
}

/* Profile button styling */
.profile-btn {
  background-color: #3b82f6; /* Blue background */
  color: white; /* White text */
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3); /* Light blue shadow */
}

/* Hover effect for the profile button */
.profile-btn:hover {
  background-color: #2563eb; /* Darker blue on hover */
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.4); /* Stronger shadow */
  transform: translateY(-3px); /* Slight lift effect */
}

/* Logout button styling */
.logout-btn {
  background-color: #ff4d4d; /* Red background */
  color: white; /* White text */
  box-shadow: 0 8px 16px rgba(255, 77, 77, 0.3); /* Red shadow */
}

/* Hover effect for the logout button */
.logout-btn:hover {
  background-color: #ff1f1f; /* Darker red on hover */
  box-shadow: 0 12px 24px rgba(255, 42, 42, 0.4); /* Stronger red shadow */
  transform: translateY(-3px); /* Slight lift effect */
}

/* Container for the buttons */
.user-info .buttons {
  display: flex;
  gap: 20px; /* Spacing between buttons */
  margin-top: 20px; /* Space above the buttons */
  justify-content: center; /* Center buttons horizontally */
}

/* Responsive Design for smaller screens */
@media (max-width: 1200px) {
  .header {
    padding: 15px 25px; /* Less padding on smaller screens */
    margin-top: 30px; /* Adjusted margin */
  }
  .header .logo h1 {
    font-size: 1.8rem; /* Smaller font size for larger screens */
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
    flex-direction: column; /* Stack header elements vertically */
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
    padding: 10px 15px; /* Smaller padding for mobile screens */
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
