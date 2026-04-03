const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Hello Backend! . and i sucessfuly finishes my task", status: "running" }));
});

server.listen(3000, () => {
    console.log('Backend running on port 3000');
});
