# React Native Wallet App - Changelog

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