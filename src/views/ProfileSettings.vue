<!-- src/views/ProfileSettings.vue -->
<template>
    <div class="profile-settings">
        <!-- Profile Header -->
        <div class="profile-header">
            <div class="profile-cover">
                <img :src="user.coverImage" alt="Cover" class="cover-image">
                <button class="edit-cover">
                    <i class="fas fa-camera"></i>
                    Change Cover
                </button>
            </div>
            <div class="profile-info">
                <div class="profile-avatar">
                    <img :src="user.avatar" alt="Avatar">
                    <button class="edit-avatar">
                        <i class="fas fa-camera"></i>
                    </button>
                </div>
                <div class="profile-details">
                    <h1>{{ user.name }}</h1>
                    <p>{{ user.title }}</p>
                </div>
            </div>
        </div>

        <!-- Settings Navigation -->
        <div class="settings-nav">
            <button v-for="tab in tabs" :key="tab.id" :class="['tab-btn', { active: activeTab === tab.id }]"
                @click="activeTab = tab.id">
                <i :class="tab.icon"></i>
                {{ tab.name }}
            </button>
        </div>

        <!-- Settings Content -->
        <div class="settings-content">
            <!-- Personal Information -->
            <div v-if="activeTab === 'personal'" class="settings-section">
                <h2>Personal Information</h2>
                <form @submit.prevent="updatePersonalInfo" class="settings-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>First Name</label>
                            <input type="text" v-model="personalInfo.firstName" placeholder="Enter first name">
                        </div>
                        <div class="form-group">
                            <label>Last Name</label>
                            <input type="text" v-model="personalInfo.lastName" placeholder="Enter last name">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Professional Title</label>
                        <input type="text" v-model="personalInfo.title" placeholder="e.g., Senior Developer">
                    </div>

                    <div class="form-group">
                        <label>Bio</label>
                        <textarea v-model="personalInfo.bio" placeholder="Tell us about yourself" rows="4"></textarea>
                    </div>

                    <div class="form-group">
                        <label>Location</label>
                        <input type="text" v-model="personalInfo.location" placeholder="City, Country">
                    </div>

                    <button type="submit" class="save-btn">
                        Save Changes
                    </button>
                </form>
            </div>

            <!-- Account Settings -->
            <div v-if="activeTab === 'account'" class="settings-section">
                <h2>Account Settings</h2>

                <!-- Email Settings -->
                <div class="settings-card">
                    <div class="card-header">
                        <h3>Email Addresses</h3>
                        <p>Manage your email preferences</p>
                    </div>
                    <div class="card-content">
                        <div class="email-list">
                            <div v-for="email in accountInfo.emails" :key="email.id" class="email-item">
                                <div class="email-info">
                                    <span class="email">{{ email.address }}</span>
                                    <span v-if="email.primary" class="primary-badge">
                                        Primary
                                    </span>
                                    <span v-if="!email.verified" class="verify-badge">
                                        Unverified
                                    </span>
                                </div>
                                <div class="email-actions">
                                    <button v-if="!email.verified" @click="resendVerification(email.id)"
                                        class="verify-btn">
                                        Resend Verification
                                    </button>
                                    <button v-if="!email.primary" @click="makePrimary(email.id)" class="primary-btn">
                                        Make Primary
                                    </button>
                                    <button v-if="!email.primary && canRemoveEmail(email.id)"
                                        @click="removeEmail(email.id)" class="remove-btn">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button @click="showAddEmailModal = true" class="add-email-btn">
                            <i class="fas fa-plus"></i>
                            Add Email Address
                        </button>
                    </div>
                </div>

                <!-- Password Settings -->
                <div class="settings-card">
                    <div class="card-header">
                        <h3>Password</h3>
                        <p>Update your password</p>
                    </div>
                    <div class="card-content">
                        <form @submit.prevent="updatePassword" class="password-form">
                            <div class="form-group">
                                <label>Current Password</label>
                                <div class="input-field">
                                    <input :type="showCurrentPassword ? 'text' : 'password'"
                                        v-model="passwordInfo.current" placeholder="Enter current password">
                                    <button type="button" @click="showCurrentPassword = !showCurrentPassword"
                                        class="toggle-password">
                                        <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>New Password</label>
                                <div class="input-field">
                                    <input :type="showNewPassword ? 'text' : 'password'" v-model="passwordInfo.new"
                                        placeholder="Enter new password">
                                    <button type="button" @click="showNewPassword = !showNewPassword"
                                        class="toggle-password">
                                        <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Confirm New Password</label>
                                <div class="input-field">
                                    <input :type="showConfirmPassword ? 'text' : 'password'"
                                        v-model="passwordInfo.confirm" placeholder="Confirm new password">
                                    <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                        class="toggle-password">
                                        <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                    </button>
                                </div>
                            </div>

                            <button type="submit" class="update-password-btn">
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Two-Factor Authentication -->
                <div class="settings-card">
                    <div class="card-header">
                        <h3>Two-Factor Authentication</h3>
                        <p>Add an extra layer of security</p>
                    </div>
                    <div class="card-content">
                        <div class="two-factor-status">
                            <div class="status-info">
                                <span class="status-icon">
                                    <i
                                        :class="accountInfo.twoFactorEnabled ? 'fas fa-shield-alt' : 'fas fa-shield'"></i>
                                </span>
                                <div class="status-text">
                                    <h4>Two-Factor Authentication is {{ accountInfo.twoFactorEnabled ? 'enabled' :
                                        'disabled' }}</h4>
                                    <p>{{ accountInfo.twoFactorEnabled ? 'Your account is protected' : 'Enable two - factor authentication for enhanced security' }}</p>
                                </div>
                            </div>
                            <button @click="toggleTwoFactor"
                                :class="['toggle-2fa-btn', { enabled: accountInfo.twoFactorEnabled }]">
                                {{ accountInfo.twoFactorEnabled ? 'Disable' : 'Enable' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Notifications -->
            <div v-if="activeTab === 'notifications'" class="settings-section">
                <h2>Notification Preferences</h2>
                <div class="settings-card">
                    <div class="card-header">
                        <h3>Email Notifications</h3>
                        <p>Manage how you receive email notifications.</p>
                    </div>
                    <div class="card-content">
                        <div class="form-group">
                            <label>
                                <input type="checkbox" v-model="notificationSettings.email.newsletter">
                                Receive newsletters and updates
                            </label>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" v-model="notificationSettings.email.promotions">
                                Receive promotional offers
                            </label>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" v-model="notificationSettings.email.accountActivity">
                                Notify me about account activity
                            </label>
                        </div>
                    </div>
                </div>

                <div class="settings-card">
                    <div class="card-header">
                        <h3>Push Notifications</h3>
                        <p>Control push notifications for your account.</p>
                    </div>
                    <div class="card-content">
                        <div class="form-group">
                            <label>
                                <input type="checkbox" v-model="notificationSettings.push.enabled">
                                Enable push notifications
                            </label>
                        </div>
                        <div v-if="notificationSettings.push.enabled" class="push-options">
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" v-model="notificationSettings.push.messages">
                                    Notify me about messages
                                </label>
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" v-model="notificationSettings.push.activity">
                                    Notify me about activity on my posts
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <button @click="updateNotificationSettings" class="save-btn">
                    Save Notification Preferences
                </button>
            </div>


            <!-- Privacy -->
      <div v-if="activeTab === 'privacy'" class="settings-section">
        <h2>Privacy Settings</h2>
        <div class="settings-card">
          <div class="card-header">
            <h3>Profile Visibility</h3>
            <p>Control who can see your profile.</p>
          </div>
          <div class="card-content">
            <div class="form-group">
              <label>
                <input type="radio" value="public" v-model="privacySettings.profileVisibility" />
                Public - Everyone can see your profile
              </label>
            </div>
            <div class="form-group">
              <label>
                <input type="radio" value="friends" v-model="privacySettings.profileVisibility" />
                Friends - Only your friends can see your profile
              </label>
            </div>
            <div class="form-group">
              <label>
                <input type="radio" value="private" v-model="privacySettings.profileVisibility" />
                Private - Only you can see your profile
              </label>
            </div>
          </div>
        </div>

        <div class="settings-card">
          <div class="card-header">
            <h3>Search Privacy</h3>
            <p>Manage whether your profile appears in search results.</p>
          </div>
          <div class="card-content">
            <div class="form-group">
              <label>
                <input type="checkbox" v-model="privacySettings.searchable" />
                Allow my profile to appear in search results
              </label>
            </div>
          </div>
        </div>

        <button @click="updatePrivacySettings" class="save-btn">
          Save Privacy Settings
        </button>
      </div>
        </div>
    </div>
</template>

<script>
import avatarImage from '../assets/images/avatar.png'
import coverImage from '../assets/images/cover.png'
export default {
    name: 'ProfileSettings',
    data() {
        return {
            activeTab: 'personal',
            showCurrentPassword: false,
            showNewPassword: false,
            showConfirmPassword: false,
            showAddEmailModal: false,
            isLoading: false,
            tabs: [
                { id: 'personal', name: 'Personal Information', icon: 'fas fa-user' },
                { id: 'account', name: 'Account Settings', icon: 'fas fa-cog' },
                { id: 'notifications', name: 'Notifications', icon: 'fas fa-bell' },
                { id: 'privacy', name: 'Privacy', icon: 'fas fa-shield-alt' }
            ],
            user: {
                name: 'John Doe',
                title: 'Senior Developer',
                avatar: avatarImage,
                coverImage: coverImage
            },
            personalInfo: {
                firstName: 'John',
                lastName: 'Doe',
                title: 'Senior Developer',
                bio: 'Passionate developer with 5+ years of experience...',
                location: 'New York, USA'
            },
            accountInfo: {
                emails: [
                    {
                        id: 1,
                        address: 'john@example.com',
                        primary: true,
                        verified: true
                    },
                    {
                        id: 2,
                        address: 'john.doe@company.com',
                        primary: false,
                        verified: false
                    }
                ],
                twoFactorEnabled: false
            },
            passwordInfo: {
                current: '',
                new: '',
                confirm: ''
            },
            notificationSettings: {
                email: {
                    newsletter: true,
                    promotions: false,
                    accountActivity: true
                },
                push: {
                    enabled: true,
                    messages: true,
                    activity: false
                }
            },
            privacySettings: {
        profileVisibility: 'friends',
        searchable: true
      }
        }
    },
    methods: {
        async updatePersonalInfo() {
            try {
                // Show loading state
                this.isLoading = true

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Handle success
                this.$toast.success('Personal information updated successfully')
            } catch (error) {
                this.$toast.error('Failed to update personal information')
            } finally {
                this.isLoading = false
            }
        },

        async updatePassword() {
            if (!this.validatePasswordForm()) return

            try {
                // Show loading state
                this.isLoading = true

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Clear form
                this.passwordInfo = {
                    current: '',
                    new: '',
                    confirm: ''
                }

                // Handle success
                this.$toast.success('Password updated successfully')
            } catch (error) {
                this.$toast.error('Failed to update password')
            } finally {
                this.isLoading = false
            }
        },

        validatePasswordForm() {
            if (!this.passwordInfo.current) {
                this.$toast.error('Current password is required')
                return false
            }

            if (!this.passwordInfo.new) {
                this.$toast.error('New password is required')
                return false
            }

            if (this.passwordInfo.new.length < 8) {
                this.$toast.error('Password must be at least 8 characters')
                return false
            }

            if (this.passwordInfo.new !== this.passwordInfo.confirm) {
                this.$toast.error('Passwords do not match')
                return false
            }

            return true
        },

        async toggleTwoFactor() {
            try {
                this.isLoading = true

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                this.accountInfo.twoFactorEnabled = !this.accountInfo.twoFactorEnabled

                const message = this.accountInfo.twoFactorEnabled
                    ? 'Two-factor authentication enabled'
                    : 'Two-factor authentication disabled'

                this.$toast.success(message)
            } catch (error) {
                this.$toast.error('Failed to update two-factor authentication')
            } finally {
                this.isLoading = false
            }
        },

        async resendVerification(emailId) {
            try {
                this.isLoading = true

                console.log(`Resending verification for email ID: ${emailId}`)

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Update the email status if needed
                const emailIndex = this.accountInfo.emails.findIndex(
                    email => email.id === emailId
                )

                if (emailIndex !== -1) {
                    // Mark verification as sent
                    this.accountInfo.emails[emailIndex] = {
                        ...this.accountInfo.emails[emailIndex],
                        verificationSent: true
                    }
                }

                this.$toast?.success('Verification email sent')
            } catch (error) {
                console.error('Failed to send verification:', error)
                this.$toast?.error('Failed to send verification email')
            } finally {
                this.isLoading = false
            }
        },

        async makePrimary(emailId) {
            if (!this.canMakePrimary(emailId)) {
                this.$toast?.error('This email cannot be made primary')
                return
            }

            try {
                this.isLoading = true

                console.log(`Setting email ID ${emailId} as primary`)

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Update the primary status of all emails
                this.accountInfo.emails = this.accountInfo.emails.map(email => ({
                    ...email,
                    primary: email.id === emailId
                }))

                this.$toast?.success('Primary email updated')
            } catch (error) {
                console.error('Failed to update primary email:', error)
                this.$toast?.error('Failed to update primary email')
            } finally {
                this.isLoading = false
            }
        },

        canRemoveEmail(emailId) {
            // Find the email with the given ID
            const emailToRemove = this.accountInfo.emails.find(email => email.id === emailId)

            // Check if email exists and is not primary
            if (!emailToRemove) {
                console.log(`No email found with ID: ${emailId}`)
                return false
            }

            if (emailToRemove.primary) {
                console.log(`Cannot remove primary email with ID: ${emailId}`)
                return false
            }

            // Ensure there will be at least one email left
            const remainingEmails = this.accountInfo.emails.length > 1
            if (!remainingEmails) {
                console.log('Cannot remove last email address')
                return false
            }

            return true
        },

        async removeEmail(emailId) {
            if (!this.canRemoveEmail(emailId)) {
                this.$toast?.error('This email cannot be removed')
                return
            }

            try {
                this.isLoading = true

                // Log the email being removed
                console.log(`Removing email with ID: ${emailId}`)

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Remove the email from the list
                this.accountInfo.emails = this.accountInfo.emails.filter(
                    email => email.id !== emailId
                )

                this.$toast?.success('Email removed successfully')
            } catch (error) {
                console.error('Failed to remove email:', error)
                this.$toast?.error('Failed to remove email')
            } finally {
                this.isLoading = false
            }
        },

        async uploadAvatar(event) {
            const file = event.target.files[0]
            if (!file) return

            try {
                // Show loading state
                this.isLoading = true

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Update avatar preview
                this.user.avatar = URL.createObjectURL(file)

                // Handle success
                this.$toast.success('Avatar updated successfully')
            } catch (error) {
                this.$toast.error('Failed to upload avatar')
            } finally {
                this.isLoading = false
            }
        },

        async uploadCover(event) {
            const file = event.target.files[0]
            if (!file) return

            try {
                // Show loading state
                this.isLoading = true

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Update cover preview
                this.user.coverImage = URL.createObjectURL(file)

                // Handle success
                this.$toast.success('Cover image updated successfully')
            } catch (error) {
                this.$toast.error('Failed to upload cover image')
            } finally {
                this.isLoading = false
            }
        },
        async updateNotificationSettings() {
    try {
        this.isLoading = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        this.$toast.success('Notification preferences updated successfully')
    } catch (error) {
        console.error('Failed to update notification preferences:', error)
        this.$toast.error('Failed to update notification preferences')
    } finally {
        this.isLoading = false
    }
},
async updatePrivacySettings() {
      try {
        this.isLoading = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        this.$toast.success('Privacy settings updated successfully');
      } catch (error) {
        console.error('Failed to update privacy settings:', error);
        this.$toast.error('Failed to update privacy settings');
      } finally {
        this.isLoading = false;
      }
    }

    },
    computed: {
        primaryEmail() {
            return this.accountInfo.emails.find(email => email.primary)
        },
        nonPrimaryEmails() {
            return this.accountInfo.emails.filter(email => !email.primary)
        },
        hasMultipleEmails() {
            return this.accountInfo.emails.length > 1
        }
    }
}
</script>
<style scoped>
.profile-settings {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
}

/* Profile Header Styles */
.profile-header {
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    margin-bottom: 24px;
}

.profile-cover {
    height: 200px;
    position: relative;
    background-color: #f8f9fa;
}

.cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.edit-cover {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}

.edit-cover:hover {
    background: white;
    transform: translateY(-1px);
}

.profile-info {
    padding: 24px;
    display: flex;
    align-items: flex-end;
    gap: 24px;
    margin-top: -60px;
}

.profile-avatar {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
}

.profile-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.edit-avatar {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #3498db;
    border: none;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.edit-avatar:hover {
    transform: scale(1.1);
}

.profile-details {
    flex-grow: 1;
}

.profile-details h1 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 4px;
}

.profile-details p {
    color: #7f8c8d;
    font-size: 16px;
}

/* Settings Navigation */
.settings-nav {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    background: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    overflow-x: auto;
}

.tab-btn {
    padding: 12px 20px;
    border: none;
    background: none;
    border-radius: 8px;
    color: #7f8c8d;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.tab-btn:hover {
    background: #f8f9fa;
    color: #2c3e50;
}

.tab-btn.active {
    background: #3498db;
    color: white;
}

/* Settings Content */
.settings-section {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.settings-section h2 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 24px;
}

/* Form Styles */
.settings-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
    margin-bottom: 16px;
}

.form-group label {
    font-size: 14px;
    color: #000000;
    font-weight: 500;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 4px;
}

.form-group label.required::after {
    content: '*';
    color: #e74c3c;
    margin-left: 4px;
}

.form-group input,
.form-group textarea {
    padding: 12px 16px;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    font-size: 14px;
    color: #4d555c;
    background-color: white;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: #95a5a6;
    opacity: 0.7;
}

.form-group input:hover,
.form-group textarea:hover {
    border-color: #cbd5e1;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1);
    transform: translateY(-1px);
}

/* Error State */
.form-group.error input,
.form-group.error textarea {
    border-color: #e74c3c;
    background-color: #fff5f5;
}

.form-group.error input:focus,
.form-group.error textarea:focus {
    box-shadow: 0 0 0 4px rgba(231, 76, 60, 0.1);
}

.form-group .error-message {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
}

/* Success State */
.form-group.success input,
.form-group.success textarea {
    border-color: #27ae60;
    background-color: #f0fff4;
}

.form-group.success input:focus,
.form-group.success textarea:focus {
    box-shadow: 0 0 0 4px rgba(39, 174, 96, 0.1);
}

/* Disabled State */
.form-group.disabled label {
    color: #95a5a6;
}

.form-group.disabled input,
.form-group.disabled textarea {
    background-color: #f8f9fa;
    border-color: #e9ecef;
    color: #95a5a6;
    cursor: not-allowed;
}

/* Input with Icon */
.form-group.with-icon {
    position: relative;
}

.form-group.with-icon input {
    padding-left: 40px;
}

.input-field {
    position: relative;
    display: flex;
    align-items: center;
}

.input-field input {
    padding: 12px 16px;
    padding-right: 40px;
    padding-left: 40px;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    font-size: 14px;
    transition: all 0.3s ease;
    background-color: white;
}

.toggle-password {
    position: absolute;
    right: 78%;
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

.update-password-btn {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.update-password-btn:hover {
    background-color: #0d8a2c;
}

.update-password-btn:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.3);
}

/* Character Count */
.form-group .char-count {
    position: absolute;
    right: 12px;
    bottom: -20px;
    font-size: 12px;
    color: #95a5a6;
}

/* Help Text */
.form-group .help-text {
    font-size: 12px;
    color: #7f8c8d;
    margin-top: 4px;
}

/* Floating Label Option */
.form-group.floating {
    position: relative;
}

.form-group.floating label {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    background-color: white;
    padding: 0 4px;
    pointer-events: none;
    transition: all 0.3s ease;
}

.form-group.floating input:focus~label,
.form-group.floating input:not(:placeholder-shown)~label {
    top: 0;
    font-size: 12px;
    color: #3498db;
}

/* Responsive Adjustments */
@media (max-width: 768px) {

    .form-group input,
    .form-group textarea {
        padding: 10px 14px;
        font-size: 16px;
        /* Better for mobile touch */
    }

    .form-group.with-icon input {
        padding-left: 36px;
    }

    .form-group.with-icon i {
        left: 12px;
    }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    .form-group label {
        color: #000911;
    }

    .form-group input,
    .form-group textarea {
        background-color: #ffffff;
        border-color: #e9ecef;
        color: #000000;
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
        color: #000000;
    }

    .form-group input:hover,
    .form-group textarea:hover {
        border-color: #cbd5db;
    }

    .form-group.floating label {
        background-color: #ffffff;
    }

    .form-group .help-text {
        color: #000000;
    }
}

/* Animation for Focus */
@keyframes formFocus {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.02);
    }

    100% {
        transform: scale(1);
    }
}

.form-group input:focus,
.form-group textarea:focus {
    animation: formFocus 0.3s ease;
}

.save-btn {
    background: #3498db;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    align-self: flex-start;
}

.save-btn:hover {
    background: #2980b9;
    transform: translateY(-1px);
}

/* Settings Card Styles */
.settings-card {
    background: white;
    border-radius: 12px;
    border: 1px solid #e9ecef;
    margin-bottom: 24px;
}

.card-header {
    padding: 20px;
    border-bottom: 1px solid #e9ecef;
}

.card-header h3 {
    font-size: 16px;
    color: #2c3e50;
    margin-bottom: 4px;
}

.card-header p {
    color: #7f8c8d;
    font-size: 14px;
}

.card-content {
    padding: 20px;
}

/* Email List Styles */
.email-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.email-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
}

.email-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.email {
    font-size: 14px;
    color: #2c3e50;
}

.primary-badge {
    background: #27ae60;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
}

.verify-badge {
    background: #f1c40f;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
}

.email-actions {
    display: flex;
    gap: 12px;
}

.verify-btn,
.primary-btn,
.remove-btn {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.verify-btn {
    background: #f1c40f;
    color: white;
    border: none;
}

.primary-btn {
    background: none;
    border: 1px solid #3498db;
    color: #3498db;
}

.remove-btn {
    background: none;
    border: none;
    color: #e74c3c;
    padding: 6px;
}

.add-email-btn {
    width: 100%;
    padding: 12px;
    background: none;
    border: 2px dashed #e9ecef;
    border-radius: 8px;
    color: #3498db;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.add-email-btn:hover {
    background: #f8f9fa;
    border-color: #3498db;
}

/* Two Factor Authentication Styles */
.two-factor-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.status-info {
    display: flex;
    align-items: center;
    gap: 16px;
}

.status-icon {
    width: 48px;
    height: 48px;
    background: #f8f9fa;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #3498db;
}

.status-text h4 {
    font-size: 16px;
    color: #2c3e50;
    margin-bottom: 4px;
}

.status-text p {
    color: #7f8c8d;
    font-size: 14px;
}

.toggle-2fa-btn {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.toggle-2fa-btn:not(.enabled) {
    background: #3498db;
    color: white;
    border: none;
}

.toggle-2fa-btn.enabled {
    background: none;
    border: 1px solid #e74c3c;
    color: #e74c3c;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .profile-settings {
        padding: 16px;
    }

    .profile-cover {
        height: 150px;
    }

    .profile-info {
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-top: -40px;
    }

    .profile-avatar {
        width: 100px;
        height: 100px;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .settings-nav {
        padding: 12px;
    }

    .tab-btn {
        padding: 10px 16px;
    }

    .email-item {
        flex-direction: column;
        gap: 12px;
    }

    .email-actions {
        width: 100%;
        justify-content: flex-end;
    }

    .two-factor-status {
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }

    .status-info {
        flex-direction: column;
    }
}

.push-options {
    margin-left: 1.5rem;
}
</style>