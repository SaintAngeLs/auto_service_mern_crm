/**
 * @file server.ts
 * 
 * @description Server setup and configuration for the Order Microservice.
 * 
 */

import http from 'http';
import app from './app';
import * as dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const port: number = Number(process.env.PORT) || 8030; // Adjusted the port to match your original file
let server: http.Server;

const startServer = (): void => {
  server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server is Listening on Order MS Port: ${port}`);
  });
};

const handleUserInput = (input: string): void => {
  if (input === 're') {
    console.log('# Received re. Restarting server...');
    server.close(() => {
      console.log('# Server closed.');
      startServer();
    });
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '# Enter command (type "re" to restart)>> '
});

rl.on('line', handleUserInput).on('close', () => {
  console.log('# Exiting CLI. Goodbye!');
  process.exit(0);
});

console.log('# Enter command (type "re" to restart)');

startServer();
