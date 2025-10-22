# React Native Wallet App

A cross-platform **mobile wallet application** built with **React Native** and **Expo**, backed by a modular **Node.js + Express + PostgreSQL** backend.

This project demonstrates the full-stack process of designing, structuring, and connecting a mobile frontend with a scalable backend.

---

## 💡 Project Overview

The **React Native Wallet App** is an ongoing personal project that simulates a digital wallet system where users can track transactions, view summaries, and manage financial data.  

The project is currently in its **early development stages**, focusing on foundational setup and clean architectural design.

---

## 📚 Tech Stack

### **Frontend (Mobile)**
- **React Native** – Cross-platform mobile app framework.  
- **Expo** – Toolkit for simplified React Native development.  
- **Expo Router** – Handles navigation (Stack & Tab navigators).  
- **TypeScript → JSX migration** – For beginner-friendly readability.  

### **Backend**
- **Node.js + Express** – RESTful API server.  
- **Neon PostgreSQL** – Cloud-hosted relational database.  
- **Upstash Redis** – Rate limiting for API stability.  

---

<!-- ## 📱 Current Features (Frontend)

- ✅ Initialized **Expo** project and verified setup via simulator and Expo Go.  
- ✅ Configured **Stack navigation** using Expo Router.  
- ✅ Created basic screens (`index.jsx`, `about.jsx`) for testing navigation flow.  
- ✅ Demonstrated **image rendering** using `expo-image` (remote + local assets).  
- ✅ Implemented **StyleSheet-based** styling for cleaner UI organization.  
- ✅ Configured `app.json` and explained project structure and navigation entry points.  

--- -->

## 🖥️ Current Features (Backend)

- ✅ Modularized backend architecture for scalability:
  - `routes/` – API endpoints  
  - `controllers/` – Business logic  
  - `config/` – Database & Redis configuration  
- ✅ Implemented CRUD operations for transactions:
  - `POST /api/transactions`
  - `GET /api/transactions/:userId`
  - `DELETE /api/transactions/:id`
  - `GET /api/transactions/summary/:userId`
- ✅ Integrated **Neon PostgreSQL** for persistent data storage.  
- ✅ Added **rate limiting** using **Upstash Redis**.  
- ✅ Verified all endpoints through Postman testing.  

---

## 🧠 Concepts Demonstrated

- Cross-platform mobile app development with **React Native + Expo**  
- Navigation setup with **Stack Navigator**  
- Clean separation of concerns in **Node.js backend architecture**  
- REST API integration with **PostgreSQL database**  
- Real-time testing using **Expo Go** and local simulator  

---

## 🗂️ Project Structure (High-Level)

```
react-native-wallet-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
│
└── mobile/
│   ├── app/
│   │   ├── _layout.jsx
│   │   ├── index.jsx
│   │   └── about.jsx
│   ├── assets/
│   ├── app.json
│   └── package.json
```

---

## 🧾 Changelog Summary

| Version | Update Description |
|----------|--------------------|
| **v0.8.0** | Initialized React Native frontend with Expo and Stack navigation. |
| **v0.7.0** | Modularized backend into routes, controllers, and config directories. |
| **v0.6.0** | Implemented rate limiting middleware using Upstash Redis. |
| **v0.5.0 - v0.3.0** | Added CRUD routes for transactions and summary retrieval. |
| **v0.2.0 - v0.1.0** | Set up Neon PostgreSQL, Express server, and initial backend structure. |

---

<!-- ## 🧭 Next Steps

- Build the **UI layout** and component styling for the wallet dashboard.  
- Implement **real data fetching** from the backend API.  
- Add **Clerk authentication** for secure user access.  
- Develop **transaction forms** for adding and viewing financial records.  

--- -->


<section align="center">
  <code>coderBri © 2025</code>
</section>
