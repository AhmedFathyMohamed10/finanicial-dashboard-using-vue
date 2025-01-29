<!-- src/views/Missions.vue -->
<template>
    <div class="missions-page">
        <!-- Header Section -->
        <div class="missions-header">
            <h1 class="page-title">Missions</h1>
            <div class="header-controls">
                <div class="search-filter-container">
                    <search-bar v-model="searchQuery" placeholder="Search missions..." class="mission-search" />
                    <div class="filters">
                        <select v-model="difficultyFilter" class="filter-select">
                            <option value="">All Difficulties</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <select v-model="statusFilter" class="filter-select">
                            <option value="">All Status</option>
                            <option value="available">Available</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Missions Grid -->
            <div class="missions-grid">
                <div v-for="mission in filteredMissions" :key="mission.id" class="mission-card" :class="mission.status">
                    <!-- Mission Header -->
                    <div class="mission-header">
                        <span class="mission-type" :class="mission.difficulty">
                            {{ mission.difficulty }}
                        </span>
                        <span class="mission-reward">
                            <i class="fas fa-coins"></i>
                            ${{ mission.reward }}
                        </span>
                    </div>

                    <!-- Mission Content -->
                    <h3 class="mission-title">{{ mission.title }}</h3>
                    <p class="mission-description">{{ mission.description }}</p>

                    <!-- Mission Details -->
                    <div class="mission-details">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>{{ mission.duration }}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Due: {{ mission.deadline }}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-user-friends"></i>
                            <span>{{ mission.teamSize }} team members</span>
                        </div>
                    </div>

                    <!-- Skills Required -->
                    <div class="required-skills">
                        <h4>Required Skills:</h4>
                        <div class="skills-list">
                            <span v-for="skill in mission.skills" :key="skill" class="skill-tag">
                                {{ skill }}
                            </span>
                        </div>
                    </div>

                    <!-- Mission Status and Action -->
                    <div class="mission-footer">
                        <div class="mission-progress" v-if="mission.status === 'in-progress'">
                            <div class="progress-bar">
                                <div class="progress" :style="{ width: `${mission.progress}%` }"></div>
                            </div>
                            <span>{{ mission.progress }}% Complete</span>
                        </div>
                        <button class="mission-action-btn" :class="getActionButtonClass(mission.status)"
                            @click="handleMissionAction(mission)">
                            {{ getActionButtonText(mission.status) }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredMissions.length === 0" class="empty-state">
                <i class="fas fa-tasks"></i>
                <h3>No missions found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        </div>
    </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
export default {
    name: 'MissionsList',
    components: {
        SearchBar
    },
    data() {
        return {
            searchQuery: '',
            difficultyFilter: '',
            statusFilter: '',
            missions: [
                {
                    id: 1,
                    title: 'E-commerce API Integration',
                    description: 'Integrate payment gateway and shipping API for an e-commerce platform',
                    difficulty: 'hard',
                    reward: 1500,
                    duration: '2 weeks',
                    deadline: '2024-03-20',
                    teamSize: 3,
                    status: 'available',
                    skills: ['Node.js', 'API Integration', 'Payment Systems'],
                    progress: 0
                },
                {
                    id: 2,
                    title: 'UI Component Library',
                    description: 'Create reusable UI components with documentation',
                    difficulty: 'medium',
                    reward: 800,
                    duration: '1 week',
                    deadline: '2024-03-15',
                    teamSize: 2,
                    status: 'in-progress',
                    skills: ['Vue.js', 'CSS', 'Documentation'],
                    progress: 60
                },
                {
                    id: 3,
                    title: 'Bug Fixing Sprint',
                    description: 'Fix reported bugs in the mobile application',
                    difficulty: 'easy',
                    reward: 500,
                    duration: '3 days',
                    deadline: '2024-03-10',
                    teamSize: 1,
                    status: 'completed',
                    skills: ['Debugging', 'Mobile Development'],
                    progress: 100
                },
                // Add more missions as needed
            ]
        }
    },
    computed: {
        filteredMissions() {
            return this.missions.filter(mission => {
                const matchesSearch = mission.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    mission.description.toLowerCase().includes(this.searchQuery.toLowerCase())
                const matchesDifficulty = !this.difficultyFilter || mission.difficulty === this.difficultyFilter
                const matchesStatus = !this.statusFilter || mission.status === this.statusFilter
                return matchesSearch && matchesDifficulty && matchesStatus
            })
        }
    },
    methods: {
        getActionButtonClass(status) {
            switch (status) {
                case 'available':
                    return 'accept-btn'
                case 'in-progress':
                    return 'submit-btn'
                case 'completed':
                    return 'completed-btn'
                default:
                    return ''
            }
        },
        getActionButtonText(status) {
            switch (status) {
                case 'available':
                    return 'Accept Mission'
                case 'in-progress':
                    return 'Submit Work'
                case 'completed':
                    return 'View Details'
                default:
                    return 'Take Action'
            }
        },
        handleMissionAction(mission) {
            // Implement mission actions based on status
            switch (mission.status) {
                case 'available':
                    // Handle mission acceptance
                    console.log('Accepting mission:', mission.id)
                    break
                case 'in-progress':
                    // Handle work submission
                    console.log('Submitting work for mission:', mission.id)
                    break
                case 'completed':
                    // Handle viewing details
                    console.log('Viewing details for mission:', mission.id)
                    break
            }
        }
    }
}
</script>

<style scoped>
.missions-page {
    padding: 24px;
    background-color: #f8f9fa;
    min-height: 100vh;
}

.missions-header {
    margin-bottom: 32px;
    background-color: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.page-title {
    font-size: 28px;
    color: #2c3e50;
    margin-bottom: 24px;
    font-weight: 600;
}

.header-controls {
    width: 100%;
}

.search-filter-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.filters {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
}

.search-filter {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.search-box {
    position: relative;
    flex-grow: 1;
    min-width: 300px;
}

.search-box i {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #95a5a6;
    font-size: 16px;
}

.search-box input {
    width: 100%;
    padding: 12px 16px 12px 45px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
}

.search-box input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.filter-select {
    padding: 12px 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    min-width: 160px;
    background-color: white;
    color: #2c3e50;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-select:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.missions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
}

.mission-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
    border: 1px solid #e9ecef;
}

.mission-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.mission-card.available {
    border-left: 4px solid #3498db;
}

.mission-card.in-progress {
    border-left: 4px solid #f1c40f;
}

.mission-card.completed {
    border-left: 4px solid #27ae60;
}

.mission-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.mission-type {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.mission-type.easy {
    background-color: #e8f5e9;
    color: #27ae60;
}

.mission-type.medium {
    background-color: #fff3e0;
    color: #f39c12;
}

.mission-type.hard {
    background-color: #ffebee;
    color: #e74c3c;
}

.mission-reward {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #f1c40f;
    font-weight: 600;
    font-size: 16px;
    padding: 6px 12px;
    background-color: #fff9e6;
    border-radius: 20px;
}

.mission-reward i {
    font-size: 14px;
}

.mission-title {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 12px;
    font-weight: 600;
    line-height: 1.4;
}

.mission-description {
    color: #7f8c8d;
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 1.6;
}

.mission-details {
    margin-bottom: 20px;
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    color: #7f8c8d;
    font-size: 14px;
}

.detail-item:last-child {
    margin-bottom: 0;
}

.detail-item i {
    color: #3498db;
    font-size: 16px;
    width: 20px;
    text-align: center;
}

.required-skills {
    margin-bottom: 24px;
}

.required-skills h4 {
    font-size: 15px;
    color: #2c3e50;
    margin-bottom: 12px;
    font-weight: 600;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skill-tag {
    background-color: #f0f2f5;
    color: #2c3e50;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.skill-tag:hover {
    background-color: #e9ecef;
    transform: translateY(-1px);
}

.mission-footer {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #e9ecef;
}

.mission-progress {
    margin-bottom: 16px;
}

.progress-bar {
    height: 8px;
    background-color: #f0f2f5;
    border-radius: 4px;
    margin-bottom: 8px;
    overflow: hidden;
}

.progress {
    height: 100%;
    background-color: #3498db;
    border-radius: 4px;
    transition: width 0.5s ease;
}

.mission-action-btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.mission-action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.accept-btn {
    background-color: #3498db;
    color: white;
}

.accept-btn:hover {
    background-color: #2980b9;
}

.submit-btn {
    background-color: #f1c40f;
    color: white;
}

.submit-btn:hover {
    background-color: #f39c12;
}

.completed-btn {
    background-color: #27ae60;
    color: white;
}

.completed-btn:hover {
    background-color: #219a52;
}

.empty-state {
    text-align: center;
    padding: 48px;
    color: #95a5a6;
    background-color: white;
    border-radius: 12px;
    margin-top: 24px;
}

.empty-state i {
    font-size: 56px;
    margin-bottom: 24px;
    color: #bdc3c7;
}

.empty-state h3 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 8px;
}

.empty-state p {
    color: #7f8c8d;
    font-size: 14px;
}

@media (max-width: 1024px) {
    .missions-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
}

@media (max-width: 768px) {
    .missions-page {
        padding: 16px;
    }

    .missions-header {
        padding: 20px;
    }

    .search-filter {
        flex-direction: column;
    }

    .search-box {
        width: 100%;
        min-width: auto;
    }

    .filters {
        flex-direction: column;
    }

    .filter-select {
        width: 100%;
    }

    .missions-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .mission-card {
        padding: 20px;
    }
}


</style>