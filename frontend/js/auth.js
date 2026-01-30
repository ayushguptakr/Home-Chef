// Authentication system for index.html
class AuthSystem {
    constructor() {
        this.modal = null;
        this.currentUser = null;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
        this.checkUserAuth();
    }

    createModal() {
        const modalHTML = `
            <div id="authModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="close">&times;</span>
                        <h2>Welcome to HomeChef</h2>
                    </div>
                    <div class="modal-body">
                        <div class="auth-tabs">
                            <button class="tab-btn active" data-tab="login">Login</button>
                            <button class="tab-btn" data-tab="signup">Sign Up</button>
                        </div>
                        
                        <div id="loginForm" class="auth-form active">
                            <input type="email" id="loginEmail" placeholder="Email" required>
                            <input type="password" id="loginPassword" placeholder="Password" required>
                            <button onclick="authSystem.handleLogin()">Login</button>
                        </div>
                        
                        <div id="signupForm" class="auth-form">
                            <input type="text" id="signupName" placeholder="Full Name" required>
                            <input type="email" id="signupEmail" placeholder="Email" required>
                            <input type="password" id="signupPassword" placeholder="Password" required>
                            <button onclick="authSystem.handleSignup()">Sign Up</button>
                        </div>
                        
                        <div id="authMessage" class="auth-message"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('authModal');
    }

    bindEvents() {
        // Close modal
        document.querySelector('.close').onclick = () => this.closeModal();
        window.onclick = (event) => {
            if (event.target === this.modal) this.closeModal();
        };

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = () => this.switchTab(btn.dataset.tab);
        });

        // Profile dropdown
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-profile')) {
                document.querySelector('.profile-dropdown')?.classList.remove('show');
            }
        });
    }

    switchTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`${tab}Form`).classList.add('active');
        this.clearMessage();
    }

    openModal() {
        this.modal.style.display = 'block';
        this.clearMessage();
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.clearForms();
    }

    clearForms() {
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('signupName').value = '';
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPassword').value = '';
    }

    showMessage(message, type) {
        const messageDiv = document.getElementById('authMessage');
        messageDiv.textContent = message;
        messageDiv.className = `auth-message ${type}`;
    }

    clearMessage() {
        const messageDiv = document.getElementById('authMessage');
        messageDiv.textContent = '';
        messageDiv.className = 'auth-message';
    }

    async handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        this.showMessage('Logging in...', 'info');

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
                this.currentUser = data.user;
                this.showMessage('Login successful!', 'success');
                setTimeout(() => {
                    this.closeModal();
                    this.updateUI();
                }, 1000);
            } else {
                this.showMessage(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            this.showMessage('Network error. Please try again.', 'error');
        }
    }

    async handleSignup() {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        if (!name || !email || !password) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        if (password.length < 6) {
            this.showMessage('Password must be at least 6 characters', 'error');
            return;
        }

        this.showMessage('Creating account...', 'info');

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
                this.currentUser = data.user;
                this.showMessage('Account created successfully!', 'success');
                setTimeout(() => {
                    this.closeModal();
                    this.updateUI();
                }, 1000);
            } else {
                this.showMessage(data.message || 'Signup failed', 'error');
            }
        } catch (error) {
            this.showMessage('Network error. Please try again.', 'error');
        }
    }

    checkUserAuth() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
            this.currentUser = JSON.parse(user);
            this.updateUI();
        }
    }

    updateUI() {
        const navIcons = document.querySelector('.nav-icons');
        
        if (this.currentUser) {
            navIcons.innerHTML = `
                <div class="user-profile active">
                    <button class="profile-btn" onclick="authSystem.toggleProfile()">
                        <i class='bx bx-user'></i>
                    </button>
                    <div class="profile-dropdown">
                        <div class="profile-info">
                            <h4>${this.currentUser.name}</h4>
                            <p>${this.currentUser.email}</p>
                        </div>
                        <div class="profile-actions">
                            <button class="book-chef-btn" onclick="window.open('form.html', '_blank')">Book a Chef</button>
                            <button class="logout-btn" onclick="authSystem.logout()">Logout</button>
                        </div>
                    </div>
                </div>
                <i class="bx bx-menu" id="menu-icon"></i>
            `;
        } else {
            navIcons.innerHTML = `
                <a href="#" onclick="authSystem.openModal()"><i class='bx bx-user'></i></a>
                <i class="bx bx-menu" id="menu-icon"></i>
            `;
        }
    }

    toggleProfile() {
        const dropdown = document.querySelector('.profile-dropdown');
        dropdown.classList.toggle('show');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.currentUser = null;
        this.updateUI();
        document.querySelector('.profile-dropdown').classList.remove('show');
        
        // Show logout success message
        this.showLogoutMessage();
    }

    showLogoutMessage() {
        // Create temporary logout message
        const logoutMsg = document.createElement('div');
        logoutMsg.className = 'logout-message';
        logoutMsg.innerHTML = `
            <div class="logout-content">
                <i class='bx bx-check-circle'></i>
                <span>You have been logged out successfully</span>
            </div>
        `;
        document.body.appendChild(logoutMsg);
        
        // Show message
        setTimeout(() => logoutMsg.classList.add('show'), 100);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            logoutMsg.classList.remove('show');
            setTimeout(() => document.body.removeChild(logoutMsg), 300);
        }, 3000);
    }
}

// Initialize auth system when page loads
let authSystem;
document.addEventListener('DOMContentLoaded', () => {
    authSystem = new AuthSystem();
});