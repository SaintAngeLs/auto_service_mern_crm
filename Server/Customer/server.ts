/**
 * @file server.ts
 * @description Server setup and configuration.
 */

import http from 'http';
import app from './app';   // Assuming that app.js has been refactored to app.ts
import * as dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

// Define the port for our server. Default is 8080.
const port: number = Number(process.env.PORT) || 8080;

let server: http.Server;

/**
 * Function to start the server.
 */
const startServer = (): void => {
  // Create a server using the Express app.
  server = http.createServer(app);
  // Start listening to the defined port.
  server.listen(port, () => {
    console.log(`Server is Listening on Customer MS Port: ${port}`);
  });
};

/**
 * Handles user input from the command line.
 * If the user types 're', the server will restart.
 */
const handleUserInput = (input: string): void => {
  if (input === 're') {
    console.log('# Received re. Restarting server...');
    server.close(() => {
      console.log('# Server closed.');
      startServer();
    });
  }
};

// Set up a readline interface for command line interaction.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '# Enter command (type "re" to restart)>> '
});

// Event listeners for the readline interface.
rl.on('line', handleUserInput).on('close', () => {
  console.log('# Exiting CLI. Goodbye!');
  process.exit(0);
});

console.log('# Enter command (type "re" to restart)');

// Start the server.
startServer();
