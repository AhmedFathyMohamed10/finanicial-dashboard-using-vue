<!-- src/views/Signup.vue -->
<template>
    <div class="auth-page">
        <!-- Left Side - Signup Form -->
        <div class="auth-content">
            <div class="auth-form-container">
                <!-- Header -->
                <div class="auth-header">
                    <h1>Create Account</h1>
                    <p>Join us and start your journey</p>
                </div>

                <!-- Signup Form -->
                <form @submit.prevent="handleSignup" class="auth-form">
                    <!-- Name Fields -->
                    <div class="name-fields">
                        <div class="form-group">
                            <label for="firstName">First Name</label>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text" id="firstName" v-model="formData.firstName" placeholder="First name"
                                    :class="{ 'error': errors.firstName }" @input="clearError('firstName')">
                            </div>
                            <span class="error-message" v-if="errors.firstName">
                                {{ errors.firstName }}
                            </span>
                        </div>

                        <div class="form-group">
                            <label for="lastName">Last Name</label>
                            <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text" id="lastName" v-model="formData.lastName" placeholder="Last name"
                                    :class="{ 'error': errors.lastName }" @input="clearError('lastName')">
                            </div>
                            <span class="error-message" v-if="errors.lastName">
                                {{ errors.lastName }}
                            </span>
                        </div>
                    </div>

                    <!-- Email Field -->
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <div class="input-field">
                            <i class="fas fa-envelope"></i>
                            <input type="email" id="email" v-model="formData.email" placeholder="Enter your email"
                                :class="{ 'error': errors.email }" @input="clearError('email')">
                        </div>
                        <span class="error-message" v-if="errors.email">
                            {{ errors.email }}
                        </span>
                    </div>

                    <!-- Password Field -->
                    <div class="form-group">
                        <label for="password">Password</label>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="formData.password"
                                placeholder="Create password" :class="{ 'error': errors.password }"
                                @input="clearError('password')">
                            <button type="button" class="toggle-password" @click="togglePassword">
                                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                            </button>
                        </div>
                        <span class="error-message" v-if="errors.password">
                            {{ errors.password }}
                        </span>
                        <!-- Password Strength Indicator -->
                        <div class="password-strength" v-if="formData.password">
                            <div class="strength-bars">
                                <div v-for="n in 4" :key="n" class="strength-bar"
                                    :class="{ 'active': passwordStrength >= n }"></div>
                            </div>
                            <span class="strength-text">{{ strengthText }}</span>
                        </div>
                    </div>

                    <!-- Confirm Password Field -->
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input :type="showPassword ? 'text' : 'password'" id="confirmPassword"
                                v-model="formData.confirmPassword" placeholder="Confirm password"
                                :class="{ 'error': errors.confirmPassword }" @input="clearError('confirmPassword')">
                        </div>
                        <span class="error-message" v-if="errors.confirmPassword">
                            {{ errors.confirmPassword }}
                        </span>
                    </div>

                    <!-- Terms and Conditions -->
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" v-model="formData.acceptTerms" @change="clearError('acceptTerms')">
                            <span class="checkmark"></span>
                            <span class="terms-text">
                                I agree to the
                                <a href="#" @click.prevent="showTerms">Terms of Service</a>
                                and
                                <a href="#" @click.prevent="showPrivacy">Privacy Policy</a>
                            </span>
                        </label>
                        <span class="error-message" v-if="errors.acceptTerms">
                            {{ errors.acceptTerms }}
                        </span>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="submit-btn" :disabled="isLoading">
                        <span v-if="!isLoading">Create Account</span>
                        <span v-else class="loader"></span>
                    </button>

                    <!-- Social Signup -->
                    <div class="social-signup">
                        <div class="divider">
                            <span>Or sign up with</span>
                        </div>
                        <div class="social-buttons">
                            <button type="button" class="social-btn google" @click="socialSignup('google')">
                                <i class="fab fa-google"></i>
                                Google
                            </button>
                            <button type="button" class="social-btn github" @click="socialSignup('github')">
                                <i class="fab fa-github"></i>
                                GitHub
                            </button>
                        </div>
                    </div>

                    <!-- Login Link -->
                    <p class="login-text">
                        Already have an account?
                        <router-link to="/login" class="login-link">
                            Sign in
                        </router-link>
                    </p>
                </form>
            </div>
        </div>

        <!-- Right Side - Image -->
        <div class="auth-image">
            <div class="image-overlay"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignupPage',
    data() {
        return {
            formData: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: false
            },
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: ''
            },
            showPassword: false,
            isLoading: false
        }
    },
    computed: {
        passwordStrength() {
            let strength = 0
            const password = this.formData.password

            if (password.length >= 8) strength++
            if (/[A-Z]/.test(password)) strength++
            if (/[0-9]/.test(password)) strength++
            if (/[^A-Za-z0-9]/.test(password)) strength++

            return strength
        },
        strengthText() {
            const strength = this.passwordStrength
            if (strength === 0) return 'Weak'
            if (strength === 1) return 'Fair'
            if (strength === 2) return 'Good'
            if (strength === 3) return 'Strong'
            return 'Very Strong'
        }
    },
    methods: {
        validateForm() {
            let isValid = true
            this.errors = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                acceptTerms: ''
            }

            // First Name validation
            if (!this.formData.firstName.trim()) {
                this.errors.firstName = 'First name is required'
                isValid = false
            }

            // Last Name validation
            if (!this.formData.lastName.trim()) {
                this.errors.lastName = 'Last name is required'
                isValid = false
            }

            // Email validation
            if (!this.formData.email) {
                this.errors.email = 'Email is required'
                isValid = false
            } else if (!this.validateEmail(this.formData.email)) {
                this.errors.email = 'Please enter a valid email'
                isValid = false
            }

            // Password validation
            if (!this.formData.password) {
                this.errors.password = 'Password is required'
                isValid = false
            } else if (this.formData.password.length < 8) {
                this.errors.password = 'Password must be at least 8 characters'
                isValid = false
            }

            // Confirm Password validation
            if (!this.formData.confirmPassword) {
                this.errors.confirmPassword = 'Please confirm your password'
                isValid = false
            } else if (this.formData.password !== this.formData.confirmPassword) {
                this.errors.confirmPassword = 'Passwords do not match'
                isValid = false
            }

            // Terms acceptance validation
            if (!this.formData.acceptTerms) {
                this.errors.acceptTerms = 'You must accept the terms and conditions'
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
        async handleSignup() {
            if (!this.validateForm()) return

            this.isLoading = true
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500))

                // Handle successful signup
                console.log('Signup successful', this.formData)
                this.$router.push('/dashboard')
            } catch (error) {
                console.error('Signup failed:', error)
            } finally {
                this.isLoading = false
            }
        },
        socialSignup(provider) {
            console.log(`Signup with ${provider}`)
            // Implement social signup logic
        },
        showTerms() {
            console.log('Show terms')
            // Implement terms modal
        },
        showPrivacy() {
            console.log('Show privacy policy')
            // Implement privacy policy modal
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

.name-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 4px;
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
    width: 100%;
}

.input-field i {
    position: absolute;
    left: 16px;
    color: #95a5a6;
    font-size: 16px;
    z-index: 1;
}

.input-field input {
    width: 100%;
    padding: 12px 16px 12px 45px;
    padding-right: 45px; 
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
    z-index: 2; /* Add z-index to ensure it's above the input */
    width: 24px; /* Add fixed width */
    height: 24px; /* Add fixed height */
}

.toggle-password:hover {
    color: #2c3e50;
}

/* Optional: Add a subtle background on hover */
.toggle-password:hover {
    background-color: #f8f9fa;
    border-radius: 50%;
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

.error-message {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 4px;
    display: block;
}

.input-field input.error {
    border-color: #e74c3c;
    background-color: #fff5f5;
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
.social-signup {
    text-align: center;
    margin-top: 20px;
}

.social-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 20px;
}

.social-btn {
    padding: 12px 24px;
    width: auto;
    height: auto;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    background: white;
    color: #2c3e50;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 140px;
}

.social-btn i {
    font-size: 18px;
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

.name-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.password-strength {
    margin-top: 12px;
}

.strength-bars {
    display: flex;
    gap: 4px;
    margin-bottom: 6px;
}

.strength-bar {
    height: 4px;
    flex: 1;
    background-color: #e9ecef;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.strength-text {
    font-size: 12px;
    color: #7f8c8d;
    display: block;
    text-align: right;
}
.strength-bar.active:nth-child(1) {
    background-color: #e74c3c;
}

.strength-bar.active:nth-child(2) {
    background-color: #f39c12;
}

.strength-bar.active:nth-child(3) {
    background-color: #3498db;
}

.strength-bar.active:nth-child(4) {
    background-color: #27ae60;
}

.strength-text {
    font-size: 12px;
    color: #7f8c8d;
}

.checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    padding: 4px 0;
}

.checkbox-label input[type="checkbox"] {
    display: none;
}

.checkmark {
    min-width: 20px;
    height: 20px;
    border: 2px solid #e9ecef;
    border-radius: 6px;
    display: inline-block;
    position: relative;
    transition: all 0.3s ease;
    margin-top: 2px;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
    background-color: #3498db;
    border-color: #3498db;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
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

.terms-text {
    font-size: 14px;
    color: #2c3e50;
    line-height: 1.6;
}

.terms-text a {
    color: #3498db;
    text-decoration: none;
}

.terms-text a:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .auth-content {
        padding: 20px;
    }

    .auth-form-container {
        max-width: 100%;
    }

    .name-fields {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .social-buttons {
        flex-direction: column;
        gap: 12px;
    }

    .social-btn {
        width: 100%;
        justify-content: center;
    }

    .checkbox-label {
        align-items: flex-start;
    }

    .terms-text {
        font-size: 13px;
    }
}

@media (max-width: 480px) {
    .auth-content {
        padding: 16px;
    }

    .auth-header h1 {
        font-size: 24px;
    }

    .auth-header p {
        font-size: 14px;
    }
}
</style>