<template>
  <footer class="footer">
    <p>&copy; 2025 Currency Converter. All Rights Reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection'
};
</script>

<style scoped>
.footer {
  position: relative;
  padding: 40px 20px;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); /* New background gradient */
  backdrop-filter: blur(12px); /* glass effect */
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -10px 40px rgba(0, 255, 255, 0.15);
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: #d1d1ff;
  z-index: 20;
  overflow: hidden;
}

/* Neon edge glow */
.footer::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #0ff, #3b82f6, #0ff);
  animation: move-glow 5s linear infinite;
  opacity: 0.8;
}

@keyframes move-glow {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

/* Text styling */
.footer p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: #c2e9ff;
  text-shadow: 0 0 3px rgba(0, 255, 255, 0.3);
  letter-spacing: 0.6px;
}

/* Links if present */
.footer a {
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
  margin-left: 8px;
  transition: 0.3s ease;
}

.footer a:hover {
  color: #fff;
  text-shadow: 0 0 6px #3b82f6, 0 0 12px #3b82f6;
}

</style>
