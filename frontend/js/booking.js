// Global variables
let selectedChef = null;
let availableChefs = [];

console.log('booking.js loading...');

// Test function to verify buttons work
function testButtonClick() {
    console.log('Button click test - this function works!');
    alert('Button click test successful!');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing page...');
    try {
        checkUserAuth();
        loadChefs();
        setMinDate();
        console.log('Page initialization complete');
    } catch (error) {
        console.error('Error during page initialization:', error);
    }
});

// Check if user is already logged in
function checkUserAuth() {
    if (HomeChefAPI.isLoggedIn()) {
        const user = HomeChefAPI.getStoredUser();
        showUserDashboard(user);
        showChefSelection();
    } else {
        showAuthSection();
    }
}

// Set minimum date to today
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        dateInput.min = today;
    }
}

// Authentication Functions
function showLogin() {
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('registerTab').classList.remove('active');
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    clearAuthMessage();
}

function showRegister() {
    document.getElementById('registerTab').classList.add('active');
    document.getElementById('loginTab').classList.remove('active');
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    clearAuthMessage();
}

async function handleLogin() {
    console.log('handleLogin function called');
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt with:', { email, password: '***' });
    
    if (!email || !password) {
        showAuthMessage('Please fill in all fields', 'error');
        return;
    }
    
    showAuthMessage('Logging in...', 'info');
    
    const result = await HomeChefAPI.loginUser({ email, password });
    
    console.log('Login result:', result);
    
    if (result.success) {
        showAuthMessage('Login successful!', 'success');
        setTimeout(() => {
            showUserDashboard(result.data.user);
            showChefSelection();
        }, 1000);
    } else {
        showAuthMessage(result.data?.message || result.error || 'Login failed', 'error');
    }
}

async function handleRegister() {
    console.log('handleRegister function called');
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    console.log('Register attempt with:', { name, email, password: '***' });
    
    if (!name || !email || !password) {
        showAuthMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAuthMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    showAuthMessage('Creating account...', 'info');
    
    const result = await HomeChefAPI.registerUser({ name, email, password });
    
    console.log('Register result:', result);
    
    if (result.success) {
        showAuthMessage('Registration successful!', 'success');
        setTimeout(() => {
            showUserDashboard(result.data.user);
            showChefSelection();
        }, 1000);
    } else {
        showAuthMessage(result.data?.message || result.error || 'Registration failed', 'error');
    }
}

function showAuthMessage(message, type) {
    const messageDiv = document.getElementById('authMessage');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
}

function clearAuthMessage() {
    const messageDiv = document.getElementById('authMessage');
    messageDiv.textContent = '';
    messageDiv.className = 'message';
}

// UI Display Functions
function showAuthSection() {
    document.getElementById('authSection').style.display = 'block';
    document.getElementById('chefSection').style.display = 'none';
    document.getElementById('bookingSection').style.display = 'none';
    document.getElementById('userDashboard').style.display = 'none';
}

function showUserDashboard(user) {
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userDashboard').style.display = 'block';
    document.getElementById('authSection').style.display = 'none';
}

function showChefSelection() {
    document.getElementById('chefSection').style.display = 'block';
    loadChefs();
}

function showBookingForm() {
    document.getElementById('bookingSection').style.display = 'block';
}

// Chef Management
async function loadChefs() {
    const result = await HomeChefAPI.getChefs();
    
    if (result.success) {
        availableChefs = result.data || [];
        displayChefs(availableChefs);
    } else {
        console.error('Failed to load chefs:', result.error);
        // Show default chefs if API fails
        displayDefaultChefs();
    }
}

function displayChefs(chefs) {
    const chefsList = document.getElementById('chefsList');
    
    if (chefs.length === 0) {
        chefsList.innerHTML = '<p>No chefs available at the moment.</p>';
        return;
    }
    
    chefsList.innerHTML = chefs.map(chef => `
        <div class="chef-card" onclick="selectChef('${chef._id || chef.id}', '${chef.name}', '${chef.specialization}')">
            <div class="chef-info">
                <h3>${chef.name}</h3>
                <p><strong>Specialization:</strong> ${chef.specialization}</p>
                <p><strong>Experience:</strong> ${chef.experience} years</p>
                <div class="chef-rating">
                    <i class='bx bxs-star'></i>
                    <span>4.${Math.floor(Math.random() * 5) + 5}</span>
                </div>
            </div>
            <button class="select-chef-btn">Select Chef</button>
        </div>
    `).join('');
}

function displayDefaultChefs() {
    const defaultChefs = [
        { id: 1, name: "Marco Rodriguez", specialization: "Italian Cuisine", experience: 8 },
        { id: 2, name: "Sarah Chen", specialization: "Asian Fusion", experience: 6 },
        { id: 3, name: "David Thompson", specialization: "French Cuisine", experience: 12 },
        { id: 4, name: "Priya Sharma", specialization: "Indian Cuisine", experience: 5 }
    ];
    displayChefs(defaultChefs);
}

function selectChef(chefId, chefName, specialization) {
    selectedChef = { id: chefId, name: chefName, specialization };
    
    // Update the booking form
    document.getElementById('selectedChef').value = `${chefName} - ${specialization}`;
    document.getElementById('selectedChefId').value = chefId;
    
    // Highlight selected chef
    document.querySelectorAll('.chef-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    showBookingForm();
    
    // Scroll to booking form
    document.getElementById('bookingSection').scrollIntoView({ behavior: 'smooth' });
}

// Booking Management
async function handleBooking(event) {
    event.preventDefault();
    
    if (!selectedChef) {
        showBookingMessage('Please select a chef first', 'error');
        return;
    }
    
    const user = HomeChefAPI.getStoredUser();
    if (!user) {
        showBookingMessage('Please log in to make a booking', 'error');
        return;
    }
    
    const bookingData = {
        userId: user.id,
        chefId: selectedChef.id,
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        cuisine: document.getElementById('cuisine').value,
        address: document.getElementById('address').value,
        specialRequests: document.getElementById('specialRequests').value
    };
    
    // Validate required fields
    if (!bookingData.date || !bookingData.time || !bookingData.address) {
        showBookingMessage('Please fill in all required fields', 'error');
        return;
    }
    
    showBookingMessage('Creating your booking...', 'info');
    
    const result = await HomeChefAPI.createBooking(bookingData);
    
    if (result.success) {
        showBookingMessage('🎉 Booking confirmed! Your chef will contact you soon.', 'success');
        
        // Show booking details
        setTimeout(() => {
            showBookingConfirmation(bookingData, selectedChef);
        }, 2000);
        
        // Reset form
        document.getElementById('bookingForm').reset();
        selectedChef = null;
        
    } else {
        showBookingMessage(result.data?.message || result.error || 'Booking failed. Please try again.', 'error');
    }
}

function showBookingMessage(message, type) {
    const messageDiv = document.getElementById('bookingMessage');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    
    // Auto-clear success messages
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 5000);
    }
}

function showBookingConfirmation(bookingData, chef) {
    const confirmationHTML = `
        <div class="booking-confirmation">
            <h3>🎉 Booking Confirmed!</h3>
            <div class="confirmation-details">
                <p><strong>Chef:</strong> ${chef.name}</p>
                <p><strong>Specialization:</strong> ${chef.specialization}</p>
                <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${bookingData.time}</p>
                <p><strong>Cuisine:</strong> ${bookingData.cuisine || 'As per chef specialty'}</p>
                <p><strong>Address:</strong> ${bookingData.address}</p>
                ${bookingData.specialRequests ? `<p><strong>Special Requests:</strong> ${bookingData.specialRequests}</p>` : ''}
            </div>
            <p class="confirmation-note">Your chef will contact you within 24 hours to confirm the details and discuss the menu.</p>
            <button onclick="bookAnother()" class="book-another-btn">Book Another Chef</button>
        </div>
    `;
    
    document.getElementById('bookingMessage').innerHTML = confirmationHTML;
}

function bookAnother() {
    // Reset the form and show chef selection
    document.getElementById('bookingMessage').innerHTML = '';
    document.getElementById('bookingSection').style.display = 'none';
    selectedChef = null;
    
    // Clear selected chef highlighting
    document.querySelectorAll('.chef-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Scroll back to chef selection
    document.getElementById('chefSection').scrollIntoView({ behavior: 'smooth' });
}

// Utility Functions
function logout() {
    HomeChefAPI.logout();
    selectedChef = null;
    
    // Reset booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) bookingForm.reset();
    
    // Clear login form
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    
    // Clear register form
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    
    // Show auth section
    showAuthSection();
    showLogin();
}

// Format date for display
function formatDate(dateString) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}