const http = require('http');
const { URL } = require('url');
const os = require('os');

const server = http.createServer((req, res) => {
  // URL parsing (safe even without host header)
  const fullUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  const requestDetails = {
    // ===== Core request line =====
    method: req.method,
    httpVersion: req.httpVersion,
    url: req.url,
    pathname: fullUrl.pathname,
    query: Object.fromEntries(fullUrl.searchParams),

    // ===== Headers =====
    headers: req.headers,
    rawHeaders: req.rawHeaders,
    trailers: req.trailers,
    rawTrailers: req.rawTrailers,
    // ===== Hostname =====
    hsotname: os.hostname(),
    // ===== Connection / socket info =====
    socket: {
      localAddress: req.socket.localAddress,
      localPort: req.socket.localPort,
      remoteAddress: req.socket.remoteAddress,
      remotePort: req.socket.remotePort,
      bytesRead: req.socket.bytesRead,
      bytesWritten: req.socket.bytesWritten
    },

    // ===== Request state =====
    complete: req.complete,
    aborted: req.aborted,

    // ===== HTTP flags =====
    upgrade: req.upgrade,     // WebSocket upgrade
    keepAlive: req.socket?.keepAlive,

    // ===== Internal metadata =====
    readable: req.readable,
    readableEnded: req.readableEnded,

    // ===== Node internals (useful for learning) =====
    requestId: req.socket?._handle?.fd ?? null
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  console.log(requestDetails);
  res.end(JSON.stringify(requestDetails, null, 2));
});

server.listen(8000, () => {
  console.log('Listening on http://localhost:8000');
});
