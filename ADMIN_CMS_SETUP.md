# Admin CMS Implementation Guide

## ✅ Completed Backend Setup

### Database Models Created

- ✅ User (Admin authentication)
- ✅ WebsiteSettings (Global site configuration)
- ✅ Project (Portfolio items)
- ✅ Category
- ✅ Skill
- ✅ Service
- ✅ Experience
- ✅ Education
- ✅ Testimonial
- ✅ ContactMessage
- ✅ Media (File storage)
- ✅ Analytics

### Utility Functions Created

- ✅ MongoDB connection (`server/utils/db.ts`)
- ✅ JWT authentication (`server/utils/jwt.ts`)
- ✅ Auth middleware (`server/utils/auth.ts`)
- ✅ Cloudinary integration (`server/utils/cloudinary.ts`)

### API Endpoints Created

#### Authentication

- ✅ POST `/api/auth/google-callback` - Google OAuth callback
- ✅ GET `/api/auth/check` - Check if user is authenticated

#### Website Settings

- ✅ GET `/api/settings` - Get all settings
- ✅ PUT `/api/settings` - Update settings

#### Projects/Portfolio

- ✅ GET `/api/projects` - List projects (with filters)
- ✅ POST `/api/projects` - Create project
- ✅ GET `/api/projects/[id]` - Get single project
- ✅ PUT `/api/projects/[id]` - Update project
- ✅ DELETE `/api/projects/[id]` - Delete project

#### Skills

- ✅ GET `/api/skills` - List skills
- ✅ POST `/api/skills` - Create skill
- ✅ GET `/api/skills/[id]` - Get single skill
- ✅ PUT `/api/skills/[id]` - Update skill
- ✅ DELETE `/api/skills/[id]` - Delete skill

#### Categories

- ✅ GET `/api/categories` - List categories
- ✅ POST `/api/categories` - Create category
- ✅ GET `/api/categories/[id]` - Get single category
- ✅ PUT `/api/categories/[id]` - Update category
- ✅ DELETE `/api/categories/[id]` - Delete category

## 📋 Remaining Tasks

### Backend Endpoints (Need Creating - Pattern Provided Below)

1. **Services CRUD** - Copy the Skills/Categories pattern
   - GET `/api/services`
   - POST `/api/services`
   - PUT/DELETE `/api/services/[id]`

2. **Experience CRUD** - Same pattern
3. **Education CRUD** - Same pattern
4. **Testimonials CRUD** - Same pattern
5. **Contact Messages**
   - GET `/api/messages` - List all messages
   - GET `/api/messages/[id]` - Get single message
   - PUT `/api/messages/[id]` - Mark as read/reply
   - DELETE `/api/messages/[id]` - Delete message

6. **Media Library**
   - GET `/api/media` - List media
   - POST `/api/media/upload` - Upload file to Cloudinary
   - DELETE `/api/media/[id]` - Delete media

7. **Analytics**
   - GET `/api/analytics` - Get dashboard stats
   - POST `/api/analytics/track` - Track page views

### Frontend Components (To Create)

1. **Admin Layout & Routes**
   - `/admin` - Main admin dashboard
   - `/admin/login` - Google OAuth login page

2. **Admin Components**
   - AdminLayout with Sidebar
   - Dashboard page
   - Website Settings form
   - Portfolio management
   - Skills management
   - Services management
   - Categories management
   - Experience/Education/Testimonials forms
   - Media library
   - Contact messages inbox
   - Analytics dashboard

## 🔧 API Pattern Template

For creating remaining endpoints, use this template:

### GET List Endpoint

```typescript
// /server/api/[resource]/index.get.ts
import { connectDB } from '~/server/utils/db';
import { [Model] } from '~/server/models/[Model]';

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    const data = await [Model].find().sort({ displayOrder: 1 });
    return { success: true, data };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch' });
  }
});
```

### POST Create Endpoint

```typescript
// /server/api/[resource]/index.post.ts
import { connectDB } from '~/server/utils/db';
import { requireAdminEmail } from '~/server/utils/auth';
import { [Model] } from '~/server/models/[Model]';

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    await requireAdminEmail(event);
    const body = await readBody(event);
    const item = await [Model].create(body);
    return { success: true, message: 'Created', data: item };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: 'Failed to create' });
  }
});
```

### PUT Update Endpoint

```typescript
// /server/api/[resource]/[id]/index.put.ts
import { connectDB } from '~/server/utils/db';
import { requireAdminEmail } from '~/server/utils/auth';
import { [Model] } from '~/server/models/[Model]';

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    await requireAdminEmail(event);
    const { id } = event.context.params;
    const body = await readBody(event);
    const item = await [Model].findByIdAndUpdate(id, body, { new: true });
    if (!item) throw createError({ statusCode: 404, statusMessage: 'Not found' });
    return { success: true, message: 'Updated', data: item };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: 'Failed to update' });
  }
});
```

## 🚀 Environment Setup

Create `.env` file with:

```
MONGODB_URI=mongodb+srv://...
ADMIN_EMAIL=your-email@gmail.com
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=http://localhost:5173
PORT=3000
```

## 📦 Installation

```bash
npm install
npm run dev
```

The backend API will be available at `http://localhost:3000/api/`

## 🔐 Authentication Flow

1. User visits `/admin`
2. Click "Login with Google"
3. OAuth flow redirects to `/api/auth/google-callback`
4. Token stored in localStorage
5. All authenticated requests include `Authorization: Bearer <token>` header
6. Only `ADMIN_EMAIL` from .env can access admin panel
