// Chef booking system for form.html
let selectedChef = null;
let availableChefs = [];
let currentUser = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    checkUserAuth();
    loadChefs();
    setMinDate();
    checkPreSelectedChef();
});

// Check for pre-selected chef from URL
function checkPreSelectedChef() {
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedChef = urlParams.get('chef');
    
    if (preSelectedChef) {
        console.log('Pre-selected chef:', preSelectedChef);
        // Wait for chefs to load, then auto-select
        setTimeout(() => {
            const chefCards = document.querySelectorAll('.chef-card');
            console.log('Found chef cards:', chefCards.length);
            
            chefCards.forEach(card => {
                const chefNameElement = card.querySelector('h3');
                if (chefNameElement) {
                    const chefName = chefNameElement.textContent.trim();
                    console.log('Checking chef:', chefName);
                    
                    if (chefName === preSelectedChef || chefName.includes(preSelectedChef)) {
                        console.log('Auto-selecting chef:', chefName);
                        
                        // Get chef data from the card
                        const specialization = card.querySelector('p').textContent.replace('Specialization: ', '').replace('Experience:', '').trim();
                        const chefId = availableChefs.find(chef => chef.name === chefName)?._id || chefName;
                        
                        // Auto-select this chef
                        selectChef(chefId, chefName, specialization);
                        return;
                    }
                }
            });
        }, 2000);
    }
}

// Check if user is logged in
function checkUserAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        currentUser = JSON.parse(user);
        showUserInfo();
        showChefSection();
    } else {
        showLoginRequired();
    }
}

// Show user info
function showUserInfo() {
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userInfo').style.display = 'block';
}

// Show login required message
function showLoginRequired() {
    document.getElementById('loginRequired').style.display = 'block';
    document.getElementById('chefSection').style.display = 'none';
}

// Show auth forms
function showAuthForms() {
    document.getElementById('loginRequired').style.display = 'none';
    document.getElementById('authForms').style.display = 'block';
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
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showAuthMessage('Please fill in all fields', 'error');
        return;
    }
    
    showAuthMessage('Logging in...', 'info');
    
    try {
        const response = await fetch('http://localhost:3002/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            currentUser = data.user;
            showAuthMessage('Login successful!', 'success');
            setTimeout(() => {
                document.getElementById('authForms').style.display = 'none';
                showUserInfo();
                showChefSection();
            }, 1000);
        } else {
            showAuthMessage(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        showAuthMessage('Network error. Please try again.', 'error');
    }
}

async function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (!name || !email || !password) {
        showAuthMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAuthMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    showAuthMessage('Creating account...', 'info');
    
    try {
        const response = await fetch('http://localhost:3002/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            currentUser = data.user;
            showAuthMessage('Registration successful!', 'success');
            setTimeout(() => {
                document.getElementById('authForms').style.display = 'none';
                showUserInfo();
                showChefSection();
            }, 1000);
        } else {
            showAuthMessage(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        showAuthMessage('Network error. Please try again.', 'error');
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

// Show chef selection
function showChefSection() {
    document.getElementById('chefSection').style.display = 'block';
    document.getElementById('loginRequired').style.display = 'none';
}

// Set minimum date to today
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        dateInput.min = today;
    }
}

// Load chefs from API
async function loadChefs() {
    try {
        const response = await fetch('http://localhost:3002/api/chefs');
        const chefs = await response.json();
        
        if (response.ok) {
            availableChefs = chefs;
            displayChefs(availableChefs);
        } else {
            console.error('Failed to load chefs');
            displayDefaultChefs();
        }
    } catch (error) {
        console.error('Error loading chefs:', error);
        displayDefaultChefs();
    }
}

// Chef image mapping
function getChefImage(chefName) {
    const imageMap = {
        'Sumit Kumar': 'img/x3.png',
        'Sunita Singh': 'img/x7.png', 
        'Soniya Bansal': 'img/x9.png',
        'Alisha': 'img/x1.png'
    };
    return imageMap[chefName] || 'img/x3.png'; // Default image
}

// Display chefs
function displayChefs(chefs) {
    const chefsList = document.getElementById('chefsList');
    
    if (chefs.length === 0) {
        chefsList.innerHTML = '<p>No chefs available at the moment.</p>';
        return;
    }
    
    chefsList.innerHTML = chefs.map(chef => `
        <div class="chef-card" onclick="selectChef('${chef._id || chef.id}', '${chef.name}', '${chef.specialization}')">
            <img src="${getChefImage(chef.name)}" alt="${chef.name}" class="chef-image">
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
    
    // Check for pre-selected chef after displaying
    setTimeout(() => checkPreSelectedChef(), 500);
}

// Display default chefs if API fails
function displayDefaultChefs() {
    const defaultChefs = [
        { id: 1, name: "Marco Rodriguez", specialization: "Italian Cuisine", experience: 8 },
        { id: 2, name: "Sarah Chen", specialization: "Asian Fusion", experience: 6 },
        { id: 3, name: "David Thompson", specialization: "French Cuisine", experience: 12 },
        { id: 4, name: "Priya Sharma", specialization: "Indian Cuisine", experience: 5 }
    ];
    displayChefs(defaultChefs);
}

// Select a chef
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

// Show booking form
function showBookingForm() {
    document.getElementById('bookingSection').style.display = 'block';
}

// Handle booking submission
async function handleBooking(event) {
    event.preventDefault();
    
    if (!selectedChef) {
        showBookingMessage('Please select a chef first', 'error');
        return;
    }
    
    if (!currentUser) {
        showBookingMessage('Please log in to make a booking', 'error');
        return;
    }
    
    const bookingData = {
        userId: currentUser.id,
        chefId: selectedChef.id,
        contactNumber: document.getElementById('contactNumber').value,
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        cuisine: document.getElementById('cuisine').value,
        address: document.getElementById('address').value,
        specialRequests: document.getElementById('specialRequests').value
    };
    
    // Validate required fields
    if (!bookingData.contactNumber || !bookingData.date || !bookingData.time || !bookingData.address) {
        showBookingMessage('Please fill in all required fields', 'error');
        return;
    }
    
    showBookingMessage('Creating your booking...', 'info');
    
    try {
        const response = await fetch('http://localhost:3002/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showBookingMessage('🎉 Booking confirmed! Your chef will contact you soon.', 'success');
            
            // Show booking details
            setTimeout(() => {
                showBookingConfirmation(bookingData, selectedChef);
            }, 2000);
            
            // Reset form
            document.getElementById('bookingForm').reset();
            selectedChef = null;
            
        } else {
            showBookingMessage(data.message || 'Booking failed. Please try again.', 'error');
        }
    } catch (error) {
        showBookingMessage('Network error. Please try again.', 'error');
    }
}

// Show booking message
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

// Show booking confirmation
function showBookingConfirmation(bookingData, chef) {
    const confirmationHTML = `
        <div class="booking-confirmation">
            <h3>🎉 Booking Confirmed!</h3>
            <div class="confirmation-details">
                <p><strong>Chef:</strong> ${chef.name}</p>
                <p><strong>Specialization:</strong> ${chef.specialization}</p>
                <p><strong>Contact:</strong> ${bookingData.contactNumber}</p>
                <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${bookingData.time}</p>
                <p><strong>Cuisine:</strong> ${bookingData.cuisine || 'As per chef specialty'}</p>
                <p><strong>Address:</strong> ${bookingData.address}</p>
                ${bookingData.specialRequests ? `<p><strong>Special Requests:</strong> ${bookingData.specialRequests}</p>` : ''}
            </div>
            <p class="confirmation-note">Your chef will contact you at ${bookingData.contactNumber} within 24 hours to confirm the details and discuss the menu.</p>
            <button onclick="bookAnother()" class="book-another-btn">Book Another Chef</button>
        </div>
    `;
    
    document.getElementById('bookingMessage').innerHTML = confirmationHTML;
}

// Book another chef
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