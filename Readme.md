# Request Inspector HTTP Server

A lightweight Node.js HTTP server that **captures, logs, and returns detailed client request information** in JSON format.

This tool is especially useful in **DevOps, networking, reverse-proxy, load balancer, and backend debugging** scenarios where you want to clearly understand *what exactly the client sent to your server*.

---

## 🚀 Purpose

This server helps you:

* Inspect incoming HTTP requests end-to-end
* Debug headers sent by browsers, proxies, load balancers, or CI/CD tools
* Understand socket-level details like client IP, ports, and bytes transferred
* Learn Node.js HTTP internals
* Validate reverse proxy / NAT / ingress behavior in DevOps setups

---

## 🧱 What It Captures

For **every request**, the server extracts and returns:

### 1️⃣ Core Request Line

* HTTP method (`GET`, `POST`, etc.)
* HTTP version (`1.1`, `2.0`)
* Raw URL
* Parsed pathname
* Query parameters

### 2️⃣ Headers

* Parsed headers (`req.headers`)
* Raw headers (exact wire format)
* Trailers (if any)

### 3️⃣ Host & System Info

* Server hostname (useful in multi-node or container environments)

### 4️⃣ Socket / Network Details

* Client IP and port
* Server IP and port
* Bytes read and written

### 5️⃣ Request State

* Whether the request completed normally
* Whether it was aborted by the client

### 6️⃣ HTTP Flags

* Upgrade requests (e.g. WebSocket)
* Keep-alive detection

### 7️⃣ Node.js Internals (Learning-focused)

* Internal socket file descriptor (when available)

---

## 🛠️ Use Cases in DevOps

This tool is extremely useful for:

* 🔍 Debugging **Nginx / HAProxy / ALB / ELB** forwarding headers
* 🌐 Verifying **X-Forwarded-For**, **Host**, and **Proto** headers
* 🧪 Testing **CI/CD webhooks** (GitHub, GitLab, Jenkins)
* 🐳 Inspecting requests inside **Docker / Kubernetes pods**
* 🔄 Understanding **NAT Gateway vs Proxy** behavior
* 📡 Learning how **clients, proxies, and servers interact**

---

## 📦 Prerequisites

* Node.js **v14+** (recommended v16+)

---

## ▶️ How to Run

```bash
node server.js
```

You should see:

```text
Listening on http://localhost:8000
```

---

## 🧪 Example Request

```bash
curl -v "http://localhost:8000/test?env=dev&version=1"
```

### Example Response (truncated)

```json
{
  "method": "GET",
  "httpVersion": "1.1",
  "url": "/test?env=dev&version=1",
  "pathname": "/test",
  "query": {
    "env": "dev",
    "version": "1"
  },
  "headers": {
    "host": "localhost:8000",
    "user-agent": "curl/8.5.0"
  },
  "socket": {
    "localAddress": "127.0.0.1",
    "localPort": 8000,
    "remoteAddress": "127.0.0.1",
    "remotePort": 52144
  }
}
```

---

## ⚠️ Important Notes

* ❌ **Do NOT expose this server publicly** without authentication
* 🔐 It logs and returns **all headers**, including cookies or tokens
* 📚 Designed for **learning, debugging, and internal use only**

---

## 🧠 Learning Takeaways

By using this project, you gain hands-on understanding of:

* HTTP request anatomy
* Difference between headers vs raw headers
* Client IP visibility through proxies
* TCP socket behavior in Node.js
* How DevOps tools forward requests

---

## 📁 Project Structure

```text
.
├── server.js      # HTTP request inspector server
└── README.md      # Documentation
```

---

## ✅ Next Enhancements (Optional)

* Add request body parsing (JSON / form-data)
* Add HTTPS support
* Add request timing & latency metrics
* Add header filtering / masking

---

## 📌 Summary

This project acts as a **transparent mirror** for incoming HTTP requests.

If you're working in **DevOps, backend engineering, networking, or learning Node.js internals**, this tool gives you **clear visibility into what the server actually receives** — no assumptions, just raw facts.

---

Happy debugging 🚀
