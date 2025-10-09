// MongoDB Atlas Configuration for BlogSite
// This file contains Atlas-specific settings and optimizations

const atlasConfig = {
  // Connection pool settings for Atlas
  connectionPool: {
    maxPoolSize: 10, // Maximum number of connections in the pool
    minPoolSize: 5,  // Minimum number of connections in the pool
    maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
    serverSelectionTimeoutMS: 5000, // How long to try selecting a server
  },
  
  // Atlas connection options
  options: {
    retryWrites: true,
    w: 'majority',
    readPreference: 'primary',
    ssl: true,
    authSource: 'admin',
  },
  
  // Database indexes for better performance
  indexes: [
    // Post indexes
    { collection: 'Post', index: { published: 1, createdAt: -1 } },
    { collection: 'Post', index: { slug: 1 }, unique: true },
    { collection: 'Post', index: { featured: 1 } },
    { collection: 'Post', index: { authorId: 1 } },
    { collection: 'Post', index: { categoryIds: 1 } },
    { collection: 'Post', index: { tagIds: 1 } },
    
    // User indexes
    { collection: 'User', index: { email: 1 }, unique: true },
    { collection: 'User', index: { role: 1 } },
    
    // Comment indexes
    { collection: 'Comment', index: { postId: 1, approved: 1 } },
    { collection: 'Comment', index: { authorId: 1 } },
    
    // Category and Tag indexes
    { collection: 'Category', index: { slug: 1 }, unique: true },
    { collection: 'Tag', index: { slug: 1 }, unique: true },
    
    // Session indexes
    { collection: 'Session', index: { sessionToken: 1 }, unique: true },
    { collection: 'Session', index: { userId: 1 } },
    
    // Newsletter index
    { collection: 'Newsletter', index: { email: 1 }, unique: true },
  ],
  
  // Atlas monitoring and alerts
  monitoring: {
    slowQueryThreshold: 1000, // Log queries slower than 1 second
    enableProfiling: process.env.NODE_ENV === 'development',
  }
}

module.exports = atlasConfig