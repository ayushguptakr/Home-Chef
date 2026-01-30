// API Configuration
const API_BASE = 'http://localhost:3002/api';

// API Helper Functions
class HomeChefAPI {
    // User Authentication
    static async registerUser(userData) {
        console.log('API: registerUser called with:', userData);
        try {
            console.log('API: Making request to:', `${API_BASE}/users/register`);
            const response = await fetch(`${API_BASE}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            console.log('API: Register response:', { status: response.status, data });
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            return { success: response.ok, data };
        } catch (error) {
            console.error('API: Register error:', error);
            return { success: false, error: error.message };
        }
    }

    static async loginUser(credentials) {
        console.log('API: loginUser called with:', credentials);
        try {
            console.log('API: Making request to:', `${API_BASE}/users/login`);
            const response = await fetch(`${API_BASE}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            console.log('API: Login response:', { status: response.status, data });
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            return { success: response.ok, data };
        } catch (error) {
            console.error('API: Login error:', error);
            return { success: false, error: error.message };
        }
    }

    // Chef Management
    static async getChefs() {
        try {
            const response = await fetch(`${API_BASE}/chefs`);
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async addChef(chefData) {
        try {
            const response = await fetch(`${API_BASE}/chefs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(chefData)
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Booking Management
    static async createBooking(bookingData) {
        try {
            const response = await fetch(`${API_BASE}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Utility Functions
    static getStoredUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    static isLoggedIn() {
        return !!this.getToken();
    }
}