#!/bin/bash

echo "🚀 Starting Majha Nagpur Government Portal..."
echo "================================================"

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  Warning: MongoDB doesn't appear to be running"
    echo "   Please start MongoDB first with: sudo systemctl start mongod"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the application (both backend and frontend)
echo "✅ Starting application..."
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================================"
echo ""

npm run dev
