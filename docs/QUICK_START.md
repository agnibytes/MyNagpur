# 🚀 Quick Start Guide - Majha Nagpur Portal

## Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start Methods](#quick-start-methods)
- [Environment Setup](#environment-setup)
- [API Documentation](#api-documentation)
- [Sharing via Public Link](#-sharing-via-public-link)
- [Troubleshooting](#-troubleshooting)
- [Production Deployment](#-production-deployment)

---

## Prerequisites

- **Node.js** v18 or higher
- **MongoDB** v6.0 or higher (running locally or remote)
- **npm** v9 or higher
- **Docker** (optional, for containerized deployment)

---

## Quick Start Methods

### Method 1: Using run.sh (Recommended)

```bash
# Clone and enter the project
cd Goverment_Project--Live_Civil_Report

# Make script executable (first time only)
chmod +x run.sh

# Start the application
./run.sh
```

This will:
1. ✅ Check MongoDB connection
2. ✅ Install dependencies if needed
3. ✅ Start backend (port 5000) and frontend (port 3000)

**Access locally:**
| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API Documentation | http://localhost:5000/api-docs |
| Health Check | http://localhost:5000/health |

### Method 2: Using Docker (Recommended for Production)

```bash
# Start all services (MongoDB, Redis, App)
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

**Docker Profiles:**
```bash
# Development mode with hot reload
docker-compose --profile dev up

# With MongoDB admin UI
docker-compose --profile tools up
```

### Method 3: Manual Start

```bash
# Install dependencies
npm install

# Start development servers
npm run dev
```

---

## Environment Setup

### Create Environment File

Copy the example environment file:
```bash
cp .env.example .env
```

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT tokens (min 32 chars) | `your_secure_random_string_here` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/maja_nagpur_db` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `REDIS_URL` | Redis connection string | - |

### Generate Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## API Documentation

### Interactive API Docs (Swagger UI)

Access the full API documentation at:
```
http://localhost:5000/api-docs
```

### API Endpoints Overview

| Endpoint | Description |
|----------|-------------|
| `POST /api/auth/register` | Register new user |
| `POST /api/auth/login` | User login |
| `GET /api/auth/me` | Get current user |
| `GET /api/complaints` | List complaints |
| `POST /api/complaints` | File new complaint |
| `GET /api/applications` | List applications |
| `POST /api/payments/initiate` | Initiate payment |
| `POST /api/ai/chat` | AI chatbot |

### API Health Checks

```bash
# Basic health
curl http://localhost:5000/health

# Ready check (includes DB status)
curl http://localhost:5000/health/ready
```

---

## Database Setup

### Start MongoDB

```bash
# Ubuntu/Debian
sudo systemctl start mongod
sudo systemctl enable mongod  # Auto-start

# macOS
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

### Seed Database (Optional)

```bash
npm run db:seed
```

---

## 🌐 Sharing via Public Link

### Using ngrok

1. **Install ngrok:**
   ```bash
   sudo snap install ngrok
   # OR
   npm install -g ngrok
   ```

2. **Configure (one-time):**
   ```bash
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   ```

3. **Create public link:**
   ```bash
   ./share-public.sh
   # OR
   ngrok http 3000
   ```

### Alternative: Cloudflare Tunnel (Free, no limits)

```bash
cloudflared tunnel --url http://localhost:3000
```

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- auth.test.js
```

---

## 🔧 Troubleshooting

### MongoDB not running
```bash
sudo systemctl start mongod
```

### Port already in use
```bash
lsof -i :3000
kill -9 <PID>
```

### Environment validation error
```bash
# Ensure .env file exists with required variables
cat .env
# Check if JWT_SECRET and MONGODB_URI are set
```

### Docker container issues
```bash
# Reset containers
docker-compose down -v
docker-compose up --build
```

---

## 🎯 Production Deployment

### Recommended Platforms

| Platform | Best For |
|----------|----------|
| **Vercel** | Frontend (Next.js) |
| **Railway** | Full-stack with database |
| **DigitalOcean** | Docker containers |
| **AWS/Azure** | Enterprise scale |

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET` (64+ chars)
- [ ] Configure MongoDB Atlas or secure DB
- [ ] Enable HTTPS
- [ ] Set up monitoring (Sentry, etc.)
- [ ] Configure rate limiting
- [ ] Set up logging and alerts

See `/docs` folder for detailed deployment guides.

