const http = require('http');

const server = http.createServer((req, res) => {

    // CORS HEADERS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // HANDLE PREFLIGHT REQUEST
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // NORMAL RESPONSE
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
        message: "✅ Backend Connected Successfully",
        status: "Running"
    }));

});

server.listen(3000, () => {
    console.log('🚀 Backend running on port 3000');
});
