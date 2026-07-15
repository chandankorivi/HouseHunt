# 🏠 HouseHunt

> A full-stack **MERN** web application for renting and discovering houses — browse listings, book properties, and manage rentals with ease.

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-househunt--demo.surge.sh-brightgreen?style=for-the-badge)](https://househunt-demo.surge.sh/)
[![YouTube Demo](https://img.shields.io/badge/▶%20Watch%20Demo-YouTube-red?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=2Uo4HcYkpeM)
[![GitHub](https://img.shields.io/badge/GitHub-chandankorivi%2FHouseHunt-181717?style=for-the-badge&logo=github)](https://github.com/chandankorivi/HouseHunt)

</div>

---

## 📺 Demo

| Resource | Link |
|----------|------|
| 🎬 **Project Demo Video** | [Watch on YouTube](https://www.youtube.com/watch?v=2Uo4HcYkpeM) |
| 🌐 **Live Deployed App** | [househunt-demo.surge.sh](https://househunt-demo.surge.sh/) |
| 💻 **GitHub Repository** | [github.com/chandankorivi/HouseHunt](https://github.com/chandankorivi/HouseHunt) |

---

## 🌟 Features

- 🔍 **Browse Listings** — Search and filter rental properties by location, price, and type
- 🏡 **Property Details** — View detailed property information with images and amenities
- 📅 **Book a Property** — Seamlessly book a rental property with a simple form
- 👤 **User Authentication** — Secure login and registration with JWT-based auth
- 🔐 **Role-Based Access** — Separate panels for **Users** and **Admins**
- 🛠️ **Admin Dashboard** — Manage properties, users, and bookings from a dedicated admin panel
- 📱 **Responsive Design** — Mobile-friendly UI for seamless browsing on all devices

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| ![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black) | UI Framework |
| ![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?logo=reactrouter&logoColor=white) | Client-side Routing |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) | Build Tool & Dev Server |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white) | HTTP Client |

### Backend
| Technology | Purpose |
|-----------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white) | Runtime Environment |
| ![Express](https://img.shields.io/badge/Express_5-000000?logo=express&logoColor=white) | Web Framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white) | Database |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white) | ODM for MongoDB |
| ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white) | Authentication |
| ![bcrypt](https://img.shields.io/badge/bcrypt-003366?logoColor=white) | Password Hashing |

---

## 📁 Project Structure

```
HouseHunt/
├── client/                  # React Frontend (Vite)
│   ├── public/
│   └── src/
│       ├── components/      # Shared UI components
│       ├── context/         # React Context (Auth, global state)
│       ├── modules/
│       │   ├── admin/       # Admin dashboard pages
│       │   ├── user/        # User-facing pages
│       │   └── common/      # Shared pages (login, register, etc.)
│       ├── services/        # API service functions (Axios calls)
│       ├── App.jsx
│       └── main.jsx
│
└── server/                  # Node.js + Express Backend
    ├── config/              # Database & env configuration
    ├── controllers/         # Route handler logic
    ├── middlewares/         # Auth middleware (JWT verification)
    ├── models/              # Mongoose schemas
    │   ├── UserSchema.js
    │   ├── PropertySchema.js
    │   └── BookingSchema.js
    ├── routes/              # API route definitions
    └── server.js            # Entry point
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas URI)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/chandankorivi/HouseHunt.git
cd HouseHunt
```

### 2. Setup the Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the server:

```bash
npm start
```

### 3. Setup the Frontend (Client)

```bash
cd ../client
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 🔗 API Endpoints (Overview)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and get JWT token |
| `GET` | `/api/properties` | Get all property listings |
| `GET` | `/api/properties/:id` | Get a single property |
| `POST` | `/api/bookings` | Create a new booking |
| `GET` | `/api/admin/users` | Admin: get all users |
| `GET` | `/api/admin/bookings` | Admin: get all bookings |

---

## 🚀 Deployment

- **Frontend** deployed on [Surge.sh](https://surge.sh/) → [househunt-demo.surge.sh](https://househunt-demo.surge.sh/)
- **Backend** served via Node.js + Express

---

## 📸 Preview

> 🎥 **[Watch the full demo on YouTube →](https://www.youtube.com/watch?v=2Uo4HcYkpeM)**

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an [issue](https://github.com/chandankorivi/HouseHunt/issues) or submit a pull request.

---

## 👨‍💻 Author

**Chandan Korivi**  
📧 GitHub: [@chandankorivi](https://github.com/chandankorivi)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
