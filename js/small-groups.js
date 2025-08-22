document.addEventListener('DOMContentLoaded', function() {
    // Group Filtering
    const filterButton = document.querySelector('.filter-button');
    const groupTypeSelect = document.getElementById('group-type');
    const meetingDaySelect = document.getElementById('meeting-day');
    const locationSelect = document.getElementById('location');
    const groupItems = document.querySelectorAll('.group-item');
    
    filterButton.addEventListener('click', function() {
        const selectedType = groupTypeSelect.value;
        const selectedDay = meetingDaySelect.value;
        const selectedLocation = locationSelect.value;
        
        groupItems.forEach(item => {
            const typeMatch = selectedType === 'all' || item.getAttribute('data-type') === selectedType;
            const dayMatch = selectedDay === 'all' || item.getAttribute('data-day') === selectedDay;
            const locationMatch = selectedLocation === 'all' || item.getAttribute('data-location') === selectedLocation;
            
            if (typeMatch && dayMatch && locationMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Scroll to first visible group
        const firstVisibleGroup = document.querySelector('.group-item[style="display: block"]');
        if (firstVisibleGroup) {
            firstVisibleGroup.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    
    // Group Join Modal
    const joinButtons = document.querySelectorAll('.join-group');
    const groupSignupModal = document.getElementById('group-signup-modal');
    const selectedGroupSpan = document.getElementById('selected-group');
    const groupSignupForm = document.getElementById('group-signup-form');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const groupName = this.getAttribute('data-group');
            selectedGroupSpan.textContent = groupName;
            groupSignupModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Contact Leader Modal
    const contactButtons = document.querySelectorAll('.contact-leader');
    const contactLeaderModal = document.getElementById('contact-leader-modal');
    const selectedLeaderSpan = document.getElementById('selected-leader');
    const contactLeaderForm = document.getElementById('contact-leader-form');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const leaderName = this.getAttribute('data-leader');
            selectedLeaderSpan.textContent = leaderName;
            contactLeaderModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close Modals
    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            groupSignupModal.style.display = 'none';
            contactLeaderModal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === groupSignupModal) {
            groupSignupModal.style.display = 'none';
            document.body.style.overflow = '';
        }
        if (e.target === contactLeaderModal) {
            contactLeaderModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Form Submission
    groupSignupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(groupSignupForm);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // In a real application, you would send this data to a server
        console.log('Group signup form submitted with data:', formDataObj);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <h3>Thank You for Signing Up!</h3>
            <p>We've received your request to join ${selectedGroupSpan.textContent}.</p>
            <p>A group leader will contact you soon with more information.</p>
        `;
        
        groupSignupForm.innerHTML = '';
        groupSignupForm.appendChild(successMessage);
        
        // Close modal after 3 seconds
        setTimeout(() => {
            groupSignupModal.style.display = 'none';
            document.body.style.overflow = '';
            
            // Reset form for future use
            setTimeout(() => {
                groupSignupForm.innerHTML = `
                    <div class="form-group">
                        <label for="signup-name">Your Name</label>
                        <input type="text" id="signup-name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="signup-email">Email</label>
                        <input type="email" id="signup-email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="signup-phone">Phone</label>
                        <input type="tel" id="signup-phone" name="phone">
                    </div>
                    <div class="form-group">
                        <label for="signup-message">Message (Optional)</label>
                        <textarea id="signup-message" name="message" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Submit</button>
                `;
            }, 500);
        }, 3000);
    });
    
    contactLeaderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactLeaderForm);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // In a real application, you would send this data to a server
        console.log('Contact leader form submitted with data:', formDataObj);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <h3>Message Sent!</h3>
            <p>Your message has been sent to ${selectedLeaderSpan.textContent}.</p>
            <p>They will get back to you as soon as possible.</p>
        `;
        
        contactLeaderForm.innerHTML = '';
        contactLeaderForm.appendChild(successMessage);
        
        // Close modal after 3 seconds
        setTimeout(() => {
            contactLeaderModal.style.display = 'none';
            document.body.style.overflow = '';
            
            // Reset form for future use
            setTimeout(() => {
                contactLeaderForm.innerHTML = `
                    <div class="form-group">
                        <label for="contact-name">Your Name</label>
                        <input type="text" id="contact-name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="contact-email">Email</label>
                        <input type="email" id="contact-email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="contact-phone">Phone</label>
                        <input type="tel" id="contact-phone" name="phone">
                    </div>
                    <div class="form-group">
                        <label for="contact-message">Message</label>
                        <textarea id="contact-message" name="message" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Send Message</button>
                `;
            }, 500);
        }, 3000);
    });
    
    // Lead Group Button
    const leadGroupBtn = document.getElementById('lead-group-btn');
    
    leadGroupBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // In a real application, this would open a form or page about leading a group
        alert('Thank you for your interest in leading a small group! Please contact our Small Groups Pastor at smallgroups@sonsofgodministry.org to learn more about the process.');
    });
    
    // Handle anchor links from homepage
    function handleAnchorLinks() {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                setTimeout(() => {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const liveStreamHeight = document.querySelector('.live-stream-banner').offsetHeight;
                    const totalOffset = headerHeight + liveStreamHeight;
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - totalOffset,
                        behavior: 'smooth'
                    });
                }, 500);
            }
        }
    }
    
    // Call on page load
    handleAnchorLinks();
});