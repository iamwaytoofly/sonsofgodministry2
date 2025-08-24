document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    const slideshowImages = [
        'images/slideshow/church-1.jpg',
        'images/slideshow/church-2.jpg',
        'images/slideshow/church-3.jpg',
        'images/slideshow/church-4.jpg'
    ];

    const slideshowContainer = document.querySelector('.slideshow-container');
    
    // Create slides
    slideshowImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.style.backgroundImage = `url(${image})`;
        
        // Make the first slide active
        if (index === 0) {
            slide.classList.add('active');
        }
        
        slideshowContainer.appendChild(slide);
    });
    
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    // Function to change slides
    function changeSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide or back to first slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new current slide
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(changeSlide, 5000);
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
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
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const liveStreamHeight = document.querySelector('.live-stream-banner').offsetHeight;
                const totalOffset = headerHeight + liveStreamHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - totalOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const visitForm = document.getElementById('visit-form');
    
    if (visitForm) {
        visitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(visitForm);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // In a real application, you would send this data to a server
            console.log('Form submitted with data:', formDataObj);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <p>Thank you for planning your visit, ${formDataObj.name || 'friend'}! We look forward to seeing you soon.</p>
                <p>A confirmation has been sent to ${formDataObj.email}.</p>
            `;
            
            visitForm.innerHTML = '';
            visitForm.appendChild(successMessage);
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Media Tabs
    const mediaTabs = document.querySelectorAll('.media-tab');
    const mediaContents = document.querySelectorAll('.media-content');
    
    mediaTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            mediaTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content
            mediaContents.forEach(content => content.classList.remove('active'));
            
            // Show content corresponding to clicked tab
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // Media Play Button Effect
    const mediaItems = document.querySelectorAll('.media-item');
    
    mediaItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real application, this would open a modal or play the media
            console.log('Media item clicked:', this);
        });
    });
    
    // Check if live stream is active
    function checkLiveStream() {
        // This would typically be an API call to check if a stream is live
        const isLive = true; // For demo purposes
        const liveStreamBanner = document.querySelector('.live-stream-banner');
        
        if (isLive) {
            liveStreamBanner.style.display = 'block';
        } else {
            liveStreamBanner.style.display = 'none';
            // Adjust hero margin when banner is hidden
            document.querySelector('.hero').style.marginTop = '70px';
        }
    }
    
    // Call the function to check live stream status
    checkLiveStream();
    
    // Adjust hero margin based on banner height
    function adjustHeroMargin() {
        const headerHeight = document.querySelector('header').offsetHeight;
        const bannerHeight = document.querySelector('.live-stream-banner').offsetHeight;
        document.querySelector('.hero').style.marginTop = `${headerHeight + bannerHeight}px`;
    }
    
    // Call on load and resize
    adjustHeroMargin();
    window.addEventListener('resize', adjustHeroMargin);
    
});
