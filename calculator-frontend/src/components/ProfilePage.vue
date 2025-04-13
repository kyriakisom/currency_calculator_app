<template>
  <div class="profile-page">
    <!-- Return and Logout Buttons -->
    <button class="return-btn" @click="goToHomePage">Return Home</button>
    <button class="logout-btn" @click="logOut">Log Out</button>

    <div class="profile-container">
      <!-- Profile Header -->
      <div class="profile-header">
        <h2>
          Your Profile
        </h2>
      </div>

      <!-- Avatar Icon -->
      <div class="avatar-role" v-if="user">
        <div class="icon-avatar">
          <UserCircleIcon class="icon" />
        </div>
      </div>

      <!-- Profile Info -->
      <div v-if="user" class="profile-card">
        <span v-if="user" class="role-badge header-role">{{ user.role }}</span>

        <div class="profile-info">
          <div class="info-item">
            <label><strong>Full Name:</strong></label>
            <div v-if="!isEditing" class="user-info">{{ user.fullname }}</div>
            <input v-else type="text" v-model="editForm.fullname" placeholder="Enter your full name" />
          </div>
          <div class="info-item">
            <label><strong>Username:</strong></label>
            <div v-if="!isEditing" class="user-info">{{ user.username }}</div>
            <input v-else type="text" v-model="editForm.username" placeholder="Enter your username" />
          </div>
          <div class="info-item">
            <label><strong>Email:</strong></label>
            <div v-if="!isEditing" class="user-info">{{ user.email }}</div>
            <input v-else type="email" v-model="editForm.email" placeholder="Enter your email" />
          </div>
        </div>

        <!-- Profile Actions and History Toggle -->
        <div class="profile-actions">
          <button class="edit-btn" @click="toggleEdit">{{ isEditing ? 'Cancel' : 'Edit Profile' }}</button>
          <button v-if="isEditing" class="save-btn" @click="updateUserInfo">Save Changes</button>
          <button class="history-btn" @click="fetchConversionHistory">
            {{ showHistory ? 'Hide' : 'View' }} Conversion History
          </button>
        </div>

        <!-- Conversion History -->
        <div v-if="showHistory && conversionHistory.length" class="history-container">
          <h3>Conversion History</h3>
          <ul>
            <li v-for="(entry, index) in paginatedHistory" :key="index">
              <p><strong>From:</strong> {{ entry.from }}  <span>{{ entry.fromCurrencyName }}</span></p>
              <p><strong>To:</strong> {{ entry.to }}  <span>{{ entry.toCurrencyName }}</span></p>
              <p><strong>Amount:</strong> {{ entry.amount }}</p>
              <p><strong>Result of conversion:</strong>
                <span class="converted-amount">{{ entry.convertedAmount }}</span>
              </p>
              <p><strong>Date/Time:</strong> {{ formatDate(entry.timestamp) }}</p> <!-- Display Date/Time -->
            </li>
          </ul>

          <!-- Pagination Controls -->
          <div class="pagination">
            <button @click="changePage('previous')" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="changePage('next')" :disabled="currentPage === totalPages">Next</button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="loading">
        <p>Loading your info...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { UserCircleIcon } from '@heroicons/vue/24/solid';

export default {
  name: 'ProfilePage',
  components: {
    UserCircleIcon
  },
  data() {
    return {
      user: null,
      isEditing: false,
      editForm: {
        username: '',
        fullname: '',
        email: ''
      },
      conversionHistory: [],
      showHistory: false,
      historyFetched: false,
      currentPage: 1,
      pageSize: 5
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.conversionHistory.length / this.pageSize);
    },
    paginatedHistory() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.conversionHistory.slice(start, end);
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/users/me', { withCredentials: true });
      this.user = response.data.user;
      this.editForm = { ...this.user };
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        this.editForm = { ...this.user };
      }
    },
    async updateUserInfo() {
      try {
        const response = await axios.put('http://localhost:5000/users/me', this.editForm, { withCredentials: true });
        if (response.status === 200) {
          this.user = response.data.user;
          this.isEditing = false;
          alert('Profile updated successfully');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile');
      }
    },
    async logOut() {
      try {
        const response = await axios.post('http://localhost:5000/users/logout');
        if (response.status === 200) {
          this.user = null;
          localStorage.removeItem('fullname');
          this.$router.push('/main');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
    goToHomePage() {
      if (this.user && this.user.role === 'Admin') {
        this.$router.push('/home');
      } else if (this.user && this.user.role === 'User') {
        this.$router.push('/homeuser');
      }
    },
    async fetchConversionHistory() {
      this.showHistory = !this.showHistory;
      if (this.showHistory && !this.historyFetched) {
        try {
          const response = await axios.get('http://localhost:5000/currencies/exchange/history', { withCredentials: true });
          this.conversionHistory = response.data.history;
          this.historyFetched = true;
        } catch (error) {
          console.error('Failed to fetch conversion history:', error);
          alert('Could not load conversion history.');
          this.showHistory = false;
        }
      }
    },
    changePage(direction) {
      if (direction === 'previous' && this.currentPage > 1) {
        this.currentPage--;
      } else if (direction === 'next' && this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    formatDate(timestamp) {
      // Create a new Date object
      const date = new Date(timestamp);
      
      // Format date to something more readable (e.g., "April 13, 2025 12:34:56 PM")
      return date.toLocaleString('en-US', {
        weekday: 'short', // Optional: 'long', 'narrow'
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });
    }
  }
};
</script>

<style scoped>
.icon-avatar {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 40px; /* Increased space */
}

.icon {
  width: 60px;
  height: 60px;
  color: #6c63ff;
}

.role-badge {
  background-color: #3b82f6;
  padding: 6px 12px;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.header-role {
  margin-left: 12px;
  font-size: 0.9rem;
  vertical-align: middle;
}

* {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}

body {
  background: #1e1e2f;
  color: white;
}

.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(45deg, #0d0d1d, #302b63);
  padding: 20px;
}

.return-btn, .logout-btn {
  position: fixed;
  top: 20px;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
}

.return-btn {
  left: 20px;
  background-color: #6c63ff;
  color: white;
  box-shadow: 0 10px 30px rgba(108, 99, 255, 0.3);
}

.return-btn:hover {
  background-color: #5a50e3;
  box-shadow: 0 10px 40px rgba(87, 73, 255, 0.5);
  transform: translateY(-3px);
}

.logout-btn {
  right: 20px;
  background-color: #ff3860;
  color: white;
  box-shadow: 0 10px 30px rgba(255, 56, 96, 0.3);
}

.logout-btn:hover {
  background-color: #f63444;
  box-shadow: 0 10px 40px rgba(255, 44, 74, 0.5);
  transform: translateY(-3px);
}

.profile-container {
  max-width: 800px;
  background: rgba(48, 43, 99, 0.85);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  animation: fadeIn 0.6s ease-in-out;
  width: 100%;
  margin-top: 80px;
}

.profile-header h2 {
  font-size: 2.4rem;
  font-weight: bold;
  color: #2563eb;
  text-align: center;
  margin-bottom: 30px;
}

.profile-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(15px);
}

.profile-card:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item label {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(129, 158, 220);
  text-align: center;
}

.user-info {
  color: white;
  font-family: 'Arial', sans-serif;
  text-align: center;
}

.info-item input {
  padding: 12px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid #4fc3f7;
  border-radius: 10px;
  width: 100%;
  margin-top: 8px;
  transition: 0.3s ease;
}

.info-item input:focus {
  border-color: #3b82f6;
  outline: none;
}

.profile-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.edit-btn, .save-btn {
  padding: 12px 28px;
  font-size: 1rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn {
  background-color: #3b82f6;
  color: white;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3);
}

.edit-btn:hover {
  background-color: #2563eb;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.7), 0 0 30px rgba(59, 130, 246, 0.5);
}

.save-btn {
  background-color: #4caf50;
  color: white;
  box-shadow: 0 0 10px rgba(40, 167, 69, 0.5), 0 0 20px rgba(23, 161, 55, 0.3);
}

.save-btn:hover {
  background-color: #388e3c;
  box-shadow: 0 0 15px rgba(38, 186, 73, 0.7), 0 0 30px rgba(40, 167, 69, 0.5);
}
.history-btn {
  background-color:rgb(149, 59, 246); /* Use the same color as the edit button */
  color: white;
  padding: 12px 28px;
  font-size: 1rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(159, 59, 246, 0.5), 0 0 20px rgba(146, 59, 246, 0.3);
}

.history-btn:hover {
  background-color:rgb(116, 37, 235); /* Hover effect */
  box-shadow: 0 0 15px rgba(90, 59, 246, 0.7), 0 0 30px rgba(115, 59, 246, 0.5);
}


.history-container {
  margin-top: 30px;
  color: white;
  font-size: 1rem;
  background: rgba(48, 43, 99, 0.85);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
}

.history-container h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #4fc3f7;
  margin-bottom: 20px;
  text-align: center;
}

.history-container ul {
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 0;
}

.history-container ul li {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.history-container ul li:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.history-container ul li p {
  font-size: 1.1rem;
  margin: 5px 0;
}

.history-container ul li p strong {
  color:rgb(11, 109, 245);
}

.history-container ul li p span {
  color: #7c7c7c;
}

.history-container ul li p:last-child {
  font-weight: bold;
  color:rgb(172, 224, 241);
}

.history-container ul li p .converted-amount {
  color:rgb(172, 224, 241);
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color:rgb(63, 80, 176);
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s;
}

.pagination button:disabled {
  background-color: #999;
}

.pagination button:hover {
  background-color: rgb(63, 80, 176);
}
</style>
