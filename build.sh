#!/bin/bash

# Render Build Script for BlogSite
# This script handles the build process for Render deployment

echo "🚀 Starting BlogSite build process..."

# Set Node.js version
echo "📦 Setting up Node.js environment..."
export NODE_VERSION=18.17.0

# Install dependencies
echo "📦 Installing dependencies..."
if [ -f "package-lock.json" ]; then
    echo "Found package-lock.json, using npm ci..."
    npm ci
else
    echo "No package-lock.json found, using npm install..."
    npm install
fi

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️ Building Next.js application..."
npm run build

echo "✅ Build completed successfully!"