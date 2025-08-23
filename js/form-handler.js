// Form Handler for all website forms
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submissions
    function handleFormSubmit(event, formId, thankYouMessage) {
        event.preventDefault();
        
        const form = document.getElementById(formId);
        if (!form) return;
        
        // Get form data
        const formData = new FormData(form);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // In a real implementation, this would send data to a server
        console.log(`Form ${formId} submitted with data:`, formDataObj);
        
        // Create a hidden form to submit to formspree
        const hiddenForm = document.createElement('form');
        hiddenForm.method = 'POST';
        hiddenForm.action = 'https://formspree.io/f/iamwaytoofly@yahoo.com';
        hiddenForm.style.display = 'none';
        
        // Add all form data to hidden form
        for (const key in formDataObj) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = formDataObj[key];
            hiddenForm.appendChild(input);
        }
        
        // Add form name to identify which form was submitted
        const formNameInput = document.createElement('input');
        formNameInput.type = 'hidden';
        formNameInput.name = '_subject';
        formNameInput.value = `New submission from ${formId}`;
        hiddenForm.appendChild(formNameInput);
        
        // Add the hidden form to the document
        document.body.appendChild(hiddenForm);
        
        // Submit the hidden form
        // In a real implementation, this would be replaced with an actual AJAX submission
        // hiddenForm.submit();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <h3>Thank You!</h3>
            <p>${thankYouMessage}</p>
        `;
        
        // Replace form with success message
        form.innerHTML = '';
        form.appendChild(successMessage);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Visit Form
    const visitForm = document.getElementById('visit-form');
    if (visitForm) {
        visitForm.addEventListener('submit', function(e) {
            handleFormSubmit(e, 'visit-form', 'We\'ve received your information and look forward to welcoming you to The Sons of God Ministry! Someone from our team will be in touch soon to help make your visit special.');
        });
    }
    
    // Small Groups Signup Form
    const groupSignupForm = document.getElementById('group-signup-form');
    if (groupSignupForm) {
        groupSignupForm.addEventListener('submit', function(e) {
            handleFormSubmit(e, 'group-signup-form', 'Thank you for your interest in joining one of our small groups! A group leader will contact you soon with more information.');
        });
    }
    
    // Contact Leader Form
    const contactLeaderForm = document.getElementById('contact-leader-form');
    if (contactLeaderForm) {
        contactLeaderForm.addEventListener('submit', function(e) {
            handleFormSubmit(e, 'contact-leader-form', 'Your message has been sent to the group leader. They will get back to you shortly!');
        });
    }
    
    // Giving Form
    const givingForm = document.getElementById('giving-form');
    if (givingForm) {
        givingForm.addEventListener('submit', function(e) {
            handleFormSubmit(e, 'giving-form', 'Thank you for your generous contribution to The Sons of God Ministry! Your support helps us continue our mission and outreach programs.');
        });
    }
    
    // Newsletter Form in Footer
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            handleFormSubmit(e, 'newsletter-form', 'Thank you for subscribing to our newsletter! You\'ll start receiving updates from The Sons of God Ministry soon.');
        });
    }
    
    // Events Newsletter Form
    const eventsNewsletterForm = document.getElementById('events-newsletter-form');
    if (eventsNewsletterForm) {
        eventsNewsletterForm.addEventListener('submit', function(e) {
            handleFormSubmit(e, 'events-newsletter-form', 'Thank you for subscribing to our events newsletter! You\'ll now receive updates about upcoming events at The Sons of God Ministry.');
        });
    }
});