Nicee 🔥 — this is exactly how a DevOps engineer should document work. I’ll give you **clean, reusable notes** so next time you can follow without debugging again.

---

# 📝 Nginx Reverse Proxy + Node.js Deployment Notes

## 📌 Objective

To deploy a **Node.js backend (port 3000)** and a **static frontend (HTML)** on a private EC2 instance using **Nginx as a reverse proxy**, ensuring:

* `/` → Frontend (static files)
* `/backend` → Node.js API

---

# 🏗️ Architecture Overview

```
User (Browser)
     ↓
Nginx (Port 80)
     ↓
 ┌───────────────┬─────────────────┐
 │               │                 │
Frontend       Backend
(HTML)        (Node.js - 3000)
```

---

# ⚙️ Step 1: Install Dependencies 

```bash
sudo apt update && sudo apt upgrade -y

# Install Node.js & npm
sudo apt install nodejs npm -y

# Install Nginx
sudo apt install nginx -y

# Install PM2 (process manager)
sudo npm install -g pm2
```

---

# ⚙️ Step 2: Setup Node.js Application

```bash
cd /home/ubuntu/testing-purose/backend   # (your backend path)
npm install

# Start app using PM2
pm2 start app.js

# Save process
pm2 save

# Enable auto start
pm2 startup
```

---

# ⚙️ Step 3: Verify Backend

```bash
curl http://localhost:3000
```

✅ Expected:

```json
{"message":"Hello Backend!...","status":"running"}
```

---

# ⚙️ Step 4: Setup Frontend

Frontend path:

```bash
/home/ubuntu/testing-purose/frontend/index.html
```

Verify:

```bash
ls /home/ubuntu/testing-purose/frontend
```

---

# ⚙️ Step 5: Configure Nginx

Edit config:

```bash
sudo nano /etc/nginx/sites-available/default
```

---

## ✅ Final Working Nginx Config

```nginx
server {
    listen 80;
    server_name _;

    # Frontend
    root /home/ubuntu/testing-purose/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend
    location /backend/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';

        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

# ⚙️ Step 6: Fix Permissions (CRITICAL)

```bash
sudo chmod -R 755 /home/ubuntu
sudo chmod -R 755 /home/ubuntu/testing-purose
```

👉 Ensure Nginx (`www-data`) can:

* Enter folders
* Read files

---

# ⚙️ Step 7: Restart Nginx

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

# ✅ Final Testing

### 🔹 Frontend

```bash
curl http://localhost
```

✔ Shows HTML page

---

### 🔹 Backend

```bash
curl http://localhost/backend
```

✔ Shows:

```json
{"message":"Hello Backend!..."}
```

* Corrected path in Nginx config

---

## ❌ Issue 3: 404 Not Found (Nginx)

**Cause:**

* Nginx couldn’t access files (permission issue)

**Fix:**

```bash
sudo chmod -R 755 /home/ubuntu
```

---

# 🔥 Key Learnings

* `/` location should NOT proxy if serving frontend
* Always verify file paths carefully
* Permissions are critical for Nginx
* Use `try_files` for static content
* Separate frontend & backend routes clearly

---

# 🎯 Final Output

| URL        | Result               |
| ---------- | -------------------- |
| `/`        | Frontend (HTML page) |
| `/backend` | Node.js API          |

---

# 💡 Future Improvements

* Add domain + DNS
* Enable HTTPS (SSL using Let's Encrypt)
* Use React build instead of static HTML
* Add logging & monitoring
* Use Docker for deployment

---

If you want next level:
👉 I can convert this into **professional daily report format (for manager)**
👉 Or help you **dockerize + CI/CD pipeline setup** 🚀
