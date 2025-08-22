document.addEventListener('DOMContentLoaded', function() {
    // Handle custom amount toggle
    const amountRadios = document.querySelectorAll('input[name="amount"]');
    const customAmountContainer = document.getElementById('custom-amount-container');
    
    amountRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'other') {
                customAmountContainer.style.display = 'block';
            } else {
                customAmountContainer.style.display = 'none';
            }
        });
    });
    
    // Handle payment method toggle
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const cardFields = document.getElementById('card-fields');
    const achFields = document.getElementById('ach-fields');
    const applePayFields = document.getElementById('apple-pay-fields');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Hide all payment fields
            cardFields.style.display = 'none';
            achFields.style.display = 'none';
            applePayFields.style.display = 'none';
            
            // Show the selected payment fields
            if (this.value === 'card') {
                cardFields.style.display = 'block';
            } else if (this.value === 'ach') {
                achFields.style.display = 'block';
            } else if (this.value === 'apple') {
                applePayFields.style.display = 'block';
            }
        });
    });
    
    // Form validation and submission
    const givingForm = document.getElementById('giving-form');
    
    if (givingForm) {
        givingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = givingForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Check if custom amount is selected but not filled
            const amountOtherRadio = document.getElementById('amount-other');
            const customAmountInput = document.getElementById('custom-amount');
            
            if (amountOtherRadio.checked && (!customAmountInput.value || customAmountInput.value <= 0)) {
                isValid = false;
                customAmountInput.classList.add('error');
            }
            
            // If valid, process the form
            if (isValid) {
                // Get form data
                const formData = new FormData(givingForm);
                const formDataObj = {};
                
                formData.forEach((value, key) => {
                    formDataObj[key] = value;
                });
                
                // In a real application, you would send this data to a payment processor
                console.log('Donation form submitted with data:', formDataObj);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = `
                    <h3>Thank You for Your Generosity!</h3>
                    <p>Your donation of $${getSelectedAmount(formDataObj)} to the ${getSelectedFund(formDataObj)} fund has been processed successfully.</p>
                    <p>A receipt has been sent to ${formDataObj.email}.</p>
                    <p>May God bless you for your faithful giving.</p>
                    <div class="success-buttons">
                        <a href="index.html" class="btn-secondary">Return to Homepage</a>
                        <a href="giving.html" class="btn-primary">Make Another Donation</a>
                    </div>
                `;
                
                givingForm.innerHTML = '';
                givingForm.appendChild(successMessage);
                
                // Scroll to top of form
                givingForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Helper function to get the selected amount
    function getSelectedAmount(formData) {
        if (formData.amount === 'other') {
            return formData['custom-amount'];
        } else {
            return formData.amount;
        }
    }
    
    // Helper function to get the selected fund
    function getSelectedFund(formData) {
        const fundMap = {
            'tithes': 'Tithes & Offerings',
            'missions': 'Missions',
            'building': 'Building Fund',
            'benevolence': 'Benevolence',
            'youth': 'Youth Ministry'
        };
        
        return fundMap[formData.fund] || formData.fund;
    }
    
    // Format card number with spaces
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            
            e.target.value = value;
        });
    }
});