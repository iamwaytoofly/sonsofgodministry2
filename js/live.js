document.addEventListener('DOMContentLoaded', function() {
    // Share Modal
    const shareBtn = document.querySelector('.share-btn');
    const shareModal = document.getElementById('share-modal');
    const closeModal = document.querySelector('.close-modal');
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    if (shareBtn && shareModal) {
        shareBtn.addEventListener('click', function() {
            shareModal.style.display = 'block';
        });
        
        closeModal.addEventListener('click', function() {
            shareModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === shareModal) {
                shareModal.style.display = 'none';
            }
        });
        
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const textToCopy = this.getAttribute('data-copy');
                const tempInput = document.createElement('input');
                tempInput.value = textToCopy;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    }
    
    // Stream tabs functionality
    const streamTabs = document.querySelectorAll('.stream-tab');
    const videoStream = document.getElementById('video-stream');
    const zoomMeeting = document.getElementById('zoom-meeting');
    
    if (streamTabs.length > 0) {
        streamTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                streamTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show the corresponding content
                const tabType = this.getAttribute('data-tab');
                
                if (tabType === 'video') {
                    videoStream.classList.add('active');
                    zoomMeeting.classList.remove('active');
                } else if (tabType === 'zoom') {
                    zoomMeeting.classList.add('active');
                    videoStream.classList.remove('active');
                }
            });
        });
    }
    
    // Copy Zoom link functionality
    const zoomCopyBtn = document.querySelector('.copy-btn[data-copy]');
    
    if (zoomCopyBtn) {
        zoomCopyBtn.addEventListener('click', function() {
            const linkToCopy = this.getAttribute('data-copy');
            
            // Create a temporary input element
            const tempInput = document.createElement('input');
            tempInput.value = linkToCopy;
            document.body.appendChild(tempInput);
            
            // Select and copy the text
            tempInput.select();
            document.execCommand('copy');
            
            // Remove the temporary element
            document.body.removeChild(tempInput);
            
            // Update button text temporarily
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
            }, 2000);
        });
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.main-nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
            });
        });
    }
    
    // Live chat form submission
    const chatForm = document.getElementById('chat-form');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.getElementById('chat-input');
    
    if (chatForm && chatMessages && chatInput) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (chatInput.value.trim() === '') return;
            
            // Create a new message element
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chat-message', 'user-message');
            
            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            
            const userName = document.createElement('span');
            userName.classList.add('user-name');
            userName.textContent = 'You';
            
            const messageText = document.createElement('p');
            messageText.textContent = chatInput.value;
            
            messageContent.appendChild(userName);
            messageContent.appendChild(messageText);
            
            const messageTime = document.createElement('span');
            messageTime.classList.add('message-time');
            
            // Get current time
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            messageTime.textContent = `${hours}:${minutes}`;
            
            messageDiv.appendChild(messageContent);
            messageDiv.appendChild(messageTime);
            
            // Add the message to the chat
            chatMessages.appendChild(messageDiv);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom of chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate a response (in a real app, this would come from a server)
            setTimeout(function() {
                const responseDiv = document.createElement('div');
                responseDiv.classList.add('chat-message');
                
                const responseContent = document.createElement('div');
                responseContent.classList.add('message-content');
                
                const responseName = document.createElement('span');
                responseName.classList.add('user-name');
                responseName.textContent = 'Pastor Johnson';
                
                const responseText = document.createElement('p');
                responseText.textContent = 'Thank you for joining us today! God bless you.';
                
                responseContent.appendChild(responseName);
                responseContent.appendChild(responseText);
                
                const responseTime = document.createElement('span');
                responseTime.classList.add('message-time');
                responseTime.textContent = `${hours}:${minutes}`;
                
                responseDiv.appendChild(responseContent);
                responseDiv.appendChild(responseTime);
                
                chatMessages.appendChild(responseDiv);
                
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        });
    }
});