document.addEventListener('DOMContentLoaded', function() {
    // Media Navigation Tabs
    const mediaTabs = document.querySelectorAll('.media-nav-tab');
    const mediaContentSections = document.querySelectorAll('.media-content-section');
    
    mediaTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            mediaTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content sections
            mediaContentSections.forEach(section => section.classList.remove('active'));
            
            // Show content section corresponding to clicked tab
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Update URL hash
            window.location.hash = tabId;
        });
    });
    
    // Handle URL hash on page load
    function handleHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const activeTab = document.querySelector(`.media-nav-tab[data-tab="${hash}"]`);
            if (activeTab) {
                // Trigger click on the tab
                activeTab.click();
            }
        }
    }
    
    // Call on page load
    handleHash();
    
    // Sermon Filter
    const sermonFilter = document.getElementById('sermon-filter');
    const sermonSearch = document.getElementById('sermon-search');
    const sermonItems = document.querySelectorAll('.series-item, .media-item[data-series]');
    
    if (sermonFilter) {
        sermonFilter.addEventListener('change', filterSermons);
    }
    
    if (sermonSearch) {
        sermonSearch.addEventListener('input', filterSermons);
    }
    
    function filterSermons() {
        const selectedSeries = sermonFilter ? sermonFilter.value : 'all';
        const searchTerm = sermonSearch ? sermonSearch.value.toLowerCase() : '';
        
        sermonItems.forEach(item => {
            const seriesMatch = selectedSeries === 'all' || item.getAttribute('data-series') === selectedSeries;
            
            // Get sermon title from the h4 element
            const title = item.querySelector('h4').textContent.toLowerCase();
            const searchMatch = !searchTerm || title.includes(searchTerm);
            
            if (seriesMatch && searchMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Media Search
    const musicSearch = document.getElementById('music-search');
    const musicItems = document.querySelectorAll('#music .media-item, #music .album-item');
    
    if (musicSearch) {
        musicSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            musicItems.forEach(item => {
                const title = item.querySelector('h4').textContent.toLowerCase();
                
                if (!searchTerm || title.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    const podcastSearch = document.getElementById('podcast-search');
    const podcastItems = document.querySelectorAll('.episode-item');
    
    if (podcastSearch) {
        podcastSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            podcastItems.forEach(item => {
                const title = item.querySelector('h4').textContent.toLowerCase();
                const description = item.querySelector('.episode-description').textContent.toLowerCase();
                
                if (!searchTerm || title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    const devotionalSearch = document.getElementById('devotional-search');
    const devotionalItems = document.querySelectorAll('.devotional-item');
    
    if (devotionalSearch) {
        devotionalSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            devotionalItems.forEach(item => {
                const title = item.querySelector('h4').textContent.toLowerCase();
                
                if (!searchTerm || title.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Media Player
    const mediaPlayer = document.getElementById('media-player');
    const playerTitle = document.getElementById('player-title');
    const closePlayer = document.querySelector('.close-player');
    const playPauseBtn = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.progress');
    const timeDisplay = document.querySelector('.time-display');
    
    // All clickable media items
    const allMediaItems = document.querySelectorAll('.media-thumbnail, .album-cover, .podcast-cover, .video-container, .play-btn');
    
    allMediaItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the title from the closest parent with a title
            let title;
            if (this.classList.contains('play-btn')) {
                // For podcast episodes
                title = this.closest('.episode-item').querySelector('h4').textContent;
            } else if (this.classList.contains('video-container')) {
                // For featured videos
                title = this.closest('.featured-media').querySelector('h3').textContent;
            } else {
                // For regular media items
                const parent = this.closest('.media-item') || this.closest('.series-item') || this.closest('.album-item');
                title = parent.querySelector('h4').textContent;
            }
            
            // Open media player with the title
            openMediaPlayer(title);
        });
    });
    
    function openMediaPlayer(title) {
        playerTitle.textContent = title;
        mediaPlayer.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Reset player state
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        progressBar.style.width = '0%';
        timeDisplay.textContent = '00:00 / 00:00';
        
        // Start fake progress for demo
        startFakeProgress();
    }
    
    if (closePlayer) {
        closePlayer.addEventListener('click', function() {
            mediaPlayer.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
            stopFakeProgress();
        });
    }
    
    // Close player when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === mediaPlayer) {
            mediaPlayer.style.display = 'none';
            document.body.style.overflow = '';
            stopFakeProgress();
        }
    });
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (this.innerHTML.includes('fa-play')) {
                this.innerHTML = '<i class="fas fa-pause"></i>';
                startFakeProgress();
            } else {
                this.innerHTML = '<i class="fas fa-play"></i>';
                stopFakeProgress();
            }
        });
    }
    
    let progressInterval;
    let currentProgress = 0;
    
    function startFakeProgress() {
        stopFakeProgress();
        currentProgress = 0;
        progressBar.style.width = '0%';
        
        progressInterval = setInterval(() => {
            currentProgress += 0.5;
            if (currentProgress > 100) {
                stopFakeProgress();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                return;
            }
            
            progressBar.style.width = `${currentProgress}%`;
            
            // Update time display (fake for demo)
            const totalSeconds = 180; // 3 minutes
            const currentSeconds = Math.floor((currentProgress / 100) * totalSeconds);
            const minutes = Math.floor(currentSeconds / 60);
            const seconds = currentSeconds % 60;
            
            const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            timeDisplay.textContent = `${formattedTime} / 03:00`;
        }, 500);
    }
    
    function stopFakeProgress() {
        clearInterval(progressInterval);
    }
    
    // Load More Buttons
    const loadMoreButtons = document.querySelectorAll('.load-more button');
    
    loadMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real application, this would load more content from the server
            alert('In a real application, this would load more content from the server.');
        });
    });
    
    // Devotional Subscription Form
    const subscriptionForm = document.querySelector('.subscription-form');
    
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input').value;
            
            if (email) {
                alert(`Thank you for subscribing with ${email}! You will now receive our daily devotionals.`);
                this.querySelector('input').value = '';
            }
        });
    }
    
    // Adjust navigation position based on banner height
    function adjustNavPosition() {
        const headerHeight = document.querySelector('header').offsetHeight;
        const bannerHeight = document.querySelector('.live-stream-banner').offsetHeight;
        const totalHeight = headerHeight + bannerHeight;
        
        document.querySelector('.media-hero').style.marginTop = `${totalHeight}px`;
        document.querySelector('.media-navigation').style.top = `${totalHeight}px`;
    }

    
    // Call on load and resize
    adjustNavPosition();
    window.addEventListener('resize', adjustNavPosition);
});
