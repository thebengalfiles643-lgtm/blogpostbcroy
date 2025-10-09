# MongoDB Setup for BlogSite

This guide will help you set up MongoDB for your BlogSite application instead of PostgreSQL.

## 🍃 MongoDB Configuration

Your BlogSite has been configured to work with MongoDB. Here are the key changes made:

### 📝 Schema Changes
- Updated Prisma schema to use MongoDB provider
- Changed all `@id @default(cuid())` to `@id @default(auto()) @map("_id") @db.ObjectId`
- Updated foreign key relationships to use ObjectId
- Modified many-to-many relationships for MongoDB compatibility

### 🔗 Database URL Format
```
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/blogsite?retryWrites=true&w=majority"
```

## 🚀 Setup Options

### Option 1: MongoDB Atlas (Recommended for Production)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Choose "Build a Database"
   - Select "FREE" tier (M0 Sandbox)
   - Choose your preferred cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password
   - Set database user privileges to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Choose "Allow access from anywhere" (0.0.0.0/0)
   - For production: Add your specific IP addresses

5. **Get Connection String**
   - Go to "Databases" and click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `blogsite`

### Option 2: Local MongoDB (Development)

1. **Install MongoDB Community Edition**
   - Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB Service**
   ```bash
   # Windows (as Administrator)
   net start MongoDB
   
   # macOS
   brew services start mongodb/brew/mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. **Set Database URL**
   ```
   DATABASE_URL="mongodb://localhost:27017/blogsite"
   ```

### Option 3: Docker MongoDB

1. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   services:
     mongodb:
       image: mongo:7
       container_name: blogsite-mongo
       restart: always
       ports:
         - "27017:27017"
       environment:
         MONGO_INITDB_ROOT_USERNAME: admin
         MONGO_INITDB_ROOT_PASSWORD: password123
         MONGO_INITDB_DATABASE: blogsite
       volumes:
         - mongodb_data:/data/db

   volumes:
     mongodb_data:
   ```

2. **Start MongoDB Container**
   ```bash
   docker-compose up -d
   ```

3. **Set Database URL**
   ```
   DATABASE_URL="mongodb://admin:password123@localhost:27017/blogsite?authSource=admin"
   ```

## 🔧 Configuration Steps

### 1. Update Environment Variables

Create/update your `.env` file:

```bash
# MongoDB Database URL
DATABASE_URL="your_mongodb_connection_string_here"

# NextAuth.js configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Admin configuration
ADMIN_EMAIL="admin@yourblogsite.com"

# Optional OAuth providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
```

### 2. Install Dependencies and Setup Database

```bash
# Install dependencies
npm install

# Generate Prisma client for MongoDB
npx prisma generate

# Push schema to MongoDB (creates collections)
npx prisma db push

# Seed database with sample data
npm run db:seed
```

### 3. Start Development Server

```bash
npm run dev
```

Your BlogSite should now be running with MongoDB at `http://localhost:3000`

## 📊 MongoDB-Specific Features

### Advantages of MongoDB for BlogSite:
- **Flexible Schema**: Easy to add new fields without migrations
- **Rich Queries**: Powerful aggregation pipeline for analytics
- **Horizontal Scaling**: Built-in sharding support
- **JSON Storage**: Natural fit for web applications
- **Atlas Free Tier**: 512MB storage, perfect for small blogs

### MongoDB Collections Created:
- `User` - User accounts and profiles
- `Post` - Blog posts with rich content
- `Category` - Post categories
- `Tag` - Post tags
- `Comment` - Comments and replies
- `Account` - OAuth account linking
- `Session` - User sessions
- `Newsletter` - Email subscriptions
- `ContactMessage` - Contact form submissions

## 🛠 Database Management

### Prisma Studio
```bash
npx prisma studio
```
This opens a web interface to browse and edit your MongoDB data.

### MongoDB Compass (GUI Tool)
- Download [MongoDB Compass](https://www.mongodb.com/products/compass)
- Connect using your connection string
- Visual interface for querying and managing data

### Command Line Tools
```bash
# Connect to MongoDB shell
mongosh "your_connection_string"

# List databases
show dbs

# Use your database
use blogsite

# List collections
show collections

# Query posts
db.Post.find().pretty()
```

## 🚀 Deployment with MongoDB

### Render Deployment
Update your `render.yaml`:

```yaml
services:
  - type: web
    name: blogsite-web
    env: node
    buildCommand: npm ci && npx prisma generate && npm run build
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        value: your_mongodb_atlas_connection_string
      # ... other environment variables
```

### Vercel Deployment
Update your environment variables in Vercel dashboard:
- `DATABASE_URL`: Your MongoDB Atlas connection string
- Other environment variables as needed

## 🔍 Troubleshooting

### Common Issues:

1. **Connection Timeout**
   ```
   Error: Could not connect to MongoDB
   ```
   - Check if MongoDB service is running
   - Verify connection string format
   - Check network access settings in Atlas

2. **Authentication Failed**
   ```
   Error: Authentication failed
   ```
   - Verify username/password in connection string
   - Check database user permissions in Atlas

3. **Database Not Found**
   ```
   Error: Database does not exist
   ```
   - MongoDB creates databases automatically on first write
   - Run `npx prisma db push` to create collections

4. **Prisma Schema Errors**
   ```
   Error: Field not found
   ```
   - Run `npx prisma generate` after schema changes
   - Clear `node_modules/.prisma` and regenerate

### Performance Tips:
- Create indexes on frequently queried fields
- Use MongoDB aggregation pipeline for complex queries
- Consider connection pooling for high-traffic sites
- Monitor Atlas metrics for performance insights

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Prisma MongoDB Guide](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [MongoDB Atlas Tutorial](https://docs.atlas.mongodb.com/getting-started/)
- [MongoDB University](https://university.mongodb.com/) - Free courses

Your BlogSite is now configured for MongoDB! 🎉