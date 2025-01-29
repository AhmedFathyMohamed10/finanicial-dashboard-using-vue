<!-- src/views/BillingSubscriptions.vue -->
<template>
    <div class="billing-page">
        <!-- Current Plan Section -->
        <div class="section current-plan">
            <div class="section-header">
                <h2>Current Plan</h2>
                <span :class="['plan-status', subscription.status]">
                    {{ subscription.status }}
                </span>
            </div>

            <div class="plan-details">
                <div class="plan-info">
                    <h3>{{ subscription.planName }}</h3>
                    <p class="plan-price">
                        ${{ subscription.price }}<span>/month</span>
                    </p>
                    <p class="renewal-info">
                        Next billing date: {{ formatDate(subscription.nextBillingDate) }}
                    </p>
                </div>
                <div class="plan-actions">
                    <button v-if="subscription.status === 'active'" @click="showUpgradeModal = true"
                        class="upgrade-btn">
                        Upgrade Plan
                    </button>
                    <button v-if="subscription.status === 'active'" @click="showCancelModal = true" class="cancel-btn">
                        Cancel Plan
                    </button>
                </div>
            </div>

            <div class="plan-features">
                <h4>Your Plan Features</h4>
                <div v-if="isLoading" class="features-loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    Loading features...
                </div>
                <div v-else-if="error" class="features-error">
                    <i class="fas fa-exclamation-circle"></i>
                    {{ error }}
                </div>
                <div v-else>
                    <ul v-if="currentPlanFeatures.length">
                        <li v-for="feature in currentPlanFeatures" :key="feature">
                            <i class="fas fa-check"></i>
                            {{ feature }}
                        </li>
                    </ul>
                    <div v-else class="features-empty">
                        <i class="fas fa-info-circle"></i>
                        No features available for this plan
                    </div>
                </div>
            </div>
        </div>

        <!-- Payment Methods Section -->
        <div class="section payment-methods">
            <div class="section-header">
                <h2>Payment Methods</h2>
                <button @click="showAddPaymentModal = true" class="add-payment-btn">
                    <i class="fas fa-plus"></i>
                    Add Payment Method
                </button>
            </div>

            <div class="payment-methods-list">
                <div v-for="method in paymentMethods" :key="method.id" class="payment-method-card"
                    :class="{ 'default': method.isDefault }">
                    <div class="card-icon">
                        <i :class="getCardIcon(method.type)"></i>
                    </div>
                    <div class="card-details">
                        <h3>{{ method.type }} •••• {{ method.lastFour }}</h3>
                        <p>Expires {{ method.expiry }}</p>
                        <span v-if="method.isDefault" class="default-badge">Default</span>
                    </div>
                    <div class="card-actions">
                        <button v-if="!method.isDefault" @click="setDefaultPayment(method.id)" class="make-default-btn">
                            Make Default
                        </button>
                        <button v-if="!method.isDefault" @click="removePaymentMethod(method.id)" class="remove-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Billing History Section -->
        <div class="section billing-history">
            <div class="section-header">
                <h2>Billing History</h2>
                <div class="history-filters">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" v-model="searchQuery" placeholder="Search invoices...">
                    </div>
                    <select v-model="statusFilter" class="status-filter">
                        <option value="">All Status</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>

            <div class="billing-table">
                <table>
                    <thead>
                        <tr>
                            <th>Invoice</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="invoice in filteredInvoices" :key="invoice.id">
                            <td>
                                <div class="invoice-info">
                                    <span class="invoice-id">{{ invoice.number }}</span>
                                    <span class="invoice-desc">{{ invoice.description }}</span>
                                </div>
                            </td>
                            <td>${{ formatNumber(invoice.amount) }}</td>
                            <td>{{ formatDate(invoice.date) }}</td>
                            <td>
                                <span :class="['status-badge', invoice.status]">
                                    {{ invoice.status }}
                                </span>
                            </td>
                            <td>
                                <div class="invoice-actions">
                                    <button @click="downloadInvoice(invoice.id)" class="download-btn">
                                        <i class="fas fa-download"></i>
                                        Download
                                    </button>
                                    <button v-if="invoice.status === 'pending'" @click="payInvoice(invoice.id)"
                                        class="pay-btn">
                                        Pay Now
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="pagination">
                <button :disabled="currentPage === 1" @click="currentPage--" class="page-btn">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <span class="page-info">
                    Page {{ currentPage }} of {{ totalPages }}
                </span>
                <button :disabled="currentPage === totalPages" @click="currentPage++" class="page-btn">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>

        <!-- Upgrade Plan Modal -->
        <div v-if="showUpgradeModal" class="modal" @click.self="closeUpgradeModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Upgrade Plan</h2>
                    <button class="close-btn" @click="closeUpgradeModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="plans-grid">
                        <div v-for="plan in subscription.availablePlans" :key="plan.id" class="plan-card"
                            :class="{ 'selected': selectedPlan === plan.id }" @click="selectPlan(plan.id)">
                            <div class="plan-header">
                                <h3>{{ plan.name }}</h3>
                                <p class="plan-price">
                                    ${{ plan.price }}<span>/month</span>
                                </p>
                            </div>
                            <div class="plan-features">
                                <ul>
                                    <li v-for="feature in plan.features" :key="feature">
                                        <i class="fas fa-check"></i>
                                        {{ feature }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="cancel-btn" @click="closeUpgradeModal">Cancel</button>
                    <button class="confirm-btn" :disabled="!selectedPlan" @click="confirmUpgrade">
                        Confirm Upgrade
                    </button>
                </div>
            </div>
        </div>

        <!-- Cancel Plan Modal -->
        <div v-if="showCancelModal" class="modal" @click.self="closeCancelModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Cancel Subscription</h2>
                    <button class="close-btn" @click="closeCancelModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="cancellation-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Are you sure you want to cancel?</h3>
                        <p>Your subscription will be cancelled at the end of your current billing period.</p>
                    </div>
                    <div class="cancellation-form">
                        <div class="form-group">
                            <label>Reason for cancellation</label>
                            <select v-model="cancellationReason">
                                <option value="">Select a reason</option>
                                <option value="too_expensive">Too expensive</option>
                                <option value="not_using">Not using enough</option>
                                <option value="missing_features">Missing features</option>
                                <option value="switched_service">Switched to another service</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group" v-if="cancellationReason === 'other'">
                            <label>Please specify</label>
                            <textarea v-model="cancellationFeedback"
                                placeholder="Tell us more about why you're leaving..." rows="4"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="keep-btn" @click="closeCancelModal">Keep Subscription</button>
                    <button class="cancel-subscription-btn" :disabled="!cancellationReason"
                        @click="confirmCancellation">
                        Cancel Subscription
                    </button>
                </div>
            </div>
        </div>

        <!-- Add Payment Method Modal -->
        <div v-if="showAddPaymentModal" class="modal" @click.self="closePaymentModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Add Payment Method</h2>
                    <button class="close-btn" @click="closePaymentModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addPaymentMethod" class="payment-form">
                        <div class="form-group">
                            <label>Card Holder Name</label>
                            <input type="text" v-model="paymentForm.cardHolder" placeholder="Name on card" required>
                        </div>
                        <div class="form-group">
                            <label>Card Number</label>
                            <div class="card-input">
                                <input type="text" v-model="paymentForm.cardNumber" placeholder="1234 5678 9012 3456"
                                    @input="formatCardNumber" maxlength="19" required>
                                <i :class="cardTypeIcon"></i>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Expiry Date</label>
                                <input type="text" v-model="paymentForm.expiry" placeholder="MM/YY"
                                    @input="formatExpiry" maxlength="5" required>
                            </div>
                            <div class="form-group">
                                <label>CVV</label>
                                <input type="text" v-model="paymentForm.cvv" placeholder="123" maxlength="4" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" v-model="paymentForm.setDefault">
                                <span class="checkmark"></span>
                                Set as default payment method
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="cancel-btn" @click="closePaymentModal">Cancel</button>
                    <button class="confirm-btn" :disabled="!isPaymentFormValid" @click="addPaymentMethod">
                        Add Payment Method
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BillingSubscriptions',
    data() {
        return {
            selectedPlan: null,
            subscription: {
                planName: 'Professional Plan',
                status: 'active',
                price: 49.99,
                nextBillingDate: '2024-02-28',
                showUpgradeModal: false,
                isLoading: false,
                error: null,
                availablePlans: [
                    {
                        id: 1,
                        name: 'Professional',
                        price: 49.99,
                        features: [
                            'All Basic Features',
                            'Priority Support',
                            'Custom Domain',
                            'Analytics Dashboard'
                        ]
                    },
                    {
                        id: 2,
                        name: 'Business',
                        price: 99.99,
                        features: [
                            'All Professional Features',
                            'Team Collaboration',
                            'API Access',
                            'Custom Branding'
                        ]
                    },
                    {
                        id: 3,
                        name: 'Enterprise',
                        price: 199.99,
                        features: [
                            'All Business Features',
                            'Dedicated Support',
                            'Custom Integration',
                            'SLA Guarantee'
                        ]
                    },
                ]
            },
            paymentMethods: [
                {
                    id: 1,
                    type: 'Visa',
                    lastFour: '4242',
                    expiry: '12/24',
                    isDefault: true
                },
                {
                    id: 2,
                    type: 'Mastercard',
                    lastFour: '5555',
                    expiry: '09/25',
                    isDefault: false
                }
            ],
            invoices: [
                {
                    id: 1,
                    number: 'INV-2024-001',
                    description: 'Professional Plan - January 2024',
                    amount: 49.99,
                    date: '2024-01-01',
                    status: 'paid'
                },
                {
                    id: 2,
                    number: 'INV-2024-002',
                    description: 'Business Plan - January 2024',
                    amount: 99.99,
                    date: '2024-01-01',
                    status: 'pending'
                },
                {
                    id: 3,
                    number: 'INV-2024-003',
                    description: 'Enterprise Plan - January 2024',
                    amount: 199.99,
                    date: '2024-01-01',
                    status: 'failed'
                },
                {
                    id: 4,
                    number: 'INV-2024-004',
                    description: 'Professional Plan - February 2024',
                    amount: 49.99,
                    date: '2024-02-01',
                    status: 'paid'
                },
            ],
            searchQuery: '',
            statusFilter: '',
            currentPage: 1,
            itemsPerPage: 10,
            showUpgradeModal: false,
            showCancelModal: false,
            showAddPaymentModal: false,
            // Cancel Modal Data
            cancellationReason: '',
            cancellationFeedback: '',

            // Payment Modal Data
            paymentForm: {
                cardHolder: '',
                cardNumber: '',
                expiry: '',
                cvv: '',
                setDefault: false
            },
        }
    },
    computed: {
        filteredInvoices() {
            return this.invoices
                .filter(invoice => {
                    const matchesSearch = invoice.number.toLowerCase()
                        .includes(this.searchQuery.toLowerCase()) ||
                        invoice.description.toLowerCase()
                            .includes(this.searchQuery.toLowerCase())
                    const matchesStatus = !this.statusFilter ||
                        invoice.status === this.statusFilter
                    return matchesSearch && matchesStatus
                })
                .slice(
                    (this.currentPage - 1) * this.itemsPerPage,
                    this.currentPage * this.itemsPerPage
                )
        },
        totalPages() {
            return Math.ceil(this.invoices.length / this.itemsPerPage)
        },
        isPaymentFormValid() {
            const { cardHolder, cardNumber, expiry, cvv } = this.paymentForm
            return cardHolder &&
                cardNumber.replace(/\s/g, '').length === 16 &&
                expiry.length === 5 &&
                cvv.length >= 3
        },
        cardTypeIcon() {
            // Determine card type based on number
            const number = this.paymentForm.cardNumber.replace(/\s/g, '')
            if (number.startsWith('4')) return 'fab fa-cc-visa'
            if (number.startsWith('5')) return 'fab fa-cc-mastercard'
            if (number.startsWith('3')) return 'fab fa-cc-amex'
            if (number.startsWith('6')) return 'fab fa-cc-discover'
            return 'fas fa-credit-card'
        },
        currentPlanFeatures() {
            const currentPlan = this.subscription.availablePlans.find(
                plan => plan.name === this.subscription.planName
            );
            return currentPlan ? currentPlan.features : [];
        },
        hasError() {
            return !this.currentPlanFeatures.length;
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        },
        formatNumber(number) {
            return number.toFixed(2)
        },
        getCardIcon(type) {
            const icons = {
                'Visa': 'fab fa-cc-visa',
                'Mastercard': 'fab fa-cc-mastercard',
                'American Express': 'fab fa-cc-amex',
                'Discover': 'fab fa-cc-discover'
            }
            return icons[type] || 'fas fa-credit-card'
        },
        async setDefaultPayment(id) {
            try {
                // Implement set default payment logic
                this.paymentMethods = this.paymentMethods.map(method => ({
                    ...method,
                    isDefault: method.id === id
                }))
            } catch (error) {
                console.error('Failed to set default payment method:', error)
            }
        },
        async removePaymentMethod(id) {
            try {
                // Implement remove payment method logic
                this.paymentMethods = this.paymentMethods.filter(
                    method => method.id !== id
                )
            } catch (error) {
                console.error('Failed to remove payment method:', error)
            }
        },
        async downloadInvoice(id) {
            try {
                // Implement invoice download logic
                console.log('Downloading invoice:', id)
            } catch (error) {
                console.error('Failed to download invoice:', error)
            }
        },
        async payInvoice(id) {
            try {
                // Implement pay invoice logic
                console.log('Paying invoice:', id)
            } catch (error) {
                console.error('Failed to pay invoice:', error)
            }
        },
        selectPlan(planId) {
            this.selectedPlan = planId;
            console.log('Selected plan:', planId);
        },
        // Upgrade Modal Methods
        closeUpgradeModal() {
            this.showUpgradeModal = false
            this.selectedPlan = null
        },
        async confirmUpgrade() {
            if (!this.selectedPlan) return;

            try {
                // Find the selected plan
                const selectedPlan = this.subscription.availablePlans.find(
                    plan => plan.id === this.selectedPlan
                );

                if (!selectedPlan) {
                    console.error('Selected plan not found');
                    return;
                }

                console.log('Upgrading to plan:', selectedPlan);
                // Implement your upgrade logic here

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Update the current plan
                this.subscription.planName = selectedPlan.name;
                this.subscription.price = selectedPlan.price;

                // Close the modal
                this.closeUpgradeModal();

                // Show success message (if you have a notification system)
                console.log('Plan upgraded successfully');
            } catch (error) {
                console.error('Failed to upgrade plan:', error);
            }
        },

        // Cancel Modal Methods
        closeCancelModal() {
            this.showCancelModal = false
            this.cancellationReason = ''
            this.cancellationFeedback = ''
        },
        async confirmCancellation() {
            try {
                // Implement cancellation logic
                console.log('Cancelling subscription:', {
                    reason: this.cancellationReason,
                    feedback: this.cancellationFeedback
                })
                this.closeCancelModal()
            } catch (error) {
                console.error('Failed to cancel subscription:', error)
            }
        },

        // Payment Modal Methods
        closePaymentModal() {
            this.showAddPaymentModal = false
            this.paymentForm = {
                cardHolder: '',
                cardNumber: '',
                expiry: '',
                cvv: '',
                setDefault: false
            }
        },
        formatCardNumber(e) {
            let value = e.target.value.replace(/\s/g, '')
            if (value.length > 16) value = value.substr(0, 16)
            this.paymentForm.cardNumber = value.replace(/(.{4})/g, '$1 ').trim()
        },
        formatExpiry(e) {
            let value = e.target.value.replace(/\D/g, '')
            if (value.length >= 2) {
                value = value.substr(0, 2) + '/' + value.substr(2)
            }
            this.paymentForm.expiry = value
        },
        async addPaymentMethod() {
            if (!this.isPaymentFormValid) return

            try {
                // Implement payment method addition logic
                console.log('Adding payment method:', this.paymentForm)
                this.closePaymentModal()
            } catch (error) {
                console.error('Failed to add payment method:', error)
            }
        }
    }
}
</script>
<style scoped>
.billing-page {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
}

/* Section Styles */
.section {
    background: white;
    border-radius: 16px;
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
    font-weight: 600;
}

/* Current Plan Styles */
.current-plan {
    border-top: 4px solid #3498db;
}

.plan-status {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
}

.plan-status.active {
    background-color: #e8f5e9;
    color: #27ae60;
}

.plan-status.cancelled {
    background-color: #ffebee;
    color: #e74c3c;
}

.plan-details {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 24px;
    background: #f8f9fa;
    border-radius: 12px;
    margin-bottom: 24px;
}

.plan-info h3 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 8px;
}

.plan-price {
    font-size: 32px;
    font-weight: 600;
    color: #3498db;
    margin-bottom: 8px;
}

.plan-price span {
    font-size: 16px;
    color: #95a5a6;
    font-weight: normal;
}

.renewal-info {
    font-size: 14px;
    color: #7f8c8d;
}

.plan-actions {
    display: flex;
    gap: 12px;
}

.upgrade-btn,
.cancel-btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.upgrade-btn {
    background: #3498db;
    color: white;
    border: none;
}

.upgrade-btn:hover {
    background: #2980b9;
    transform: translateY(-1px);
}

.cancel-btn {
    background: none;
    border: 1px solid #e74c3c;
    color: #e74c3c;
}

.cancel-btn:hover {
    background: #fff5f5;
}

/* Plan Features */
.plan-features {
    padding-top: 24px;
    border-top: 1px solid #e9ecef;
}

.plan-features h4 {
    font-size: 16px;
    color: #2c3e50;
    margin-bottom: 16px;
}

.plan-features ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
}

.plan-features li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #2c3e50;
}

.plan-features li i {
    color: #27ae60;
}

/* Payment Methods Styles */
.payment-methods-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.payment-method-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.payment-method-card:hover {
    border-color: #3498db;
    transform: translateY(-2px);
}

.payment-method-card.default {
    border-color: #27ae60;
}

.card-icon {
    width: 48px;
    height: 48px;
    background: #f8f9fa;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.card-icon i {
    color: #3498db;
}

.card-details {
    flex-grow: 1;
}

.card-details h3 {
    font-size: 16px;
    color: #2c3e50;
    margin-bottom: 4px;
}

.card-details p {
    font-size: 14px;
    color: #7f8c8d;
}

.default-badge {
    background: #e8f5e9;
    color: #27ae60;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    margin-top: 8px;
    display: inline-block;
}

.card-actions {
    display: flex;
    gap: 8px;
}

.make-default-btn,
.remove-btn {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.make-default-btn {
    background: none;
    border: 1px solid #3498db;
    color: #3498db;
}

.make-default-btn:hover {
    background: #f0f7fc;
}

.remove-btn {
    background: none;
    border: none;
    color: #e74c3c;
    padding: 6px;
}

.remove-btn:hover {
    background: #fff5f5;
}

.add-payment-btn {
    padding: 10px 20px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.add-payment-btn:hover {
    background: #2980b9;
    transform: translateY(-1px);
}

/* Billing History Styles */
.history-filters {
    display: flex;
    gap: 16px;
}

.search-box {
    position: relative;
    min-width: 300px;
    width: 100%;
    margin-right: 50px;
}

.search-box i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #95a5a6;
}

.search-box input {
    width: 100%;
    padding: 10px 10px 10px 35px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
}

.status-filter {
    padding: 10px 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    min-width: 150px;
}

.billing-table {
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
    white-space: nowrap;
}

td {
    padding: 16px 12px;
    border-bottom: 1px solid #e9ecef;
    white-space: nowrap;
}

.invoice-info {
    display: flex;
    flex-direction: column;
}

.invoice-id {
    font-weight: 500;
    color: #2c3e50;
}

.invoice-desc {
    font-size: 14px;
    color: #7f8c8d;
}

.status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.status-badge.paid {
    background: #e8f5e9;
    color: #27ae60;
}

.status-badge.pending {
    background: #fff3e0;
    color: #f39c12;
}

.status-badge.failed {
    background: #ffebee;
    color: #e74c3c;
}

.invoice-actions {
    display: flex;
    gap: 8px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.form-group input,
.form-group select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
}

.form-group select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
}

.form-group textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
}

.form-group textarea:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.download-btn,
.pay-btn {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.3s ease;
}

.download-btn {
    background: none;
    border: 1px solid #3498db;
    color: #3498db;
}

.download-btn:hover {
    background: #f0f7fc;
}

.pay-btn {
    background: #27ae60;
    color: white;
    border: none;
}

.pay-btn:hover {
    background: #219a52;
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
    background: #f8f9fa;
}

.page-info {
    font-size: 14px;
    color: #7f8c8d;
}

/* Modal Styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    border-radius: 16px;
    padding: 24px;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .billing-page {
        padding: 16px;
    }

    .section {
        padding: 20px;
    }

    .plan-details {
        flex-direction: column;
        gap: 20px;
    }

    .plan-actions {
        width: 100%;
    }

    .upgrade-btn,
    .cancel-btn {
        flex: 1;
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

    .payment-methods-list {
        grid-template-columns: 1fr;
    }

    .payment-method-card {
        flex-direction: column;
        text-align: center;
    }

    .card-actions {
        width: 100%;
        justify-content: center;
    }

    .modal-content {
        margin: 16px;
        max-height: calc(100vh - 32px);
    }
}

/* Animations */
@keyframes slideIn {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.section {
    animation: slideIn 0.3s ease;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    .section {
        background: white;
    }

    .section-header h2 {
        color: #ffffff;
    }

    .plan-status {
        color: #ffffff;
    }
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background: white;
    border-radius: 16px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideIn 0.3s ease;
}

.modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    font-size: 20px;
    color: #2c3e50;
}

.close-btn {
    background: none;
    border: none;
    color: #95a5a6;
    font-size: 20px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.close-btn:hover {
    color: #2c3e50;
    background: #f8f9fa;
}

.modal-body {
    padding: 24px;
}

.modal-footer {
    padding: 20px 24px;
    border-top: 1px solid #e9ecef;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

/* Plans Grid Styles */
.plans-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
}

.plan-card {
    border: 2px solid #e9ecef;
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.plan-card:hover {
    border-color: #3498db;
    transform: translateY(-2px);
}

.plan-card.selected {
    border-color: #3498db;
    background: #f0f7fc;
}

/* Cancellation Styles */
.cancellation-warning {
    text-align: center;
    margin-bottom: 24px;
}

.cancellation-warning i {
    font-size: 48px;
    color: #f1c40f;
    margin-bottom: 16px;
}

/* Payment Form Styles */
.payment-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.card-input {
    position: relative;
}

.card-input input {
    padding-right: 40px;
}

.card-input i {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
}

/* Button Styles */
.confirm-btn,
.cancel-btn,
.keep-btn,
.cancel-subscription-btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.confirm-btn {
    background: #3498db;
    color: white;
    border: none;
}

.confirm-btn:hover:not(:disabled) {
    background: #2980b9;
}

.cancel-btn {
    background: none;
    border: 1px solid #e9ecef;
    color: #7f8c8d;
}

.cancel-btn:hover {
    background: #f8f9fa;
}

.keep-btn {
    background: #27ae60;
    color: white;
    border: none;
}

.keep-btn:hover {
    background: #219a52;
}

.cancel-subscription-btn {
    background: #e74c3c;
    color: white;
    border: none;
}

.cancel-subscription-btn:hover:not(:disabled) {
    background: #c0392b;
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Responsive Styles */
@media (max-width: 768px) {
    .modal-content {
        margin: 16px;
        max-height: calc(100vh - 32px);
    }

    .plans-grid {
        grid-template-columns: 1fr;
    }

    .modal-footer {
        flex-direction: column-reverse;
    }

    .modal-footer button {
        width: 100%;
    }
}
</style>