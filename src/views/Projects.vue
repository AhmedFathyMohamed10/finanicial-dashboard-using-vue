<!-- src/views/Projects.vue -->
<template>
    <div class="projects-page">
        <div class="projects-header">
            <h1 class="page-title">Projects</h1>
            <div class="header-controls">
                <!-- Search and Filters Container -->
                <div class="controls-left">
                    <!-- Search Bar -->
                    <div class="search-container">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" v-model="searchQuery" placeholder="Search projects..." class="search-input">
                        <button v-if="searchQuery" @click="clearSearch" class="clear-search">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Filters -->
                    <div class="filters-container">
                        <div class="filter-group">
                            <label>Status</label>
                            <select v-model="statusFilter" class="filter-select">
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="on-hold">On Hold</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>Sort By</label>
                            <select v-model="sortBy" class="filter-select">
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="deadline">Deadline</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- New Project Button -->
                <button class="new-project-btn">
                    <i class="fas fa-plus"></i>
                    <span>New Project</span>
                </button>
            </div>
        </div>
        <div class="projects-grid">
            <div v-for="project in filteredProjects" :key="project.id" class="project-card"
                :class="project.status.toLowerCase()">
                <div class="project-header">
                    <div class="project-status">{{ project.status }}</div>
                    <div class="project-actions">
                        <button class="action-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>

                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>

                <div class="project-details">
                    <div class="detail-item">
                        <i class="fas fa-calendar"></i>
                        <span>Deadline: {{ project.deadline }}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-tasks"></i>
                        <span>Tasks: {{ project.completedTasks }}/{{ project.totalTasks }}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-dollar-sign"></i>
                        <span>Budget: ${{ project.budget }}</span>
                    </div>
                </div>

                <div class="project-team">
                    <div class="team-members">
                        <img v-for="member in project.team" :key="member.id" :src="member.avatar" :alt="member.name"
                            :title="member.name">
                    </div>
                    <div class="progress-bar">
                        <div class="progress" :style="{ width: `${project.progress}%` }"
                            :class="getProgressClass(project.progress)"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProjects.length === 0" class="empty-state">
            <i class="fas fa-project-diagram"></i>
            <h3>No projects found</h3>
            <p>Try adjusting your search or filters</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectsList',
    data() {
        return {
            searchQuery: '',
            statusFilter: '',
            sortBy: 'newest',
            projects: [
                {
                    id: 1,
                    title: 'E-commerce Website Redesign',
                    description: 'Redesigning the main e-commerce platform with modern UI/UX principles',
                    status: 'Active',
                    deadline: '2024-03-15',
                    completedTasks: 8,
                    totalTasks: 15,
                    budget: '12,000',
                    progress: 65,
                    team: [
                        { id: 1, name: 'John Doe', avatar: 'path/to/avatar1.jpg' },
                        { id: 2, name: 'Jane Smith', avatar: 'path/to/avatar2.jpg' },
                        { id: 3, name: 'Mike Johnson', avatar: 'path/to/avatar3.jpg' }
                    ]
                },
                {
                    id: 2,
                    title: 'Mobile App Development',
                    description: 'Creating a new mobile application for iOS and Android platforms',
                    status: 'On Hold',
                    deadline: '2024-04-20',
                    completedTasks: 3,
                    totalTasks: 12,
                    budget: '20,000',
                    progress: 25,
                    team: [
                        { id: 4, name: 'Sarah Wilson', avatar: 'path/to/avatar4.jpg' },
                        { id: 5, name: 'Tom Brown', avatar: 'path/to/avatar5.jpg' }
                    ]
                },
                {
                    id: 3,
                    title: 'CRM Integration',
                    description: 'Integrating new CRM system with existing infrastructure',
                    status: 'Completed',
                    deadline: '2024-02-28',
                    completedTasks: 10,
                    totalTasks: 10,
                    budget: '8,000',
                    progress: 100,
                    team: [
                        { id: 6, name: 'Alice Green', avatar: 'path/to/avatar6.jpg' },
                        { id: 7, name: 'Bob White', avatar: 'path/to/avatar7.jpg' }
                    ]
                }
            ]
        }
    },
    computed: {
        filteredProjects() {
            return this.projects
                .filter(project => {
                    const matchesSearch = project.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        project.description.toLowerCase().includes(this.searchQuery.toLowerCase())
                    const matchesStatus = !this.statusFilter || project.status.toLowerCase() === this.statusFilter
                    return matchesSearch && matchesStatus
                })
                .sort((a, b) => {
                    switch (this.sortBy) {
                        case 'oldest':
                            return new Date(a.deadline) - new Date(b.deadline)
                        case 'deadline':
                            return new Date(a.deadline) - new Date(b.deadline)
                        default: // newest
                            return new Date(b.deadline) - new Date(a.deadline)
                    }
                })
        }
    },
    methods: {
        getProgressClass(progress) {
            if (progress < 30) return 'low'
            if (progress < 70) return 'medium'
            return 'high'
        }
    }
}
</script>

<style scoped>
.header-controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    margin-top: 20px;
}

.controls-left {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-grow: 1;
}

.search-container {
    position: relative;
    width: 100%;
    max-width: 500px;
}

.search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #95a5a6;
    font-size: 16px;
}

.search-input {
    width: 100%;
    padding: 12px 16px 12px 45px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
    background-color: white;
}

.search-input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.clear-search {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #95a5a6;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.clear-search:hover {
    background-color: #f0f0f0;
    color: #e74c3c;
}

.filters-container {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 16px;

}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.filter-group label {
    font-size: 12px;
    color: #7f8c8d;
    font-weight: 500;
}

.filter-select {
    padding: 12px 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    color: #2c3e50;
    background-color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 180px;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%232c3e50' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: calc(100% - 12px) center;
    padding-right: 32px;
}

.filter-select:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.new-project-btn {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    white-space: nowrap;
    height: 45px; /* Match height with search input */
}

.new-project-btn:hover {
    background-color: #2980b9;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(52, 152, 219, 0.1);
}

/* Updated media queries */
@media (max-width: 768px) {
    .header-controls {
        flex-direction: column;
        gap: 16px;
    }

    .controls-left {
        width: 100%;
    }

    .search-container {
        max-width: none;
    }

    .filters-container {
        flex-direction: column;
        width: 100%;
    }

    .filter-group {
        width: 100%;
    }

    .filter-select {
        width: 100%;
        min-width: unset;
    }

    .new-project-btn {
        width: 100%;
        justify-content: center;
    }
}
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
}

.project-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
    border: 1px solid #e9ecef;
}

.project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.project-card.active {
    border-top: 4px solid #27ae60;
}

.project-card.completed {
    border-top: 4px solid #3498db;
}

.project-card.on-hold {
    border-top: 4px solid #f1c40f;
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.project-status {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.project-actions {
    display: flex;
    gap: 12px;
}

.action-btn {
    background: none;
    border: none;
    color: #95a5a6;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    transition: all 0.3s ease;
}

.action-btn:hover {
    color: #2c3e50;
    background-color: #f8f9fa;
}

.project-title {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 12px;
    font-weight: 600;
    line-height: 1.4;
}

.project-description {
    color: #7f8c8d;
    font-size: 14px;
    margin-bottom: 20px;
    line-height: 1.6;
}

.project-details {
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

.project-team {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e9ecef;
}

.team-members {
    display: flex;
    margin-bottom: 16px;
}

.team-members img {
    object-fit: cover;
    object-position: center;
    image-rendering: pixelated;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid white;
    margin-left: -12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.team-members img:first-child {
    margin-left: 0;
}

.team-members img:hover {
    transform: translateY(-2px);
    z-index: 1;
}

.progress-bar {
    height: 8px;
    background-color: #f0f2f5;
    border-radius: 4px;
    overflow: hidden;
}

.progress {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease;
}

.progress.low {
    background-color: #e74c3c;
}

.progress.medium {
    background-color: #f1c40f;
}

.progress.high {
    background-color: #27ae60;
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
    .projects-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
}

</style>