# 🚗 RentRide – Vehicle Rental Service

RentRide is a full-stack MERN (MongoDB, Express.js, React, Node.js) web application that allows users to browse vehicles, book rentals, manage bookings, and enables administrators to manage vehicles and monitor rental history through a dedicated admin dashboard.

---

## ✨ Features

### 👤 User Features

- User Registration & Login (JWT Authentication)
- Browse available vehicles
- Search and filter vehicles
- View detailed vehicle information
- Book vehicles with pickup & return dates
- Prevent booking with past dates
- View booking history
- Cancel bookings
- Responsive user interface

### 🛠️ Admin Features

- Secure Admin Login
- Admin Dashboard
- Add new vehicles
- Edit vehicle details
- Delete vehicles
- Update booking status
- View complete rental history
- Dashboard statistics
- Toast notifications for actions

---

## 🧰 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

### Deployment
- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

---

## 📁 Project Structure

```
rental-vehicle-service/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/bxodelroy/rental-vehicle-service.git
cd rental-vehicle-service
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

---

## 📸 Screens

- Home Page
- Vehicle Details
- Booking Page
- User Dashboard
- Admin Dashboard
- Rental History
- Custom 404 Page

---

## 🔒 Authentication

- JWT-based authentication
- Protected user routes
- Protected admin routes
- Role-based authorization

---

## 📊 Rental History

The application stores every booking in the Booking collection, which is used as rental history.

Admins can:
- View all completed bookings
- Monitor customer rentals
- Track booking status
- View rental duration and payment information

---

## 💳 Payment Tracking

Each booking stores:

- Total Price
- Booking Status
- Rental Duration

This allows administrators to monitor completed rentals and payment information.

---

## 🌐 Live Demo

**Frontend:** *(Add your Netlify URL here)*

**Backend API:** https://rental-vehicle-service.onrender.com

---

## 👨‍💻 Author

**Baibhab**

GitHub: https://github.com/bxodelroy

---

## 📄 License

This project is open source and is intended for educational purposes.
