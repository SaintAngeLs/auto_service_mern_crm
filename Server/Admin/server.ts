/**
 * server.ts 
 */

import http from 'http';
import app from './app';
import * as dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

// Define the port for our server, default is 8088
const port: number = Number(process.env.PORT) || 8088;

let server: http.Server;

/**
 * Function to start the server.
 */
const startServer = (): void => {
  // Create server using the Express app
  server = http.createServer(app);
  // Listen to the port the server is created on
  server.listen(port, () => {
    console.log(`Server is Listening on Admin MS Port: ${port}`);
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

// Set up a readline interface for command line interaction
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '# Enter command (type "re" to restart)>> '
});

// Event listeners for readline interface
rl.on('line', handleUserInput).on('close', () => {
  console.log('# Exiting CLI. Goodbye!');
  process.exit(0);
});

console.log('# Enter command (type "re" to restart)');

// Starting the server
startServer();