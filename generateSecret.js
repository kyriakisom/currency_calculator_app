const crypto = require('crypto'); // Built-in module for secure random values
const fs = require('fs');         // File system module to write to .env file
const path = require('path');     // Helps handle file paths in a cross-platform way

// Generate a secure random 64-byte hex string to use as a session secret
const secret = crypto.randomBytes(64).toString('hex');
console.log(`Generated secret: ${secret}`);

// Define the path to the .env file (in the same directory as this script)
const envPath = path.resolve(__dirname, '.env');

// Append the generated secret to the .env file as SESSION_SECRET
fs.appendFileSync(envPath, `SESSION_SECRET=${secret}\n`);

console.log(`Secret saved to ${envPath}`);
