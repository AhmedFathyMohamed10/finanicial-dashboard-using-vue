
<template>
    <div class="withdrawals-page">
        <!-- Balance Overview Section -->
        <div class="balance-overview">
            <div class="balance-card available">
                <div class="balance-icon">
                    <i class="fas fa-wallet"></i>
                </div>
                <div class="balance-info">
                    <h3>Available Balance</h3>
                    <div class="amount">${{ formatNumber(availableBalance) }}</div>
                    <button @click="showWithdrawModal" class="withdraw-btn">
                        <i class="fas fa-money-bill-wave"></i>
                        Withdraw Funds
                    </button>
                </div>
            </div>

            <div class="balance-card pending">
                <div class="balance-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="balance-info">
                    <h3>Pending Balance</h3>
                    <div class="amount">${{ formatNumber(pendingBalance) }}</div>
                    <p class="info-text">Will be available in 7 days</p>
                </div>
            </div>

            <div class="balance-card total">
                <div class="balance-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="balance-info">
                    <h3>Total Withdrawn</h3>
                    <div class="amount">${{ formatNumber(totalWithdrawn) }}</div>
                    <p class="info-text">Lifetime withdrawals</p>
                </div>
            </div>
        </div>

        <!-- Payment Methods Section -->
        <div class="payment-methods-section">
            <div class="section-header">
                <h2>Payment Methods</h2>
                <button @click="showAddPaymentModal" class="add-method-btn">
                    <i class="fas fa-plus"></i>
                    Add Payment Method
                </button>
            </div>

            <div class="payment-methods-grid">
                <div v-for="method in paymentMethods" 
                     :key="method.id" 
                     class="payment-method-card"
                     :class="{ 'default': method.isDefault }">
                    <div class="method-icon">
                        <i :class="getPaymentIcon(method.type)"></i>
                    </div>
                    <div class="method-details">
                        <h3>{{ method.name }}</h3>
                        <p>{{ maskAccountNumber(method.accountNumber) }}</p>
                        <span class="method-type">{{ method.type }}</span>
                    </div>
                    <div class="method-actions">
                        <button v-if="!method.isDefault" 
                                @click="setDefaultMethod(method.id)" 
                                class="set-default-btn">
                            Set as Default
                        </button>
                        <button @click="editPaymentMethod(method)" 
                                class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button @click="deletePaymentMethod(method.id)" 
                                class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div v-if="method.isDefault" class="default-badge">
                        Default
                    </div>
                </div>
            </div>
        </div>

        <!-- Withdrawal History -->
        <div class="withdrawal-history-section">
            <div class="section-header">
                <h2>Withdrawal History</h2>
                <div class="history-filters">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input 
                            type="text" 
                            v-model="searchQuery" 
                            placeholder="Search withdrawals..."
                        >
                    </div>
                    <select v-model="statusFilter" class="status-filter">
                        <option value="">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>

            <div class="history-table">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                            <th>Reference</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="withdrawal in filteredWithdrawals" 
                            :key="withdrawal.id"
                            :class="withdrawal.status.toLowerCase()">
                            <td>{{ formatDate(withdrawal.date) }}</td>
                            <td class="amount">${{ formatNumber(withdrawal.amount) }}</td>
                            <td>
                                <div class="payment-method">
                                    <i :class="getPaymentIcon(withdrawal.method.type)"></i>
                                    <span>{{ withdrawal.method.name }}</span>
                                </div>
                            </td>
                            <td>
                                <span class="status-badge" :class="withdrawal.status.toLowerCase()">
                                    {{ withdrawal.status }}
                                </span>
                            </td>
                            <td>{{ withdrawal.reference }}</td>
                            <td>
                                <div class="action-buttons">
                                    <button @click="viewWithdrawal(withdrawal)" 
                                            class="view-btn">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button v-if="withdrawal.status === 'Failed'"
                                            @click="retryWithdrawal(withdrawal.id)" 
                                            class="retry-btn">
                                        <i class="fas fa-redo"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="pagination">
                <button 
                    :disabled="currentPage === 1"
                    @click="currentPage--"
                    class="page-btn"
                >
                    <i class="fas fa-chevron-left"></i>
                </button>
                <span class="page-info">
                    Page {{ currentPage }} of {{ totalPages }}
                </span>
                <button 
                    :disabled="currentPage === totalPages"
                    @click="currentPage++"
                    class="page-btn"
                >
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>

        <!-- Withdraw Modal -->
        <div v-if="showWithdrawModalFlag" class="modal-overlay">
            <div class="modal-content">
                <h2>Withdraw Funds</h2>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Amount</label>
                        <div class="amount-input">
                            <span class="currency">$</span>
                            <input 
                                type="number" 
                                v-model="withdrawAmount"
                                min="0"
                                :max="availableBalance"
                            >
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Payment Method</label>
                        <select v-model="selectedPaymentMethod">
                            <option v-for="method in paymentMethods"
                                    :key="method.id"
                                    :value="method.id">
                                {{ method.name }} - {{ maskAccountNumber(method.accountNumber) }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="closeWithdrawModal" class="cancel-btn">
                        Cancel
                    </button>
                    <button @click="processWithdrawal" 
                            class="confirm-btn"
                            :disabled="!isValidWithdrawal">
                        Confirm Withdrawal
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WithdrawalsPage',
    data() {
        return {
            availableBalance: 4580.25,
            pendingBalance: 1200.00,
            totalWithdrawn: 25750.80,
            searchQuery: '',
            statusFilter: '',
            currentPage: 1,
            itemsPerPage: 10,
            showWithdrawModalFlag: false,
            withdrawAmount: null,
            selectedPaymentMethod: null,
            paymentMethods: [
                {
                    id: 1,
                    type: 'bank',
                    name: 'Main Bank Account',
                    accountNumber: '****1234',
                    isDefault: true
                },
                {
                    id: 2,
                    type: 'paypal',
                    name: 'PayPal Account',
                    accountNumber: 'user@example.com',
                    isDefault: false
                }
            ],
            withdrawalHistory: [
                {
                    id: 1,
                    date: '2024-01-25',
                    amount: 1500.00,
                    method: {
                        type: 'bank',
                        name: 'Main Bank Account'
                    },
                    status: 'Completed',
                    reference: 'WD-2401251'
                },
                // Add more withdrawal history items
            ]
        }
    },
    computed: {
        filteredWithdrawals() {
            return this.withdrawalHistory
                .filter(withdrawal => {
                    const matchesSearch = withdrawal.reference.toLowerCase()
                        .includes(this.searchQuery.toLowerCase())
                    const matchesStatus = !this.statusFilter || 
                        withdrawal.status.toLowerCase() === this.statusFilter
                    return matchesSearch && matchesStatus
                })
                .slice((this.currentPage - 1) * this.itemsPerPage, 
                       this.currentPage * this.itemsPerPage)
        },
        totalPages() {
            return Math.ceil(this.withdrawalHistory.length / this.itemsPerPage)
        },
        isValidWithdrawal() {
            return this.withdrawAmount > 0 && 
                   this.withdrawAmount <= this.availableBalance && 
                   this.selectedPaymentMethod
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
        getPaymentIcon(type) {
            switch(type) {
                case 'bank':
                    return 'fas fa-university'
                case 'paypal':
                    return 'fab fa-paypal'
                default:
                    return 'fas fa-money-bill'
            }
        },
        maskAccountNumber(number) {
            return number.includes('@') ? number : `****${number.slice(-4)}`
        },
        showWithdrawModal() {
            this.showWithdrawModalFlag = true
        },
        closeWithdrawModal() {
            this.showWithdrawModalFlag = false
            this.withdrawAmount = null
            this.selectedPaymentMethod = null
        },
        processWithdrawal() {
            // Implement withdrawal logic
            console.log('Processing withdrawal:', {
                amount: this.withdrawAmount,
                methodId: this.selectedPaymentMethod
            })
            this.closeWithdrawModal()
        },
        setDefaultMethod(id) {
            this.paymentMethods.forEach(method => {
                method.isDefault = method.id === id
            })
        },
        editPaymentMethod(method) {
            console.log('Edit payment method:', method)
        },
        deletePaymentMethod(id) {
            console.log('Delete payment method:', id)
        },
        viewWithdrawal(withdrawal) {
            console.log('View withdrawal:', withdrawal)
        },
        retryWithdrawal(id) {
            console.log('Retry withdrawal:', id)
        }
    }
}
</script>

<style scoped>
.withdrawals-page {
    padding: 24px;
    background-color: #f8f9fa;
    min-height: 100vh;
}

/* Balance Overview Styles */
.balance-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
}

.balance-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    display: flex;
    gap: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    transition: transform 0.3s ease;
}

.balance-card:hover {
    transform: translateY(-2px);
}

.balance-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.available .balance-icon {
    background-color: #e8f5e9;
    color: #27ae60;
}

.pending .balance-icon {
    background-color: #fff3e0;
    color: #f39c12;
}

.total .balance-icon {
    background-color: #e3f2fd;
    color: #3498db;
}

.balance-info {
    flex-grow: 1;
}

.balance-info h3 {
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 8px;
}

.amount {
    font-size: 28px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 12px;
}

.info-text {
    font-size: 14px;
    color: #95a5a6;
}

.withdraw-btn {
    background-color: #27ae60;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.withdraw-btn:hover {
    background-color: #219a52;
    transform: translateY(-1px);
}

/* Payment Methods Section */
.payment-methods-section {
    background: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 32px;
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

.add-method-btn {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.add-method-btn:hover {
    background-color: #2980b9;
}

.payment-methods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.payment-method-card {
    position: relative;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: all 0.3s ease;
}

.payment-method-card:hover {
    border-color: #3498db;
    transform: translateY(-2px);
}

.payment-method-card.default {
    border-color: #27ae60;
}

.method-icon {
    width: 48px;
    height: 48px;
    background-color: #f8f9fa;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #3498db;
}

.method-details {
    flex-grow: 1;
}

.method-details h3 {
    font-size: 16px;
    color: #2c3e50;
    margin-bottom: 4px;
}

.method-details p {
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 4px;
}

.method-type {
    font-size: 12px;
    color: #95a5a6;
    text-transform: uppercase;
}

.method-actions {
    display: flex;
    gap: 8px;
}

.set-default-btn {
    background: none;
    border: 1px solid #3498db;
    color: #3498db;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.set-default-btn:hover {
    background-color: #3498db;
    color: white;
}

.edit-btn, .delete-btn {
    background: none;
    border: none;
    padding: 6px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.edit-btn {
    color: #3498db;
}

.delete-btn {
    color: #e74c3c;
}

.edit-btn:hover, .delete-btn:hover {
    background-color: #f8f9fa;
}

.default-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: #27ae60;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
}

/* Withdrawal History Section */
.withdrawal-history-section {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.history-filters {
    display: flex;
    gap: 16px;
}

.search-box {
    position: relative;
    min-width: 300px;
}

.search-box i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #95a5a6;
}

.search-box input {
    width: 80%;
    padding: 10px 10px 10px 35px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    margin-right: 160px;
}

.status-filter {
    padding: 10px 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    min-width: 150px;
}

.history-table {
    margin-top: 24px;
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

.payment-method {
    display: flex;
    align-items: center;
    gap: 8px;
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

.status-badge.failed {
    background-color: #ffebee;
    color: #e74c3c;
}

.action-buttons {
    display: flex;
    gap: 8px;
}

.view-btn, .retry-btn {
    background: none;
    border: none;
    padding: 6px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.view-btn {
    color: #3498db;
}

.retry-btn {
    color: #f39c12;
}

.view-btn:hover, .retry-btn:hover {
    background-color: #f8f9fa;
}

/* Pagination */
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
}

.page-btn {
    background: none;
    border: 2px solid #e9ecef;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-btn:not(:disabled):hover {
    background-color: #f8f9fa;
}

.page-info {
    font-size: 14px;
    color: #7f8c8d;
}

/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 12px;
    padding: 24px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
    font-size: 20px;
    color: #2c3e50;
    margin-bottom: 24px;
}

.modal-body {
    margin-bottom: 24px;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 8px;
}

.amount-input {
    position: relative;
    display: flex;
    align-items: center;
}

.currency {
    position: absolute;
    left: 12px;
    color: #7f8c8d;
}

.amount-input input {
    width: 100%;
    padding: 10px 10px 10px 25px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.cancel-btn {
    background: none;
    border: 2px solid #e9ecef;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.confirm-btn {
    background-color: #27ae60;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.confirm-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.confirm-btn:not(:disabled):hover {
    background-color: #219a52;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .withdrawals-page {
        padding: 16px;
    }

    .balance-overview {
        grid-template-columns: 1fr;
    }

    .payment-methods-grid {
        grid-template-columns: 1fr;
    }

    .history-filters {
        flex-direction: column;
    }

    .search-box {
        min-width: auto;
        width: 100%;
    }

    .status-filter {
        width: 100%;
    }

    .method-actions {
        flex-direction: column;
    }

    .modal-content {
        margin: 16px;
        max-height: calc(100vh - 32px);
        overflow-y: auto;
    }
}
</style>