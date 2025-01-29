<!-- src/views/Feedback.vue -->
<template>
    <div class="feedback-page">
        <!-- Header Section -->
        <div class="feedback-header">
            <h1 class="page-title">Feedback & Reviews</h1>
            <div class="feedback-stats">
                <div class="stat-card">
                    <div class="stat-value">
                        <span class="rating">4.8</span>
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </div>
                    </div>
                    <div class="stat-label">Average Rating</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">{{ totalReviews }}</div>
                    <div class="stat-label">Total Reviews</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">92%</div>
                    <div class="stat-label">Satisfaction Rate</div>
                </div>
            </div>
        </div>

        <!-- Filters Section -->
        <div class="feedback-filters">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" v-model="searchQuery" placeholder="Search feedback...">
            </div>
            <div class="filter-controls">
                <select v-model="projectFilter" class="filter-select">
                    <option value="">All Projects</option>
                    <option v-for="project in projects" :key="project" :value="project">
                        {{ project }}
                    </option>
                </select>
                <select v-model="ratingFilter" class="filter-select">
                    <option value="">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
                <select v-model="sortBy" class="filter-select">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                </select>
            </div>
        </div>

        <!-- Feedback List -->
        <div class="feedback-list">
            <div v-for="feedback in filteredFeedback" :key="feedback.id" class="feedback-card"
                :class="getRatingClass(feedback.rating)">
                <div class="feedback-header">
                    <div class="user-info">
                        <img :src="feedback.userAvatar" :alt="feedback.userName" class="user-avatar">
                        <div class="user-details">
                            <h3 class="user-name">{{ feedback.userName }}</h3>
                            <span class="project-name">{{ feedback.project }}</span>
                        </div>
                    </div>
                    <div class="feedback-meta">
                        <div class="rating-stars">
                            <i v-for="n in 5" :key="n" class="fas"
                                :class="n <= feedback.rating ? 'fa-star' : 'fa-star-o'">
                            </i>
                        </div>
                        <span class="feedback-date">{{ formatDate(feedback.date) }}</span>
                    </div>
                </div>

                <div class="feedback-content">
                    <p class="feedback-text">{{ feedback.comment }}</p>
                    <div v-if="feedback.images && feedback.images.length" class="feedback-images">
                        <img v-for="(image, index) in feedback.images" :key="index" :src="image"
                            @click="openImage(image)" alt="Feedback attachment">
                    </div>
                </div>

                <div class="feedback-footer">
                    <div class="feedback-tags">
                        <span v-for="tag in feedback.tags" :key="tag" class="tag">
                            {{ tag }}
                        </span>
                    </div>
                    <div class="feedback-actions">
                        <button class="action-btn" @click="handleReply(feedback)">
                            <i class="fas fa-reply"></i> Reply
                        </button>
                        <button class="action-btn" @click="toggleHelpful(feedback)"
                            :class="{ 'helpful-active': feedback.isHelpful }">
                            <i class="fas fa-thumbs-up"></i>
                            Helpful ({{ feedback.helpfulCount }})
                        </button>
                    </div>
                </div>

                <!-- Reply Section -->
                <div v-if="feedback.replies && feedback.replies.length" class="replies-section">
                    <div v-for="reply in feedback.replies" :key="reply.id" class="reply-card">
                        <div class="reply-header">
                            <img :src="reply.userAvatar" :alt="reply.userName" class="reply-avatar">
                            <div class="reply-details">
                                <span class="reply-name">{{ reply.userName }}</span>
                                <span class="reply-date">{{ formatDate(reply.date) }}</span>
                            </div>
                        </div>
                        <p class="reply-text">{{ reply.text }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredFeedback.length === 0" class="empty-state">
            <i class="fas fa-comments"></i>
            <h3>No feedback found</h3>
            <p>Try adjusting your search or filters</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FeedbackList',
    data() {
        return {
            searchQuery: '',
            projectFilter: '',
            ratingFilter: '',
            sortBy: 'newest',
            projects: ['Website Redesign', 'Mobile App', 'CRM Integration', 'E-commerce Platform'],
            feedback: [
                {
                    id: 1,
                    userName: 'John Doe',
                    userAvatar: 'path/to/avatar1.jpg',
                    project: 'Website Redesign',
                    rating: 5,
                    date: '2024-01-25',
                    comment: 'Excellent work on the website redesign! The new interface is intuitive and user-friendly. Really impressed with the attention to detail.',
                    tags: ['UI/UX', 'Design', 'Responsive'],
                    helpfulCount: 12,
                    isHelpful: false,
                    images: ['path/to/image1.jpg', 'path/to/image2.jpg'],
                    replies: [
                        {
                            id: 1,
                            userName: 'Project Manager',
                            userAvatar: 'path/to/pm-avatar.jpg',
                            date: '2024-01-26',
                            text: "Thank you for your detailed feedback! We're glad you're satisfied with the results."
              }
                    ]
                },
                
            ]
        }
    },
    computed: {
        totalReviews() {
            return this.feedback.length
        },
        filteredFeedback() {
            return this.feedback
                .filter(item => {
                    const matchesSearch = item.comment.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        item.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
                    const matchesProject = !this.projectFilter || item.project === this.projectFilter
                    const matchesRating = !this.ratingFilter || item.rating === parseInt(this.ratingFilter)
                    return matchesSearch && matchesProject && matchesRating
                })
                .sort((a, b) => {
                    switch (this.sortBy) {
                        case 'oldest':
                            return new Date(a.date) - new Date(b.date)
                        case 'highest':
                            return b.rating - a.rating
                        case 'lowest':
                            return a.rating - b.rating
                        default: // newest
                            return new Date(b.date) - new Date(a.date)
                    }
                })
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        },
        getRatingClass(rating) {
            if (rating >= 4) return 'high-rating'
            if (rating >= 3) return 'medium-rating'
            return 'low-rating'
        },
        handleReply(feedback) {
            // Implement reply functionality
            console.log('Reply to feedback:', feedback.id)
        },
        toggleHelpful(feedback) {
            feedback.isHelpful = !feedback.isHelpful
            feedback.helpfulCount += feedback.isHelpful ? 1 : -1
        },
        openImage(image) {
            // Implement image preview functionality
            console.log('Open image:', image)
        }
    }
}
</script>

<style scoped>
.feedback-page {
    padding: 24px;
    background-color: #f8f9fa;
    min-height: 100vh;
}

.feedback-header {
    background-color: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    margin-bottom: 24px;
}

.page-title {
    font-size: 28px;
    color: #2c3e50;
    margin-bottom: 24px;
    font-weight: 600;
}

.feedback-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.stat-card {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

.stat-value {
    font-size: 24px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.rating {
    color: #f1c40f;
}

.stars {
    color: #f1c40f;
    font-size: 18px;
}

.stat-label {
    color: #7f8c8d;
    font-size: 14px;
}

.feedback-filters {
    background-color: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    margin-bottom: 24px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.search-box {
    position: relative;
    flex-grow: 1;
    min-width: 200px;
}

.search-box i {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #95a5a6;
}

.search-box input {
    width: 90%;
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

.filter-controls {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
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

.feedback-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.feedback-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
}

.feedback-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.feedback-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}

.user-details {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
}

.project-name {
    font-size: 14px;
    color: #7f8c8d;
}

.feedback-meta {
    text-align: right;
}

.rating-stars {
    color: #f1c40f;
    margin-bottom: 4px;
}

.feedback-date {
    font-size: 14px;
    color: #95a5a6;
}

.feedback-content {
    margin-bottom: 20px;
}

.feedback-text {
    font-size: 15px;
    line-height: 1.6;
    color: #2c3e50;
    margin-bottom: 16px;
}

.feedback-images {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.feedback-images img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.feedback-images img:hover {
    transform: scale(1.05);
}

.feedback-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e9ecef;
}

.feedback-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.tag {
    background-color: #f0f2f5;
    color: #2c3e50;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.feedback-actions {
    display: flex;
    gap: 12px;
}

.action-btn {
    background: none;
    border: none;
    color: #7f8c8d;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;
}

.action-btn:hover {
    background-color: #f0f2f5;
    color: #2c3e50;
}

.action-btn.helpful-active {
    color: #27ae60;
    background-color: #e8f5e9;
}

.replies-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e9ecef;
}

.reply-card {
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
}

.reply-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
}

.reply-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
}

.reply-details {
    display: flex;
    flex-direction: column;
}

.reply-name {
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
}

.reply-date {
    font-size: 12px;
    color: #95a5a6;
}

.reply-text {
    font-size: 14px;
    color: #2c3e50;
    line-height: 1.5;
}

.empty-state {
    text-align: center;
    padding: 48px;
    background-color: white;
    border-radius: 12px;
    margin-top: 24px;
}

.empty-state i {
    font-size: 48px;
    color: #bdc3c7;
    margin-bottom: 16px;
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

@media (max-width: 768px) {
    .feedback-page {
        padding: 16px;
    }

    .feedback-filters {
        flex-direction: column;
    }

    .search-box {
        min-width: auto;
    }

    .filter-controls {
        flex-direction: column;
    }

    .filter-select {
        width: 100%;
    }

    .feedback-header {
        padding: 20px;
    }

    .feedback-stats {
        grid-template-columns: 1fr;
    }

    .feedback-card {
        padding: 20px;
    }

    .feedback-header {
        flex-direction: column;
        gap: 16px;
    }

    .feedback-meta {
        text-align: left;
    }

    .feedback-footer {
        flex-direction: column;
        gap: 16px;
    }

    .feedback-actions {
        width: 100%;
        justify-content: space-between;
    }
}
</style>