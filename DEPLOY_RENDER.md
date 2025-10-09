# Deploying BlogSite to Render

This guide will help you deploy your BlogSite application to Render, a modern cloud platform that makes it easy to deploy web applications.

## 🚀 Quick Deploy to Render

### Prerequisites
- A [Render](https://render.com) account (free tier available)
- Your code pushed to a GitHub repository
- Basic understanding of environment variables

## 📋 Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - BlogSite ready for deployment"

# Add your GitHub repository as origin
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### 2. Create MongoDB Database on Render

**Note**: Render doesn't provide managed MongoDB. You'll need to use MongoDB Atlas (recommended) or another MongoDB provider.

1. **Set up MongoDB Atlas** (Recommended)
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free account and cluster
   - Get connection string
   - See `MONGODB_SETUP.md` for detailed instructions

2. **Alternative MongoDB Providers**
   - MongoDB Atlas (Free tier: 512MB)
   - Railway MongoDB
   - DigitalOcean Managed MongoDB

### 3. Create Web Service on Render

1. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository

2. **Configure Web Service**
   ```
   Name: blogsite-web
   Region: Same as your database
   Branch: main
   Runtime: Node
   Build Command: npm ci && npx prisma generate && npm run build
   Start Command: npm start
   ```

3. **Set Environment Variables**
   Add these environment variables in the Render dashboard:

   ```bash
   # Required Environment Variables
   NODE_VERSION=18.17.0
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/blogsite?retryWrites=true&w=majority
   NEXTAUTH_URL=https://your-app-name.onrender.com
   NEXTAUTH_SECRET=your_secure_random_string_here
   ADMIN_EMAIL=admin@yourblogsite.com
   
   # Optional OAuth Providers (if you want social login)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_ID=your_github_id
   GITHUB_SECRET=your_github_secret
   ```

   **To generate NEXTAUTH_SECRET:**
   ```bash
   # Run this in your terminal to generate a secure secret
   openssl rand -base64 32
   ```

### 4. Deploy the Application

1. **Start Deployment**
   - Click "Create Web Service"
   - Render will automatically start building your application
   - This process takes 5-10 minutes

2. **Monitor Build Process**
   - You can watch the build logs in real-time
   - The build includes: installing dependencies, generating Prisma client, and building Next.js

3. **Initialize Database**
   After successful deployment, you need to set up your MongoDB database:
   
   ```bash
   # Connect to your Render service shell (in Render dashboard)
   # Or use the Render CLI if you have it installed
   
   # Push database schema to MongoDB
   npx prisma db push
   
   # Seed the database with sample data
   npm run db:seed
   ```

### 5. Access Your Deployed Application

Your BlogSite will be available at: `https://your-app-name.onrender.com`

**Default Admin Credentials (from seed data):**
- Email: `admin@blogsite.com`
- Password: `admin123`
- **⚠️ Important**: Change these credentials immediately after first login!

## 🔧 Configuration Options

### Custom Domain (Optional)
1. In your Render service settings, go to "Custom Domains"
2. Add your domain name
3. Update DNS records as instructed by Render
4. Update `NEXTAUTH_URL` environment variable to your custom domain

### Auto-Deploy Setup
Render automatically deploys when you push to your main branch. To disable:
1. Go to service settings
2. Turn off "Auto-Deploy"

### Scaling Options
- **Free Tier**: 750 hours/month, sleeps after inactivity
- **Starter Plan**: $7/month, always on, faster builds
- **Pro Plan**: $25/month, more resources, faster performance

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails with Prisma Error**
   ```bash
   # Solution: Make sure DATABASE_URL is set correctly for MongoDB
   # Check that your MongoDB Atlas cluster is running and accessible
   ```

2. **Environment Variables Not Working**
   ```bash
   # Solution: Restart your service after adding/changing env vars
   # Go to service settings → "Manual Deploy" → "Deploy latest commit"
   ```

3. **Database Connection Issues**
   ```bash
   # Solution: Verify DATABASE_URL format for MongoDB
   # Should look like: mongodb+srv://user:password@cluster.mongodb.net/database
   # Check MongoDB Atlas network access settings
   ```

4. **Authentication Not Working**
   ```bash
   # Solution: Check NEXTAUTH_URL matches your deployment URL
   # Ensure NEXTAUTH_SECRET is set and secure
   ```

### Debugging Steps

1. **Check Service Logs**
   - Go to your service in Render dashboard
   - Click on "Logs" tab to see runtime errors

2. **Verify Environment Variables**
   - In service settings, check all required env vars are set
   - No trailing spaces or quotes around values

3. **Database Connection Test**
   ```bash
   # In Render shell, test MongoDB connection
   npx prisma db push
   ```

## 🚀 Post-Deployment Steps

### 1. Security Setup
- Change default admin password
- Review and update OAuth callback URLs
- Set up proper CORS if needed

### 2. Content Setup
- Create your first blog post
- Set up categories and tags
- Customize site branding and colors

### 3. Performance Optimization
- Set up CDN for images (Cloudinary recommended)
- Configure caching headers
- Monitor performance with Render metrics

### 4. Backup Strategy
- MongoDB Atlas provides automatic backups on paid plans
- Consider additional backup solutions for critical data
- Export collections regularly using mongodump

## 📊 Monitoring Your Application

### Render Dashboard
- Monitor service health and uptime
- View application logs and metrics
- Set up alert notifications

### Health Check Endpoint
Your app includes a health check at: `/api/health`
- Used by Render for service monitoring
- Returns service status and timestamp

## 🔄 Updates and Maintenance

### Deploying Updates
```bash
# Make your changes locally
git add .
git commit -m "Your update message"
git push origin main

# Render automatically deploys the changes
```

### Database Migrations
```bash
# For schema changes with MongoDB, push the new schema
npx prisma db push
```

### Monitoring
- Check logs regularly for errors
- Monitor MongoDB Atlas metrics and usage
- Review performance metrics
- Set up MongoDB Atlas alerts

## 💡 Tips for Success

1. **Start with Free Tier**: Test everything before upgrading
2. **Use Environment Variables**: Never commit secrets to your repository
3. **Monitor Logs**: Set up log monitoring for production issues
4. **Regular Backups**: Export your MongoDB data regularly using Atlas tools
5. **Performance Testing**: Test your site under load before launch
6. **Monitor Atlas**: Keep an eye on MongoDB Atlas metrics and connection limits

## 🆘 Getting Help

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **Render Community**: [community.render.com](https://community.render.com)
- **Render Support**: Available through dashboard

Your BlogSite is now ready for the world! 🎉