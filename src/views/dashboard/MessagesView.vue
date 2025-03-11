
<template>
  <div class="messages-view">
    <!-- Chat Container -->
    <div class="chat-container">
      <!-- Conversations List -->
      <div class="conversations-panel">
        <div class="search-bar">
          <div class="search-input">
            <i class="fas fa-search"></i>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search conversations..."
            >
          </div>
        </div>

        <div class="conversations-list">
          <div 
            v-for="chat in filteredChats" 
            :key="chat.id"
            class="chat-item"
            :class="{ active: currentChat?.id === chat.id }"
            @click="selectChat(chat)"
          >
            <div class="chat-avatar">
              <img :src="chat.avatar || '/default-avatar.png'" :alt="chat.name">
              <span class="status-dot" :class="chat.online ? 'online' : ''"></span>
            </div>
            <div class="chat-info">
              <div class="chat-header">
                <h3>{{ chat.name }}</h3>
                <span class="chat-time">{{ formatTime(chat.lastMessage.time) }}</span>
              </div>
              <div class="chat-preview">
                <p>{{ chat.lastMessage.text }}</p>
                <div class="chat-badges">
                  <span v-if="chat.unread" class="unread-badge">{{ chat.unread }}</span>
                  <span v-if="chat.typing" class="typing-indicator">typing...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="chat-panel" :class="{ 'no-chat': !currentChat }">
        <template v-if="currentChat">
          <!-- Chat Header -->
          <div class="chat-header">
            <div class="chat-user-info">
              <img :src="currentChat.avatar || '/default-avatar.png'" :alt="currentChat.name">
              <div>
                <h2>{{ currentChat.name }}</h2>
                <span class="user-status" :class="{ online: currentChat.online }">
                  {{ currentChat.online ? 'Online' : 'Offline' }}
                </span>
              </div>
            </div>
            <div class="chat-actions">
              <button class="action-btn" title="View Trade Details">
                <i class="fas fa-exchange-alt"></i>
              </button>
              <button class="action-btn" title="More Options">
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>

          <!-- Messages Area -->
          <div class="messages-area" ref="messagesArea">
            <div class="messages-container">
              <div class="message-date-divider">Today</div>
              <div 
                v-for="message in currentChat.messages" 
                :key="message.id"
                class="message"
                :class="{ 
                  'outgoing': message.sender === 'me',
                  'incoming': message.sender !== 'me'
                }"
              >
                <div class="message-content">
                  {{ message.text }}
                  <span class="message-time">
                    {{ formatTime(message.time) }}
                    <i 
                      v-if="message.sender === 'me'" 
                      class="fas fa-check-double"
                      :class="{ 'read': message.read }"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Message Input -->
          <div class="message-input">
            <div class="input-actions">
              <button class="action-btn" title="Add Attachment">
                <i class="fas fa-paperclip"></i>
              </button>
              <button class="action-btn" title="Quick Responses">
                <i class="fas fa-bolt"></i>
              </button>
            </div>
            <div class="input-field">
              <textarea 
                v-model="newMessage" 
                placeholder="Type a message..."
                @keyup.enter.prevent="sendMessage"
                rows="1"
                ref="messageInput"
              ></textarea>
            </div>
            <button 
              class="send-btn" 
              :class="{ active: newMessage.trim() }"
              @click="sendMessage"
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </template>

        <!-- No Chat Selected State -->
        <div v-else class="no-chat-selected">
          <img src="@/assets/chat-illustration.svg" alt="Select a chat">
          <h2>Select a Conversation</h2>
          <p>Choose a chat from the list to start messaging</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessagesView',
  data() {
    return {
      searchQuery: '',
      newMessage: '',
      currentChat: null,
      chats: [
        {
          id: 1,
          name: 'Sarah Johnson',
          avatar: null,
          online: true,
          unread: 3,
          typing: false,
          lastMessage: {
            text: 'That sounds great! When can we meet?',
            time: new Date(Date.now() - 1000 * 60 * 5)
          },
          messages: [
            {
              id: 1,
              sender: 'other',
              text: 'Hi, I\'m interested in trading my camera',
              time: new Date(Date.now() - 1000 * 60 * 30),
              read: true
            },
            {
              id: 2,
              sender: 'me',
              text: 'Hello! Sure, what kind of camera is it?',
              time: new Date(Date.now() - 1000 * 60 * 25),
              read: true
            },
            {
              id: 3,
              sender: 'other',
              text: 'It\'s a Canon EOS 80D, barely used',
              time: new Date(Date.now() - 1000 * 60 * 20),
              read: true
            },
            {
              id: 4,
              sender: 'me',
              text: 'Perfect! I have a laptop we could trade',
              time: new Date(Date.now() - 1000 * 60 * 15),
              read: true
            },
            {
              id: 5,
              sender: 'other',
              text: 'That sounds great! When can we meet?',
              time: new Date(Date.now() - 1000 * 60 * 5),
              read: false
            }
          ]
        },
        // Add more sample chats here
      ]
    }
  },
  computed: {
    filteredChats() {
      const query = this.searchQuery.toLowerCase()
      return this.chats.filter(chat => 
        chat.name.toLowerCase().includes(query) ||
        chat.lastMessage.text.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    selectChat(chat) {
      this.currentChat = chat
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    sendMessage() {
      if (!this.newMessage.trim()) return

      const message = {
        id: Date.now(),
        sender: 'me',
        text: this.newMessage,
        time: new Date(),
        read: false
      }

      this.currentChat.messages.push(message)
      this.currentChat.lastMessage = {
        text: this.newMessage,
        time: new Date()
      }
      this.newMessage = ''

      this.$nextTick(() => {
        this.scrollToBottom()
        this.$refs.messageInput.style.height = 'auto'
      })
    },
    scrollToBottom() {
      const container = this.$refs.messagesArea
      container.scrollTop = container.scrollHeight
    },
    formatTime(date) {
      return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }
  },
  mounted() {
    // Auto-resize textarea
    this.$refs.messageInput?.addEventListener('input', (e) => {
      e.target.style.height = 'auto'
      e.target.style.height = e.target.scrollHeight + 'px'
    })
  }
}
</script>

<style lang="scss" scoped>
.messages-view {
  height: calc(100vh - 80px);
  background: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
}

.chat-container {
  display: grid;
  grid-template-columns: 320px 1fr;
  height: 100%;
  background: white;
}

// Conversations Panel
.conversations-panel {
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  background: white;
}

.search-bar {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.search-input {
  position: relative;
  
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
    border: none;
    border-radius: 8px;
    background: #f8f9fa;
    font-size: 0.875rem;

    &:focus {
      outline: none;
      background: #f1f3f5;
    }
  }
}

.conversations-list {
  flex: 1;
  overflow-y: auto;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }

  &.active {
    background: rgba(255, 215, 0, 0.1);
  }
}

.chat-avatar {
  position: relative;
  
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }

  .status-dot {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ddd;
    border: 2px solid white;

    &.online {
      background: #2ecc71;
    }
  }
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;

  h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
  }

  .chat-time {
    font-size: 0.75rem;
    color: #666;
  }
}

.chat-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0;
    font-size: 0.875rem;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }
}

.chat-badges {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.unread-badge {
  background: #FF6B6B;
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-weight: 600;
}

.typing-indicator {
  font-size: 0.75rem;
  color: #FFD700;
  font-style: italic;
}

// Chat Panel
.chat-panel {
  display: flex;
  flex-direction: column;
  background: #fff;

  &.no-chat {
    background: #f8f9fa;
  }
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background: white;

  .chat-user-info {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    h2 {
      font-size: 1rem;
      margin: 0;
      color: #2c3e50;
    }

    .user-status {
      font-size: 0.75rem;
      color: #666;

      &.online {
        color: #2ecc71;
      }
    }
  }
}

.chat-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: none;
  border: none;
  color: #666;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #FFD700;
  }
}

.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #f8f9fa;
}

.messages-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-date-divider {
  text-align: center;
  font-size: 0.75rem;
  color: #666;
  margin: 1rem 0;
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 100px;
    height: 1px;
    background: #ddd;
  }

  &::before {
    right: calc(50% + 3rem);
  }

  &::after {
    left: calc(50% + 3rem);
  }
}

.message {
  display: flex;
  margin-bottom: 0.5rem;

  &.outgoing {
    justify-content: flex-end;

    .message-content {
      background: #FF6B6B;
      color: white;
      border-radius: 16px 16px 4px 16px;

      .message-time {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  &.incoming .message-content {
    background: white;
    border-radius: 16px 16px 16px 4px;
  }
}

.message-content {
  max-width: 60%;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  .message-time {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    margin-top: 0.25rem;
    opacity: 0.8;

    i {
      font-size: 0.875rem;
      color: #666;

      &.read {
        color: #FFD700;
      }
    }
  }
}

.message-input {
  padding: 1rem;
  background: white;
  border-top: 1px solid #eee;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
}

.input-actions {
  display: flex;
  gap: 0.5rem;
}

.input-field {
  flex: 1;
  background: #f8f9fa;
  border-radius: 24px;
  padding: 0.5rem 1rem;

  textarea {
    width: 100%;
    border: none;
    background: none;
    resize: none;
    max-height: 100px;
    font-size: 0.875rem;
    padding: 0;
    
    &:focus {
      outline: none;
    }
  }
}

.send-btn {
  background: none;
  border: none;
  color: #ddd;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    color: #FFD700;
    
    &:hover {
      transform: scale(1.1);
    }
  }
}

.no-chat-selected {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  padding: 2rem;

  img {
    width: 200px;
    margin-bottom: 2rem;
    opacity: 0.5;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
  }

  p {
    font-size: 0.875rem;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .chat-container {
    grid-template-columns: 1fr;
  }

  .conversations-panel {
    display: none;

    &.active {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
    }
  }

  .chat-panel {
    &.no-chat {
      .conversations-panel {
        display: flex;
      }
    }
  }
}

// Custom Scrollbar
.messages-area, .conversations-list {
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f8f9fa;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;

    &:hover {
      background: #ccc;
    }
  }
}
</style>