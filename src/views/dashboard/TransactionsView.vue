
<template>
  <div class="transactions-view">
    <!-- Overview Cards -->
    <div class="overview-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-sync-alt"></i>
        </div>
        <div class="stat-info">
          <h3>Active Trades</h3>
          <p class="stat-value">{{ stats.activeTrades }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-info">
          <h3>Completed</h3>
          <p class="stat-value">{{ stats.completedTrades }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-handshake"></i>
        </div>
        <div class="stat-info">
          <h3>Success Rate</h3>
          <p class="stat-value">{{ stats.successRate }}%</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-star"></i>
        </div>
        <div class="stat-info">
          <h3>Avg. Rating</h3>
          <p class="stat-value">{{ stats.averageRating }}/5</p>
        </div>
      </div>
    </div>

    <!-- Transactions List -->
    <div class="transactions-container">
      <!-- Filters and Search -->
      <div class="filters-bar">
        <div class="search-field">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            v-model="filters.search" 
            placeholder="Search transactions..."
          >
        </div>

        <div class="filters-group">
          <div class="filter-select">
            <select v-model="filters.status">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div class="filter-select">
            <select v-model="filters.timeframe">
              <option value="all">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <button class="filter-btn" @click="resetFilters">
            <i class="fas fa-redo"></i>
            Reset
          </button>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="transactions-table">
        <div class="table-header">
          <div class="th">Item</div>
          <div class="th">Trade Partner</div>
          <div class="th">Date</div>
          <div class="th">Status</div>
          <div class="th">Actions</div>
        </div>

        <div class="table-body">
          <div 
            v-for="transaction in filteredTransactions" 
            :key="transaction.id"
            class="transaction-row"
            :class="{ 'expanded': selectedTransaction === transaction.id }"
          >
            <!-- Main Row -->
            <div class="main-row" @click="toggleTransaction(transaction.id)">
              <div class="td item-cell">
                <div class="item-image">
                  <img :src="transaction.itemImage" :alt="transaction.itemName">
                </div>
                <div class="item-info">
                  <h4>{{ transaction.itemName }}</h4>
                  <p>Traded with: {{ transaction.tradeItem }}</p>
                </div>
              </div>
              
              <div class="td partner-cell">
                <div class="partner-avatar">
                  <img :src="transaction.partnerAvatar" :alt="transaction.partnerName">
                </div>
                <div class="partner-info">
                  <h4>{{ transaction.partnerName }}</h4>
                  <div class="partner-rating">
                    <i class="fas fa-star"></i>
                    <span>{{ transaction.partnerRating }}</span>
                  </div>
                </div>
              </div>

              <div class="td">
                {{ formatDate(transaction.date) }}
              </div>

              <div class="td">
                <span 
                  class="status-badge"
                  :class="transaction.status.toLowerCase()"
                >
                  {{ transaction.status }}
                </span>
              </div>

              <div class="td actions-cell">
                <button 
                  class="action-btn"
                  @click.stop="viewDetails(transaction.id)"
                >
                  <i class="fas fa-eye"></i>
                </button>
                <button 
                  v-if="transaction.status === 'Active'"
                  class="action-btn"
                  @click.stop="openChat(transaction.id)"
                >
                  <i class="fas fa-comment"></i>
                </button>
              </div>
            </div>

            <!-- Expanded Details -->
            <div v-if="selectedTransaction === transaction.id" class="expanded-details">
              <div class="details-grid">
                <div class="detail-section">
                  <h5>Trade Details</h5>
                  <div class="detail-row">
                    <span>Trade ID:</span>
                    <span>#{{ transaction.id }}</span>
                  </div>
                  <div class="detail-row">
                    <span>Initiated:</span>
                    <span>{{ formatDate(transaction.initiatedDate) }}</span>
                  </div>
                  <div class="detail-row">
                    <span>Location:</span>
                    <span>{{ transaction.location }}</span>
                  </div>
                </div>

                <div class="detail-section">
                  <h5>Item Details</h5>
                  <div class="items-comparison">
                    <div class="trade-item">
                      <img :src="transaction.itemImage" :alt="transaction.itemName">
                      <h6>Your Item</h6>
                      <p>{{ transaction.itemName }}</p>
                      <span class="item-condition">{{ transaction.itemCondition }}</span>
                    </div>
                    <i class="fas fa-exchange-alt"></i>
                    <div class="trade-item">
                      <img :src="transaction.tradeItemImage" :alt="transaction.tradeItem">
                      <h6>Their Item</h6>
                      <p>{{ transaction.tradeItem }}</p>
                      <span class="item-condition">{{ transaction.tradeItemCondition }}</span>
                    </div>
                  </div>
                </div>

                <div class="detail-section" v-if="transaction.status === 'Completed'">
                  <h5>Feedback</h5>
                  <div class="feedback-content">
                    <div class="rating-display">
                      <div class="stars">
                        <i 
                          v-for="n in 5" 
                          :key="n"
                          class="fas fa-star"
                          :class="{ active: n <= transaction.rating }"
                        ></i>
                      </div>
                      <p class="rating-text">{{ transaction.feedback }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="expanded-actions">
                <button 
                  v-if="transaction.status === 'Active'"
                  class="action-btn danger"
                  @click="cancelTrade(transaction.id)"
                >
                  Cancel Trade
                </button>
                <button 
                  v-if="transaction.status === 'Completed' && !transaction.feedback"
                  class="action-btn primary"
                  @click="leaveFeedback(transaction.id)"
                >
                  Leave Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionsView',
  data() {
    return {
      selectedTransaction: null,
      filters: {
        search: '',
        status: '',
        timeframe: 'all'
      },
      stats: {
        activeTrades: 5,
        completedTrades: 12,
        successRate: 95,
        averageRating: 4.8
      },
      transactions: [
        {
          id: 'TR123',
          itemName: 'Canon EOS 80D',
          itemImage: '/sample/camera.jpg',
          itemCondition: 'Like New',
          tradeItem: 'MacBook Pro 2019',
          tradeItemImage: '/sample/laptop.jpg',
          tradeItemCondition: 'Good',
          partnerName: 'Sarah Johnson',
          partnerAvatar: '/sample/avatar1.jpg',
          partnerRating: 4.9,
          date: new Date(),
          initiatedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          status: 'Active',
          location: 'Nairobi, Kenya',
          rating: 0,
          feedback: ''
        },
        // Add more sample transactions
      ]
    }
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter(transaction => {
        const matchesSearch = !this.filters.search || 
          transaction.itemName.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          transaction.tradeItem.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          transaction.partnerName.toLowerCase().includes(this.filters.search.toLowerCase())

        const matchesStatus = !this.filters.status || 
          transaction.status.toLowerCase() === this.filters.status.toLowerCase()

        // Add timeframe filtering logic here

        return matchesSearch && matchesStatus
      })
    }
  },
  methods: {
    toggleTransaction(id) {
      this.selectedTransaction = this.selectedTransaction === id ? null : id
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    resetFilters() {
      this.filters = {
        search: '',
        status: '',
        timeframe: 'all'
      }
    },
    viewDetails(id) {
      // Implement view details logic
    },
    openChat(id) {
      // Implement chat opening logic
    },
    cancelTrade(id) {
      // Implement trade cancellation logic
    },
    leaveFeedback(id) {
      // Implement feedback submission logic
    }
  }
}
</script>

<style lang="scss" scoped>
.transactions-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

// Overview Cards
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }

  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 215, 0, 0.1);
    color: #FFD700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .stat-info {
    h3 {
      font-size: 0.875rem;
      color: #666;
      margin-bottom: 0.25rem;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2c3e50;
    }
  }
}

// Transactions Container
.transactions-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

// Filters Bar
.filters-bar {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-field {
  position: relative;
  flex: 1;
  min-width: 200px;

  i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #eee;
    border-radius: 8px;
    font-size: 0.875rem;

    &:focus {
      outline: none;
      border-color: #FFD700;
    }
  }
}

.filters-group {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-select {
  select {
    padding: 0.75rem 2rem 0.75rem 1rem;
    border: 1px solid #eee;
    border-radius: 8px;
    font-size: 0.875rem;
    background: white;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #FFD700;
    }
  }
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #FFD700;
  }
}

// Transactions Table
.transactions-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 0.5fr;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;

  .th {
    font-size: 0.875rem;
    font-weight: 600;
    color: #666;
  }
}

.transaction-row {
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }

  &.expanded {
    background: #f8f9fa;
  }
}

.main-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 0.5fr;
  padding: 1rem 1.5rem;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }
}

.td {
  font-size: 0.875rem;
  color: #2c3e50;
}

.item-cell {
  display: flex;
  align-items: center;
  gap: 1rem;

  .item-image {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item-info {
    h4 {
      margin: 0;
      font-size: 0.875rem;
      color: #2c3e50;
    }

    p {
      margin: 0;
      font-size: 0.75rem;
      color: #666;
    }
  }
}

.partner-cell {
  display: flex;
  align-items: center;
  gap: 1rem;

  .partner-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .partner-info {
    h4 {
      margin: 0;
      font-size: 0.875rem;
      color: #2c3e50;
    }

    .partner-rating {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      color: #FFD700;
    }
  }
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;

  &.active {
    background: rgba(255, 215, 0, 0.1);
    color: #FFD700;
  }

  &.completed {
    background: rgba(46, 204, 113, 0.1);
    color: #2ecc71;
  }

  &.cancelled {
    background: rgba(231, 76, 60, 0.1);
    color: #e74c3c;
  }

  &.pending {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
  }
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: none;
  border: none;
  color: #666;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #FFD700;
  }

  &.primary {
    background: #FFD700;
    color: white;

    &:hover {
      background: darken(#FFD700, 10%);
    }
  }

  &.danger {
    background: #FF6B6B;
    color: white;

    &:hover {
      background: darken(#FF6B6B, 10%);
    }
  }
}

// Expanded Details
.expanded-details {
  padding: 1.5rem;
  border-top: 1px solid #eee;
  background: white;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.detail-section {
  h5 {
    font-size: 1rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  font-size: 0.875rem;

  &:last-child {
    border-bottom: none;
  }

  span:first-child {
    color: #666;
  }

  span:last-child {
    color: #2c3e50;
    font-weight: 500;
  }
}

.items-comparison {
  display: flex;
  align-items: center;
  gap: 2rem;

  .fas.fa-exchange-alt {
    color: #666;
    font-size: 1.5rem;
  }
}

.trade-item {
  flex: 1;
  text-align: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  h6 {
    font-size: 0.75rem;
    color: #666;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.875rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .item-condition {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: #f8f9fa;
    font-size: 0.75rem;
    color: #666;
  }
}

.feedback-content {
  .rating-display {
    text-align: center;
  }

  .stars {
    color: #ddd;
    font-size: 1.5rem;
    margin-bottom: 1rem;

    .fa-star.active {
      color: #FFD700;
    }
  }

  .rating-text {
    font-size: 0.875rem;
    color: #666;
    font-style: italic;
  }
}

.expanded-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

// Responsive Design
@media (max-width: 1024px) {
  .table-header, .main-row {
    grid-template-columns: 2fr 1.5fr 1fr 1fr;

    .actions-cell {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .filters-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .filters-group {
    flex-wrap: wrap;
  }

  .table-header {
    display: none;
  }

  .main-row {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .td {
    &:not(.item-cell) {
      padding-left: 60px;
    }
  }

  .items-comparison {
    flex-direction: column;
    gap: 1rem;

    .fas.fa-exchange-alt {
      transform: rotate(90deg);
    }
  }
}
</style>