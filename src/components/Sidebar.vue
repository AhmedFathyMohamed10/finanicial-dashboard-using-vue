<template>
    <div class="sidebar">
        <div class="logo">
            <h2>Dashboard</h2>
        </div>
        <nav class="nav-menu">
            <router-link to="/overview" class="nav-item">
                <i class="fas fa-home"></i>
                Overview
            </router-link>
            <router-link to="/profile" class="nav-item">
                <i class="fas fa-user"></i>
                Profile
            </router-link>
            <router-link to="/projects" class="nav-item">
                <i class="fas fa-project-diagram"></i>
                Projects
            </router-link>
            <router-link to="/missions" class="nav-item">
                <i class="fas fa-tasks"></i>
                Missions
            </router-link>
            <router-link to="/feedback" class="nav-item">
                <i class="fas fa-comments"></i>
                Feedback
            </router-link>
            <router-link to="/earnings" class="nav-item">
                <i class="fas fa-dollar-sign"></i>
                Earnings
            </router-link>
            <router-link to="/withdrawals" class="nav-item">
                <i class="fas fa-dollar-sign"></i>
                Withdrawals
            </router-link>
            <router-link to="/billing-subscriptions" class="nav-item">
                <i class="fas fa-credit-card"></i>
                Billing & Subscriptions
            </router-link>
            <router-link to="/reports" class="nav-item">
                <i class="fas fa-chart-line"></i>
                Reports
            </router-link>
        </nav>
        <div class="auth-buttons">
            <template v-if="!isLoggedIn">
                <router-link to="/login" class="auth-btn">Login</router-link>
                <router-link to="/signup" class="auth-btn">Signup</router-link>
            </template>
            <button v-else @click="handleSignOut" class="auth-btn">Sign Out</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SidebarNav',
    data() {
        return {
            isLoggedIn: false
        }
    },
    methods: {
        handleSignOut() {
            this.isLoggedIn = false
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.sidebar {
    width: 250px;
    height: 100vh;
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.nav-menu {
    flex-grow: 1;
}

.nav-item {
    display: block;
    padding: 15px;
    color: white;
    text-decoration: none;
    margin: 5px 0;
}

.nav-item:hover {
    background-color: #34495e;
    border-radius: 5px;
}

.auth-buttons {
    padding: 20px 0;
}

.auth-btn {
    display: block;
    padding: 10px;
    margin: 5px 0;
    text-align: center;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
}
</style>