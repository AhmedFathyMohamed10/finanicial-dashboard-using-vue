<!-- src/views/Reports.vue -->
<template>
    <div class="reports-page">
        <!-- Header Section -->
        <div class="reports-header">
            <h1>Reports & Analytics</h1>
            <div class="date-range-picker">
                <button v-for="range in dateRanges" :key="range.value"
                    :class="['range-btn', { active: selectedRange === range.value }]"
                    @click="selectedRange = range.value">
                    {{ range.label }}
                </button>
                <!-- Custom Date Range Picker -->
                <div class="custom-range">
                    <input type="date" v-model="startDate" :max="endDate">
                    <span>to</span>
                    <input type="date" v-model="endDate" :min="startDate">
                </div>
            </div>
        </div>

        <!-- Key Metrics Cards -->
        <div class="metrics-grid">
            <div v-for="metric in keyMetrics" :key="metric.id" class="metric-card">
                <div class="metric-icon" :style="{ backgroundColor: metric.bgColor }">
                    <i :class="metric.icon"></i>
                </div>
                <div class="metric-info">
                    <h3>{{ metric.label }}</h3>
                    <div class="metric-value">{{ metric.value }}</div>
                    <div :class="['metric-trend', metric.trend > 0 ? 'positive' : 'negative']">
                        <i :class="metric.trend > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
                        {{ Math.abs(metric.trend) }}% from previous period
                    </div>
                </div>
            </div>
        </div>

        <!-- Reports Grid -->
        <div class="reports-grid">
            <div class="report-card full-width">
                <div class="report-header">
                    <h2>Revenue Overview</h2>
                    <div class="report-controls">
                        <select v-model="revenueChartType" @change="updateChart">
                            <option value="line">Line Chart</option>
                            <option value="bar">Bar Chart</option>
                        </select>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas ref="revenueChart"></canvas>
                </div>
            </div>

            <!-- User Activity -->
            <div class="report-card">
                <div class="report-header">
                    <h2>User Activity</h2>
                </div>
                <div class="activity-list">
                    <div v-for="activity in userActivities" :key="activity.id" class="activity-item">
                        <div class="activity-icon" :class="activity.type">
                            <i :class="activity.icon"></i>
                        </div>
                        <div class="activity-details">
                            <div class="activity-title">{{ activity.title }}</div>
                            <div class="activity-meta">
                                {{ activity.time }} • {{ activity.user }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Popular Items -->
            <div class="report-card">
                <div class="report-header">
                    <h2>Popular Items</h2>
                    <select v-model="popularItemsType">
                        <option value="products">Products</option>
                        <option value="pages">Pages</option>
                    </select>
                </div>
                <div class="popular-items-list">
                    <div v-for="item in popularItems" :key="item.id" class="popular-item">
                        <div class="item-rank">#{{ item.rank }}</div>
                        <div class="item-details">
                            <div class="item-name">{{ item.name }}</div>
                            <div class="item-stats">
                                <span>{{ item.views }} views</span>
                                <span>{{ item.conversion }}% conversion</span>
                            </div>
                        </div>
                        <div class="item-trend" :class="item.trend >= 0 ? 'positive' : 'negative'">
                            {{ item.trend > 0 ? '+' : '' }}{{ item.trend }}%
                        </div>
                    </div>
                </div>
            </div>

            <!-- Conversion Funnel -->
            <div class="report-card">
                <div class="report-header">
                    <h2>Conversion Funnel</h2>
                </div>
                <div class="funnel-container">
                    <div v-for="(stage, index) in funnel" :key="stage.id" class="funnel-stage"
                        :style="{ width: `${100 - (index * 15)}%` }">
                        <div class="stage-info">
                            <div class="stage-name">{{ stage.name }}</div>
                            <div class="stage-value">{{ stage.value }}</div>
                        </div>
                        <div class="stage-bar" :style="{ width: `${stage.percentage}%` }"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Export Section -->
        <div class="export-section">
            <button class="export-btn" @click="exportReport">
                <i class="fas fa-download"></i>
                Export Report
            </button>
            <div class="export-options">
                <label>
                    <input type="checkbox" v-model="exportOptions.includeMetrics"> Include Metrics
                </label>
                <label>
                    <input type="checkbox" v-model="exportOptions.includeCharts"> Include Charts
                </label>
                <label>
                    <input type="checkbox" v-model="exportOptions.includeTables"> Include Tables
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
export default {
    name: 'ReportsPage',
    data() {
        
        return {
            revenueChartType: 'line',
            chart: null,
            chartData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [30000, 35000, 32000, 40000, 45000, 43000, 50000, 48000, 52000, 55000, 58000, 62000],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Expenses',
                        data: [25000, 28000, 27000, 32000, 35000, 34000, 38000, 37000, 40000, 42000, 45000, 48000],
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            selectedRange: 'week',
            startDate: null,
            endDate: null,
            dateRanges: [
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' },
                { label: 'Quarter', value: 'quarter' },
                { label: 'Year', value: 'year' },
                { label: 'Custom', value: 'custom' }
            ],
            keyMetrics: [
                {
                    id: 1,
                    label: 'Total Revenue',
                    value: '$45,678',
                    trend: 12.5,
                    icon: 'fas fa-dollar-sign',
                    bgColor: '#e8f5e9'
                },
                {
                    id: 2,
                    label: 'Active Users',
                    value: '1,234',
                    trend: 8.3,
                    icon: 'fas fa-users',
                    bgColor: '#e3f2fd'
                },
                {
                    id: 3,
                    label: 'Conversion Rate',
                    value: '3.2%',
                    trend: -2.1,
                    icon: 'fas fa-chart-line',
                    bgColor: '#fff3e0'
                },
                {
                    id: 4,
                    label: 'Avg. Order Value',
                    value: '$123',
                    trend: 5.7,
                    icon: 'fas fa-shopping-cart',
                    bgColor: '#f3e5f5'
                }
            ],
            userActivities: [
                {
                    id: 1,
                    type: 'purchase',
                    icon: 'fas fa-shopping-bag',
                    title: 'New Purchase',
                    time: '2 minutes ago',
                    user: 'John Doe'
                },
                {
                    id: 2,
                    type: 'purchase',
                    icon: 'fas fa-shopping-bag',
                    title: 'New Purchase',
                    time: '2 minutes ago',
                    user: 'John Doe'
                },
                {
                    id: 3,
                    type: 'purchase',
                    icon: 'fas fa-shopping-bag',
                    title: 'New Purchase',
                    time: '2 minutes ago',
                    user: 'John Doe'
                }
            ],
            popularItemsType: 'products',
            popularItems: [
                {
                    id: 1,
                    rank: 1,
                    name: 'Product Name',
                    views: 1234,
                    conversion: 3.5,
                    trend: 12
                },
                {
                    id: 2,
                    rank: 2,
                    name: 'Product Name',
                    views: 1234,
                    conversion: 3.5,
                    trend: 12
                },
                {
                    id: 3,
                    rank: 3,
                    name: 'Product Name',
                    views: 1234,
                    conversion: 3.5,
                    trend: 12
                },
                {
                    id: 4,
                    rank: 4,
                    name: 'Product Name',
                    views: 1234,
                    conversion: 3.5,
                    trend: 12
                },
                {
                    id: 5,
                    rank: 5,
                    name: 'Product Name',
                    views: 1234,
                    conversion: 3.5,
                    trend: 12
                },
                {
                    id: 6,
                    rank: 6,
                    name: 'Product Name',
                    views: 1234,
                    conversion: 3.5,
                    trend: 12
                },

            ],
            funnel: [
                {
                    id: 1,
                    name: 'Visitors',
                    value: '10,000',
                    percentage: 100
                },
                {
                    id: 2,
                    name: 'Product Views',
                    value: '7,500',
                    percentage: 75
                },
                {
                    id: 3,
                    name: 'Add to Cart',
                    value: '3,000',
                    percentage: 30
                },
                {
                    id: 4,
                    name: 'Purchase',
                    value: '1,000',
                    percentage: 10
                }
            ],
            exportOptions: {
                includeMetrics: true,
                includeCharts: true,
                includeTables: true
            }
        }
    },
    methods: {
        exportReport() {
            // Implement export functionality
            console.log('Exporting report with options:', this.exportOptions)
        },
        createChart() {
            const ctx = this.$refs.revenueChart.getContext('2d')
            
            this.chart = new Chart(ctx, {
                type: this.revenueChartType,
                data: this.chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'white',
                            titleColor: '#2c3e50',
                            bodyColor: '#2c3e50',
                            borderColor: '#e9ecef',
                            borderWidth: 1,
                            padding: 12,
                            displayColors: true,
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }).format(context.parsed.y);
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: '#f0f2f5'
                            },
                            ticks: {
                                font: {
                                    size: 12
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: '#f0f2f5'
                            },
                            ticks: {
                                font: {
                                    size: 12
                                },
                                callback: function(value) {
                                    return new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(value);
                                }
                            }
                        }
                    }
                }
            })
        },
        updateChart() {
            if (this.chart) {
                this.chart.destroy()
            }
            this.createChart()
        }
    },
    mounted() {
        this.createChart()
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.destroy()
        }
    },
}
</script>

<style scoped>
.reports-page {
    padding: 24px;
    background-color: #f8f9fa;
    min-height: 100vh;
}

/* Header Styles */
.reports-header {
    background: white;
    padding: 24px;
    border-radius: 16px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px rgba(138, 133, 133, 0.04);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.reports-header h1 {
    font-size: 24px;
    color: #2c3e50;
    font-weight: 600;
    margin: 0;
}

.date-range-picker {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.range-btn {
    padding: 8px 16px;
    border: 2px solid #7fb1e4;
    background: none;
    border-radius: 8px;
    color: #7f8c8d;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.range-btn.active {
    background-color: #3498db;
    border-color: #3498db;
    color: white;
}

.range-btn:hover:not(.active) {
    border-color: #3498db;
    color: #3498db;
}

.custom-range {
    display: flex;
    align-items: center;
    gap: 8px;
}

.custom-range input {
    padding: 8px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    color: #2c3e50;
}

/* Key Metrics Styles */
.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
}

.metric-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    transition: transform 0.3s ease;
}

.metric-card:hover {
    transform: translateY(-2px);
}

.metric-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.metric-info {
    flex-grow: 1;
}

.metric-info h3 {
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 8px;
}

.metric-value {
    font-size: 24px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
}

.metric-trend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
}

.metric-trend.positive {
    color: #27ae60;
}

.metric-trend.negative {
    color: #e74c3c;
}

/* Reports Grid Styles */
.reports-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 24px;
}

.report-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.report-card.full-width {
    grid-column: 1 / -1;
}

.report-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.report-header h2 {
    font-size: 18px;
    color: #2c3e50;
    font-weight: 600;
}

.report-controls select {
    padding: 8px 12px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    color: #2c3e50;
    background-color: white;
    width: 100%;
    outline: none;
    appearance: none;
}

/* Chart Styles */
.chart-container {
    height: 300px;
    position: relative;
}

.placeholder-chart {
    width: 100%;
    height: 100%;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #95a5a6;
    border-radius: 8px;
}

/* Activity List Styles */
.activity-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.activity-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.activity-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
}

.activity-icon.purchase {
    background-color: #e8f5e9;
    color: #27ae60;
}

.activity-details {
    flex-grow: 1;
}

.activity-title {
    font-size: 14px;
    color: #2c3e50;
    margin-bottom: 4px;
}

.activity-meta {
    font-size: 12px;
    color: #95a5a6;
}

/* Popular Items Styles */
.popular-items-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.popular-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.item-rank {
    font-size: 20px;
    font-weight: 600;
    color: #3498db;
    min-width: 40px;
}

.item-details {
    flex-grow: 1;
}

.item-name {
    font-size: 14px;
    color: #2c3e50;
    margin-bottom: 4px;
}

.item-stats {
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: #7f8c8d;
}

.item-trend {
    font-size: 14px;
    font-weight: 500;
}

.item-trend.positive {
    color: #27ae60;
}

.item-trend.negative {
    color: #e74c3c;
}

/* Funnel Styles */
.funnel-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.funnel-stage {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
    margin-left: auto;
    margin-right: auto;
}

.stage-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.stage-name {
    font-size: 14px;
    color: #2c3e50;
}

.stage-value {
    font-size: 14px;
    font-weight: 500;
    color: #3498db;
}

.stage-bar {
    height: 8px;
    background-color: #3498db;
    border-radius: 4px;
    transition: width 0.3s ease;
}

/* Export Section Styles */
.export-section {
    background: white;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.export-btn {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.export-btn:hover {
    background-color: #2980b9;
    transform: translateY(-1px);
}

.export-options {
    display: flex;
    gap: 16px;
}

.export-options label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #2c3e50;
    cursor: pointer;
}

.export-options input[type="checkbox"] {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    cursor: pointer;
}

/* Loading States */
.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
}

.loader {
    width: 24px;
    height: 24px;
    border: 3px solid #e9ecef;
    border-top-color: #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Responsive Styles */
@media (max-width: 1200px) {
    .reports-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .reports-page {
        padding: 16px;
    }

    .reports-header {
        padding: 20px;
        flex-direction: column;
        align-items: stretch;
    }

    .date-range-picker {
        flex-direction: column;
        width: 100%;
    }

    .range-btn {
        width: 100%;
    }

    .custom-range {
        flex-direction: column;
        width: 100%;
    }

    .custom-range input {
        width: 100%;
    }

    .metrics-grid {
        grid-template-columns: 1fr;
    }

    .export-section {
        flex-direction: column;
        gap: 16px;
    }

    .export-options {
        flex-direction: column;
    }

    .export-btn {
        width: 100%;
        justify-content: center;
    }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    .reports-page {
        background-color: white;
    }

    .reports-header,
    .metric-card,
    .report-card,
    .export-section {
        background-color: #ffffff;
    }

    .reports-header h1,
    .metric-info h3,
    .metric-value,
    .report-header h2,
    .activity-title,
    .item-name,
    .stage-name {
        color: #25292c;
    }

    .range-btn {
        border-color: #4a5568;
        color: #a0aec0;
    }

    .range-btn.active {
        background-color: #4299e1;
        border-color: #4299e1;
        color: white;
    }

    .custom-range input,
    .report-controls select {
        background-color: #ffffff;
        border-color: #4a5568;
        color: #2c3e50;
    }

    .popular-item,
    .funnel-stage {
        background-color: #ffffff;
        border-color: #4a5568;
        color: #2c3e50;
    }

    .placeholder-chart {
        background-color: #ffffff;
        color: #2c3e50;
    }
}
</style>