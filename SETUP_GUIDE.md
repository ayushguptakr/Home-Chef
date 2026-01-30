# 🍳 HomeChef - Full Stack Application Setup Guide

## Overview
HomeChef is a complete full-stack web application that connects customers with professional chefs for home-cooked meals. Built with Node.js, Express.js, MongoDB backend and HTML, CSS, JavaScript frontend.

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern gradients and animations
- **JavaScript (ES6+)** - Interactive functionality
- **Fetch API** - Backend communication

## 📋 Prerequisites

Before running the application, ensure you have:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud database)
3. **Git** (optional) - For version control

## 🚀 Installation & Setup

### Step 1: Install Dependencies

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install
```

### Step 2: Environment Configuration

The `.env` file is already configured with default values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/homechef
JWT_SECRET=homechef_secret_key_change_in_production
NODE_ENV=development
```

**For Production:** Change the JWT_SECRET to a secure random string.

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Or start manually
mongod
```

**Option B: MongoDB Atlas**
- Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create cluster and get connection string
- Update `MONGODB_URI` in `.env` file

### Step 4: Seed Database (Optional)

```bash
# Seed database with sample chefs
npm run seed
```

This will add 8 professional chefs to your database.

### Step 5: Start Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

Server will start on `http://localhost:5000`

### Step 6: Open Frontend

1. Navigate to `frontend` directory
2. Open `index.html` in your web browser
3. Or use a local server:

```bash
# Using Python (if installed)
python -m http.server 3000

# Using Node.js http-server (install globally first)
npm install -g http-server
http-server -p 3000
```

## 🎯 Application Features

### 🔐 User Authentication
- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Persistent login sessions

### 👨🍳 Chef Management
- Browse available chefs
- View chef specializations and experience
- Dynamic chef selection
- Rating display

### 📅 Booking System
- Interactive booking form
- Date and time selection
- Address and special requests
- Booking confirmation
- Real-time form validation

### 🎨 Modern UI/UX
- Responsive design for all devices
- Gradient backgrounds and animations
- Smooth transitions and hover effects
- Professional color scheme
- Intuitive navigation

## 📡 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Chefs
- `GET /api/chefs` - Get all chefs
- `POST /api/chefs` - Add new chef

### Bookings
- `POST /api/bookings` - Create booking

## 🧪 Testing the Application

### Using the API Test Page
1. Open `backend/api-test.html` in browser
2. Test all endpoints with sample data
3. Verify database operations

### Manual Testing Flow
1. **Register/Login**: Create account or login
2. **Browse Chefs**: View available chefs
3. **Select Chef**: Choose preferred chef
4. **Book Service**: Fill booking form
5. **Confirmation**: Receive booking confirmation

## 🗂️ Project Structure

```
Home Chef/
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   ├── authController.js   # User authentication
│   │   ├── chefController.js   # Chef management
│   │   └── bookingController.js # Booking system
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Chef.js            # Chef schema
│   │   ├── Booking.js         # Booking schema
│   │   └── data.js            # Sample data
│   ├── routes/
│   │   ├── auth.js            # Auth routes
│   │   ├── chefs.js           # Chef routes
│   │   └── bookings.js        # Booking routes
│   ├── .env                   # Environment variables
│   ├── server.js              # Main server file
│   ├── seed.js                # Database seeding
│   └── package.json           # Dependencies
└── frontend/
    ├── css/
    │   ├── style.css          # Main page styles
    │   └── style2.css         # Booking page styles
    ├── js/
    │   ├── script.js          # Main page functionality
    │   ├── api.js             # API integration
    │   └── booking.js         # Booking functionality
    ├── img/                   # Images and assets
    ├── index.html             # Main page
    └── form.html              # Booking page
```

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **CORS Errors**
   - Backend includes CORS middleware
   - Ensure frontend runs on different port than backend

3. **API Not Responding**
   - Check if backend server is running on port 5000
   - Verify API endpoints in browser console

4. **Frontend Not Loading Data**
   - Check browser console for errors
   - Verify API base URL in `api.js`
   - Ensure backend is running

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables
2. Use MongoDB Atlas for database
3. Update CORS settings for production domain

### Frontend Deployment (Netlify/Vercel)
1. Update API base URL to production backend
2. Deploy static files
3. Configure redirects if needed

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - feel free to use for educational and commercial purposes.

## 📞 Support

For issues or questions:
- Check troubleshooting section
- Review console logs
- Verify all dependencies are installed
- Ensure MongoDB is running

---

**🎉 Congratulations! Your HomeChef full-stack application is now ready to use!**

Enjoy connecting customers with professional chefs! 👨🍳🏠