document.addEventListener('DOMContentLoaded', function() {
    /* ========= TAB NAVIGATION ========= */
    const mediaTabs = document.querySelectorAll('.media-nav-tab');
    const mediaContentSections = document.querySelectorAll('.media-content-section');

    function activateTab(tabEl, pushHash = true) {
        if (!tabEl) return;
        mediaTabs.forEach(t => t.classList.remove('active'));
        tabEl.classList.add('active');
        const id = tabEl.getAttribute('data-tab');
        mediaContentSections.forEach(sec => sec.classList.toggle('active', sec.id === id));
        if (pushHash) window.location.hash = id;
    }

    mediaTabs.forEach(tab => {
        tab.addEventListener('click', e => {
            e.preventDefault();
            activateTab(tab);
        });
    });

    // Hash on load
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        const match = document.querySelector(`.media-nav-tab[data-tab="${initialHash}"]`);
        if (match) activateTab(match, false);
    } else if (mediaTabs.length) {
        // Ensure first tab active if none
        activateTab(mediaTabs[0], false);
    }

    /* ========= SERMON FILTER & SEARCH ========= */
    const sermonFilter = document.getElementById('sermon-filter');
    const sermonSearch = document.getElementById('sermon-search');
    const sermonItems = document.querySelectorAll('.series-item, .media-item[data-series]');

    function filterSermons() {
        const selectedSeries = sermonFilter ? sermonFilter.value : 'all';
        const term = sermonSearch ? sermonSearch.value.toLowerCase() : '';
        sermonItems.forEach(item => {
            const seriesMatch = selectedSeries === 'all' || item.getAttribute('data-series') === selectedSeries;
            const titleEl = item.querySelector('h4');
            const title = titleEl ? titleEl.textContent.toLowerCase() : '';
            const searchMatch = !term || title.includes(term);
            item.style.display = (seriesMatch && searchMatch) ? 'block' : 'none';
        });
    }
    if (sermonFilter) sermonFilter.addEventListener('change', filterSermons);
    if (sermonSearch) sermonSearch.addEventListener('input', filterSermons);

    /* ========= PRAISE DANCE / MUSIC SEARCH ========= */
    const musicSearch = document.getElementById('music-search');
    const musicItems = document.querySelectorAll('#music .media-item, #music .album-item');
    if (musicSearch) {
        musicSearch.addEventListener('input', function() {
            const val = this.value.toLowerCase();
            musicItems.forEach(item => {
                const titleEl = item.querySelector('h4');
                const title = titleEl ? titleEl.textContent.toLowerCase() : '';
                item.style.display = (!val || title.includes(val)) ? 'block' : 'none';
            });
        });
    }

    /* ========= PODCAST SEARCH ========= */
    const podcastSearch = document.getElementById('podcast-search');
    const podcastItems = document.querySelectorAll('.episode-item');
    if (podcastSearch) {
        podcastSearch.addEventListener('input', function() {
            const term = this.value.toLowerCase();
            podcastItems.forEach(item => {
                const titleEl = item.querySelector('h4');
                const descEl = item.querySelector('.episode-description');
                const title = titleEl ? titleEl.textContent.toLowerCase() : '';
                const desc = descEl ? descEl.textContent.toLowerCase() : '';
                item.style.display = (!term || title.includes(term) || desc.includes(term)) ? 'flex' : 'none';
            });
        });
    }

    /* ========= DEVOTIONAL SEARCH ========= */
    const devotionalSearch = document.getElementById('devotional-search');
    const devotionalItems = document.querySelectorAll('.devotional-item');
    if (devotionalSearch) {
        devotionalSearch.addEventListener('input', function() {
            const term = this.value.toLowerCase();
            devotionalItems.forEach(item => {
                const titleEl = item.querySelector('h4');
                const title = titleEl ? titleEl.textContent.toLowerCase() : '';
                item.style.display = (!term || title.includes(term)) ? 'block' : 'none';
            });
        });
    }

    /* ========= MEDIA PLAYER (DEMO ONLY) ========= */
    const mediaPlayer = document.getElementById('media-player');
    const playerTitle = document.getElementById('player-title');
    const closePlayer = document.querySelector('.close-player');
    const playPauseBtn = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.progress');
    const timeDisplay = document.querySelector('.time-display');
    const clickableMedia = document.querySelectorAll('.media-thumbnail, .album-cover, .podcast-cover, .video-container, .play-btn');

    clickableMedia.forEach(el => {
        el.addEventListener('click', () => {
            let title = 'Media';
            if (el.classList.contains('play-btn')) {
                const episode = el.closest('.episode-item');
                if (episode) {
                    const t = episode.querySelector('h4');
                    if (t) title = t.textContent;
                }
            } else if (el.classList.contains('video-container')) {
                const fm = el.closest('.featured-media');
                if (fm) {
                    const t = fm.querySelector('h3');
                    if (t) title = t.textContent;
                }
            } else {
                const parent = el.closest('.media-item, .series-item, .album-item');
                if (parent) {
                    const t = parent.querySelector('h4');
                    if (t) title = t.textContent;
                }
            }
            openPlayer(title);
        });
    });

    function openPlayer(title) {
        if (playerTitle) playerTitle.textContent = title;
        if (mediaPlayer) mediaPlayer.style.display = 'block';
        document.body.style.overflow = 'hidden';
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        if (progressBar) progressBar.style.width = '0%';
        if (timeDisplay) timeDisplay.textContent = '00:00 / 00:00';
        startFakeProgress();
    }

    if (closePlayer) {
        closePlayer.addEventListener('click', () => {
            if (mediaPlayer) mediaPlayer.style.display = 'none';
            document.body.style.overflow = '';
            stopFakeProgress();
        });
    }

    window.addEventListener('click', e => {
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
        if (progressBar) progressBar.style.width = '0%';
        progressInterval = setInterval(() => {
            currentProgress += 0.5;
            if (currentProgress > 100) {
                stopFakeProgress();
                if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                return;
            }
            if (progressBar) progressBar.style.width = `${currentProgress}%`;
            const totalSeconds = 180;
            const currentSeconds = Math.floor((currentProgress / 100) * totalSeconds);
            const m = Math.floor(currentSeconds / 60);
            const s = currentSeconds % 60;
            const formatted = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
            if (timeDisplay) timeDisplay.textContent = `${formatted} / 03:00`;
        }, 500);
    }

    function stopFakeProgress() {
        clearInterval(progressInterval);
    }

    /* ========= DYNAMIC NAV OFFSET (Header + Live Banner) ========= */
    (function setupDynamicNavOffset() {
        const header = document.querySelector('header');
        const banner = document.querySelector('.live-stream-banner');
        const nav = document.querySelector('.media-navigation');
        if (!header || !nav) return;

        function setNavOffset() {
            const headerH = header.getBoundingClientRect().height;
            const bannerVisible = banner && window.getComputedStyle(banner).display !== 'none';
            const bannerH = bannerVisible ? banner.getBoundingClientRect().height : 0;
            const total = headerH + bannerH;
            nav.style.setProperty('--media-nav-top', total + 'px');
        }

        // Events
        window.addEventListener('resize', setNavOffset);
        window.addEventListener('orientationchange', setNavOffset);
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) setTimeout(setNavOffset, 50);
        });

        // ResizeObserver for header & banner
        if ('ResizeObserver' in window) {
            const ro = new ResizeObserver(setNavOffset);
            ro.observe(header);
            if (banner) ro.observe(banner);
        }

        // MutationObserver for banner style/class changes
        if (banner) {
            const mo = new MutationObserver(setNavOffset);
            mo.observe(banner, { attributes: true, attributeFilter: ['style', 'class'] });
        }

        // Font loading adjustments
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => setTimeout(setNavOffset, 30));
        }

        setNavOffset();
    })();
});
