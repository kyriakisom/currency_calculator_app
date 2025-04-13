<template>
  <div class="home-page">
    <!-- Hyperlink at the top of the page -->
    <div class="top-link">
      <a href="/visitor" class="link-text">See the world's currencies</a>
    </div>

    <!-- Hero Section with Glassmorphism effect -->
    <section class="hero">
      <div class="glass-card">
        <!-- Main Heading -->
        <h1>Smarter Currency Conversions</h1>
        <!-- Description paragraph -->
        <p>
          Experience lightning-fast, real-time currency exchange with a beautiful interface and powerful accuracy.
        </p>
        <!-- Buttons for Sign In and Sign Up actions -->
        <div class="buttons">
          <button class="btn neon sign-in" @click="goToLogin">Sign In</button>
          <button class="btn neon-outline sign-up" @click="goToRegister">Sign Up</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Vue component for Home Page
export default {
  name: "HomePage",
  methods: {
    // Method to navigate to login page
    goToLogin() {
      this.$router.push("/login");
    },
    // Method to navigate to register page
    goToRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
/* Background Gradient Animation */
.home-page {
  min-height: 100vh; /* Ensures full height of the viewport */
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); /* Gradient background for visual appeal */
  background-size: 400% 400%; /* Sets the background size for gradient animation */
  animation: gradientShift 20s ease infinite; /* Infinite gradient shift animation */
  display: flex; /* Flexbox for centering content */
  align-items: center; /* Vertically centers content */
  justify-content: center; /* Horizontally centers content */
  overflow: hidden; /* Prevents any overflow from visible content */
  font-family: 'Poppins', sans-serif; /* Font styling for the page */
}

/* Link at the top */
.top-link {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10; /* Make sure the link stays on top */
}

.link-text {
  color: #00c6ff;
  font-size: 1.2rem;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.link-text:hover {
  color: #0072ff; /* Change color on hover */
}

/* Glassmorphism Card for content */
.glass-card {
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  backdrop-filter: blur(15px); /* Blur effect for glassmorphism */
  -webkit-backdrop-filter: blur(15px); /* For Safari browser */
  border-radius: 20px; /* Rounded corners for the card */
  padding: 40px; /* Padding inside the card */
  max-width: 700px; /* Maximum width for the card */
  text-align: center; /* Center the text inside the card */
  color: white; /* White text color */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3); /* Shadow for depth */
  animation: fadeInUp 1s ease; /* Fade-in animation when the card appears */
}

/* Heading inside the glass card */
.glass-card h1 {
  font-size: 3rem; /* Large font size for heading */
  margin-bottom: 20px; /* Space below the heading */
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3); /* Subtle glow effect for heading */
}

/* Description text inside the glass card */
.glass-card p {
  font-size: 1.2rem; /* Font size for paragraph */
  margin-bottom: 30px; /* Space below the paragraph */
  color: #e0e0e0; /* Light gray text for description */
}

/* Button container styling */
.buttons {
  display: flex; /* Flexbox for aligning buttons */
  justify-content: center; /* Center buttons horizontally */
  gap: 20px; /* Space between buttons */
}

/* General button styling */
.btn {
  padding: 14px 30px; /* Button padding */
  font-size: 1rem; /* Font size for the button text */
  border-radius: 30px; /* Rounded corners for the buttons */
  cursor: pointer; /* Pointer cursor on hover */
  transition: 0.3s ease; /* Smooth transition on hover */
  min-width: 140px; /* Minimum width for buttons */
  font-weight: 500; /* Medium weight font */
}

/* Neon button styling for "Sign In" button */
.neon {
  background: #00c6ff; /* Gradient background color */
  background: linear-gradient(to right, #0072ff, #00c6ff); /* Blue neon gradient */
  border: none; /* Remove default border */
  color: white; /* White text color */
  box-shadow: 0 0 10px #00c6ff, 0 0 20px #0072ff; /* Neon glow effect */
}

/* Hover effect for neon buttons */
.neon:hover {
  box-shadow: 0 0 20px #00c6ff, 0 0 40px #0072ff; /* Intensify the glow on hover */
}

/* Neon outline button styling for "Sign Up" button */
.neon-outline {
  background: transparent; /* Transparent background */
  border: 2px solid #00c6ff; /* Blue border */
  color: #00c6ff; /* Blue text color */
}

/* Hover effect for neon outline button */
.neon-outline:hover {
  background: #00c6ff; /* Blue background on hover */
  color: white; /* White text color on hover */
  box-shadow: 0 0 10px #00c6ff, 0 0 20px #0072ff; /* Glow effect on hover */
}

/* Animations */

/* Fade-in animation for the glass card */
@keyframes fadeInUp {
  from {
    opacity: 0; /* Start invisible */
    transform: translateY(40px); /* Start slightly below the screen */
  }
  to {
    opacity: 1; /* End fully visible */
    transform: translateY(0); /* End in original position */
  }
}

/* Gradient background shift animation */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%; /* Start position of the gradient */
  }
  50% {
    background-position: 100% 50%; /* Shift to the right */
  }
  100% {
    background-position: 0% 50%; /* Back to the starting position */
  }
}
</style>
