<!-- src/views/Earnings.vue -->
<template>
    <div class="earnings-page">
        <!-- Overview Cards -->
        <div class="earnings-overview">
            <div class="overview-card total-earnings">
                <div class="card-icon">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="card-content">
                    <h3>Total Earnings</h3>
                    <div class="amount">${{ formatNumber(totalEarnings) }}</div>
                    <div class="trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>12% from last month</span>
                    </div>
                </div>
            </div>

            <div class="overview-card pending">
                <div class="card-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="card-content">
                    <h3>Pending Payments</h3>
                    <div class="amount">${{ formatNumber(pendingPayments) }}</div>
                    <div class="trend neutral">
                        <i class="fas fa-minus"></i>
                        <span>3 payments pending</span>
                    </div>
                </div>
            </div>

            <div class="overview-card completed">
                <div class="card-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="card-content">
                    <h3>Completed Projects</h3>
                    <div class="amount">{{ completedProjects }}</div>
                    <div class="trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>5 this month</span>
                    </div>
                </div>
            </div>

            <div class="overview-card average">
                <div class="card-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="card-content">
                    <h3>Average per Project</h3>
                    <div class="amount">${{ formatNumber(averageEarnings) }}</div>
                    <div class="trend positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>8% increase</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Earnings Chart -->
        <div class="earnings-chart-container">
            <!-- Earnings Chart -->
            <div class="earnings-chart-container">
                <div class="chart-header">
                    <h2>Earnings Overview</h2>
                    <div class="chart-controls">
                        <select v-model="chartPeriod" class="period-select">
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                        <div class="chart-legend">
                            <div class="legend-item">
                                <div class="legend-color earnings"></div>
                                <span>Earnings</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color projects"></div>
                                <span>Projects</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chart-area">
                    <earnings-chart :period="chartPeriod" />
                </div>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="transactions-section">
            <div class="section-header">
                <h2>Recent Transactions</h2>
                <div class="header-actions">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" v-model="searchQuery" placeholder="Search transactions...">
                    </div>
                    <select v-model="transactionFilter" class="filter-select">
                        <option value="">All Transactions</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                    </select>
                </div>
            </div>

            <div class="transactions-table">
                <table>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="transaction in filteredTransactions" :key="transaction.id"
                            :class="transaction.status.toLowerCase()">
                            <td class="project-cell">
                                <div class="project-info">
                                    <img :src="transaction.projectIcon" :alt="transaction.project">
                                    <div class="project-details">
                                        <span class="project-name">{{ transaction.project }}</span>
                                        <span class="project-type">{{ transaction.type }}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{{ formatDate(transaction.date) }}</td>
                            <td class="amount-cell">${{ formatNumber(transaction.amount) }}</td>
                            <td>
                                <span class="status-badge" :class="transaction.status.toLowerCase()">
                                    {{ transaction.status }}
                                </span>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <button class="action-btn" @click="viewTransaction(transaction)">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="action-btn" @click="downloadInvoice(transaction)">
                                        <i class="fas fa-download"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="pagination">
                <button class="pagination-btn" :disabled="currentPage === 1" @click="currentPage--">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
                <button class="pagination-btn" :disabled="currentPage === totalPages" @click="currentPage++">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>

        <!-- Withdrawal Section -->
        <div class="withdrawal-section">
            <div class="withdrawal-card">
                <h2>Available for Withdrawal</h2>
                <div class="withdrawal-amount">
                    ${{ formatNumber(availableForWithdrawal) }}
                </div>
                <button class="withdraw-btn" @click="initiateWithdrawal">
                    <i class="fas fa-money-bill-wave"></i>
                    Withdraw Funds
                </button>
                <div class="withdrawal-info">
                    <div class="info-item">
                        <i class="fas fa-university"></i>
                        <span>Connected Bank Account: **** 1234</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <span>Processing Time: 2-3 business days</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EarningsChart from '@/components/EarningsChart.vue'
export default {
    name: 'EarningsPage',
    components: {
        EarningsChart
    },
    data() {
        return {
            totalEarnings: 25750.80,
            pendingPayments: 3200.00,
            completedProjects: 48,
            averageEarnings: 536.47,
            chartPeriod: 'month',
            searchQuery: '',
            transactionFilter: '',
            currentPage: 1,
            itemsPerPage: 10,
            availableForWithdrawal: 4580.25,
            transactions: [
                {
                    id: 1,
                    project: 'Website Redesign',
                    projectIcon: 'path/to/icon1.png',
                    type: 'Design Project',
                    date: '2024-01-25',
                    amount: 1500.00,
                    status: 'Completed'
                },
                {
                    id: 2,
                    project: 'Mobile App Development',
                    projectIcon: 'path/to/icon2.png',
                    type: 'Development',
                    date: '2024-01-23',
                    amount: 2800.00,
                    status: 'Pending'
                },
                // Add more transactions...
            ]
        }
    },
    computed: {
        filteredTransactions() {
            return this.transactions
                .filter(transaction => {
                    const matchesSearch = transaction.project.toLowerCase()
                        .includes(this.searchQuery.toLowerCase())
                    const matchesFilter = !this.transactionFilter ||
                        transaction.status.toLowerCase() === this.transactionFilter
                    return matchesSearch && matchesFilter
                })
                .slice((this.currentPage - 1) * this.itemsPerPage,
                    this.currentPage * this.itemsPerPage)
        },
        totalPages() {
            return Math.ceil(this.transactions.length / this.itemsPerPage)
        }
    },
    methods: {
        formatNumber(number) {
            return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        },
        viewTransaction(transaction) {
            console.log('View transaction:', transaction.id)
        },
        downloadInvoice(transaction) {
            console.log('Download invoice for:', transaction.id)
        },
        initiateWithdrawal() {
            console.log('Initiate withdrawal')
        }
    }
}
</script>

<style scoped>
.earnings-page {
    padding: 24px;
    background-color: #f8f9fa;
    min-height: 100vh;
}

.earnings-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
}

.overview-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    transition: transform 0.3s ease;
}

.overview-card:hover {
    transform: translateY(-2px);
}

.card-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.total-earnings .card-icon {
    background-color: #e8f5e9;
    color: #27ae60;
}

.pending .card-icon {
    background-color: #fff3e0;
    color: #f39c12;
}

.completed .card-icon {
    background-color: #e3f2fd;
    color: #3498db;
}

.average .card-icon {
    background-color: #f5e6ff;
    color: #9b59b6;
}

.card-content {
    flex-grow: 1;
}

.card-content h3 {
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 8px;
}

.amount {
    font-size: 24px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
}

.trend {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
}

.trend.positive {
    color: #27ae60;
}

.trend.negative {
    color: #e74c3c;
}

.trend.neutral {
    color: #f39c12;
}

.earnings-chart-container {
    background: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.chart-header h2 {
    font-size: 20px;
    color: #2c3e50;
}

.chart-controls {
    display: flex;
    align-items: center;
    gap: 16px;
}

.period-select {
    padding: 8px 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
}

.chart-legend {
    display: flex;
    gap: 16px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.legend-color {
    width: 12px;
    height: 12px;
    border-radius: 3px;
}

.legend-color.earnings {
    background-color: #3498db;
}

.legend-color.projects {
    background-color: #e74c3c;
}

.chart-area {
    height: 300px;
    margin-top: 16px;
    margin-bottom: 24px;
}

.placeholder-chart {
    height: 100%;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #95a5a6;
}

.transactions-section {
    background: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.section-header h2 {
    font-size: 20px;
    color: #2c3e50;
}

.header-actions {
    display: flex;
    gap: 16px;
}

.search-box {
    position: relative;
}

.search-box i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #95a5a6;
}

.search-box input {
    padding: 8px 8px 8px 35px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    min-width: 200px;
}

.filter-select {
    padding: 8px 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
}

.transactions-table {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    text-align: left;
    padding: 12px;
    font-size: 14px;
    color: #7f8c8d;
    border-bottom: 2px solid #e9ecef;
}

td {
    padding: 16px 12px;
    border-bottom: 1px solid #e9ecef;
}

.project-cell {
    min-width: 200px;
}

.project-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.project-info img {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    object-fit: cover;
}

.project-details {
    display: flex;
    flex-direction: column;
}

.project-name {
    font-weight: 500;
    color: #2c3e50;
}

.project-type {
    font-size: 12px;
    color: #7f8c8d;
}

.amount-cell {
    font-weight: 500;
    color: #2c3e50;
}

.status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.status-badge.completed {
    background-color: #e8f5e9;
    color: #27ae60;
}

.status-badge.pending {
    background-color: #fff3e0;
    color: #f39c12;
}

.status-badge.processing {
    background-color: #e3f2fd;
    color: #3498db;
}

.action-buttons {
    display: flex;
    gap: 8px;
}

.action-btn {
    background: none;
    border: none;
    color: #95a5a6;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.action-btn:hover {
    background-color: #f8f9fa;
    color: #2c3e50;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
}

.pagination-btn {
    background: none;
    border: 2px solid #e9ecef;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination-btn:not(:disabled):hover {
    background-color: #f8f9fa;
}

.page-info {
    font-size: 14px;
    color: #7f8c8d;
}

.withdrawal-section {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.withdrawal-card {
    text-align: center;
}

.withdrawal-card h2 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 16px;
}

.withdrawal-amount {
    font-size: 36px;
    font-weight: 600;
    color: #27ae60;
    margin-bottom: 24px;
}

.withdraw-btn {
    background-color: #27ae60;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 auto;
    transition: all 0.3s ease;
}

.withdraw-btn:hover {
    background-color: #219a52;
    transform: translateY(-1px);
}

.withdrawal-info {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #7f8c8d;
    font-size: 14px;
    justify-content: center;
}

@media (max-width: 768px) {
    .earnings-page {
        padding: 16px;
    }

    .earnings-overview {
        grid-template-columns: 1fr;
    }

    .header-actions {
        flex-direction: column;
    }

    .search-box input {
        width: 100%;
        min-width: auto;
    }

    .filter-select {
        width: 100%;
    }

    .transactions-table {
        margin: 0 -24px;
        padding: 0 24px;
    }

    .action-buttons {
        flex-direction: column;
    }
}
.chart-area {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);
}

.chart-controls {
    display: flex;
    align-items: center;
    gap: 24px;
}

.period-select {
    padding: 8px 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    color: #2c3e50;
    background-color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.period-select:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.chart-legend {
    display: flex;
    gap: 20px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #7f8c8d;
}

.legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
}

.legend-color.earnings {
    background-color: #3498db;
}

.legend-color.projects {
    background-color: #e74c3c;
}

@media (max-width: 768px) {
    .chart-controls {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    .period-select {
        width: 100%;
    }

    .chart-legend {
        width: 100%;
        justify-content: space-around;
    }
}
</style>