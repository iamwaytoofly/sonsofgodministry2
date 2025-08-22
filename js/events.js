document.addEventListener('DOMContentLoaded', function() {
    // Calendar View Toggle
    const viewButtons = document.querySelectorAll('.view-btn');
    const calendarViews = document.querySelectorAll('.calendar-view');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all views
            calendarViews.forEach(view => view.classList.remove('active'));
            
            // Show selected view
            const viewType = this.getAttribute('data-view');
            document.querySelector(`.${viewType}-view`).classList.add('active');
        });
    });
    
    // Month Navigation
    const prevMonthBtn = document.querySelector('.month-btn.prev');
    const nextMonthBtn = document.querySelector('.month-btn.next');
    const currentMonthDisplay = document.querySelector('.current-month');
    
    // Current date for tracking
    let currentDate = new Date(2025, 8, 1); // September 2025
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar();
        });
    }
    
    function updateCalendar() {
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthDisplay.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        
        // In a real implementation, this would update the calendar grid
        // For this demo, we'll just show an alert
        console.log(`Calendar updated to ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`);
        
        // If we're not in September 2025, hide the events
        const hasEvents = currentDate.getMonth() === 8 && currentDate.getFullYear() === 2025;
        const eventDays = document.querySelectorAll('.has-event');
        
        eventDays.forEach(day => {
            if (hasEvents) {
                day.style.display = 'block';
            } else {
                day.style.display = 'none';
            }
        });
    }
    
    // Calendar Day Click
    const calendarDays = document.querySelectorAll('.calendar-day');
    
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            if (this.classList.contains('has-event')) {
                const eventId = this.querySelector('.event-indicator').getAttribute('data-event');
                
                // Scroll to the event in the list view
                document.querySelector('.view-btn[data-view="list"]').click();
                
                const eventElement = document.getElementById(eventId);
                if (eventElement) {
                    setTimeout(() => {
                        eventElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        eventElement.classList.add('highlight');
                        
                        setTimeout(() => {
                            eventElement.classList.remove('highlight');
                        }, 2000);
                    }, 100);
                }
            }
        });
    });
    
    // Register Buttons
    const registerButtons = document.querySelectorAll('.register-btn');
    
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get event name from closest event item
            const eventItem = this.closest('.event-list-item');
            const eventName = eventItem.querySelector('h3').textContent;
            
            // Show registration confirmation
            alert(`Thank you for your interest in "${eventName}"! In a real implementation, this would open a registration form.`);
        });
    });
    
    // Subscribe Form
    const subscribeForm = document.querySelector('.subscribe-form form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input').value;
            
            if (email) {
                alert(`Thank you for subscribing with ${email}! You will now receive notifications about upcoming events.`);
                this.querySelector('input').value = '';
            }
        });
    }
    
    // Calendar Buttons
    const calendarButtons = document.querySelectorAll('.calendar-btn');
    
    calendarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get calendar type from button text
            const calendarType = this.textContent.trim();
            
            // Show confirmation
            alert(`In a real implementation, this would add our church calendar to your ${calendarType}.`);
        });
    });
    
    // Handle URL hash for direct event linking
    function handleEventHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            // Switch to list view
            document.querySelector('.view-btn[data-view="list"]').click();
            
            // Scroll to the event
            const eventElement = document.getElementById(hash);
            if (eventElement) {
                setTimeout(() => {
                    eventElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    eventElement.classList.add('highlight');
                    
                    setTimeout(() => {
                        eventElement.classList.remove('highlight');
                    }, 2000);
                }, 500);
            }
        }
    }
    
    // Call on page load
    handleEventHash();
});