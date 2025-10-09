#!/bin/bash

# Render Build Script for BlogSite
# This script ensures we're in the correct directory and runs the build

echo "🔍 Debugging build environment..."
echo "Current working directory: $(pwd)"
echo "Contents of current directory:"
ls -la

echo "🔍 Looking for package.json..."
if [ -f "package.json" ]; then
    echo "✅ Found package.json in current directory"
    cat package.json | head -10
else
    echo "❌ package.json not found in current directory"
    echo "🔍 Searching for package.json..."
    find . -name "package.json" -type f 2>/dev/null | head -5
fi

echo "🔍 Environment variables:"
echo "NODE_VERSION: $NODE_VERSION"
echo "DATABASE_URL: ${DATABASE_URL:0:20}..." # Only show first 20 chars for security

echo "📦 Starting build process..."

# Ensure we're in the project root
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Trying to find project root..."
    if [ -f "../package.json" ]; then
        echo "📁 Found package.json in parent directory, changing to parent"
        cd ..
    else
        echo "🔍 Searching for package.json in the project..."
        PROJECT_ROOT=$(find /opt/render/project -name "package.json" -type f | head -1 | dirname)
        if [ -n "$PROJECT_ROOT" ]; then
            echo "📁 Found project root at: $PROJECT_ROOT"
            cd "$PROJECT_ROOT"
        else
            echo "❌ Could not find package.json anywhere!"
            exit 1
        fi
    fi
fi

echo "✅ Working from directory: $(pwd)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️ Building Next.js application..."
npm run build

echo "✅ Build completed successfully!"