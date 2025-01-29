<!-- src/components/ChatSystem.vue -->
<template>
    <div class="chat-system">
        <!-- Chat Toggle Button -->
        <button class="chat-toggle" @click="toggleChat" :class="{ 'has-unread': hasUnreadMessages }">
            <i class="fas fa-comments"></i>
            <span v-if="unreadCount" class="unread-badge">{{ unreadCount }}</span>
        </button>

        <!-- Chat Panel -->
        <div class="chat-panel" :class="{ 'chat-panel-open': isChatOpen }">
            <!-- Chat Header -->
            <div class="chat-header">
                <h3>Messages</h3>
                <div class="header-actions">
                    <button @click="toggleChatList">
                        <i class="fas fa-users"></i>
                    </button>
                    <button @click="toggleChat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <div class="chat-container">
                <!-- Chat List -->
                <div class="chat-list" :class="{ 'list-hidden': !showChatList }">
                    <div class="chat-search">
                        <i class="fas fa-search"></i>
                        <input type="text" v-model="searchQuery" placeholder="Search conversations...">
                    </div>

                    <div class="conversations">
                        <div v-for="chat in filteredChats" :key="chat.id" class="chat-item"
                            :class="{ 'active': currentChat?.id === chat.id }" @click="selectChat(chat)">
                            <div class="chat-avatar">
                                <img :src="chat.avatar" :alt="chat.name">
                                <span class="status-dot" :class="chat.status"></span>
                            </div>
                            <div class="chat-info">
                                <div class="chat-name">{{ chat.name }}</div>
                                <div class="last-message">{{ chat.lastMessage }}</div>
                            </div>
                            <div class="chat-meta">
                                <span class="time">{{ formatTime(chat.lastTime) }}</span>
                                <span v-if="chat.unread" class="unread-count">
                                    {{ chat.unread }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Chat Messages -->
                <div class="chat-messages" :class="{ 'messages-full': !showChatList }">
                    <template v-if="currentChat">
                        <div class="messages-header">
                            <div class="user-info">
                                <img :src="currentChat.avatar" :alt="currentChat.name">
                                <div class="user-details">
                                    <h4>{{ currentChat.name }}</h4>
                                    <span class="status">{{ currentChat.status }}</span>
                                </div>
                            </div>
                            <div class="message-actions">
                                <button @click="startCall('video')">
                                    <i class="fas fa-video"></i>
                                </button>
                                <button @click="startCall('audio')">
                                    <i class="fas fa-phone"></i>
                                </button>
                            </div>
                        </div>

                        <div class="messages-container" ref="messagesContainer">
                            <div v-for="message in currentChat.messages" :key="message.id" :class="['message', {
                                'own-message': message.senderId === currentUserId
                            }]">
                                <div class="message-content">
                                    <p>{{ message.content }}</p>
                                    <span class="message-time">
                                        {{ formatTime(message.timestamp) }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="message-input">
                            <button class="attachment-btn">
                                <i class="fas fa-paperclip"></i>
                            </button>
                            <textarea v-model="newMessage" placeholder="Type a message..."
                                @keyup.enter.prevent="sendMessage" rows="1" ref="messageInput"></textarea>
                            <button class="send-btn" @click="sendMessage" :disabled="!newMessage.trim()">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </template>

                    <div v-else class="no-chat-selected">
                        <i class="fas fa-comments"></i>
                        <h3>Select a conversation</h3>
                        <p>Choose a conversation to start messaging</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatSystem',
    data() {
        return {
            isChatOpen: false,
            showChatList: true,
            searchQuery: '',
            currentUserId: 1, // Replace with actual user ID
            currentChat: null,
            newMessage: '',
            chats: [
                {
                    id: 1,
                    name: 'John Doe',
                    avatar: 'https://via.placeholder.com/40',
                    status: 'online',
                    lastMessage: 'Hey, how are you?',
                    lastTime: new Date(),
                    unread: 2,
                    messages: [
                        {
                            id: 1,
                            content: 'Hey, how are you?',
                            senderId: 2,
                            timestamp: new Date(Date.now() - 3600000)
                        },
                        {
                            id: 2,
                            content: 'I\'m good, thanks! How about you?',
                            senderId: 1,
                            timestamp: new Date(Date.now() - 3000000)
                        }
                    ]
                },
                // Add more chat examples
            ]
        }
    },
    computed: {
        filteredChats() {
            return this.chats.filter(chat =>
                chat.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            )
        },
        hasUnreadMessages() {
            return this.chats.some(chat => chat.unread > 0)
        },
        unreadCount() {
            return this.chats.reduce((total, chat) => total + (chat.unread || 0), 0)
        }
    },
    methods: {
        toggleChat() {
            this.isChatOpen = !this.isChatOpen
        },
        toggleChatList() {
            this.showChatList = !this.showChatList
        },
        selectChat(chat) {
            this.currentChat = chat
            chat.unread = 0
            if (window.innerWidth < 768) {
                this.showChatList = false
            }
        },
        async sendMessage() {
            if (!this.newMessage.trim()) return

            const message = {
                id: Date.now(),
                content: this.newMessage,
                senderId: this.currentUserId,
                timestamp: new Date()
            }

            this.currentChat.messages.push(message)
            this.currentChat.lastMessage = this.newMessage
            this.currentChat.lastTime = new Date()
            this.newMessage = ''

            // Scroll to bottom
            await this.$nextTick()
            this.scrollToBottom()
        },
        scrollToBottom() {
            if (this.$refs.messagesContainer) {
                this.$refs.messagesContainer.scrollTop =
                    this.$refs.messagesContainer.scrollHeight
            }
        },
        formatTime(date) {
            return new Date(date).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            })
        },
        startCall(type) {
            console.log(`Starting ${type} call with ${this.currentChat.name}`)
            // Implement call functionality
        }
    },
    watch: {
        'currentChat.messages': {
            handler() {
                this.$nextTick(this.scrollToBottom)
            },
            deep: true
        }
    },
    mounted() {
        // Simulate receiving messages
        setInterval(() => {
            if (Math.random() > 0.7 && this.chats.length > 0) {
                const randomChat = this.chats[
                    Math.floor(Math.random() * this.chats.length)
                ]
                if (randomChat !== this.currentChat) {
                    randomChat.unread = (randomChat.unread || 0) + 1
                }
                randomChat.messages.push({
                    id: Date.now(),
                    content: `Random message ${Date.now()}`,
                    senderId: randomChat.id,
                    timestamp: new Date()
                })
                randomChat.lastMessage = `Random message ${Date.now()}`
                randomChat.lastTime = new Date()
            }
        }, 10000)
    }
}
</script>

<style scoped>
:root {
    --primary-color: #2563eb;
    --secondary-color: #f9fafb;
    --accent-color: #1e40af;
    --error-color: #ef4444;
    --text-color: #374151;
    --muted-text-color: #6b7280;
    --background-color: #ffffff;
    --border-radius: 8px;
    --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    --max-width: 400px;
}

.chat-system {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    font-family: 'Inter', sans-serif;
}

.chat-toggle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: var(--primary-color);
    border: none;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: var(--box-shadow);
    transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
    position: relative;
}

.chat-toggle:hover {
    background-color: var(--accent-color);
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.unread-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: var(--error-color);
    color: #ffffff;
    font-size: 12px;
    padding: 4px 6px;
    border-radius: 50%;
    box-shadow: var(--box-shadow);
}

.chat-panel {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: var(--max-width);
    height: 600px;
    background-color: var(--background-color);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s;
}

.chat-panel-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.chat-header {
    background-color: var(--primary-color);
    color: #ffffff;
    padding: 16px;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
}

.header-actions button {
    background: none;
    border: none;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.2s;
}

.header-actions button:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.chat-container {
    flex: 1;
    display: flex;
    overflow: hidden;
    background-color: var(--background-color);
}

.chat-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e5e7eb;
    background-color: var(--secondary-color);
}

.chat-search {
    padding: 16px;
    position: relative;
}

.chat-search input {
    width: 100%;
    padding: 10px 40px 10px 16px;
    border: 1px solid #cbd5e0;
    border-radius: var(--border-radius);
    font-size: 14px;
    color: var(--text-color);
    box-shadow: var(--box-shadow);
    background-color: #ffffff;
}

.chat-search i {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted-text-color);
}

.chat-item {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background 0.2s;
    border-radius: var(--border-radius);
}

.chat-item:hover {
    background-color: #edf2f7;
}

.chat-item.active {
    background-color: #e0f2fe;
}

.chat-avatar img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chat-info {
    flex: 1;
    margin-left: 12px;
}

.chat-name {
    font-weight: 600;
    color: var(--text-color);
}

.last-message {
    font-size: 13px;
    color: var(--muted-text-color);
}

.chat-meta {
    text-align: right;
    font-size: 12px;
    color: var(--muted-text-color);
}

.chat-messages {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius);
    background-color: var(--secondary-color);
}

.messages-header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.user-info img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: var(--box-shadow);
}

.user-details h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-color);
}

.user-details .status {
    font-size: 12px;
    color: var(--muted-text-color);
}

.message-actions button {
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 18px;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.2s;
}

.message-actions button:hover {
    background-color: #e2e8f0;
}

.messages-container {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
}

.message {
    margin-bottom: 12px;
    max-width: 70%;
    display: flex;
    flex-direction: column;
}

.message.own-message {
    margin-left: auto;
    background-color: var(--accent-color);
    color: #ffffff;
}

.message-content {
    padding: 10px 16px;
    border-radius: 12px;
    background-color: #f3f4f6;
    color: var(--text-color);
    box-shadow: var(--box-shadow);
}

.own-message .message-content {
    background-color: var(--primary-color);
    color: #ffffff;
}

.message-time {
    font-size: 11px;
    color: var(--muted-text-color);
    margin-top: 4px;
}

.message-input {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px;
    border-top: 1px solid #e5e7eb;
    background-color: var(--background-color);
}

.message-input textarea {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid #cbd5e0;
    border-radius: var(--border-radius);
    font-size: 14px;
    resize: none;
    color: var(--text-color);
    box-shadow: var(--box-shadow);
}

.message-input textarea:focus {
    outline: none;
    border-color: var(--primary-color);
}

.attachment-btn, .send-btn {
    background-color: var(--primary-color);
    color: #ffffff;
    border: none;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    box-shadow: var(--box-shadow);
    transition: background-color 0.2s;
}

.attachment-btn:hover, .send-btn:hover {
    background-color: var(--accent-color);
}

.no-chat-selected {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--muted-text-color);
    text-align: center;
    padding: 20px;
}
</style>