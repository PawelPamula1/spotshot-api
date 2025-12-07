# CLAUDE.md - SpotShot API

## Project Overview

SpotShot API is a RESTful backend service for the SpotShot mobile application - a platform for discovering and sharing photography locations. The API handles photo spot management, user profiles, favorites, content moderation, and secure image uploads. Built with Express.js, TypeScript, and Supabase (PostgreSQL), it provides a robust backend for the mobile app and waitlist website.

**Project Type:** RESTful API Backend
**Primary Purpose:** Mobile app backend, content management, user data
**Tech Stack:** Node.js, Express.js, TypeScript, Supabase, Cloudinary

---

## Tech Stack

### Backend Framework
- **Express.js 5.1.0** - Node.js web framework
- **TypeScript 5.8.3** - Type-safe JavaScript (ES2020, CommonJS)
- **Node.js** - JavaScript runtime

### Database & Auth
- **Supabase** - Backend-as-a-Service (PostgreSQL + Authentication)
- **@supabase/supabase-js 2.52.1** - Supabase JavaScript client
- **PostgreSQL** - Relational database (via Supabase)

### External Services
- **Cloudinary 2.7.0** - Cloud-based image storage and transformation
- **UUID 11.1.0** - Unique identifier generation

### Middleware
- **cors 2.8.5** - Cross-Origin Resource Sharing
- **express.json()** - JSON body parsing

### Development Tools
- **ts-node 10.9.2** - TypeScript execution for development
- **nodemon 3.1.10** - Auto-restart on file changes
- **dotenv 17.2.0** - Environment variable management
- **ESLint 9.31.0** - Code linting
- **Prettier 3.6.2** - Code formatting

---

## Project Structure

```
spotshot-api/
├── src/
│   ├── config/
│   │   └── config.ts              # Environment configuration loader
│   ├── controllers/
│   │   ├── spotController.ts      # Spot CRUD operations
│   │   ├── userController.ts      # User profile management
│   │   ├── favoritesController.ts # Favorites management
│   │   ├── moderationController.ts# Content moderation
│   │   └── cloudinaryController.ts# Image upload signatures
│   ├── routes/
│   │   ├── spotRoutes.ts          # Spot endpoints
│   │   ├── userRoutes.ts          # User endpoints
│   │   ├── favouritesRoutes.ts    # Favorites endpoints
│   │   ├── moderationRoutes.ts    # Moderation endpoints
│   │   └── cloudinaryRoutes.ts    # Cloudinary endpoints
│   ├── middlewares/
│   │   └── errorHandler.ts        # Global error handling
│   ├── models/
│   │   └── spot.ts                # Spot TypeScript interface
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client initialization
│   │   └── cloudinary.ts          # Cloudinary configuration
│   ├── utils/
│   │   └── index.ts               # Helper functions (sendError)
│   ├── app.ts                     # Express app setup & middleware
│   └── server.ts                  # Server entry point
├── dist/                          # Compiled JavaScript output
├── node_modules/                  # Dependencies
├── package.json                   # Project metadata & scripts
├── tsconfig.json                  # TypeScript configuration
├── .eslintrc.js                   # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── .env                           # Environment variables (DO NOT COMMIT)
└── .gitignore                     # Git ignore rules
```

### Directory Purposes

**`src/controllers/`** - Business logic for each feature (spots, users, favorites, moderation)
**`src/routes/`** - Express Router definitions mapping HTTP methods to controllers
**`src/middlewares/`** - Custom Express middleware (error handling)
**`src/lib/`** - Third-party service configurations (Supabase, Cloudinary)
**`src/models/`** - TypeScript interfaces and type definitions
**`src/utils/`** - Reusable utility functions
**`src/config/`** - Environment and configuration management

---

## Architecture

### MVC Pattern (without Views)
- **Models** - TypeScript interfaces + Supabase tables
- **Controllers** - Business logic and request handling
- **Routes** - HTTP endpoint definitions

### Request Flow
```
Client Request
    ↓
Express Middleware (CORS, JSON parsing)
    ↓
Router (matches endpoint)
    ↓
Controller (business logic)
    ↓
Supabase/Cloudinary (data/service layer)
    ↓
Response to Client
    ↓
Error Handler (if error occurs)
```

---

## API Endpoints

### Health Check
```
GET /api/health
Description: Server health status
Response: { status: "ok", message: "Server is running" }
```

### Spots
```
GET    /api/spots
Description: Get all accepted spots (public-facing)
Query Params: ?country=string&city=string
Response: Spot[]

GET    /api/spots/spot/:id
Description: Get single spot by ID
Response: Spot

POST   /api/spots
Description: Create new spot (pending approval)
Body: { name, city, country, image, description, latitude, longitude, author_id, photo_tips? }
Response: Spot

PUT    /api/spots/spot/:id
Description: Update existing spot (with authorization check)
Body: { user_id, name?, city?, country?, description?, photo_tips?, image? }
Authorization: Only spot author can edit (validates author_id === user_id)
Protected Fields: latitude, longitude, author_id (cannot be changed)
Re-moderation: Sets accepted=false after edit
Response: Spot
Errors: 400 (user_id required), 403 (unauthorized), 404 (not found)

DELETE /api/spots/:id
Description: Delete spot
Response: { message: "success" }

GET    /api/spots/countries
Description: Get list of unique countries from accepted spots
Response: { country: string }[]

GET    /api/spots/cities?country=string
Description: Get list of cities, optionally filtered by country
Response: { city: string }[]

GET    /api/spots/count/:userId
Description: Get count of spots created by user
Response: { count: number }

GET    /api/spots/user/:userId
Description: Get all spots created by user (includes pending spots)
Response: Spot[]
Query Logic: Filter by author_id, ordered by created_at DESC
```

### Users
```
GET    /api/users/:id
Description: Get user profile by ID
Response: Profile

DELETE /api/users/:id
Description: Delete user and all related data (spots, favorites, reports)
Response: { message: "success" }
```

### Favourites
```
GET    /api/favourites/:userId
Description: Get user's favorite spots (with full spot data)
Response: { spot: Spot }[]

POST   /api/favourites
Description: Add spot to favorites
Body: { user_id, spot_id }
Response: Favorite

DELETE /api/favourites?user_id=string&spot_id=string
Description: Remove spot from favorites
Response: { message: "success" }

GET    /api/favourites/count/:spotId
Description: Get total favorite count for a spot
Response: { count: number }

GET    /api/favourites/check?user_id=string&spot_id=string
Description: Check if user has favorited a spot
Response: { isFavorite: boolean }
```

### Moderation
```
GET    /api/moderation/pending
Description: Get spots awaiting approval
Query Params: ?country=string&city=string&limit=number
Response: Spot[] (with author details)

PUT    /api/moderation/accept/:id
Description: Accept a pending spot (sets accepted=true)
Response: Spot

DELETE /api/moderation/reject/:id
Description: Reject and delete a pending spot
Response: { message: "success" }

POST   /api/moderation/report
Description: Report a spot for review
Body: { spot_id, reporter_id, reason }
Response: Report
```

### Cloudinary
```
GET    /api/cloudinary/sign
Description: Generate signed upload parameters for secure client-side uploads
Response: { signature, timestamp, cloudName, apiKey, uploadPreset }
```

---

## Database Schema

### Tables

**`spots`**
- `id` (UUID, primary key)
- `name` (string) - Spot name
- `city` (string) - City location
- `country` (string) - Country location
- `image` (string) - Cloudinary image URL
- `description` (string) - Spot description
- `latitude` (number) - Geographic coordinate
- `longitude` (number) - Geographic coordinate
- `author_id` (UUID, FK to profiles) - Creator of the spot
- `photo_tips` (string, nullable) - Photography tips
- `accepted` (boolean, default: false) - Moderation status
- `created_at` (timestamp) - Creation timestamp

**`profiles`**
- `id` (UUID, primary key, synced with Supabase Auth)
- `username` (string)
- `avatar_url` (string, nullable)
- Other profile fields...

**`favorites`**
- `id` (UUID, primary key)
- `user_id` (UUID, FK to profiles)
- `spot_id` (UUID, FK to spots)
- Composite unique constraint on (user_id, spot_id)

**`spot_reports`**
- `id` (UUID, primary key)
- `spot_id` (UUID, FK to spots)
- `reporter_id` (UUID, FK to profiles)
- `reason` (string) - Report reason

### Relationships
- `spots.author_id` → `profiles.id` (many-to-one)
- `favorites.user_id` → `profiles.id` (many-to-one)
- `favorites.spot_id` → `spots.id` (many-to-one)
- `spot_reports.spot_id` → `spots.id` (many-to-one)
- `spot_reports.reporter_id` → `profiles.id` (many-to-one)

---

## Authentication

### Supabase Authentication
- **Service Role Key** - Used in API for privileged operations (bypasses RLS)
- **Anon Public Key** - Available for client-side operations
- **JWT-based** - Supabase issues JWTs for authenticated users

### Current Implementation
- **No authentication middleware** in the API
- Most endpoints trust `user_id` from request body
- **UPDATE endpoint has authorization** - Validates user owns the spot before allowing edits
- **SECURITY CONCERN:** Should add JWT verification middleware for all protected endpoints

### User Deletion
```typescript
// Deletes both profile and auth user
await supabase.auth.admin.deleteUser(userId);
```

---

## Error Handling

### Centralized Error Middleware
Location: `src/middlewares/errorHandler.ts`

```typescript
interface AppError extends Error {
  status?: number;
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
};
```

### Controller Error Pattern
```typescript
try {
  // Operation
  if (error.code === 'PGRST116') {
    return sendError(res, 404, 'Resource not found');
  }
  res.json(data);
} catch (error) {
  console.error('Error:', error);
  sendError(res, 500, 'Internal server error');
}
```

### sendError Utility
```typescript
// src/utils/index.ts
export const sendError = (res: Response, status: number, message: string) => {
  res.status(status).json({ error: message });
};
```

---

## Configuration

### Environment Variables
```bash
# Server
PORT=3000
NODE_ENV=development

# Supabase
SUPABASE_URL=https://wjskankussqvdhcfpceo.supabase.co
SUPABASE_SERVICE_ANON_PUBLIC_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

# Cloudinary
CLOUDINARY_CLOUD_NAME=dllsxlovi
CLOUDINARY_API_KEY=687188368524598
CLOUDINARY_API_SECRET=[your-cloudinary-secret]
CLOUDINARY_UPLOAD_PRESET=spotshot_gallery
```

### Config Module
Location: `src/config/config.ts`

```typescript
interface Config {
  port: number;
  nodeEnv: string;
}

export const config: Config = {
  port: parseInt(process.env.PORT || "3000"),
  nodeEnv: process.env.NODE_ENV || "development",
};
```

---

## Development

### Scripts
```bash
npm run dev      # Start development server with auto-restart
npm run build    # Compile TypeScript to JavaScript
npm start        # Run production build
npm run lint     # Run ESLint
```

### Development Workflow
1. **Edit TypeScript files** in `src/`
2. **nodemon watches** for changes
3. **ts-node executes** TypeScript directly
4. **Server auto-restarts** on file save

### Build Process
1. Run `npm run build`
2. TypeScript compiles to `dist/` (CommonJS)
3. Run `npm start` to execute compiled code

---

## Cloudinary Integration

### Purpose
- Secure image uploads from mobile clients
- Image storage and CDN delivery
- Image transformations (resize, crop, optimize)

### Upload Flow
1. **Client requests signature** from `GET /api/cloudinary/sign`
2. **API generates signature** using Cloudinary SDK
3. **Client uploads directly** to Cloudinary with signature
4. **Client sends image URL** to API when creating spot

### Configuration
```typescript
// src/lib/cloudinary.ts
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// src/controllers/cloudinaryController.ts
const timestamp = Math.floor(Date.now() / 1000);
const signature = cloudinary.utils.api_sign_request(
  { timestamp, upload_preset: UPLOAD_PRESET, folder: FOLDER },
  CLOUDINARY_API_SECRET
);
```

---

## Supabase Integration

### Client Initialization
```typescript
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service role bypasses RLS
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
```

### Query Patterns
```typescript
// Select with join
const { data, error } = await supabase
  .from("favorites")
  .select("spots(*)")
  .eq("user_id", userId);

// Insert
const { data, error } = await supabase
  .from("spots")
  .insert({ name, city, country, ... })
  .select()
  .single();

// Update
const { data, error } = await supabase
  .from("spots")
  .update({ accepted: true })
  .eq("id", id)
  .select()
  .single();

// Delete
const { error } = await supabase
  .from("spots")
  .delete()
  .eq("id", id);
```

---

## Coding Conventions

### File Structure
```typescript
// Imports
import { Request, Response } from "express";
import { supabase } from "../lib/supabase";
import { sendError } from "../utils";

// Controller functions
export const getSpots = async (req: Request, res: Response) => {
  try {
    // Logic
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    sendError(res, 500, "Internal server error");
  }
};
```

### Naming Conventions
- **Files:** camelCase (`spotController.ts`)
- **Functions:** camelCase (`getSpots`, `createSpot`)
- **Interfaces:** PascalCase (`Spot`, `Profile`)
- **Constants:** UPPER_SNAKE_CASE (`API_URL`, `UPLOAD_PRESET`)

### TypeScript
- **Explicit types** for function parameters and return values
- **Interfaces** for data structures
- **Type imports** from `@types` packages
- **Avoid `any`** - Use proper typing

### Error Handling
- **Try-catch blocks** in all async controllers
- **Specific error codes** for database errors (e.g., 'PGRST116' = not found)
- **console.error** for server-side logging
- **sendError()** for consistent error responses

### Response Format
```typescript
// Success
res.json(data);
res.json({ message: "success" });

// Error
sendError(res, 404, "Resource not found");
sendError(res, 500, "Internal server error");
```

---

## Middleware

### Current Middleware Stack
1. **CORS** - Allows cross-origin requests (all origins in dev)
2. **express.json()** - Parses JSON request bodies
3. **Routes** - Feature-specific routers
4. **Error Handler** - Catches all errors (registered last)

### Middleware Application Order
```typescript
// src/app.ts
app.use(cors()); // 1. CORS
app.use(express.json()); // 2. Body parsing

// 3. Routes
app.use("/api", spotRoutes);
app.use("/api", userRoutes);
// ... other routes

app.use(errorHandler); // 4. Error handler (LAST)
```

---

## Testing

**Currently, there are NO tests** in this project.

### Recommended Testing Strategy
1. **Unit tests** for controllers and utilities (Jest)
2. **Integration tests** for API endpoints (Supertest)
3. **Database tests** with test Supabase instance
4. **E2E tests** for critical user flows (Playwright)

### Example Test Structure
```typescript
// tests/spots.test.ts
describe("Spots API", () => {
  test("GET /api/spots returns accepted spots", async () => {
    const res = await request(app).get("/api/spots");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
```

---

## Security Considerations

### Current Vulnerabilities
1. **Limited authentication** - Only UPDATE endpoint checks authorization
2. **CORS allows all origins** - Should be restricted in production
3. **No rate limiting** - Vulnerable to abuse
4. **No input validation** - Potential for injection attacks
5. **Service role key** bypasses Row Level Security (RLS)

### Security Improvements (Recent)
1. **✅ Spot Update Authorization** - `updateSpot` endpoint validates user ownership
   - Checks `spot.author_id === user_id` before allowing edits
   - Returns 403 Forbidden if unauthorized
   - Protected fields (location, author_id) cannot be changed
   - Re-moderation required after edit (`accepted: false`)

### Recommendations
1. **Add JWT verification middleware**
   ```typescript
   const verifyToken = async (req, res, next) => {
     const token = req.headers.authorization?.split(" ")[1];
     const { data: { user }, error } = await supabase.auth.getUser(token);
     if (error) return sendError(res, 401, "Unauthorized");
     req.user = user;
     next();
   };
   ```

2. **Implement input validation** (express-validator)
   ```typescript
   body("name").isString().trim().isLength({ min: 3, max: 100 }),
   ```

3. **Add rate limiting** (express-rate-limit)
   ```typescript
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
   });
   app.use(limiter);
   ```

4. **Restrict CORS in production**
   ```typescript
   app.use(cors({
     origin: ["https://photospots.dev.pl", "https://app.photospots.dev.pl"],
   }));
   ```

5. **Sanitize user input** to prevent XSS and SQL injection

---

## Deployment

### Build & Run
```bash
# Build
npm run build

# Run production
npm start
```

### Production Checklist
1. Set all environment variables on hosting platform
2. Use production Supabase instance
3. Restrict CORS to known origins
4. Add rate limiting
5. Add authentication middleware
6. Enable HTTPS only
7. Set up error monitoring (Sentry, etc.)
8. Configure logging (Winston, Pino)
9. Set up database backups
10. Add health check monitoring

### Recommended Hosting
- **Railway** - Easy Node.js deployment
- **Render** - Free tier available
- **Fly.io** - Global edge network
- **DigitalOcean App Platform** - Managed Node.js
- **AWS Elastic Beanstalk** - AWS native

---

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Supabase connection errors:**
- Check `SUPABASE_URL` and keys are correct
- Verify Supabase instance is running
- Check network connectivity

**TypeScript compilation errors:**
```bash
# Clean build
rm -rf dist/
npm run build
```

**CORS errors:**
- Check CORS configuration in `app.ts`
- Verify client origin is allowed
- Check browser console for details

**Cloudinary upload failures:**
- Verify API credentials are correct
- Check upload preset exists in Cloudinary dashboard
- Ensure folder permissions are correct

---

## Code Examples

### Creating a New Controller
```typescript
// src/controllers/exampleController.ts
import { Request, Response } from "express";
import { supabase } from "../lib/supabase";
import { sendError } from "../utils";

export const getExamples = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("examples")
      .select("*");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error("Error fetching examples:", error);
    sendError(res, 500, "Failed to fetch examples");
  }
};
```

### Creating a New Route
```typescript
// src/routes/exampleRoutes.ts
import { Router } from "express";
import { getExamples } from "../controllers/exampleController";

const router = Router();

router.get("/examples", getExamples);

export default router;
```

### Registering Route in App
```typescript
// src/app.ts
import exampleRoutes from "./routes/exampleRoutes";

app.use("/api", exampleRoutes);
```

---

## Related Documentation

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Supabase JavaScript Documentation](https://supabase.com/docs/reference/javascript/introduction)
- [Cloudinary Node.js SDK](https://cloudinary.com/documentation/node_integration)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## Future Improvements

### High Priority
1. Add authentication middleware with JWT verification
2. Implement input validation on all endpoints
3. Add comprehensive error logging
4. Set up automated tests (unit + integration)
5. Implement rate limiting

### Medium Priority
1. Add API documentation (Swagger/OpenAPI)
2. Implement request logging (Morgan/Winston)
3. Add database migrations (if needed)
4. Implement caching (Redis) for frequently accessed data
5. Add monitoring and alerting

### Low Priority
1. GraphQL API alternative
2. WebSocket support for real-time updates
3. Admin dashboard for moderation
4. Analytics and metrics collection
5. API versioning (/api/v1, /api/v2)

---

**Last Updated:** 2025-12-04
**API Version:** 1.0.0
**Maintained By:** Paul Pamula
