document.addEventListener('DOMContentLoaded', function() {
    // Create the chat widget HTML structure
    const chatWidgetHTML = `
        <div class="chat-widget">
            <div class="chat-widget-header">
                <h4>Chat with Us</h4>
                <button class="chat-widget-toggle"><i class="fas fa-minus"></i></button>
            </div>
            <div class="chat-widget-body">
                <div class="chat-widget-messages">
                    <div class="chat-widget-message church">
                        <div class="message-content">
                            <p>Welcome to The Sons of God Ministry! How can we help you today?</p>
                            <span class="message-time">Now</span>
                        </div>
                    </div>
                </div>
                <form id="chat-widget-form" class="chat-widget-input">
                    <input type="text" id="chat-widget-input" placeholder="Type your message...">
                    <button type="submit"><i class="fas fa-paper-plane"></i></button>
                </form>
            </div>
            <div class="chat-widget-button">
                <i class="fas fa-comment"></i>
            </div>
        </div>
    `;

    // Append the chat widget to the body
    const chatWidgetContainer = document.createElement('div');
    chatWidgetContainer.innerHTML = chatWidgetHTML;
    document.body.appendChild(chatWidgetContainer);

    // Get elements
    const chatWidget = document.querySelector('.chat-widget');
    const chatWidgetButton = document.querySelector('.chat-widget-button');
    const chatWidgetToggle = document.querySelector('.chat-widget-toggle');
    const chatWidgetBody = document.querySelector('.chat-widget-body');
    const chatWidgetForm = document.getElementById('chat-widget-form');
    const chatWidgetInput = document.getElementById('chat-widget-input');
    const chatWidgetMessages = document.querySelector('.chat-widget-messages');

    // Initially hide the chat body
    chatWidgetBody.style.display = 'none';
    chatWidgetButton.style.display = 'flex';

    // Toggle chat widget when button is clicked
    chatWidgetButton.addEventListener('click', function() {
        chatWidgetBody.style.display = 'flex';
        chatWidget.classList.add('active');
        chatWidgetButton.style.display = 'none';
        // Scroll to bottom of chat
        chatWidgetMessages.scrollTop = chatWidgetMessages.scrollHeight;
    });

    // Minimize chat widget when toggle is clicked
    chatWidgetToggle.addEventListener('click', function() {
        chatWidgetBody.style.display = 'none';
        chatWidget.classList.remove('active');
        chatWidgetButton.style.display = 'flex';
    });

    // Handle form submission
    chatWidgetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (chatWidgetInput.value.trim() === '') return;
        
        // Get current time
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        // Create user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-widget-message user';
        userMessage.innerHTML = `
            <div class="message-content">
                <p>${chatWidgetInput.value}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;
        
        // Add message to chat
        chatWidgetMessages.appendChild(userMessage);
        
        // Clear input
        const userMessageText = chatWidgetInput.value;
        chatWidgetInput.value = '';
        
        // Scroll to bottom
        chatWidgetMessages.scrollTop = chatWidgetMessages.scrollHeight;
        
        // Simulate response after a short delay
        setTimeout(function() {
            let responseText = "Thank you for your message! Someone from our team will get back to you soon.";
            
            // Simple keyword-based responses
            if (userMessageText.toLowerCase().includes('service') || userMessageText.toLowerCase().includes('worship')) {
                responseText = "Our Sunday services are at 9:00 AM and 11:00 AM. We'd love to see you there!";
            } else if (userMessageText.toLowerCase().includes('prayer') || userMessageText.toLowerCase().includes('pray')) {
                responseText = "We'd be happy to pray with you. Please share your prayer request or visit us during our Wednesday prayer service at 7:00 PM.";
            } else if (userMessageText.toLowerCase().includes('bible') || userMessageText.toLowerCase().includes('study')) {
                responseText = "We have Bible study groups throughout the week. Check our Small Groups page for more information!";
            } else if (userMessageText.toLowerCase().includes('address') || userMessageText.toLowerCase().includes('location')) {
                responseText = "We're located at 200 Tabor St. Pittsburgh, PA 15204. We hope to see you soon!";
            }
            
            // Create church response
            const churchMessage = document.createElement('div');
            churchMessage.className = 'chat-widget-message church';
            churchMessage.innerHTML = `
                <div class="message-content">
                    <p>${responseText}</p>
                    <span class="message-time">${timeString}</span>
                </div>
            `;
            
            // Add response to chat
            chatWidgetMessages.appendChild(churchMessage);
            
            // Scroll to bottom
            chatWidgetMessages.scrollTop = chatWidgetMessages.scrollHeight;
        }, 1000);
    });
});