const express = require('express');
const WebSocket = require('ws');
const { spawn } = require('child_process');

const app = express();
const wss = new WebSocket.Server({ port: 3001 });

app.use(express.json()); // Ensure this line is before other routes
app.use(express.static('public'));

app.get('/start-game', (req, res) => {
    // Start the game logic here
    const pythonProcess = spawn('python3', ['python_game.py']);
    
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Received from Python: ${data}`);
    });
    
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python: ${data}`);
    });
    
    res.send('Game started!');
});

app.post('/send-click', (req, res) => {
    const { x, y } = req.body;
    // Handle click coordinates
    console.log(`Received click at (${x}, ${y})`);
    res.send('Click received!');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

wss.on('connection', (ws) => {
    console.log('Client connected');
    
    ws.on('message', (message) => {
        console.log(`Received from client: ${message}`);
        // Handle incoming data from the client
    });
    
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
