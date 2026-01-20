#!/bin/bash

echo "🌐 Creating Public Link for Majha Umred Portal"
echo "=============================================="
echo ""

# Check if ssh is installed
if ! command -v ssh &> /dev/null; then
    echo "❌ ssh is not installed!"
    echo "Please install ssh (openssh-client) to use Pinggy."
    exit 1
fi

# Check which port to expose
PORT=${1:-3001}

echo "📡 Starting Pinggy tunnel on port $PORT..."
echo ""
echo "ℹ️  Your application should be running on http://localhost:$PORT"
echo "ℹ️  If not, start it first with: ./run.sh"
echo ""
echo "🔗 Public URL will be displayed below:"
echo "=============================================="
echo ""

# Start Pinggy
ssh -p 443 -R0:localhost:$PORT a.pinggy.io

