<!-- src/views/Login.vue -->
<template>
    <div class="auth-page">
        <!-- Left Side - Login Form -->
        <div class="auth-content">
            <div class="auth-form-container">
                <!-- Header -->
                <div class="auth-header">
                    <h1>Welcome Back!</h1>
                    <p>Enter your credentials to access your account</p>
                </div>

                <!-- Login Form -->
                <form @submit.prevent="handleLogin" class="auth-form">
                    <!-- Email Field -->
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <div class="input-field">
                            <i class="fas fa-envelope"></i>
                            <input type="email" id="email" v-model="credentials.email" placeholder="Enter your email"
                                :class="{ 'error': errors.email }" @input="clearError('email')">
                        </div>
                        <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input :type="showPassword ? 'text' : 'password'" id="password"
                                v-model="credentials.password" placeholder="Enter your password"
                                :class="{ 'error': errors.password }" @input="clearError('password')">
                            <button type="button" class="toggle-password" @click="togglePassword">
                                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                            </button>
                        </div>
                        <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
                    </div>


                    <!-- Remember & Forgot -->
                    <div class="form-options">
                        <label class="remember-me">
                            <input type="checkbox" v-model="credentials.remember">
                            <span class="checkmark"></span>
                            Remember me
                        </label>
                        <router-link to="/forgot-password" class="forgot-link">
                            Forgot password?
                        </router-link>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="submit-btn" :disabled="isLoading">
                        <span v-if="!isLoading">Sign In</span>
                        <span v-else class="loader"></span>
                    </button>

                    <!-- Social Login -->
                    <div class="social-login">
                        <div class="divider">
                            <span>Or continue with</span>
                        </div>
                        <div class="social-buttons">
                            <button type="button" class="social-btn google" @click="socialLogin('google')">
                                <i class="fab fa-google"></i>
                            </button>
                            <button type="button" class="social-btn github" @click="socialLogin('github')">
                                <i class="fab fa-github"></i>
                            </button>
                            <button type="button" class="social-btn microsoft" @click="socialLogin('microsoft')">
                                <i class="fab fa-microsoft"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Sign Up Link -->
                    <p class="signup-text">
                        Don't have an account?
                        <router-link to="/signup" class="signup-link">
                            Sign up
                        </router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            credentials: {
                email: '',
                password: '',
                remember: false
            },
            errors: {
                email: '',
                password: ''
            },
            showPassword: false,
            isLoading: false
        }
    },
    methods: {
        validateForm() {
            let isValid = true
            this.errors = {
                email: '',
                password: ''
            }

            // Email validation
            if (!this.credentials.email) {
                this.errors.email = 'Email is required'
                isValid = false
            } else if (!this.validateEmail(this.credentials.email)) {
                this.errors.email = 'Please enter a valid email'
                isValid = false
            }

            // Password validation
            if (!this.credentials.password) {
                this.errors.password = 'Password is required'
                isValid = false
            } else if (this.credentials.password.length < 6) {
                this.errors.password = 'Password must be at least 6 characters'
                isValid = false
            }

            return isValid
        },
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return re.test(email)
        },
        clearError(field) {
            this.errors[field] = ''
        },
        togglePassword() {
            this.showPassword = !this.showPassword
        },
        async handleLogin() {
            if (!this.validateForm()) return

            this.isLoading = true
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500))

                // Handle successful login
                console.log('Login successful', this.credentials)
                this.$router.push('/dashboard')
            } catch (error) {
                console.error('Login failed:', error)
            } finally {
                this.isLoading = false
            }
        },
        socialLogin(provider) {
            console.log(`Login with ${provider}`)
            // Implement social login logic
        }
    }
}
</script>

<style scoped>
.auth-page {
    min-height: 100vh;
    display: flex;
    background-color: #f8f9fa;
}

.auth-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
}

.auth-form-container {
    width: 100%;
    max-width: 420px;
}

.auth-header {
    text-align: center;
    margin-bottom: 40px;
}

.auth-header h1 {
    font-size: 32px;
    color: #2c3e50;
    margin-bottom: 12px;
}

.auth-header p {
    color: #7f8c8d;
    font-size: 16px;
}

.auth-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-size: 14px;
    color: #2c3e50;
    font-weight: 500;
}

.input-field {
    position: relative; 
    display: flex;
    align-items: center;
}

.input-field input {
    width: 100%;
    padding: 12px 16px; 
    padding-right: 40px; 
    padding-left: 40px; 
    border: 2px solid #e9ecef;
    border-radius: 12px;
    font-size: 14px;
    transition: all 0.3s ease;
    background-color: white;
}

.input-field input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1);
}

.input-field input.error {
    border-color: #e74c3c;
}

.input-field .fas.fa-envelope {
    position: absolute; 
    left: 16px; 
    color: #95a5a6;
    font-size: 16px;
}

.input-field .fas.fa-lock {
    position: absolute; 
    left: 16px; 
    color: #95a5a6;
    font-size: 16px;
}

.toggle-password {
    position: absolute; 
    right: 16px; 
    top: 50%; 
    transform: translateY(-50%); 
    background: none;
    border: none;
    color: #95a5a6;
    cursor: pointer;
    padding: 0;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}


.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.remember-me {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    color: #2c3e50;
}

.remember-me input {
    display: none;
}

.checkmark {
    width: 18px;
    height: 18px;
    border: 2px solid #e9ecef;
    border-radius: 4px;
    display: inline-block;
    position: relative;
}

.remember-me input:checked+.checkmark {
    background-color: #3498db;
    border-color: #3498db;
}

.remember-me input:checked+.checkmark::after {
    content: '\f00c';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    color: white;
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.forgot-link {
    color: #3498db;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
}

.forgot-link:hover {
    color: #2980b9;
}

.submit-btn {
    width: 100%;
    padding: 14px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
}

.submit-btn:hover:not(:disabled) {
    background-color: #2980b9;
    transform: translateY(-1px);
}

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.loader {
    width: 20px;
    height: 20px;
    border: 3px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.social-login {
    text-align: center;
}

.divider {
    position: relative;
    margin: 20px 0;
}

.divider::before,
.divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: calc(50% - 90px);
    height: 1px;
    background-color: #e9ecef;
}

.divider::before {
    left: 0;
}

.divider::after {
    right: 0;
}

.divider span {
    background-color: #f8f9fa;
    padding: 0 16px;
    color: #7f8c8d;
    font-size: 14px;
}

.social-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
}

.social-btn {
    width: 48px;
    height: 48px;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    background: white;
    color: #2c3e50;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.social-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.social-btn.google {
    color: #ea4335;
}

.social-btn.github {
    color: #24292e;
}

.social-btn.microsoft {
    color: #00a4ef;
}

.signup-text {
    text-align: center;
    font-size: 14px;
    color: #7f8c8d;
}

.signup-link {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.signup-link:hover {
    color: #2980b9;
}

@media (max-width: 768px) {
    .auth-content {
        padding: 24px;
    }

    .auth-header h1 {
        font-size: 28px;
    }

    .form-options {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
    }

    .social-buttons {
        flex-wrap: wrap;
    }

    .social-btn {
        flex: 1;
        min-width: 100px;
    }
}
</style>