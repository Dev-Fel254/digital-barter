
<template>
  <div class="dashboard-home">
    <!-- Welcome Section -->
    <header class="welcome-section">
      <div class="welcome-text">
        <h1>Welcome Back, {{ user.name }}</h1>
        <p>Here's what's happening with your trades</p>
      </div>
      <div class="quick-actions">
        <button class="action-btn primary">
          <i class="fas fa-plus"></i>
          New Trade
        </button>
        <button class="action-btn secondary">
          <i class="fas fa-search"></i>
          Browse Items
        </button>
      </div>
    </header>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-exchange-alt"></i>
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
          <i class="fas fa-star"></i>
        </div>
        <div class="stat-info">
          <h3>Rating</h3>
          <p class="stat-value">{{ stats.rating }}/5</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-info">
          <h3>Trade Partners</h3>
          <p class="stat-value">{{ stats.tradePartners }}</p>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <section class="recent-activity">
      <h2>Recent Activity</h2>
      <div class="activity-list" v-if="recentActivities.length">
        <div 
          v-for="activity in recentActivities" 
          :key="activity.id" 
          class="activity-item"
        >
          <div class="activity-icon" :class="activity.type">
            <i :class="getActivityIcon(activity.type)"></i>
          </div>
          <div class="activity-details">
            <h4>{{ activity.title }}</h4>
            <p>{{ activity.description }}</p>
            <span class="activity-time">{{ formatTime(activity.timestamp) }}</span>
          </div>
          <div class="activity-status" :class="activity.status">
            {{ activity.status }}
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        <i class="fas fa-inbox"></i>
        <p>No recent activities</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DashboardHome',
  data() {
    return {
      user: {
        name: 'John Doe' // This will be replaced with actual user data
      },
      stats: {
        activeTrades: 5,
        completedTrades: 12,
        rating: 4.8,
        tradePartners: 8
      },
      recentActivities: [
        {
          id: 1,
          type: 'trade',
          title: 'New Trade Request',
          description: 'Laptop exchange for Camera',
          timestamp: new Date(),
          status: 'pending'
        },
        {
          id: 2,
          type: 'message',
          title: 'New Message',
          description: 'From Sarah about the phone trade',
          timestamp: new Date(Date.now() - 3600000),
          status: 'unread'
        }
      ]
    }
  },
  methods: {
    getActivityIcon(type) {
      const icons = {
        trade: 'fas fa-exchange-alt',
        message: 'fas fa-envelope',
        review: 'fas fa-star',
        system: 'fas fa-info-circle'
      }
      return icons[type] || 'fas fa-circle'
    },
    formatTime(timestamp) {
      // Basic time formatting - can be enhanced with a library like date-fns
      return new Date(timestamp).toLocaleString()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
}

.quick-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &.primary {
    background: #FF6B6B;
    color: white;
    
    &:hover {
      background: darken(#FF6B6B, 10%);
    }
  }
  
  &.secondary {
    background: #FFD700;
    color: #1a1a1a;
    
    &:hover {
      background: darken(#FFD700, 10%);
    }
  }
}

.stats-grid {
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

.recent-activity {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
  transition: background-color 0.3s ease;

  &:hover {
    background: #f1f3f5;
  }

  .activity-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;

    &.trade { background: rgba(255, 107, 107, 0.1); color: #FF6B6B; }
    &.message { background: rgba(255, 215, 0, 0.1); color: #FFD700; }
    &.review { background: rgba(46, 204, 113, 0.1); color: #2ecc71; }
  }

  .activity-details {
    flex: 1;

    h4 {
      font-size: 1rem;
      color: #2c3e50;
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.875rem;
      color: #666;
      margin-bottom: 0.25rem;
    }

    .activity-time {
      font-size: 0.75rem;
      color: #999;
    }
  }

  .activity-status {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;

    &.pending { background: rgba(255, 215, 0, 0.1); color: #FFD700; }
    &.completed { background: rgba(46, 204, 113, 0.1); color: #2ecc71; }
    &.unread { background: rgba(255, 107, 107, 0.1); color: #FF6B6B; }
  }
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;

  i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #ddd;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .welcome-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    
    .quick-actions {
      width: 100%;
      
      .action-btn {
        flex: 1;
      }
    }
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .activity-item {
    flex-direction: column;
    align-items: flex-start;
    
    .activity-icon {
      margin-bottom: 0.5rem;
    }
    
    .activity-status {
      align-self: flex-start;
      margin-top: 0.5rem;
    }
  }
}
</style>