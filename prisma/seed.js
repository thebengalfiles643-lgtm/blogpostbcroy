const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@blogsite.com' },
    update: {},
    create: {
      email: 'admin@blogsite.com',
      name: 'Admin User',
      role: 'ADMIN',
      bio: 'Site administrator and content manager.',
    },
  })

  console.log('👤 Created admin user:', adminUser.email)

  // Create categories
  const categories = [
    { name: 'Technology', slug: 'technology', description: 'Latest tech trends and innovations', color: '#3B82F6' },
    { name: 'Web Development', slug: 'web-development', description: 'Frontend and backend development', color: '#10B981' },
    { name: 'Design', slug: 'design', description: 'UI/UX design and creative content', color: '#EC4899' },
    { name: 'Tutorials', slug: 'tutorials', description: 'Step-by-step guides and how-tos', color: '#F59E0B' },
    { name: 'News', slug: 'news', description: 'Industry news and updates', color: '#EF4444' },
  ]

  const createdCategories = []
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
    createdCategories.push(created)
    console.log('📂 Created category:', created.name)
  }

  // Create tags
  const tags = [
    { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
    { name: 'React', slug: 'react', color: '#61DAFB' },
    { name: 'Next.js', slug: 'nextjs', color: '#000000' },
    { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
    { name: 'CSS', slug: 'css', color: '#1572B6' },
    { name: 'Node.js', slug: 'nodejs', color: '#339933' },
    { name: 'Database', slug: 'database', color: '#336791' },
    { name: 'API', slug: 'api', color: '#FF6B6B' },
  ]

  const createdTags = []
  for (const tag of tags) {
    const created = await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    })
    createdTags.push(created)
    console.log('🏷️ Created tag:', created.name)
  }

  // Create sample posts
  const posts = [
    {
      title: 'Getting Started with Next.js 14',
      slug: 'getting-started-nextjs-14',
      content: `
        <h2>Introduction to Next.js 14</h2>
        <p>Next.js 14 brings exciting new features and improvements to the React framework. In this comprehensive guide, we'll explore everything you need to know to get started.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>Improved App Router with better performance</li>
          <li>Enhanced Server Components</li>
          <li>Better TypeScript support</li>
          <li>Optimized bundle sizes</li>
        </ul>
        
        <h3>Installation</h3>
        <pre><code>npx create-next-app@latest my-app --typescript --tailwind --eslint --app</code></pre>
        
        <p>This command creates a new Next.js project with TypeScript, Tailwind CSS, and ESLint configured.</p>
        
        <h3>Project Structure</h3>
        <p>The new App Router introduces a file-based routing system that's more intuitive and powerful than before.</p>
      `,
      excerpt: 'Learn how to build modern web applications with Next.js 14 and explore its powerful new features.',
      published: true,
      featured: true,
      readingTime: 8,
      categoryIds: [createdCategories[1].id, createdCategories[0].id], // Web Development, Technology
      tagIds: [createdTags[2].id, createdTags[1].id, createdTags[3].id], // Next.js, React, TypeScript
    },
    {
      title: 'Modern CSS Techniques for Better Web Design',
      slug: 'modern-css-techniques',
      content: `
        <h2>Elevating Your Web Design with Modern CSS</h2>
        <p>CSS has evolved significantly over the years. Today's CSS offers powerful features that can transform your web designs.</p>
        
        <h3>CSS Grid and Flexbox</h3>
        <p>These layout systems provide incredible flexibility for creating responsive designs.</p>
        
        <h3>Custom Properties (CSS Variables)</h3>
        <p>CSS variables make it easier to maintain consistent theming across your application.</p>
        
        <h3>Advanced Selectors</h3>
        <p>Modern CSS selectors give you precise control over element styling.</p>
      `,
      excerpt: 'Discover the latest CSS techniques and best practices for creating beautiful, responsive web designs.',
      published: true,
      featured: false,
      readingTime: 6,
      categoryIds: [createdCategories[2].id], // Design
      tagIds: [createdTags[4].id], // CSS
    },
    {
      title: 'Building REST APIs with Node.js and Express',
      slug: 'building-rest-apis-nodejs',
      content: `
        <h2>Creating Robust REST APIs</h2>
        <p>Learn how to build scalable and maintainable REST APIs using Node.js and Express.</p>
        
        <h3>Setting Up Your Environment</h3>
        <p>First, let's set up a new Node.js project with Express.</p>
        
        <h3>Defining Routes</h3>
        <p>We'll create CRUD operations for our API endpoints.</p>
        
        <h3>Database Integration</h3>
        <p>Connect your API to a database for persistent data storage.</p>
        
        <h3>Authentication and Security</h3>
        <p>Implement proper authentication and security measures.</p>
      `,
      excerpt: 'A complete guide to building professional REST APIs with Node.js, Express, and best practices.',
      published: true,
      featured: false,
      readingTime: 12,
      categoryIds: [createdCategories[1].id, createdCategories[3].id], // Web Development, Tutorials
      tagIds: [createdTags[5].id, createdTags[7].id], // Node.js, API
    },
  ]

  for (const postData of posts) {
    const { categoryIds, tagIds, ...post } = postData
    
    const created = await prisma.post.create({
      data: {
        ...post,
        publishedAt: new Date(),
        authorId: adminUser.id,
        categoryIds: categoryIds,
        tagIds: tagIds
      },
    })
    
    console.log('📝 Created post:', created.title)
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })