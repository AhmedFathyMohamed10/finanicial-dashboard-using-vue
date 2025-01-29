<!-- src/views/Overview.vue -->
<template>
    <div class="overview">
        <h1 class="page-title">Overview</h1>

        <!-- Stats Cards -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-project-diagram"></i>
                </div>
                <div class="stat-content">
                    <h3>Total Projects</h3>
                    <p class="stat-number">{{ stats.totalProjects }}</p>
                    <p class="stat-change positive">
                        <i class="fas fa-arrow-up"></i> 12% from last month
                    </p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-tasks"></i>
                </div>
                <div class="stat-content">
                    <h3>Active Missions</h3>
                    <p class="stat-number">{{ stats.activeMissions }}</p>
                    <p class="stat-change negative">
                        <i class="fas fa-arrow-down"></i> 5% from last month
                    </p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="stat-content">
                    <h3>Total Earnings</h3>
                    <p class="stat-number">${{ stats.totalEarnings }}</p>
                    <p class="stat-change positive">
                        <i class="fas fa-arrow-up"></i> 18% from last month
                    </p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-star"></i>
                </div>
                <div class="stat-content">
                    <h3>Average Rating</h3>
                    <p class="stat-number">{{ stats.averageRating }}/5</p>
                    <p class="stat-change positive">
                        <i class="fas fa-arrow-up"></i> 2% from last month
                    </p>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="activity-section">
            <h2>Recent Activity</h2>
            <div class="activity-list">
                <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
                    <div class="activity-icon">
                        <i :class="activity.icon"></i>
                    </div>
                    <div class="activity-details">
                        <h4>{{ activity.title }}</h4>
                        <p>{{ activity.description }}</p>
                        <span class="activity-time">{{ activity.time }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Upcoming Deadlines -->
        <div class="deadlines-section">
            <h2>Upcoming Deadlines</h2>
            <div class="deadline-list">
                <div v-for="deadline in upcomingDeadlines" :key="deadline.id" class="deadline-item">
                    <div class="deadline-status" :class="deadline.priority"></div>
                    <div class="deadline-content">
                        <h4>{{ deadline.project }}</h4>
                        <p>{{ deadline.task }}</p>
                        <span class="deadline-date">Due: {{ deadline.date }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OverviewDashboard',
    data() {
        return {
            stats: {
                totalProjects: 24,
                activeMissions: 8,
                totalEarnings: '2,450',
                averageRating: 4.8
            },
            recentActivities: [
                {
                    id: 1,
                    icon: 'fas fa-check-circle',
                    title: 'Project Completed',
                    description: 'Website redesign for Client XYZ',
                    time: '2 hours ago'
                },
                {
                    id: 2,
                    icon: 'fas fa-tasks',
                    title: 'New Mission Assigned',
                    description: 'Code review for mobile app',
                    time: '4 hours ago'
                },
                {
                    id: 3,
                    icon: 'fas fa-comment',
                    title: 'New Feedback Received',
                    description: 'Client feedback on UI design',
                    time: '1 day ago'
                },
                {
                    id: 4,
                    icon: 'fas fa-dollar-sign',
                    title: 'Payment Received',
                    description: 'Payment for Project ABC',
                    time: '2 days ago'
                }
            ],
            upcomingDeadlines: [
                {
                    id: 1,
                    project: 'E-commerce Platform',
                    task: 'Frontend Development',
                    date: 'Tomorrow',
                    priority: 'high'
                },
                {
                    id: 2,
                    project: 'Mobile App',
                    task: 'API Integration',
                    date: 'Next Week',
                    priority: 'medium'
                },
                {
                    id: 3,
                    project: 'Dashboard Design',
                    task: 'UI Implementation',
                    date: 'In 2 weeks',
                    priority: 'low'
                }
            ]
        }
    }
}
</script>

<style scoped>
.overview {
    padding: 20px;
}

.page-title {
    margin-bottom: 30px;
    color: #2c3e50;
    font-size: 24px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
}

.stat-icon {
    width: 50px;
    height: 50px;
    background: #f0f4f8;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
}

.stat-icon i {
    font-size: 20px;
    color: #3498db;
}

.stat-content {
    flex-grow: 1;
}

.stat-content h3 {
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 5px;
}

.stat-number {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 5px;
}

.stat-change {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.stat-change.positive {
    color: #27ae60;
}

.stat-change.negative {
    color: #e74c3c;
}

.activity-section,
.deadlines-section {
    background: white;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.activity-section h2,
.deadlines-section h2 {
    margin-bottom: 20px;
    color: #2c3e50;
    font-size: 18px;
}

.activity-item {
    display: flex;
    align-items: start;
    padding: 15px 0;
    border-bottom: 1px solid #ecf0f1;
}

.activity-icon {
    width: 40px;
    height: 40px;
    background: #f0f4f8;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
}

.activity-icon i {
    color: #3498db;
}

.activity-details h4 {
    font-size: 16px;
    color: #2c3e50;
    margin-bottom: 5px;
}

.activity-details p {
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 5px;
}

.activity-time {
    font-size: 12px;
    color: #95a5a6;
}

.deadline-item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #ecf0f1;
}

.deadline-status {
    width: 4px;
    height: 40px;
    border-radius: 2px;
    margin-right: 15px;
}

.deadline-status.high {
    background: #e74c3c;
}

.deadline-status.medium {
    background: #f1c40f;
}

.deadline-status.low {
    background: #27ae60;
}

.deadline-content h4 {
    font-size: 16px;
    color: #2c3e50;
    margin-bottom: 5px;
}

.deadline-content p {
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 5px;
}

.deadline-date {
    font-size: 12px;
    color: #95a5a6;
}

@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }

    .stat-card {
        margin-bottom: 15px;
    }
}
</style>