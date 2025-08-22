document.addEventListener('DOMContentLoaded', function() {
    // Share Modal
    const shareBtn = document.querySelector('.share-btn');
    const shareModal = document.getElementById('share-modal');
    const closeModal = document.querySelector('.close-modal');
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    if (shareBtn && shareModal) {
        shareBtn.addEventListener('click', function() {
            shareModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            shareModal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === shareModal) {
            shareModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Copy buttons
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.parentElement;
            const textElement = parent.querySelector('input') || parent.querySelector('textarea');
            
            if (textElement) {
                textElement.select();
                document.execCommand('copy');
                
                // Show feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.backgroundColor = '#00b894';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
            }
        });
    });
    
    // Video Controls
    const playPauseBtn = document.querySelector('.play-pause');
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (this.innerHTML.includes('fa-pause')) {
                this.innerHTML = '<i class="fas fa-play"></i>';
                videoPlaceholder.style.opacity = '0.7';
            } else {
                this.innerHTML = '<i class="fas fa-pause"></i>';
                videoPlaceholder.style.opacity = '1';
            }
        });
    }
    
    // Chat Toggle
    const chatToggle = document.querySelector('.chat-toggle');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input');
    
    if (chatToggle) {
        chatToggle.addEventListener('click', function() {
            if (chatMessages.style.display === 'none') {
                chatMessages.style.display = 'block';
                chatInput.style.display = 'flex';
                this.innerHTML = '<i class="fas fa-chevron-down"></i>';
            } else {
                chatMessages.style.display = 'none';
                chatInput.style.display = 'none';
                this.innerHTML = '<i class="fas fa-chevron-up"></i>';
            }
        });
    }
    
    // Chat Input
    const chatInputField = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    
    if (chatInputField && sendBtn) {
        // Send message on button click
        sendBtn.addEventListener('click', sendMessage);
        
        // Send message on Enter key
        chatInputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = chatInputField.value.trim();
        
        if (message) {
            // In a real application, this would send the message to a server
            // For demo purposes, we'll just add it to the chat
            const chatMessages = document.querySelector('.chat-messages');
            
            // Create new message element
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message');
            
            // Get random initials for avatar
            const initials = getRandomInitials();
            
            messageElement.innerHTML = `
                <div class="message-avatar">${initials}</div>
                <div class="message-content">
                    <span class="message-name">You</span>
                    <p>${message}</p>
                </div>
            `;
            
            // Add message to chat
            chatMessages.appendChild(messageElement);
            
            // Clear input
            chatInputField.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    function getRandomInitials() {
        const firstNames = ['J', 'M', 'S', 'A', 'D', 'R', 'T', 'L', 'K', 'E'];
        const lastNames = ['S', 'D', 'W', 'B', 'M', 'R', 'J', 'T', 'H', 'P'];
        
        const first = firstNames[Math.floor(Math.random() * firstNames.length)];
        const last = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        return first + last;
    }
    
    // Like Button
    const likeBtn = document.querySelector('.like-btn');
    
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            if (this.classList.contains('liked')) {
                this.innerHTML = '<i class="fas fa-thumbs-up"></i> Like';
                this.classList.remove('liked');
            } else {
                this.innerHTML = '<i class="fas fa-thumbs-up"></i> Liked';
                this.classList.add('liked');
                this.style.color = '#4267B2';
            }
        });
    }
    
    // Comment Button
    const commentBtn = document.querySelector('.comment-btn');
    
    if (commentBtn) {
        commentBtn.addEventListener('click', function() {
            // Scroll to chat section
            document.querySelector('.chat-section').scrollIntoView({ behavior: 'smooth' });
            
            // Focus on chat input
            setTimeout(() => {
                chatInputField.focus();
            }, 500);
        });
    }
    
    // Subscribe Button
    const subscribeBtn = document.querySelector('.subscribe-btn');
    
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            if (this.classList.contains('subscribed')) {
                this.innerHTML = '<i class="fas fa-bell"></i> Subscribe';
                this.classList.remove('subscribed');
            } else {
                this.innerHTML = '<i class="fas fa-bell-slash"></i> Unsubscribe';
                this.classList.add('subscribed');
                this.style.color = '#FF0000';
                
                // Show notification
                alert('You are now subscribed to The Sons of God Ministry. You will receive notifications for future live streams.');
            }
        });
    }
    
    // Reminder Buttons
    const reminderBtns = document.querySelectorAll('.reminder-btn');
    
    reminderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('reminded')) {
                this.innerHTML = '<i class="far fa-bell"></i> Set Reminder';
                this.classList.remove('reminded');
            } else {
                this.innerHTML = '<i class="fas fa-bell"></i> Reminder Set';
                this.classList.add('reminded');
                
                // Get event title
                const eventTitle = this.closest('.upcoming-event').querySelector('h3').textContent;
                
                // Show notification
                alert(`Reminder set for "${eventTitle}". You will receive a notification before the event starts.`);
            }
        });
    });
    
    // Sermon Cards
    const sermonCards = document.querySelectorAll('.sermon-card');
    
    sermonCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get sermon title
            const sermonTitle = this.querySelector('h3').textContent;
            
            // In a real application, this would open the sermon video
            alert(`Playing sermon: "${sermonTitle}"`);
        });
    });
});