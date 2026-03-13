#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")"

echo "🚀 Starting MajhaNagpur Urban Intelligence Platform..."
echo "======================================================"

# Start the AI Backend (FastAPI, PostgreSQL, Redis) via Docker Compose
echo ""
echo "🐳 1/2: Starting AI Backend Services..."
cd majha-nagpur-backend
docker compose up -d
cd ..

echo ""
echo "🌐 2/2: Starting Frontend (Next.js) & Legacy Node Server..."
echo "Running 'npm run dev' from package.json..."
# Run the development server
npm run dev
