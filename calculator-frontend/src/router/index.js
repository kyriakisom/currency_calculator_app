import { createRouter, createWebHistory } from 'vue-router';

// Component imports
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Home from '../components/Home.vue';         // Accessible only by Admin
import HomeUser from '../components/HomeUser.vue'; // Accessible only by regular User
import Main from '../components/Main.vue';         // Public route
import ProfilePage from '../components/ProfilePage.vue'; // Public route
import CurrencyTable from '../components/CurrencyTable.vue'; // Accessible only by authorized users
import VisitorTable from '../components/VisitorTable.vue'; // Public route



// Route definitions
const routes = [
  { path: '/login', component: Login },          // Login page
  { path: '/register', component: Register },    // Registration page
  { path: '/table', component: CurrencyTable },    // Registration page
  { path: '/visitor', component: VisitorTable },    // Registration page


  {
    path: '/home',
    component: Home,
    meta: { requiresAuth: true, requiredRole: 'Admin' }, // Meta info for route guard
    beforeEnter: (to, from, next) => {
      // Check authentication and role
      const isAuthenticated = !!localStorage.getItem('user');
      const userRole = isAuthenticated ? JSON.parse(localStorage.getItem('user')).role : null;

      // Block if not logged in or not an Admin
      if (!isAuthenticated || userRole !== 'Admin') {
        alert('You do not have permission to access this page.');
        next('/login');
      } else {
        next();
      }
    }
  },

  {
    path: '/homeuser',
    component: HomeUser,
    meta: { requiresAuth: true, requiredRole: 'User' }, // Meta info for route guard
    beforeEnter: (to, from, next) => {
      // Check authentication and role
      const isAuthenticated = !!localStorage.getItem('user');
      const userRole = isAuthenticated ? JSON.parse(localStorage.getItem('user')).role : null;

      // Block if not logged in or not a User
      if (!isAuthenticated || userRole !== 'User') {
        alert('You do not have permission to access this page.');
        next('/login');
      } else {
        next();
      }
    }
  },

  { path: '/main', component: Main },           // Public, unrestricted access

  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage                      // Public profile view/edit
  }
];

// Create Vue Router instance with HTML5 history mode
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user'); // Check if user is logged in

  // Apply guard if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      alert('You are not authenticated. Please log in.');
      next('/login'); // Redirect unauthenticated users
    } else {
      next(); // Allow access
    }
  } else {
    next(); // Allow access to public routes
  }
});

export default router;
