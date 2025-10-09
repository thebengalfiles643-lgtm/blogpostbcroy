# BlogSite - Modern Full-Featured Blogging Platform

A comprehensive blogging platform built with Next.js 14, TypeScript, Tailwind CSS, and Prisma. Features include user authentication, rich text editing, search functionality, responsive design, and admin capabilities.

## 🚀 Features

### Core Features
- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with multiple providers (Google, GitHub, Email)
- **Rich Content Editor**: TipTap editor with markdown support, images, and formatting
- **Responsive Design**: Mobile-first design that works on all devices
- **Search & Filtering**: Full-text search with category and tag filtering
- **SEO Optimized**: Meta tags, OpenGraph, and structured data
- **Performance**: Optimized images, lazy loading, and caching

### Content Management
- **Post Creation**: Rich text editor with image uploads and formatting
- **Categories & Tags**: Organize content with colorful categories and tags
- **Featured Posts**: Highlight important content on the homepage
- **Draft System**: Save and edit drafts before publishing
- **Reading Time**: Automatic calculation of estimated reading time
- **View Counter**: Track post popularity

### User Experience
- **Dark/Light Mode**: Toggle between themes
- **Newsletter Signup**: Email subscription system
- **Social Sharing**: Share posts on social media
- **Comments System**: Threaded comments with moderation
- **Related Posts**: Discover similar content
- **Reading Progress**: Track reading progress on long posts

### Admin Features
- **User Management**: Role-based access control (Admin, Editor, User)
- **Content Moderation**: Approve/reject comments and posts
- **Analytics Dashboard**: View site statistics and popular content
- **Bulk Operations**: Manage multiple posts at once

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Headless UI
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Rich Text Editor**: TipTap
- **File Upload**: Cloudinary (optional)
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18 or later
- PostgreSQL database
- npm or yarn package manager

## 🚀 Getting Started

### 1. Install Node.js

Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)

### 2. Clone and Install Dependencies

```bash
# Navigate to the project directory
cd newwesbite

# Install dependencies
npm install

# Or use yarn
yarn install
```

### 3. Environment Setup

Copy the environment example file:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database URL for PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/blog_db?schema=public"

# NextAuth.js configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"

# OAuth providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"

# Admin configuration
ADMIN_EMAIL="admin@yourblog.com"
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
newwesbite/
├── src/
│   ├── app/                  # App Router pages
│   │   ├── api/             # API routes
│   │   ├── blog/            # Blog pages
│   │   ├── auth/            # Authentication pages
│   │   └── admin/           # Admin dashboard
│   ├── components/          # Reusable components
│   ├── lib/                 # Utility functions
│   ├── types/               # TypeScript types
│   └── styles/              # Global styles
├── prisma/                  # Database schema
├── public/                  # Static assets
└── docs/                    # Documentation
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` to customize colors and themes
- Update `src/app/globals.css` for global styles
- Components use Tailwind utility classes

### Content
- Update site metadata in `src/app/layout.tsx`
- Customize the homepage hero section in `src/app/page.tsx`
- Modify navigation links in `src/components/Header.tsx`

### Features
- Add new post types by extending the Prisma schema
- Integrate additional OAuth providers in `src/lib/auth.ts`
- Customize the rich text editor in `src/components/RichTextEditor.tsx`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed on any platform that supports Node.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 🧪 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
```

## 🔧 Configuration

### Database
- PostgreSQL is recommended for production
- SQLite can be used for development
- Update `DATABASE_URL` in your `.env` file

### Authentication
- Configure OAuth providers in the Vercel/deployment dashboard
- Set up callback URLs for each provider
- Update `NEXTAUTH_SECRET` for production

### File Uploads
- Integrate Cloudinary for image uploads
- Add API keys to environment variables
- Customize upload settings in the admin panel

## 📚 API Documentation

### Posts API
- `GET /api/posts` - Get all posts with filtering
- `POST /api/posts` - Create a new post (auth required)
- `GET /api/posts/[id]` - Get single post
- `PUT /api/posts/[id]` - Update post (auth required)
- `DELETE /api/posts/[id]` - Delete post (auth required)

### Categories API
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)

### Comments API
- `GET /api/posts/[id]/comments` - Get post comments
- `POST /api/posts/[id]/comments` - Add comment (auth required)

## 🔒 Security Features

- Input validation and sanitization
- SQL injection prevention with Prisma
- XSS protection with Content Security Policy
- Authentication with secure sessions
- Rate limiting on API endpoints
- CSRF protection

## 🎯 SEO Features

- Automatic sitemap generation
- Meta tags for social sharing
- Structured data markup
- Image optimization
- Performance optimization
- Accessibility compliance

## 📊 Analytics

Integrate with popular analytics services:
- Google Analytics
- Vercel Analytics
- Umami (privacy-focused)
- Plausible Analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [GitHub Issues](https://github.com/yourusername/blogsite/issues)
2. Review the documentation
3. Create a new issue with detailed information

## 🚀 What's Next?

Planned features for future releases:
- Multi-language support
- Advanced analytics dashboard
- Email newsletter automation
- Advanced comment moderation
- Content scheduling
- Social media auto-posting
- Plugin system for extensions

---

Built with ❤️ using Next.js 14 and modern web technologies.