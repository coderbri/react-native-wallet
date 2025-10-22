# React Native Wallet App - Changelog

## v0.9.0 - Setting Up Styles & Images
**Release Date:** October 22, 2025

### Summary
- Organized the project’s frontend styling structure to prepare for consistent and scalable UI development.  
- Created a **`styles/`** directory containing:  
  - `auth.styles.js` for authentication-related pages.  
  - `create.styles.js` for the Create screen.  
  - `home.styles.js` for the Home screen.  
- Added a **`constants/`** directory with `colors.js` defining the app’s theme colors for unified visual consistency.  
- Implemented a **`lib/`** directory with `utils.js`, responsible for retrieving and formatting transaction dates from the database for display within the app.  
- Uploaded app assets (icons, logos, etc.) into the **`assets/`** directory for centralized image management.  
- Created a **`components/`** directory and added a reusable **`SafeScreen.jsx`** component to ensure app content stays within the **safe area view**, preventing overlap with device UI elements such as the status bar or camera notch.  
- Wrapped the root `<Stack>` navigator in the `SafeScreen` component using the **`useSafeAreaInsets`** hook from `react-native-safe-area-context` (preinstalled with Expo).  
- Improved app layout rendering by applying `flex` and `backgroundColor` styles to support dynamic scaling and consistent theming.  

### Result
The app now has a clean, modular styling foundation and a safe rendering structure, establishing a robust base for upcoming **authentication** and **UI implementation** phases.

---

## v0.8.0 - Basic Setup with React Native
**Release Date**: October 21, 2025

### Summary
- Initialized the **mobile frontend** using **React Native** with **Expo** as the development framework.  
- Installed and configured Expo CLI using `npx create-expo-app@latest .` to generate the project scaffold.  
- Verified successful app execution using both the **iOS Simulator** and **Expo Go** on mobile devices.  
- Explained the relationship between **React Native** and **Expo**, noting that Expo extends React Native with additional tools and development utilities.  
- Reviewed key similarities between **React** and **React Native**, including:
  - Shared component structure but with mobile-specific tags (e.g., `<View>` and `<Text>`).  
  - Styling via JavaScript objects using the `StyleSheet` API instead of CSS files.  
  - Event handling differences such as `onPress` vs. `onClick`.  
- Demonstrated how to preview the app via QR code scanning on a physical device under the same Wi-Fi network.  
- Introduced navigation structure using **Expo Router**, covering:
  - `_layout.tsx` for stack navigation setup.  
  - Differences between **Stack** and **Tab** navigators.  
- Built initial test screens (`index.tsx` and `about.jsx`) with navigation using `<Link href="...">`.  
- Showed how to render both **remote** and **local images** using the `expo-image` component.  
- Implemented clean styling with `StyleSheet.create()` for better code organization.  
- Added explanations for `app.json` as the mobile configuration file and noted its relevance during deployment.  
- Prepared the app for upcoming steps focusing on **styling** and **UI structuring**.  

### Result
The mobile application’s foundation is now successfully set up with **React Native + Expo**, providing a working simulator environment, navigation system, and initial page rendering — establishing a clear base for future UI and feature development.

---

## v0.7.0 - Codebase Modularization & Project Restructure
**Release Date**: October 21, 2025

### Summary
- Refactored the backend for scalability by separating core logic into modular directories:
  - **routes/** – manages all route definitions (`transactionsRoute.js`).
  - **controllers/** – encapsulates business logic for transactions (`transactionsController.js`).
  - **config/** – handles database connection and initialization (`db.js`).
- Simplified route handling by registering `/api/transactions` once in `server.js` using Express middleware.
- Introduced dedicated controller functions for CRUD operations and summary retrieval.
- Added a root-level health check endpoint to verify backend status.
- Moved database initialization logic (`initDB()`) into `config/db.js` for cleaner organization.
- Updated backend folder structure under `src/` for production readiness.
- Adjusted `package.json` to use the new entry point (`src/server.js`) with separate `dev` and `start` scripts.
- Verified that all API endpoints continue functioning after restructuring.

### Result
The backend now follows a **clean, modular, and scalable architecture** that aligns with production best practices and simplifies future development.

---

## v0.6.0 - Implemented Rate Limiting Middleware  
**Release Date**: October 21, 2025  

### Summary  
- Introduced **Rate Limiting** to prevent excessive or abusive API requests that could overload the server.  
- Configured **Upstash Redis** as a lightweight, serverless data store for managing rate limit counters.  
- Created a `config/upstash.js` file to initialize the Redis instance and configure the rate limiter using the `@upstash/ratelimit` package.  
- Implemented a middleware function in `middleware/rateLimiter.js` that limits API calls to **100 requests per minute** using the **sliding window algorithm**.  
- Added global middleware integration in `server.js` to apply the rate limiter across all routes.  
- Successfully tested rate limiting in Postman to confirm restricted access after exceeding the threshold.  
- Updated `.env` file with new Upstash Redis credentials (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`).  

### Notes  
This middleware ensures backend stability by mitigating spam or denial-of-service behaviors, such as repeated API refreshes. Though applied globally for simplicity, in production, rate limits would typically be user- or IP-specific.  

---

## v0.5.0 - GET Summary Route
**Release Date**: October 20, 2025

### Summary
- Implemented the `GET /api/transactions/summary/:userId` route to provide users with a financial summary.  
- Added SQL queries to calculate:
  - **Total Balance** – the net sum of all transactions.
  - **Total Income** – the sum of all positive (`amount > 0`) transactions.
  - **Total Expenses** – the sum of all negative (`amount < 0`) transactions.
- Utilized the `COALESCE()` SQL function to ensure `0` is returned instead of `null` when a user has no transactions.  
- Implemented structured JSON responses containing the balance, income, and expenses.  
- Verified endpoint functionality in Postman, confirming correct calculations and stable error handling.  

---

## v0.4.0 - GET & DELETE Routes
**Release Date**: October 20, 2025

### Summary
- Implemented the `GET /api/transactions/:userId` route to retrieve all transactions belonging to a specific user.  
- Integrated SQL query logic to return transactions ordered by `created_at` in descending order (most recent first).  
- Added structured error handling for failed database retrieval attempts.  
- Tested with Postman to confirm correct behavior when querying existing and non-existing `user_id` values.  
- Implemented the `DELETE /api/transactions/:id` route to remove a transaction by its unique identifier.  
- Added input validation to ensure the provided `id` is numeric, preventing server crashes from invalid parameters.  
- Implemented edge case handling for non-existent transactions (returns 404).  
- Verified successful deletion of transactions via Postman and confirmed database changes in Neon PostgreSQL.  

---

## v0.3.0 - Create Transaction Route
**Release Date**: October 20, 2025

### Summary
- Introduced middleware setup to handle incoming requests and perform pre-processing before sending responses.  
- Added `express.json()` middleware to parse incoming JSON payloads for POST requests.  
- Implemented a custom middleware for debugging to log incoming requests and their HTTP methods to the console.  
- Created the first `POST /api/transactions` route to allow users to add new transactions to the database.  
- Implemented request validation to ensure all required fields (`title`, `amount`, `category`, `user_id`) are provided before insertion.  
- Executed raw SQL `INSERT` queries using the `sql` client from `@neondatabase/serverless` to store new transactions in the `transactions` table.  
- Added structured error handling with proper status codes (400 for bad requests, 500 for internal errors).  
- Tested the route using Postman by sending JSON payloads and verified successful data persistence in Neon PostgreSQL.  
- Confirmed database insertion with automatic `created_at` timestamps generated by PostgreSQL.  

---

## v0.2.0 - Database and Authentication Setup
**Release Date**: October 19, 2025

### Summary
- Integrated Neon PostgreSQL as a cloud-hosted database provider.
- Configured a database connection through the `@neondatabase/serverless` package.
- Created a reusable SQL client in `config/db.js` for executing queries.
- Added an `initDB()` function in `server.js` to initialize the database on server startup.
- Implemented a conditional SQL statement to create the `transactions` table only if it doesn’t exist.
- Defined the schema for `transactions` with columns for `id`, `user_id`, `title`, `amount`, `category`, and `created_at`.
- Introduced error handling for database initialization failures using `try...catch`.
- Set up environment variable support for `DATABASE_URL` and verified connection with Neon.
- Added Clerk authentication setup and configured an API key for user management.

---

## v0.1.0 - Backend Initialization
**Release Date**: October 18, 2025

### Summary
- Set up the foundational project structure with `backend/` and `mobile/` directories.
- Initialized the backend using Node.js and Express (v4).
- Installed core dependencies: `express`, `dotenv`, `cors`, and `@neondatabase/serverless`.
- Configured the backend to use ES module syntax for cleaner imports/exports.
- Created a basic Express server and verified it runs locally on port 5001.
- Implemented initial API test route (`GET /`) returning a “Hello World” response.
- Introduced `nodemon` for automated server restarts during development.
- Added a `.env` file to securely manage environment variables.

---

<section align="center">
  <code>coderBri © 2025</code>
</section>