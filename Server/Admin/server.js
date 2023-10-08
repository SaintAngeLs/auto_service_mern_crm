const http = require("http");
const app = require("./app");

require("dotenv").config();
const readline = require("readline"); 

const port = process.env.PORT || 8088;

let server;

function startServer() {
  server = http.createServer(app);
  server.listen(port, () => {
    console.log("Server is Listening on Admin MS Port: " + port);
  });
}

function handleUserInput(input) {
  if (input === 're') {
    console.log('# Received re. Restarting server...');
    server.close(() => {
      console.log('# Server closed.');
      startServer();
    });
  }
}

// Set up readline interface
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