document.addEventListener('DOMContentLoaded', function() {
    // Team filtering functionality
    const filterButtons = document.querySelectorAll('.team-nav-btn');
    const teamMembers = document.querySelectorAll('.team-member');
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the category to filter
            const filterCategory = this.getAttribute('data-category');
            
            // Filter team members
            teamMembers.forEach(member => {
                if (filterCategory === 'all') {
                    member.style.display = 'flex';
                } else {
                    const memberCategories = member.getAttribute('data-category').split(' ');
                    if (memberCategories.includes(filterCategory)) {
                        member.style.display = 'flex';
                    } else {
                        member.style.display = 'none';
                    }
                }
            });
            
            // Smooth scroll to the first visible team section
            const firstVisibleSection = document.querySelector('.team-section');
            if (firstVisibleSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const navHeight = document.querySelector('.team-navigation').offsetHeight;
                const totalOffset = headerHeight + navHeight + 20;
                
                window.scrollTo({
                    top: firstVisibleSection.offsetTop - totalOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
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
    
    // Sticky navigation effect
    const teamNavigation = document.querySelector('.team-navigation');
    const header = document.querySelector('header');
    
    if (teamNavigation && header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.padding = '0.5rem 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '1rem 0';
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const navHeight = document.querySelector('.team-navigation') ? document.querySelector('.team-navigation').offsetHeight : 0;
                const totalOffset = headerHeight + navHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - totalOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});