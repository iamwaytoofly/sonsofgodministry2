document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Children Form Toggle
    const childrenRadios = document.querySelectorAll('input[name="children"]');
    const childrenDetails = document.getElementById('children-details');
    
    childrenRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                childrenDetails.style.display = 'block';
            } else {
                childrenDetails.style.display = 'none';
            }
        });
    });
    
    // Form Validation and Submission
    const visitForm = document.getElementById('visit-form');
    
    if (visitForm) {
        visitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = visitForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // If valid, process the form
            if (isValid) {
                // Get form data
                const formData = new FormData(visitForm);
                const formDataObj = {};
                
                formData.forEach((value, key) => {
                    formDataObj[key] = value;
                });
                
                // In a real application, you would send this data to a server
                console.log('Visit form submitted with data:', formDataObj);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = `
                    <h3>Thank You for Planning Your Visit!</h3>
                    <p>We're excited to welcome you to Grace Community Church on ${formatDate(formDataObj['visit-date'])}.</p>
                    <p>A confirmation email has been sent to ${formDataObj.email} with all the details.</p>
                    <p>If you have any questions before your visit, please don't hesitate to contact us.</p>
                    <div class="success-buttons">
                        <a href="index.html" class="btn-secondary">Return to Homepage</a>
                    </div>
                `;
                
                visitForm.innerHTML = '';
                visitForm.appendChild(successMessage);
                
                // Scroll to top of form
                visitForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }
    
    // Add error class on invalid input
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('error');
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
            }
        });
    });
});