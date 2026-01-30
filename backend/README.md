# HomeChef Backend - Complete Guide

## 🎯 Project Overview
HomeChef is a web application that connects customers with professional chefs for home-cooked meals. This backend provides REST APIs for user authentication, chef management, and booking system.

## 📁 Folder Structure
```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   ├── data.js            # In-memory storage
│   ├── User.js            # MongoDB User model
│   ├── Chef.js            # MongoDB Chef model
│   └── Booking.js         # MongoDB Booking model
├── controllers/
│   ├── authController.js  # User authentication logic
│   ├── chefController.js  # Chef management logic
│   └── bookingController.js # Booking system logic
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── chefs.js           # Chef routes
│   └── bookings.js        # Booking routes
├── server.js              # Main server file
├── package.json           # Dependencies
└── README.md             # This file
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server (In-Memory Mode)
```bash
npm start
```
Server runs on: http://localhost:5000

### 3. Enable MongoDB (Optional)
1. Install MongoDB locally
2. In each controller file, change `USE_MONGODB = true`
3. Uncomment `connectDB()` in server.js
4. Restart server

## 📋 API Endpoints

### 🔐 User Authentication

#### Register User
```
POST /api/users/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```
POST /api/users/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 👨‍🍳 Chef Management

#### Get All Chefs
```
GET /api/chefs
```
**Response:**
```json
{
  "message": "Chefs retrieved successfully",
  "chefs": [
    {
      "id": 1,
      "name": "Marco Rodriguez",
      "specialization": "Italian Cuisine",
      "experience": 8
    }
  ]
}
```

#### Add New Chef
```
POST /api/chefs
```
**Request Body:**
```json
{
  "name": "New Chef",
  "specialization": "Mexican Cuisine",
  "experience": 5
}
```

### 📅 Booking System

#### Create Booking
```
POST /api/bookings
```
**Request Body:**
```json
{
  "userId": 1,
  "chefId": 1,
  "date": "2024-01-15",
  "time": "18:00"
}
```

## 🌐 Frontend Integration

### JavaScript Fetch Examples

#### 1. Register User
```javascript
const registerUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    console.log('User registered:', data);
    
    // Store token for future requests
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

// Usage
registerUser({
  name: "John Doe",
  email: "john@example.com",
  password: "password123"
});
```

#### 2. Login User
```javascript
const loginUser = async (credentials) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

#### 3. Fetch Chefs
```javascript
const fetchChefs = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/chefs');
    const data = await response.json();
    
    // Display chefs in your HTML
    displayChefs(data.chefs);
  } catch (error) {
    console.error('Failed to fetch chefs:', error);
  }
};
```

#### 4. Book a Chef
```javascript
const bookChef = async (bookingData) => {
  try {
    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });
    
    const data = await response.json();
    alert('Booking successful!');
  } catch (error) {
    console.error('Booking failed:', error);
  }
};

// Usage
bookChef({
  userId: 1,
  chefId: 2,
  date: "2024-01-20",
  time: "19:00"
});
```

## 🔄 CORS Configuration
The backend includes CORS middleware to allow frontend connections from different ports (e.g., frontend on port 3000, backend on port 5000).

## 💾 Storage Options

### In-Memory Storage (Default)
- Data stored in JavaScript arrays
- Perfect for development and testing
- Data resets when server restarts

### MongoDB Storage (Upgrade)
- Persistent data storage
- Production-ready
- Change `USE_MONGODB = true` in controllers

## 🎓 Interview Explanation

**"How does this backend work?"**

1. **Server Setup**: Express.js server runs on port 5000
2. **Routes**: Different endpoints for users, chefs, and bookings
3. **Controllers**: Business logic separated from routes
4. **Models**: Data structure defined for both in-memory and MongoDB
5. **Middleware**: CORS for frontend connection, JSON parsing
6. **Authentication**: JWT tokens for user sessions

**"What technologies are used?"**
- Node.js (runtime)
- Express.js (web framework)
- MongoDB + Mongoose (database)
- bcryptjs (password hashing)
- jsonwebtoken (authentication)
- CORS (cross-origin requests)

## 🔧 Development Tips

1. **Start Simple**: Use in-memory storage first
2. **Test APIs**: Use Postman or browser for testing
3. **Add MongoDB**: When ready for persistent storage
4. **Error Handling**: Always include try-catch blocks
5. **Security**: Hash passwords, use JWT tokens

## 🚀 Next Steps

1. Add input validation
2. Implement user authorization middleware
3. Add chef ratings and reviews
4. Create booking status updates
5. Add email notifications
6. Deploy to cloud (Heroku, AWS, etc.)

---
**Built for learning and interviews! 🎯**