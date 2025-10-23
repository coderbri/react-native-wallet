# React Native Wallet App 💰

A full-stack personal finance management application built with React Native and Node.js, featuring secure authentication, real-time transaction tracking, and comprehensive financial summaries.

![Version](https://img.shields.io/badge/version-0.15.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.74-61dafb.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-316192.svg)

## 📱 Overview

React Native Wallet App is a cross-platform mobile application that enables users to track their income and expenses with an intuitive interface. Built with modern technologies and best practices, the application demonstrates proficiency in full-stack mobile development, cloud deployment, and secure authentication implementation.

### Key Features

- **Secure Authentication** - Clerk-powered user authentication with email verification and session management
- **Transaction Management** - Create, view, and delete financial transactions with category organization
- **Financial Dashboard** - Real-time balance tracking with income and expense summaries
- **Category System** - 7 predefined transaction categories with visual icons
- **Pull-to-Refresh** - Seamless data synchronization with swipe gesture
- **Rate Limiting** - API protection against abuse using Redis-backed sliding window algorithm
- **Cloud Deployment** - Production-ready backend hosted on Render with automated health checks

## 🛠️ Technology Stack

### Frontend (Mobile)
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tooling
- **Expo Router** - File-based navigation system
- **Clerk Expo** - Authentication and user management
- **React Hooks** - State management with custom hooks
- **Expo Secure Store** - Encrypted token storage
- **Ionicons** - Icon library for UI elements
- **KeyboardAwareScrollView** - Enhanced keyboard handling

### Backend (API)
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** (Neon) - Serverless cloud database
- **Upstash Redis** - Rate limiting and caching
- **Clerk** - Authentication provider
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### DevOps & Deployment
- **Render** - Backend hosting platform
- **Cron-job.org** - API health monitoring (prevents cold starts)
- **Git** - Version control
- **npm** - Package management

## 🏗️ Architecture

### Project Structure
```
react-native-wallet/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # Database connection
│   │   │   └── upstash.js         # Redis rate limiter config
│   │   ├── controllers/
│   │   │   └── transactionsController.js
│   │   ├── middleware/
│   │   │   └── rateLimiter.js     # Rate limiting middleware
│   │   ├── routes/
│   │   │   └── transactionsRoute.js
│   │   └── server.js              # Express app initialization
│   ├── .env
│   └── package.json
│
├── mobile/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in.jsx
│   │   │   ├── sign-up.jsx
│   │   │   └── _layout.jsx        # Auth route protection
│   │   ├── (root)/
│   │   │   ├── index.jsx          # Home screen
│   │   │   ├── create.jsx         # Transaction creation
│   │   │   └── _layout.jsx        # Protected routes
│   │   └── _layout.jsx            # Root navigation
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       ├── auth.styles.js
│   │       ├── create.styles.js
│   │       └── home.styles.js
│   ├── components/
│   │   ├── BalanceCard.jsx
│   │   ├── NoTransactionsFound.jsx
│   │   ├── PageLoader.jsx
│   │   ├── SafeScreen.jsx
│   │   ├── SignOutButton.jsx
│   │   └── TransactionItem.jsx
│   ├── constants/
│   │   ├── api.js                 # API endpoint configuration
│   │   └── colors.js              # Theme color palette
│   ├── hooks/
│   │   └── useTransactions.js     # Custom data-fetching hook
│   ├── lib/
│   │   └── utils.js               # Date formatting utilities
│   └── package.json
```

### API Endpoints

#### Transactions
```
POST   /api/transactions              # Create new transaction
GET    /api/transactions/:userId      # Fetch user transactions
DELETE /api/transactions/:id          # Delete transaction
GET    /api/transactions/summary/:userId  # Get financial summary
```

#### Health Check
```
GET    /                              # API status verification
```

## 🔐 Security Features

- **Environment Variables** - Sensitive credentials stored securely
- **Token Caching** - Encrypted session persistence with Expo Secure Store
- **Rate Limiting** - 100 requests per minute using Upstash Redis
- **Input Validation** - Server-side validation for all API requests
- **Authentication Guards** - Protected routes requiring valid sessions
- **CORS Configuration** - Controlled cross-origin access

## 📊 Database Schema

### Transactions Table
```sql
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 💡 Key Implementation Highlights

### Custom Hooks Pattern
Implemented `useTransactions` hook for centralized data management:
- Parallel API requests using `Promise.all()`
- Memoized functions with `useCallback` for performance optimization
- Comprehensive error handling with user feedback
- Automatic data refresh after mutations

### Smart Amount Formatting
```javascript
const formattedAmount = isExpense
  ? -Math.abs(parseFloat(amount))  // Expenses stored as negative
  : Math.abs(parseFloat(amount));   // Income stored as positive
```

### Modular Architecture
- **Separation of Concerns** - Controllers, routes, and config isolated
- **Reusable Components** - DRY principles throughout the codebase
- **Centralized Configuration** - Single source of truth for API URLs and colors
- **Middleware Pipeline** - Rate limiting, JSON parsing, and debugging

### Production-Ready Deployment
- **Health Monitoring** - Automated pings prevent cold start delays
- **Environment Switching** - Easy toggle between development and production
- **Error Boundaries** - Graceful error handling with user-friendly messages
- **Loading States** - Enhanced UX during asynchronous operations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/coderbri/react-native-wallet.git
   cd react-native-wallet
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file with required variables
   echo "DATABASE_URL=your_neon_postgres_url" > .env
   echo "CLERK_SECRET_KEY=your_clerk_secret" >> .env
   echo "UPSTASH_REDIS_REST_URL=your_upstash_url" >> .env
   echo "UPSTASH_REDIS_REST_TOKEN=your_upstash_token" >> .env
   
   npm run dev
   ```

3. **Mobile Setup**
   ```bash
   cd ../mobile
   npm install
   
   # Create .env file
   echo "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key" > .env
   
   npx expo start
   ```

4. **Run the application**
   - Press `i` for iOS Simulator
   <!-- - Press `a` for Android Emulator -->
   - Scan QR code with Expo Go app on physical device

<!-- ## 📱 Demo

### Screenshots
*[Add screenshots of your app here]*

### Live Demo
- **API Endpoint**: `https://react-native-wallet-xm77.onrender.com/api`
- **Status**: ✅ Active -->

## 🧪 Testing

The application has been thoroughly tested using:
- **Postman** - API endpoint verification
- **iOS Simulator** - iOS functionality testing
- **Expo Go** - Physical device testing
- **Manual Testing** - User flow validation

<!-- ## 📈 Future Enhancements

- [ ] Data visualization with charts and graphs
- [ ] Budget setting and tracking
- [ ] Recurring transaction support
- [ ] Export transactions to CSV
- [ ] Dark mode support
- [ ] Biometric authentication
- [ ] Multi-currency support
- [ ] Transaction search and filtering -->

## 🤝 Skills Demonstrated

### Technical Skills
- Full-stack mobile application development
- RESTful API design and implementation
- Database schema design and SQL queries
- Authentication and authorization implementation
- State management and custom React hooks
- Responsive UI/UX design
- Cloud deployment and DevOps practices
- Rate limiting and API security
- Version control with Git

### Soft Skills
- Problem-solving and debugging
- Code organization and architecture
- Documentation and technical writing
- Project planning and execution
- Best practices and design patterns

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**coderBri**

- GitHub: [@coderBri](https://github.com/coderBri)
<!-- - LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile) -->

## 🙏 Acknowledgments

- Clerk for authentication services
- Neon for serverless PostgreSQL
- Upstash for Redis infrastructure
- Render for backend hosting
- Expo team for excellent developer tooling

---

<div align="center">
  <sub>Built with ❤️ using React Native and Node.js</sub>
  <br>
  <sub>© 2025 coderBri. All rights reserved.</sub>
</div>